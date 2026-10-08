import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Github, Linkedin, Instagram, Sparkles, Terminal } from 'lucide-react';
import { XIcon } from './icons/XIcon';

export const Navbar = ({ personal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [typedLength, setTypedLength] = useState(0);

  const prefix = "ahmet.";
  const suffix = "kayar";
  const totalLength = prefix.length + suffix.length;

  useEffect(() => {
    let intervalId;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setTypedLength((prev) => {
          if (prev < totalLength) {
            return prev + 1;
          }
          clearInterval(intervalId);
          return prev;
        });
      }, 85);
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [totalLength]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Hakkımda', href: '#about' },
    { name: 'Deneyimler', href: '#experience' },
    { name: 'Projeler', href: '#projects' },
    { name: 'Yetkinlikler', href: '#skills' },
  ];

  const secondaryLinks = [
    { name: 'Sertifikalar', href: '#certificates' },
    { name: 'Hedefler & Vizyon', href: '#goals' },
    { name: 'Hobiler & İlgi Alanları', href: '#interests' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-lg shadow-black/40' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand (Dev & AI vibe) */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl p-[1.5px] bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20 group-hover:scale-105 group-hover:shadow-cyan-500/30 transition-all flex-shrink-0">
              <div className="w-full h-full bg-[#0b0f17] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-[16px] tracking-tighter leading-none select-none flex items-center">
                  <span className="text-white drop-shadow-sm">A</span>
                  <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.35)]">K</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-base tracking-tight text-slate-100 flex items-center gap-1 h-6 select-none">
                {prefix.slice(0, Math.min(typedLength, prefix.length))}
                {typedLength > prefix.length && (
                  <span className="text-cyan-400">
                    {suffix.slice(0, typedLength - prefix.length)}
                  </span>
                )}
                <span className="inline-block w-1.5 h-3.5 bg-cyan-400 animate-pulse"></span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 font-mono tracking-wider">AI & WEB</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 rounded-md transition-all"
              >
                {link.name}
              </a>
            ))}

            {/* Smart Dropdown for secondary links to avoid clutter */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 rounded-md transition-all"
              >
                <span>Daha Fazla</span>
                <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#161b22] border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  {secondaryLinks.map((subLink) => (
                    <a
                      key={subLink.name}
                      href={subLink.href}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-300 hover:text-cyan-300 hover:bg-slate-800/70 transition-colors"
                    >
                      {subLink.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons (GitHub & LinkedIn & CTA) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profili"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors border border-transparent hover:border-slate-700"
            >
              <Github size={19} />
            </a>
            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profili"
              className="p-2 text-slate-400 hover:text-[#0a66c2] hover:bg-slate-800/80 rounded-lg transition-colors border border-transparent hover:border-slate-700"
            >
              <Linkedin size={19} />
            </a>
            {personal.instagramUrl && (
              <a
                href={personal.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profili"
                className="p-2 text-slate-400 hover:text-[#E4405F] hover:bg-slate-800/80 rounded-lg transition-colors border border-transparent hover:border-slate-700"
              >
                <Instagram size={19} />
              </a>
            )}
            {personal.xUrl && (
              <a
                href={personal.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) Profili"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors border border-transparent hover:border-slate-700"
              >
                <XIcon size={18} />
              </a>
            )}

            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 hover:opacity-95 hover:shadow-cyan-500/30 transition-all"
            >
              <Sparkles size={13} />
              <span>İletişime Geç</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
            aria-label="Menüyü Aç"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0d1117]/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 px-3 pt-1">
            Navigasyon
          </div>
          {[...navLinks, ...secondaryLinks].map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800/70 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-300 hover:text-white bg-slate-800/80 rounded-lg"
                aria-label="GitHub Profili"
              >
                <Github size={18} />
              </a>
              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-300 hover:text-[#0a66c2] bg-slate-800/80 rounded-lg"
                aria-label="LinkedIn Profili"
              >
                <Linkedin size={18} />
              </a>
              {personal.instagramUrl && (
                <a
                  href={personal.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-300 hover:text-[#E4405F] bg-slate-800/80 rounded-lg"
                  aria-label="Instagram Profili"
                >
                  <Instagram size={18} />
                </a>
              )}
              {personal.xUrl && (
                <a
                  href={personal.xUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-300 hover:text-white bg-slate-800/80 rounded-lg"
                  aria-label="X (Twitter) Profili"
                >
                  <XIcon size={17} />
                </a>
              )}
            </div>
            <a
              href={`mailto:${personal.email}`}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-500 text-slate-950 font-bold"
            >
              İletişime Geç
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
