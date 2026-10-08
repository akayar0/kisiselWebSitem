import React from 'react';
import { Briefcase, Calendar, MapPin, Building, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Experience = ({ experiences }) => {
  const header = useScrollReveal();

  return (
    <section id="experience" className="py-20 bg-[#090d16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={header.ref} className={`reveal reveal-up ${header.isVisible ? 'is-visible' : ''}`}>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">
            <Briefcase size={16} />
            <span>Kariyer Yolculuğu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            İş & Staj Deneyimleri
          </h2>
          <p className="text-slate-400 max-w-2xl text-base mb-12">
            Sektörde ve akademik ortamlarda edindiğim pratik tecrübeler, üstlendiğim sorumluluklar ve kullandığım teknolojiler.
          </p>
        </div>

        {/* Timeline (LinkedIn Style Experience feed) */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-10">
          {experiences.map((exp, idx) => {
            const staggerClasses = ['', 'reveal-delay-150', 'reveal-delay-300', 'reveal-delay-400'];
            const delay = staggerClasses[idx] || '';
            return (
            <div key={exp.id} className={`relative group reveal reveal-left is-visible-trigger ${delay}`}
              style={{ opacity: 0, transform: 'translateX(-40px)', animation: `none` }}
              ref={el => {
                if (!el) return;
                const obs = new IntersectionObserver(([e]) => {
                  if (e.isIntersecting) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateX(0)';
                    el.style.transition = `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${idx * 150}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${idx * 150}ms`;
                    obs.unobserve(el);
                  }
                }, { threshold: 0.1 });
                obs.observe(el);
              }}
            >
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#090d16] border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:scale-125 transition-all shadow-sm shadow-cyan-500/50"></div>

              {/* Card Container */}
              <div className="glass-card p-6 sm:p-7 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-cyan-400 font-medium mt-0.5">
                      <Building size={15} />
                      <span>{exp.company}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 gap-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
