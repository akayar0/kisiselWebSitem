import React from 'react';
import { Target, Compass, Heart, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const GoalsInterests = ({ goals, interests }) => {
  const goalsHeader    = useScrollReveal();
  const interestsHeader = useScrollReveal();

  return (
    <section id="goals" className="py-20 bg-[#090d16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Goals & Vision (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div ref={goalsHeader.ref} className={`reveal reveal-left ${goalsHeader.isVisible ? 'is-visible' : ''}`}>
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">
                <Target size={16} />
                <span>Kariyer Vizyonu</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Hedefler & Yol Haritası
              </h2>
              <p className="text-slate-400 text-sm">
                Sektörde ve yapay zeka alanında kendime çizdiğim kısa ve uzun vadeli gelişim hedeflerim.
              </p>
            </div>

            <div className="space-y-4">
              {goals.map((goal, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 border border-slate-800/80"
                  style={{ opacity: 0, transform: 'translateX(-36px)' }}
                  ref={el => {
                    if (!el) return;
                    const obs = new IntersectionObserver(([e]) => {
                      if (e.isIntersecting) {
                        el.style.opacity = '1';
                        el.style.transform = 'translateX(0)';
                        el.style.transition = `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${idx * 130}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${idx * 130}ms`;
                        obs.unobserve(el);
                      }
                    }, { threshold: 0.1 });
                    obs.observe(el);
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-3 text-cyan-400 font-semibold text-base">
                    <Sparkles size={18} />
                    <span>{goal.title}</span>
                  </div>

                  <ul className="space-y-2.5">
                    {goal.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interests & Hobbies (5 cols) */}
          <div id="interests" className="lg:col-span-5 space-y-6">
            <div ref={interestsHeader.ref} className={`reveal reveal-right ${interestsHeader.isVisible ? 'is-visible' : ''}`}>
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">
                <Heart size={16} />
                <span>Kişisel Gelişim</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Hobiler & İlgi Alanları
              </h2>
              <p className="text-slate-400 text-sm">
                Kod satırlarının ötesinde bana ilham veren, problem çözme kaslarımı diri tutan tutkularım.
              </p>
            </div>

            <div className="space-y-4">
              {interests.map((interestGroup, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-5 border border-slate-800/80"
                  style={{ opacity: 0, transform: 'translateX(36px)' }}
                  ref={el => {
                    if (!el) return;
                    const obs = new IntersectionObserver(([e]) => {
                      if (e.isIntersecting) {
                        el.style.opacity = '1';
                        el.style.transform = 'translateX(0)';
                        el.style.transition = `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 110}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 110}ms`;
                        obs.unobserve(el);
                      }
                    }, { threshold: 0.1 });
                    obs.observe(el);
                  }}
                >
                  <h3 className="text-sm font-semibold font-mono text-slate-300 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    {interestGroup.category}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {interestGroup.items.map((item, iIdx) => (
                      <span
                        key={iIdx}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
