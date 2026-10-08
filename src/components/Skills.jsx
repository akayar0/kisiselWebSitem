import React from 'react';
import { Cpu, Terminal, Layers, Wrench, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Skills = ({ skills }) => {
  const skillCategories = [
    {
      title: "Yapay Zeka & Veri Bilimi",
      icon: Cpu,
      color: "text-purple-400",
      bgColor: "bg-purple-950/30",
      borderColor: "border-purple-800/40",
      items: skills.ai_ml
    },
    {
      title: "Programlama Dilleri & Çekirdek",
      icon: Terminal,
      color: "text-emerald-400",
      bgColor: "bg-emerald-950/30",
      borderColor: "border-emerald-800/40",
      items: skills.languages
    },
    {
      title: "Web & Backend Mimarisi",
      icon: Layers,
      color: "text-cyan-400",
      bgColor: "bg-cyan-950/30",
      borderColor: "border-cyan-800/40",
      items: skills.web_backend
    },
    {
      title: "DevOps & Mühendislik Araçları",
      icon: Wrench,
      color: "text-amber-400",
      bgColor: "bg-amber-950/30",
      borderColor: "border-amber-800/40",
      items: skills.tools_devops
    }
  ];

  const header = useScrollReveal();

  return (
    <section id="skills" className="py-20 bg-[#090d16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={header.ref} className={`reveal reveal-up ${header.isVisible ? 'is-visible' : ''}`}>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">
            <Terminal size={16} />
            <span>Teknoloji Yığını & Araçlar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Teknik Yetkinlikler
          </h2>
          <p className="text-slate-400 max-w-2xl text-base mb-12">
            Geliştirme süreçlerimde aktif olarak kullandığım kütüphaneler, diller ve modern mühendislik araçları.
          </p>
        </div>

        {/* 4 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-800/90 hover:border-slate-700 transition-all"
                style={{ opacity: 0, transform: 'translateY(36px)' }}
                ref={el => {
                  if (!el) return;
                  const obs = new IntersectionObserver(([e]) => {
                    if (e.isIntersecting) {
                      el.style.opacity = '1';
                      el.style.transform = 'translateY(0)';
                      el.style.transition = `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${idx * 120}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${idx * 120}ms`;
                      obs.unobserve(el);
                    }
                  }, { threshold: 0.1 });
                  obs.observe(el);
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl ${cat.bgColor} ${cat.color} border ${cat.borderColor}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  {cat.items.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-sm text-slate-200 font-medium">
                        <CheckCircle size={14} className={cat.color} />
                        <span>{skill.name}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
