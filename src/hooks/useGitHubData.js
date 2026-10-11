import { useState, useEffect } from 'react';

/**
 * useGitHubData - Fetches real-time profile, repos, and activity from GitHub REST API
 * with sessionStorage caching to preserve unauthenticated rate limits (60 req/hr).
 * 
 * @param {string} username - GitHub username (defaults to 'akayar0')
 */
export function useGitHubData(username = 'akayar0') {
  const [data, setData] = useState({
    profile: null,
    repos: [],
    repoStatsMap: {},
    recentActivity: null,
    totalStars: 0,
    totalForks: 0,
    topLanguages: [],
    isLoading: true,
    isLive: false,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    const CACHE_KEY = `gh_cache_${username}`;
    const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

    async function fetchGitHubData() {
      // 1. Try reading valid cache first
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL) {
            if (isMounted) {
              setData({
                ...parsed.payload,
                isLoading: false,
                isLive: true,
                error: null,
              });
              return;
            }
          }
        }
      } catch (err) {
        console.warn('SessionStorage error:', err);
      }

      try {
        // 2. Fetch User Profile, Repositories, and Public Events in parallel
        const [profileRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            headers: { Accept: 'application/vnd.github.v3+json' },
          }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
            headers: { Accept: 'application/vnd.github.v3+json' },
          }),
          fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, {
            headers: { Accept: 'application/vnd.github.v3+json' },
          }),
        ]);

        if (!profileRes.ok) {
          throw new Error(`GitHub API profile returned status ${profileRes.status}`);
        }

        const profileData = await profileRes.json();
        const reposData = reposRes.ok ? await reposRes.json() : [];
        const eventsData = eventsRes.ok ? await eventsRes.json() : [];

        // 3. Calculate Stars, Forks, Repo Stats Map & Languages
        let starsCount = 0;
        let forksCount = 0;
        const statsMap = {};
        const languageCounts = {};

        if (Array.isArray(reposData)) {
          reposData.forEach((repo) => {
            const stars = repo.stargazers_count || 0;
            const forks = repo.forks_count || 0;
            starsCount += stars;
            forksCount += forks;

            // Normalize key for matching (both exact name and lowercase without hyphens)
            statsMap[repo.name] = {
              stars,
              forks,
              language: repo.language,
              updatedAt: repo.updated_at,
              url: repo.html_url,
              description: repo.description,
            };
            statsMap[repo.name.toLowerCase()] = statsMap[repo.name];
            statsMap[repo.name.toLowerCase().replace(/[-_]/g, '')] = statsMap[repo.name];

            if (repo.language) {
              languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
            }
          });
        }

        const topLanguages = Object.entries(languageCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([lang, count]) => ({ language: lang, count }));

        // 4. Extract most recent meaningful activity (PushEvent, CreateEvent, WatchEvent)
        let latestActivity = null;
        if (Array.isArray(eventsData) && eventsData.length > 0) {
          const pushEvent = eventsData.find((e) => e.type === 'PushEvent') || eventsData[0];
          if (pushEvent) {
            const repoName = pushEvent.repo?.name ? pushEvent.repo.name.replace(`${username}/`, '') : 'Repo';
            const date = new Date(pushEvent.created_at);
            const timeAgo = formatTimeAgo(date);

            let commitMessage = '';
            if (pushEvent.payload?.commits && pushEvent.payload.commits.length > 0) {
              commitMessage = pushEvent.payload.commits[pushEvent.payload.commits.length - 1].message;
            } else if (pushEvent.type === 'CreateEvent') {
              commitMessage = `Yeni dal/etiket oluşturuldu: ${pushEvent.payload?.ref || 'main'}`;
            } else {
              commitMessage = 'Depo güncellendi';
            }

            latestActivity = {
              repoName,
              repoUrl: `https://github.com/${pushEvent.repo?.name}`,
              type: pushEvent.type,
              commitMessage: commitMessage.split('\n')[0].slice(0, 70),
              createdAt: pushEvent.created_at,
              timeAgo,
            };
          }
        }

        const payload = {
          profile: profileData,
          repos: reposData,
          repoStatsMap: statsMap,
          recentActivity: latestActivity,
          totalStars: starsCount,
          totalForks: forksCount,
          topLanguages,
        };

        // Cache result
        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), payload })
          );
        } catch (e) {
          // ignore cache errors
        }

        if (isMounted) {
          setData({
            ...payload,
            isLoading: false,
            isLive: true,
            error: null,
          });
        }
      } catch (error) {
        console.warn('GitHub API fetch failed, falling back to static metrics:', error);
        if (isMounted) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            isLive: false,
            error: error.message,
          }));
        }
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return data;
}

/**
 * Format relative time in Turkish (e.g., '2 saat önce', 'Dün', '3 gün önce')
 */
function formatTimeAgo(date) {
  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSec < 60) return 'Az önce';
  if (diffMin < 60) return `${diffMin} dakika önce`;
  if (diffHours < 24) return `${diffHours} saat önce`;
  if (diffDays === 1) return 'Dün';
  if (diffDays < 30) return `${diffDays} gün önce`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} ay önce`;
  return `${Math.floor(diffMonths / 12)} yıl önce`;
}
