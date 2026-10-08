import React from 'react';
import { User, GraduationCap, Award, MapPin, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const About = ({ about, personal }) => {
  const bioContent = about.bioParagraphs || about.biography;
  const avatarImage = about.avatarUrl || personal?.avatarUrl || "/profile.jpg";

  const header   = useScrollReveal();
  const mainCard = useScrollReveal({ delay: 100 });
  const bioCard  = useScrollReveal({ delay: 200 });
  const profileCard = useScrollReveal({ delay: 100 });
  const eduCard  = useScrollReveal({ delay: 250 });

  return (
    <section id="about" className="py-20 bg-[#0d1117] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={header.ref} className={`reveal reveal-up ${header.isVisible ? 'is-visible' : ''}`}>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">
            <User size={16} />
            <span>Profil & Arka Plan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Hakkımda
          </h2>
          <p className="text-slate-400 max-w-2xl text-base mb-12">
            Bilgisayar mühendisliği temelleriyle yapay zekanın dönüştürücü gücünü birleştiren bir yazılımcı bakış açısı.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story & Biography */}
          <div className="lg:col-span-7 space-y-5">
            {/* Main Headline Story */}
            <div ref={mainCard.ref} className={`glass-card p-6 sm:p-8 rounded-2xl space-y-4 reveal reveal-left ${mainCard.isVisible ? 'is-visible' : ''}`}>
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                {about.headline}
              </h3>

              {about.paragraphs.map((para, i) => (
                <p key={i} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {para}
                </p>
              ))}
            </div>

            {/* Autobiography Box */}
            <div ref={bioCard.ref} className={`glass-card p-6 sm:p-8 rounded-2xl space-y-4 reveal reveal-left ${bioCard.isVisible ? 'is-visible' : ''}`}>
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                {about.bioHeadline || "Otobiyografi"}
              </h3>

              {Array.isArray(bioContent) ? (
                bioContent.map((para, i) => (
                  <p key={i} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    {para}
                  </p>
                ))
              ) : bioContent ? (
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {bioContent}
                </p>
              ) : (
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  Buraya kendi otobiyografinizi yazabilirsiniz.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Profil Resmi (Üstte) + Eğitim & Detaylar (Altta) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Profil Resmi Kartı (Üstte) */}
            <div ref={profileCard.ref} className={`glass-card p-6 rounded-2xl border border-slate-800 relative overflow-hidden group reveal reveal-right ${profileCard.isVisible ? 'is-visible' : ''}`}>
              {/* Arka plan ambient ışık */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500"></div>

              {/* Üst Rozet / Başlık */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-300">Geliştirici Profili</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded-full">
                  @{personal?.githubUsername || "akayar0"}
                </span>
              </div>

              {/* Fotoğraf Çerçevesi */}
              <div className="relative mx-auto w-full max-w-[220px] aspect-square rounded-2xl p-1 bg-gradient-to-tr from-cyan-500/40 via-blue-600/20 to-slate-800 shadow-xl shadow-black/60 group-hover:from-cyan-400/60 group-hover:to-blue-500/40 transition-all duration-500">
                <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900 relative">
                  <img
                    src={avatarImage}
                    alt={personal?.name || "Ahmet Kayar Profil Resmi"}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://github.com/akayar0.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                  
                  {/* Fotoğraf köşe rozeti */}
                  <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-cyan-400 shadow-md">
                    <Sparkles size={13} />
                  </div>
                </div>
              </div>

              {/* İsim & Detaylar */}
              <div className="text-center mt-4 space-y-1">
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {personal?.name || "Ahmet Kayar"}
                </h4>
                <p className="text-xs font-mono text-cyan-400">
                  {personal?.role || "Bilgisayar Mühendisliği Son Sınıf"}
                </p>
                <div className="flex items-center justify-center gap-2 pt-1.5 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-slate-500" />
                    {personal?.location || "Mardin, Türkiye"}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">Open to Work</span>
                </div>
              </div>
            </div>

            {/* Eğitim & Detaylar Kartı (Altta) */}
            <div ref={eduCard.ref} className={`glass-card p-6 rounded-2xl border border-slate-800 reveal reveal-right ${eduCard.isVisible ? 'is-visible' : ''}`}>
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">Eğitim & Detaylar</h4>
                  <p className="text-xs text-slate-400">Akademik & Profesyonel Durum</p>
                </div>
              </div>

              <div className="space-y-3.5">
                {about.quickFacts.map((fact, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-slate-800/60 last:border-0 text-sm">
                    <span className="text-slate-400 text-xs font-mono">{fact.label}</span>
                    <span className="text-slate-200 font-medium mt-0.5 sm:mt-0">{fact.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 bg-slate-900/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                  <Award size={14} />
                  <span>Bitirme Tezi:</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  "ESP32-S3 RAG Destekli Sesli Yapay Zeka Asistanı"
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
