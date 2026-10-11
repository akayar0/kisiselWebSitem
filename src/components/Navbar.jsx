import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Github, Linkedin, Instagram, Sparkles, Sun, Moon, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { XIcon } from './icons/XIcon';
import { SpotifyIcon } from './icons/SpotifyIcon';

export const Navbar = ({ personal, isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const [isModalRendered, setIsModalRendered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSection, setActiveSection] = useState('#about');
  const [hoveredHref, setHoveredHref] = useState(null);

  const navContainerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

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

  // Scroll spy & header shadow listener
  useEffect(() => {
    const sections = ['about', 'experience', 'projects', 'skills', 'certificates', 'goals', 'interests'];
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(`#${sections[i]}`);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sliding active/hover underline indicator calculations
  useEffect(() => {
    const updateIndicator = () => {
      if (!navContainerRef.current) return;
      const targetHref = hoveredHref || activeSection;
      if (!targetHref) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      let targetEl = navContainerRef.current.querySelector(`[data-nav-href="${targetHref}"]`);

      if (!targetEl && (secondaryLinks.some((s) => s.href === targetHref) || targetHref === 'more')) {
        targetEl = navContainerRef.current.querySelector('[data-nav-more="true"]');
      }

      if (targetEl) {
        const containerRect = navContainerRef.current.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();
        const width = Math.max(targetRect.width - 20, 26);
        const left = targetRect.left - containerRect.left + (targetRect.width - width) / 2;

        setIndicatorStyle({
          left,
          width,
          opacity: 1,
        });
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [hoveredHref, activeSection]);

  const handleNavClick = (href) => {
    setActiveSection(href);
  };

  // Smooth modal open and close handlers
  const openContactModal = () => {
    setIsModalRendered(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalVisible(true);
      });
    });
  };

  const closeContactModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setIsModalRendered(false);
    }, 280);
  };

  // Modal ESC key listener and scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalRendered) {
        closeContactModal();
      }
    };
    if (isModalRendered) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalRendered]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      handle: `@${personal.githubUsername || 'akayar0'}`,
      desc: 'Açık kaynak projeler ve depolar',
      url: personal.githubUrl,
      icon: <Github size={20} className="text-slate-800 dark:text-white" />,
      badgeBg: 'bg-slate-100 dark:bg-slate-800',
      hoverBorder: 'hover:border-slate-400 dark:hover:border-slate-600',
    },
    {
      name: 'LinkedIn',
      handle: personal.name,
      desc: 'Profesyonel profil ve bağlantılar',
      url: personal.linkedinUrl,
      icon: <Linkedin size={20} className="text-[#0a66c2]" />,
      badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
      hoverBorder: 'hover:border-blue-400/60',
    },
    ...(personal.instagramUrl ? [{
      name: 'Instagram',
      handle: '@akayarr_',
      desc: 'Kişisel paylaşımlar & güncellemeler',
      url: personal.instagramUrl,
      icon: <Instagram size={20} className="text-[#E4405F]" />,
      badgeBg: 'bg-rose-50 dark:bg-rose-950/60',
      hoverBorder: 'hover:border-rose-400/60',
    }] : []),
    ...(personal.xUrl ? [{
      name: 'X (Twitter)',
      handle: '@akayar_0',
      desc: 'Teknoloji & yapay zeka paylaşımları',
      url: personal.xUrl,
      icon: <XIcon size={18} className="text-slate-800 dark:text-white" />,
      badgeBg: 'bg-slate-100 dark:bg-slate-800',
      hoverBorder: 'hover:border-slate-400 dark:hover:border-slate-600',
    }] : []),
    ...(personal.spotifyUrl ? [{
      name: 'Spotify',
      handle: 'Spotify Profili',
      desc: 'Müzik listeleri & dinleme zevki',
      url: personal.spotifyUrl,
      icon: <SpotifyIcon size={20} className="text-[#1DB954]" />,
      badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      hoverBorder: 'hover:border-emerald-400/60',
    }] : []),
  ];

  return (
    <>
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
                    <span className="logo-badge-a drop-shadow-sm font-black" style={{ color: '#ffffff' }}>A</span>
                    <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.35)] font-black">K</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-base tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1 h-6 select-none">
                  {prefix.slice(0, Math.min(typedLength, prefix.length))}
                  {typedLength > prefix.length && (
                    <span
                      className="text-cyan-600 dark:text-cyan-400 font-bold"
                      style={{ color: isDark ? '#22d3ee' : '#0891b2' }}
                    >
                      {suffix.slice(0, typedLength - prefix.length)}
                    </span>
                  )}
                  <span
                    className="inline-block w-1.5 h-3.5 bg-cyan-600 dark:bg-cyan-400 animate-pulse"
                    style={{ backgroundColor: isDark ? '#22d3ee' : '#0891b2' }}
                  ></span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-mono tracking-wider font-semibold">AI & WEB</span>
              </div>
            </a>

            {/* Desktop Navigation with Sliding Animated Underline */}
            <nav
              ref={navContainerRef}
              onMouseLeave={() => setHoveredHref(null)}
              className="hidden md:flex items-center gap-1 relative"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                const isHovered = hoveredHref === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    data-nav-href={link.href}
                    onMouseEnter={() => setHoveredHref(link.href)}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-3.5 py-1.5 text-sm transition-colors duration-200 flex items-center justify-center ${
                      isActive || isHovered
                        ? 'nav-link-active text-cyan-600 dark:text-cyan-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400'
                    }`}
                  >
                    <span>{link.name}</span>
                  </a>
                );
              })}

              {/* Smart Dropdown for secondary links */}
              <div className="relative">
                {(() => {
                  const isSecondaryActive = secondaryLinks.some((sub) => sub.href === activeSection);
                  const isSecondaryHovered = secondaryLinks.some((sub) => sub.href === hoveredHref) || hoveredHref === 'more';
                  return (
                    <button
                      data-nav-more="true"
                      onMouseEnter={() => setHoveredHref('more')}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                      className={`relative flex items-center gap-1 px-3.5 py-1.5 text-sm transition-colors duration-200 cursor-pointer ${
                        isSecondaryActive || isSecondaryHovered
                          ? 'nav-link-active text-cyan-600 dark:text-cyan-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 font-medium hover:text-cyan-600 dark:hover:text-cyan-400'
                      }`}
                    >
                      <span>Daha Fazla</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                  );
                })()}

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                    {secondaryLinks.map((subLink) => {
                      const isSubActive = activeSection === subLink.href;
                      return (
                        <a
                          key={subLink.name}
                          href={subLink.href}
                          onClick={() => {
                            handleNavClick(subLink.href);
                            setDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                            isSubActive
                              ? 'text-cyan-600 dark:text-cyan-300 font-semibold bg-cyan-500/10'
                              : 'text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-800/70'
                          }`}
                        >
                          <span>{subLink.name}</span>
                          {isSubActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                          )}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Animated Sliding Underline Bar */}
              <span
                className="absolute -bottom-1 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] pointer-events-none transition-all duration-300 ease-out"
                style={{
                  transform: `translateX(${indicatorStyle.left}px)`,
                  width: `${indicatorStyle.width}px`,
                  opacity: indicatorStyle.opacity,
                }}
              />
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label={isDark ? 'Aydınlık temaya geç' : 'Karanlık temaya geç'}
                title={isDark ? 'Aydınlık mod' : 'Karanlık mod'}
                className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  isDark
                    ? 'border-slate-800 hover:border-slate-700 bg-amber-400/10 text-amber-400 hover:text-amber-300'
                    : 'border-slate-200 hover:border-indigo-300 bg-indigo-50/70 text-indigo-600 shadow-sm'
                }`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Contact & Socials Modal Trigger Button */}
              <button
                onClick={openContactModal}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles size={14} />
                <span>İletişime Geç</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
              aria-label="Menüyü Aç"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 px-3 pt-1">
              Navigasyon
            </div>
            {[...navLinks, ...secondaryLinks].map((link) => {
              const isMobileActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    handleNavClick(link.href);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-base transition-colors ${
                    isMobileActive
                      ? 'text-cyan-600 dark:text-cyan-400 font-semibold bg-cyan-500/10'
                      : 'text-slate-700 dark:text-slate-200 font-medium hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <span>{link.name}</span>
                  {isMobileActive && (
                    <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                  )}
                </a>
              );
            })}

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-2">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label={isDark ? 'Aydınlık temaya geç' : 'Karanlık temaya geç'}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDark
                    ? 'bg-slate-800 text-amber-400'
                    : 'bg-indigo-50 text-indigo-600 border border-slate-200'
                }`}
              >
                {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-indigo-600" />}
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  openContactModal();
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles size={13} />
                <span>İletişime Geç</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Transparent Frosted Glass Contact & Social Media Modal with Smooth Animations */}
      {isModalRendered && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ease-out ${
            isModalVisible
              ? 'bg-slate-950/55 dark:bg-black/80 backdrop-blur-md opacity-100'
              : 'bg-transparent backdrop-blur-none opacity-0 pointer-events-none'
          }`}
          onClick={closeContactModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-2xl border border-white/60 dark:border-cyan-500/30 shadow-2xl shadow-cyan-500/10 text-slate-900 dark:text-slate-100 overflow-hidden transform transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) ${
              isModalVisible
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-3'
            }`}
          >
            {/* Ambient background glows */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/20 dark:bg-cyan-500/25 rounded-full blur-3xl pointer-events-none transition-opacity duration-500" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-500/20 dark:bg-blue-600/25 rounded-full blur-3xl pointer-events-none transition-opacity duration-500" />

            {/* Modal Header */}
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-2">
                  <Sparkles size={12} />
                  <span>Bağlantı & İletişim</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  İletişime Geç
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Sosyal medya hesaplarımdan bana ulaşabilir veya doğrudan e-posta gönderebilirsiniz.
                </p>
              </div>
              <button
                onClick={closeContactModal}
                aria-label="Kapat"
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Email Quick Action Card */}
            <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800/80 mb-5 relative z-10 shadow-sm">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
                <span>Doğrudan E-posta</span>
                <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">Hızlı Yanıt</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-semibold truncate text-slate-800 dark:text-slate-200">
                    {personal.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 transition-all shadow-sm cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={14} className="text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Kopyalandı!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Kopyala</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:${personal.email}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-sm"
                  >
                    <Mail size={14} />
                    <span>Gönder</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-lg hover:shadow-cyan-500/5 transition-all flex items-center justify-between ${social.hoverBorder}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm ${social.badgeBg}`}>
                      {social.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                        <span>{social.name}</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                        {social.handle}
                      </div>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-400 group-hover:text-cyan-500 transition-colors flex-shrink-0 ml-2" />
                </a>
              ))}
            </div>

            {/* Modal Bottom Info */}
            <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800/60 text-center text-xs font-mono text-slate-500 dark:text-slate-400 relative z-10 flex items-center justify-between">
              <span>📍 {personal.location}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">● İletişime Açık</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
