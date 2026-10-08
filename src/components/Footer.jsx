import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUp } from 'lucide-react';

export const Footer = ({ personal }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#070a10] border-t border-slate-800 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact CTA Banner */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 mb-16 border border-slate-800/80 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-800/50 text-xs font-mono mb-4">
            İletişim & Fırsatlar
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Geleceği Birlikte İnşa Edelim
          </h2>

          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base mb-8">
            İster staj veya tam zamanlı iş fırsatları, ister yapay zeka projeleri veya sadece teknoloji üzerine sohbet etmek için bana dilediğiniz zaman ulaşabilirsiniz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Mail size={16} />
              <span>E-posta Gönder</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-medium transition-all"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>E-postayı Kopyala</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Bottom Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-800/60 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-5 h-5 rounded-md p-[1px] bg-gradient-to-tr from-cyan-500 to-blue-600 flex-shrink-0">
              <div className="w-full h-full bg-[#0b0f17] rounded-[4px] flex items-center justify-center">
                <span className="font-display font-black text-[10px] tracking-tighter leading-none select-none flex items-center">
                  <span className="text-white">A</span><span className="text-cyan-400">K</span>
                </span>
              </div>
            </div>
            <span>{personal.name} • {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              <span>Yukarı Çık</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
