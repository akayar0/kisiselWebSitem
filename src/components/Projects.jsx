import React from 'react';
import { FolderGit2, Star, GitFork, ExternalLink, Github } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Projects = ({ projects }) => {
  const header = useScrollReveal();

  return (
    <section id="projects" className="py-20 bg-[#0d1117] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={header.ref} className={`mb-8 reveal reveal-up ${header.isVisible ? 'is-visible' : ''}`}>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">
            <FolderGit2 size={16} />
            <span>Açık Kaynak & Proje Portfolyosu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Öne Çıkan Projeler
          </h2>
          <p className="text-slate-400 text-base max-w-xl mt-2">
            GitHub repository tarzında tasarlanmış; yapay zeka, derin öğrenme ve modern web projelerim.
          </p>
        </div>

        {/* Projects Grid (GitHub Repo card aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-slate-800 hover:border-slate-700 group transition-all"
              style={{ opacity: 0, transform: 'translateY(32px) scale(0.97)' }}
              ref={el => {
                if (!el) return;
                const obs = new IntersectionObserver(([e]) => {
                  if (e.isIntersecting) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0) scale(1)';
                    el.style.transition = `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${idx * 120}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${idx * 120}ms`;
                    obs.unobserve(el);
                  }
                }, { threshold: 0.08 });
                obs.observe(el);
              }}
            >
              <div>
                {/* Header with Title and External Links */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                      <FolderGit2 size={18} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub Repo"
                        className="p-1.5 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                      >
                        <Github size={17} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Canlı Önizleme"
                        className="p-1.5 hover:text-cyan-400 hover:bg-slate-800 rounded-md transition-colors"
                      >
                        <ExternalLink size={17} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-900/90 text-cyan-300 border border-cyan-900/40"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* GitHub Repo Bottom Bar (Language, Stars, Forks, Category) */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: project.languageColor || '#38bdf8' }}
                    ></span>
                    <span>{project.language}</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 hover:text-amber-300 cursor-default">
                    <Star size={13} />
                    <span>{project.stars}</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 hover:text-sky-300 cursor-default">
                    <GitFork size={13} />
                    <span>{project.forks}</span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
