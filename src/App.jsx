import React, { useState, useEffect } from 'react';
import { portfolioData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certificates } from './components/Certificates';
import { GoalsInterests } from './components/GoalsInterests';
import { Footer } from './components/Footer';
import { AhmetAIWidget } from './components/AhmetAIWidget';
import { useGitHubData } from './hooks/useGitHubData';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const gitHubData = useGitHubData(portfolioData.personal.githubUsername || 'akayar0');

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500 selection:text-black transition-colors duration-300">
      {/* Fixed Navbar with clean dropdown to prevent clutter */}
      <Navbar personal={portfolioData.personal} isDark={isDark} toggleTheme={toggleTheme} />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Hero personal={portfolioData.personal} />
        <About about={portfolioData.about} personal={portfolioData.personal} />
        <Experience experiences={portfolioData.experiences} />
        <Projects
          projects={portfolioData.projects}
          repoStatsMap={gitHubData.repoStatsMap}
        />
        <Skills skills={portfolioData.skills} />
        <Certificates certificates={portfolioData.certificates} />
        <GoalsInterests goals={portfolioData.goals} interests={portfolioData.interests} />
      </main>

      {/* Footer & Contact CTA */}
      <Footer personal={portfolioData.personal} />

      {/* Floating AhmetAI Assistant Widget */}
      <AhmetAIWidget />
    </div>
  );
}

export default App;
