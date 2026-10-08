import React from 'react';
import { Mail, FileText, ArrowRight, Sparkles, MapPin, CheckCircle2, GitCommit } from 'lucide-react';

export const Hero = ({ personal }) => {
  // Mock contribution data for GitHub-style activity graph
  const contributionGrid = Array.from({ length: 42 }, (_, i) => {
    // Generate different intensity levels
    const levels = ['bg-slate-800', 'bg-emerald-950', 'bg-emerald-700', 'bg-emerald-500', 'bg-emerald-400'];
    const weights = [0, 0, 1, 2, 3, 4, 1, 2, 3];
    return weights[(i * 7 + 3) % weights.length];
  });

  const levelColors = [
    'bg-slate-800/80',
    'bg-emerald-900/70',
    'bg-emerald-700',
    'bg-emerald-500',
    'bg-emerald-400'
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-mesh">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text / LinkedIn & GitHub Bio */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Open to Work / Status Badge (LinkedIn style) */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personal.statusBadge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Merhaba, ben <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  {personal.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 font-medium">
                {personal.role}
              </p>
            </div>

            {/* Bio summary */}
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              {personal.bio}
            </p>

            {/* Quick Location & Status info */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-cyan-400" />
                {personal.location}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Yapay Zeka & Full-Stack
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>Projelerimi İncele</span>
                <ArrowRight size={16} />
              </a>

              <a
                href={personal.cvUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 font-medium text-sm hover:border-slate-500 hover:bg-slate-800 transition-all"
              >
                <FileText size={16} className="text-cyan-400" />
                <span>CV / Özgeçmiş</span>
              </a>
            </div>

            {/* Highlight Metric Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
              {personal.stats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: GitHub Profile Card + AI Terminal Hybrid */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60">
              
              {/* Terminal Title Bar */}
              <div className="bg-[#161b22] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">candidate_profile.py</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400/90 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                  <Sparkles size={11} />
                  <span>AI Agent Ready</span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0d1117] overflow-x-auto">
                <p className="text-slate-500"># Bilgisayar Mühendisi Profil Sınıfı</p>
                <p>
                  <span className="text-purple-400">class</span>{' '}
                  <span className="text-yellow-300">ComputerEngineering</span>:
                </p>
                <div className="pl-4 space-y-1">
                  <p>
                    <span className="text-sky-400">status</span> ={' '}
                    <span className="text-emerald-300">"Junior Student"</span>
                  </p>
                  <p>
                    <span className="text-sky-400">degree</span> ={' '}
                    <span className="text-emerald-300">"4th Year - Computer Engineering"</span>
                  </p>
                  <p>
                    <span className="text-sky-400">core_skills</span> = [
                  </p>
                  <p className="pl-4 text-emerald-300">
                    "AI & LLM", "RAG Pipelines", "Full-Stack Web", "Python"
                  </p>
                  <p>
                    ]
                  </p>
                  <p className="pt-2">
                    <span className="text-purple-400">def</span>{' '}
                    <span className="text-blue-400">ready_for_impact</span>(self):
                  </p>
                  <p className="pl-4 text-amber-300">
                    <span className="text-purple-400">return</span> <span className="text-rose-400">True</span>{' '}
                    <span className="text-slate-500"># Hızlı öğrenme & yüksek motivasyon</span>
                  </p>
                </div>
              </div>

              {/* Mock GitHub Activity Heatmap Ribbon */}
              <div className="p-4 bg-[#161b22] border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <span className="flex items-center gap-1.5">
                    <GitCommit size={14} className="text-emerald-400" />
                    Son GitHub Aktivitesi
                  </span>
                  <span className="text-emerald-400 font-semibold">Aktif Katkıcı</span>
                </div>
                
                {/* 7x6 mini grid */}
                <div className="grid grid-flow-col grid-rows-3 gap-1.5 justify-start">
                  {contributionGrid.map((lvl, index) => (
                    <div
                      key={index}
                      className={`w-3.5 h-3.5 rounded-sm ${levelColors[lvl]} transition-transform hover:scale-125`}
                      title={`Seviye ${lvl}`}
                    ></div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-mono">
                  <span>Daha Az</span>
                  <div className="flex items-center gap-1">
                    {levelColors.map((clr, i) => (
                      <span key={i} className={`w-2.5 h-2.5 rounded-sm ${clr}`}></span>
                    ))}
                  </div>
                  <span>Daha Çok</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
