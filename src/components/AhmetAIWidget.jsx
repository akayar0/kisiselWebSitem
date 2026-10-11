import React, { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, Send, X, Trash2, ArrowRight, CornerDownLeft, MessageSquare, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { askAhmetAI } from '../services/ahmetAiEngine';

const QUICK_PROMPTS = [
  { label: '🎙️ ESP32 Asistanı', prompt: 'ESP32 sesli asistan projesi nasıl çalışıyor?' },
  { label: '💼 ThinkBro Stajı', prompt: 'ThinkBro stajında neler yaptın?' },
  { label: '⚡ Yetkinlikler & Diller', prompt: 'Hangi programlama dillerini ve yapay zeka araçlarını biliyorsun?' },
  { label: '📄 CV İndir', prompt: 'Ahmet\'in CV\'sini nereden indirebilirim?' },
  { label: '📬 İletişim', prompt: 'Ahmet ile nasıl iletişime geçebilirim?' },
  { label: '🚀 Fırsat Durumu', prompt: 'Şu an iş veya staj fırsatlarına açık mı?' },
];

export const AhmetAIWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: '👋 Merhaba! Ben **AhmetAI**, Ahmet\'in portfolyosu için geliştirdiğim yapay zeka dijital ikiziyim.\n\nProjelerim (ESP32, RAG, Assembly), stajım, yetkinliklerim veya kariyer hedeflerim hakkında bana dilediğini sorabilirsin!',
      time: 'Şimdi'
    }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chipsContainerRef = useRef(null);

  // Scroll chips horizontally via buttons
  const scrollChips = (direction) => {
    if (chipsContainerRef.current) {
      chipsContainerRef.current.scrollBy({
        left: direction === 'left' ? -180 : 180,
        behavior: 'smooth'
      });
    }
  };

  // Scroll chips horizontally via mouse wheel
  const handleChipsWheel = (e) => {
    if (chipsContainerRef.current && e.deltaY !== 0) {
      chipsContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleOpenEvent = (e) => {
      setIsOpen(true);
      setShowWelcomeBubble(false);
      if (e.detail?.prompt) {
        handleSendMessage(e.detail.prompt);
      }
    };
    window.addEventListener('open-ahmet-ai', handleOpenEvent);
    return () => window.removeEventListener('open-ahmet-ai', handleOpenEvent);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // focus input when opened
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  // Handle sending a message
  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

    setInputMessage('');
    setShowWelcomeBubble(false);

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Small natural thinking delay (350ms - 600ms) for realistic feel
      const [aiResponse] = await Promise.all([
        askAhmetAI(query),
        new Promise((resolve) => setTimeout(resolve, 450))
      ]);

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AhmetAI Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Üzgünüm, yanıt oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: 'Sohbet geçmişi temizlendi. Ahmet hakkında sormak istediğin yeni bir konuyu yazabilirsin!',
        time: 'Şimdi'
      }
    ]);
  };

  // Simple rich text renderer (supports **bold**, bullets, line breaks, [links](url))
  const renderFormattedText = (content) => {
    return content.split('\n').map((line, lIdx) => {
      // Check for bullet line
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
      const cleanLine = isBullet ? line.trim().substring(1).trim() : line;

      // Regex replace for links and bold
      const parts = [];
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(cleanLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(cleanLine.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={match.index}
            href={match[2]}
            target={match[2].startsWith('http') ? '_blank' : '_self'}
            rel="noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline font-semibold inline-flex items-center gap-0.5 mx-1"
          >
            {match[1]}
            {match[2].startsWith('http') && <ExternalLink size={12} className="inline ml-0.5" />}
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < cleanLine.length) {
        parts.push(cleanLine.substring(lastIndex));
      }

      // Process bold in string elements
      const parsedElements = parts.map((part, pIdx) => {
        if (typeof part !== 'string') return part;
        const boldSplit = part.split(/\*\*(.*?)\*\*/g);
        return boldSplit.map((token, bIdx) =>
          bIdx % 2 === 1 ? <strong key={`${pIdx}-${bIdx}`} className="font-semibold text-slate-100 dark:text-white">{token}</strong> : token
        );
      });

      return (
        <div key={lIdx} className={`${line.trim() === '' ? 'h-2' : ''} ${isBullet ? 'flex items-start gap-1.5 pl-1.5 my-1' : 'my-0.5'}`}>
          {isBullet && <span className="text-cyan-400 font-bold">•</span>}
          <span>{parsedElements}</span>
        </div>
      );
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* 1. Floating Welcome Tip Bubble (Shown before user opens) */}
      {!isOpen && showWelcomeBubble && (
        <div className="absolute bottom-16 right-0 mb-2 w-72 p-3.5 rounded-2xl bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 shadow-2xl text-slate-200 text-xs animate-bounce-subtle flex items-start gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shrink-0 shadow-md shadow-cyan-500/30">
            <Sparkles size={16} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-400 text-[11px] uppercase tracking-wider">AhmetAI Asistan</span>
              <button
                onClick={() => setShowWelcomeBubble(false)}
                className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
                title="Kapat"
              >
                <X size={13} />
              </button>
            </div>
            <p className="mt-1 text-slate-300 leading-relaxed">
              Ahmet'in yapay zeka projelerini, stajını veya yeteneklerini bana sorabilirsin!
            </p>
            <button
              onClick={() => {
                setShowWelcomeBubble(false);
                setIsOpen(true);
              }}
              className="mt-2 text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 group text-xs"
            >
              <span>Sohbeti Başlat</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating Action Button (FAB) */}
      {!isOpen && (
        <button
          onClick={() => {
            setShowWelcomeBubble(false);
            setIsOpen(true);
          }}
          className="relative group p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 border border-cyan-400/40"
          aria-label="AhmetAI Asistanını Aç"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
          </span>

          <Bot size={22} className="animate-pulse" />
          <span className="font-bold text-sm hidden sm:inline tracking-wide">AhmetAI</span>
        </button>
      )}

      {/* 3. Interactive Chat Window Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] max-w-[440px] h-[580px] max-h-[85vh] flex flex-col rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden animate-scale-up">
          
          {/* Chat Window Header */}
          <div className="px-4 py-3 bg-[#111827] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30">
                <Bot size={18} />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                    AhmetAI
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                      RAG v1.0
                    </span>
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Dijital İkiz & Portfolyo Rehberi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleClearChat}
                className="p-1.5 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Sohbeti Temizle"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Kapat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Feed Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm custom-scrollbar bg-gradient-to-b from-slate-950/80 to-slate-900/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Sparkles size={13} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <div className="break-words">
                    {msg.sender === 'ai' ? renderFormattedText(msg.text) : msg.text}
                  </div>
                  <div
                    className={`text-[10px] mt-1.5 text-right ${
                      msg.sender === 'user' ? 'text-cyan-200/70' : 'text-slate-500'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80 flex items-center justify-center shrink-0">
                  <Bot size={13} className="animate-spin" />
                </div>
                <div className="p-3 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px] text-slate-400 ml-1.5">AhmetAI yanıt yazıyor...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips with Left/Right Scroll Controls */}
          <div className="px-2.5 py-2 bg-[#0d131f] border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              {/* Left Scroll Button */}
              <button
                type="button"
                onClick={() => scrollChips('left')}
                className="p-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 shrink-0 transition-colors shadow-sm cursor-pointer"
                title="Sola kaydır"
                aria-label="Önceki sorular"
              >
                <ChevronLeft size={14} />
              </button>

              {/* Scrollable Chips Container */}
              <div
                ref={chipsContainerRef}
                onWheel={handleChipsWheel}
                className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 px-0.5 custom-scrollbar scroll-smooth flex-1 select-none"
              >
                {QUICK_PROMPTS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(item.prompt)}
                    disabled={isTyping}
                    className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-700/60 text-[11px] whitespace-nowrap transition-all shrink-0 disabled:opacity-50 cursor-pointer shadow-sm active:scale-95"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Right Scroll Button */}
              <button
                type="button"
                onClick={() => scrollChips('right')}
                className="p-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 shrink-0 transition-colors shadow-sm cursor-pointer"
                title="Sağa kaydır"
                aria-label="Sonraki sorular"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#111827] border-t border-slate-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ahmet hakkında bir soru sor..."
              disabled={isTyping}
              className="flex-1 bg-slate-900 border border-slate-700/80 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-500/20"
              aria-label="Gönder"
            >
              <Send size={15} />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
