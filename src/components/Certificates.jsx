import React from 'react';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Certificates = ({ certificates }) => {
  const header = useScrollReveal();

  return (
    <section id="certificates" className="py-20 bg-[#0d1117] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={header.ref} className={`reveal reveal-up ${header.isVisible ? 'is-visible' : ''}`}>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">
            <Award size={16} />
            <span>Sürekli Gelişim & Başarılar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sertifikalar & Lisanslar
          </h2>
          <p className="text-slate-400 max-w-2xl text-base mb-12">
            Yetkinliklerimi pekiştirmek için tamamladığım küresel sertifika programları ve akademik destekler.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-slate-800/80 hover:border-slate-700 transition-all"
              style={{ opacity: 0, transform: 'translateY(32px)' }}
              ref={el => {
                if (!el) return;
                const obs = new IntersectionObserver(([e]) => {
                  if (e.isIntersecting) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    el.style.transition = `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`;
                    obs.unobserve(el);
                  }
                }, { threshold: 0.08 });
                obs.observe(el);
              }}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
                      <Award size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white hover:text-cyan-300 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-300 mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {cert.credentialUrl && cert.credentialUrl !== '#' && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-md transition-colors"
                      title="Sertifikayı Görüntüle"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 my-3 pl-11">
                  <Calendar size={13} className="text-slate-500" />
                  <span>Veriliş Tarihi: {cert.date}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80 mt-2">
                {cert.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
