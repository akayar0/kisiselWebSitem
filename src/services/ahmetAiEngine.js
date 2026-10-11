import { portfolioData } from '../data/portfolioData';

/**
 * AhmetAI Engine - Hybrid RAG & Knowledge Retrieval System
 * 
 * Works 100% offline & client-side out of the box with zero dependencies or API keys.
 * If VITE_GROQ_API_KEY or VITE_GEMINI_API_KEY is defined in .env, it can also call
 * real LLMs with Ahmet's system prompt context!
 */

// Turkish text normalization for high accuracy fuzzy matching
function normalizeText(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ');
}

// Ahmet's comprehensive structured knowledge base
const KNOWLEDGE_BASE = [
  {
    id: 'greeting',
    keywords: ['merhaba', 'selam', 'gunaydin', 'iyi gunler', 'naber', 'nasilsin', 'hey', 'hello', 'hi'],
    answer: () => `👋 Merhaba! Ben **AhmetAI**, Ahmet Kayar'ın portfolyosu için özel geliştirilmiş yapay zeka asistanıyım.\n\nAhmet'in **yapay zeka projeleri**, **ThinkBro staj deneyimi**, **teknik yetenekleri (Python, React, RAG)**, **eğitim geçmişi** veya **iletişim bilgileri** hakkında aklına takılan her şeyi bana sorabilirsin!`
  },
  {
    id: 'who_is_ahmet',
    keywords: ['ahmet kimdir', 'ahmet kim', 'kendinden bahset', 'biyografi', 'kimsin', 'hakkinda', 'ozet', 'nereli', 'yas'],
    answer: () => `🎓 **Ahmet Kayar Kimdir?**\n\n` +
      `• **Rolü:** Bilgisayar Mühendisliği Son Sınıf Öğrencisi (İskenderun Teknik Üniversitesi)\n` +
      `• **Odak Alanı:** Üretken Yapay Zeka (LLM & RAG), Gömülü Sistemler ve Full-Stack Geliştirme\n` +
      `• **AGNO / GPA:** 3.15 / 4.00\n` +
      `• **Hikayesi:** 2003 Mardin doğumlu, Malatya'da büyüdü. 2023 depremlerinin ardından pes etmeyip Bilgisayar Mühendisliğini kazandı.\n` +
      `• **Tutkusu:** Donanım (ESP32) ile yapay zekayı buluşturan fiziksel cihazlar ve modern web uygulamaları geliştirmek.`
  },
  {
    id: 'internship_thinkbro',
    keywords: [
      'staj', 'thinkbro', 'is deneyimi', 'deneyim', 'stajyer', 'stajda ne yapti',
      'rag asistani', 'sirket', 'nerede calisti', 'calisma gecmisi'
    ],
    answer: () => `💼 **ThinkBro Yapay Zeka Staj Deneyimi (Haziran - Ağustos 2026):**\n\n` +
      `Ahmet, ThinkBro bünyesinde **MEB müfredatına dayalı, RAG destekli sesli yapay zeka asistanı** geliştirdi:\n\n` +
      `1. **Gömülü & Donanım:** ESP32 tabanlı fiziksel cihaz tasarımı (C++), I2S ses çıkışı, mikrofon ses kaydı ve OLED ekranda animasyonlu mimik/yüz arayüzü.\n` +
      `2. **Gerçek Zamanlı İletişim:** Node.js backend ile WebSocket üzerinden ses ve metin akışı.\n` +
      `3. **RAG & LLM Pipeline:** ChromaDB vektör veritabanı, Groq API (Whisper STT ile Türkçe ses tanıma + Llama 3.3 LLM).\n` +
      `4. **Yönetim Paneli:** Öğretmen ve veliler için sohbet geçmişini MongoDB'de tutan web tabanlı Dashboard.`
  },
  {
    id: 'project_esp32',
    keywords: [
      'esp32', 'sesli asistan', 'rag asistani', 'donanim projesi', 'fiziksel',
      'chromadb', 'groq', 'llama', 'whisper', 'oled', 'sesli ai'
    ],
    answer: () => `🎙️ **ESP32-S3 RAG Destekli Sesli Yapay Zeka Asistanı:**\n\n` +
      `Bu proje, MEB müfredatındaki ders kitaplarını vektör veritabanına alarak öğrencilere sesli yanıt veren fiziksel bir yapay zeka cihazıdır.\n\n` +
      `• **Donanım:** ESP32-S3 mikrokontrolcü, I2S mikrofon ve hoparlör modülü, OLED ekran.\n` +
      `• **Yazılım:** C++ (ESP-IDF / Arduino), Node.js, WebSocket.\n` +
      `• **Yapay Zeka:** Groq API (Llama 3.3 70B & Whisper STT), ChromaDB vektör araması, Google TTS.\n` +
      `• **Repo:** [GitHub'da İncele](https://github.com/akayar0/esp32-s3-rag-voice-assistant)`
  },
  {
    id: 'project_assembly_bus',
    keywords: [
      'otobus', 'yolcu sayaci', 'assembly', 'pic', 'pic16f628a', 'proteus',
      '7 segment', 'gomulu sistem', 'mikrodenetleyici'
    ],
    answer: () => `🚌 **Belediye Otobüsü Yolcu Takip Sistemi:**\n\n` +
      `Belediye otobüslerinde yolcu doluluk oranını izlemek ve kapasite kontrolü sağlamak amacıyla geliştirilmiş gömülü bir projedir.\n\n` +
      `• **Dil & Donanım:** Saf Assembly dili, PIC16F628A mikrodenetleyicisi.\n` +
      `• **Simülasyon:** Proteus Design Suite & MPASM.\n` +
      `• **Özellik:** Butonlar ile biniş-iniş sayımı ve 7-segment display üzerinden anlık gösterim.\n` +
      `• **Repo:** [GitHub'da İncele](https://github.com/akayar0/pic16f628a-bus-passenger-counter)`
  },
  {
    id: 'project_bucheen',
    keywords: ['bucheen', 'react projesi', 'frontend projesi', 'tailwind projesi', 'dating', 'arayuz'],
    answer: () => `💻 **Bucheen - Modern Web Sitesi:**\n\n` +
      `Kullanıcıların potansiyel eşleşmelerini keşfetmelerine olanak tanıyan modern ve şık bir arayüz projesi.\n\n` +
      `• **Teknolojiler:** React.js, Vite, Tailwind CSS, Component Architecture, Vercel.\n` +
      `• **Öne Çıkan:** Yüksek responsive uyumluluk ve modern UI/UX prensipleri.\n` +
      `• **Repo:** [GitHub'da İncele](https://github.com/akayar0/Bucheen)`
  },
  {
    id: 'project_sql',
    keywords: ['sql', 'veritabani', 'database', 'mysql', 'postgresql', 'normalizasyon', 'sorgu'],
    answer: () => `🗄️ **SQL Tasarım ve Analiz Portfolyosu:**\n\n` +
      `Ahmet'in ilişkisel veritabanı mimarisi, normalizasyon ve yüksek performanslı SQL sorgu optimizasyonlarını içeren kapsamlı çalışmasıdır.\n\n` +
      `• **Odak:** Veri bütünlüğü, indeksleme, karmaşık JOIN ve AGGREGATE optimizasyonları.\n` +
      `• **Repo:** [GitHub'da İncele](https://github.com/akayar0/SQL-Analysis-and-Design)`
  },
  {
    id: 'skills_tech',
    keywords: [
      'yetenek', 'yetkinlik', 'teknoloji', 'hangi dilleri biliyor', 'diller',
      'python', 'react', 'javascript', 'docker', 'java', 'c', 'fastapi', 'bilgi'
    ],
    answer: () => `⚡ **Ahmet'in Teknik Yetenek Ağacı:**\n\n` +
      `• **Yapay Zeka & ML:** RAG Mimarileri, Vector DBs (ChromaDB, FAISS), LLMOps, Doğal Dil İşleme (NLP), Groq, Gemini & OpenAI API'ları.\n` +
      `• **Programlama Dilleri:** Python (İyi), C (Orta), JavaScript/TypeScript (İyi), SQL (İyi), Java (İyi), Assembly.\n` +
      `• **Web & Backend:** React, Next.js, Tailwind CSS, FastAPI, Flask, Node.js, Express, Django.\n` +
      `• **Araçlar & DevOps:** Git, GitHub CI/CD, Docker, VS Code, Cursor, JetBrains, Linux.`
  },
  {
    id: 'education',
    keywords: ['egitim', 'universite', 'okul', 'bolum', 'not ortalamasi', 'gpa', 'agno', 'iskenderun', 'iste'],
    answer: () => `🎓 **Eğitim Bilgileri:**\n\n` +
      `• **Üniversite:** İskenderun Teknik Üniversitesi (İSTE)\n` +
      `• **Bölüm:** Bilgisayar Mühendisliği (Lisans)\n` +
      `• **Dönem:** Son Sınıf (4. Sınıf)\n` +
      `• **AGNO / GPA:** 3.15 / 4.00\n` +
      `• **Mezuniyet Hedefi:** 2026/2027`
  },
  {
    id: 'contact_info',
    keywords: ['iletisim', 'email', 'e posta', 'telefon', 'nasil ulasirim', 'mesaj', 'linkedin', 'github', 'sosyal medya', 'spotify'],
    answer: () => `📬 **Ahmet'e Nasıl Ulaşabilirsin?**\n\n` +
      `• ✉️ **E-posta:** [a.ahmetkayar.0@gmail.com](mailto:a.ahmetkayar.0@gmail.com)\n` +
      `• 💼 **LinkedIn:** [linkedin.com/in/ahmet-kayar](https://www.linkedin.com/in/ahmet-kayar-77a308290/)\n` +
      `• 🐙 **GitHub:** [github.com/akayar0](https://github.com/akayar0)\n` +
      `• 🎧 **Spotify:** [Ahmet'in Spotify Profili](https://open.spotify.com/user/31wbkywm7snicje36327fcndejfe?si=12f308d856154eee)\n` +
      `• 📍 **Konum:** Mardin / Hatay, Türkiye`
  },
  {
    id: 'spotify_music',
    keywords: ['spotify', 'muzik', 'sarki', 'calma listesi', 'playlist', 'ne dinler'],
    answer: () => `🎧 **Ahmet'in Müzik Dünyası (Spotify):**\n\n` +
      `Ahmet kod yazarken ve odaklanırken müzik dinlemeyi çok sever. Spotify profilini ve herkese açık çalma listelerini buradan inceleyebilirsin:\n\n` +
      `👉 [Ahmet'in Spotify Profilini Aç](https://open.spotify.com/user/31wbkywm7snicje36327fcndejfe?si=12f308d856154eee)`
  },
  {
    id: 'cv_resume',
    keywords: ['cv', 'ozgecmis', 'resume', 'cv indir', 'pdf', 'belge'],
    answer: () => `📄 **Ahmet'in Özgeçmişi (CV):**\n\n` +
      `Ahmet'in güncel, detaylı Türkçe/İngilizce CV'sini doğrudan inceleyebilir veya indirebilirsin:\n\n` +
      `👉 [CV'yi İndir (PDF)](/cv/Ahmet_Kayar_CV.pdf)`
  },
  {
    id: 'job_opportunities',
    keywords: ['ise alim', 'is ariyor mu', 'staj ariyor mu', 'open to work', 'calisabilir mi', 'remote', 'hibrit', 'is teklifi'],
    answer: () => `🚀 **Kariyer ve Fırsat Durumu:**\n\n` +
      `Evet! Ahmet şu anda aktif olarak **İş & Staj Fırsatlarına Açık (Open to Work)** durumdadır.\n\n` +
      `• **Çalışma Modelleri:** Hibrit, Uzaktan (Remote) veya Ofis içi pozisyonlara uygun.\n` +
      `• **İlgi Duyduğu Pozisyonlar:** AI/ML Engineer, LLM & RAG Geliştirici, Full-Stack Web Developer, Junior Software Engineer.\n` +
      `• Kendisiyle görüşmek için [a.ahmetkayar.0@gmail.com](mailto:a.ahmetkayar.0@gmail.com) adresinden iletişime geçebilirsiniz.`
  },
  {
    id: 'certificates',
    keywords: ['sertifika', 'sertifikalar', 'basarilar', 'kurs', 'ibm', 'kodluyoruz', 'otomotiv', 'bilgeis'],
    answer: () => `🏆 **Sertifikalar & Başarılar:**\n\n` +
      `1. **IBM ile Kodluyoruz: AI4Future - İleri Seviye** (Haziran 2026) - Yapay Zeka, Generative AI, Cloud\n` +
      `2. **Otomotiv Yaz Kampı (OSD)** (Temmuz 2026) - Otomotiv Sanayii Derneği\n` +
      `3. **İnovasyon Sertifikası (Bilgeİş)** (Ocak 2026)\n` +
      `4. **Teknopark Ekosistemi ve Girişimcilik (Teknoloji Kışlası)** (Aralık 2025)`
  },
  {
    id: 'goals_interests',
    keywords: ['hedef', 'hedefleri', 'vizyon', 'hobi', 'ilgi alanlari', 'ne yapmayi sever', 'gelecek plani'],
    answer: () => `🎯 **Hedefler & İlgi Alanları:**\n\n` +
      `• **Kısa Vadeli Hedefler:** Full-stack ve LLM alanında derinleşmek, açık kaynaklı RAG araçlarına (LangChain, vLLM vb.) pull request katkıları sunmak.\n` +
      `• **Hobiler:** Strateji oyunları, spor yapmak, müzik dinlemek ve yeni yapay zeka araçlarını keşfetmek.`
  }
];

/**
 * Intelligent local semantic search engine
 */
export async function askAhmetAI(userPrompt) {
  const normalized = normalizeText(userPrompt);

  if (!normalized || normalized.length < 2) {
    return "Lütfen Ahmet hakkında sormak istediğin bir konuyu yaz (örneğin: 'ESP32 projesi nasıl çalışıyor?' veya 'Hangi teknolojileri biliyor?').";
  }

  // Check if external LLM API key exists (Optional Hybrid Mode)
  const groqKey = import.meta.env?.VITE_GROQ_API_KEY;
  if (groqKey) {
    try {
      const response = await callGroqAPI(userPrompt, groqKey);
      if (response) return response;
    } catch (err) {
      console.warn('Groq API call fallback to local engine:', err);
    }
  }

  // Local RAG / Intent Matcher
  let bestMatch = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      const normKw = normalizeText(kw);
      if (normalized === normKw) {
        score += 15; // Exact full phrase match
      } else if (normalized.includes(normKw)) {
        score += normKw.split(' ').length * 5; // Phrase containment
      } else {
        // Individual word matches
        const kwWords = normKw.split(' ');
        for (const word of kwWords) {
          if (word.length > 2 && normalized.includes(word)) {
            score += 2;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 2) {
    return bestMatch.answer();
  }

  // Fallback intelligent response with helpful guidance
  return `🤔 Bu soruyu tam olarak eşleştiremedim ama sana Ahmet hakkında şu konularda hemen yardımcı olabilirim:\n\n` +
    `• **Projeler:** ESP32 RAG Sesli Asistanı, PIC16F628A Otobüs Sayacı, Bucheen React Sitesi\n` +
    `• **Deneyim:** ThinkBro Yapay Zeka Stajı (ESP32, ChromaDB, Groq, Llama 3)\n` +
    `• **Yetenekler:** Python, React, RAG & Vector DB, SQL, Docker, C++\n` +
    `• **İletişim & CV:** E-posta, LinkedIn ve PDF CV indirme linki\n\n` +
    `Yukarıdaki hazır hızlı butonlara tıklayabilir veya sorunu farklı bir şekilde sorabilirsin!`;
}

/**
 * Optional Groq LLM API caller
 */
async function callGroqAPI(userPrompt, apiKey) {
  const systemPrompt = `Sen Ahmet Kayar'ın kişisel portfolyo asistanısın (AhmetAI). Ahmet, İskenderun Teknik Üniversitesi Bilgisayar Mühendisliği son sınıf öğrencisidir. 
ThinkBro'da MEB müfredatlı RAG destekli ESP32 sesli asistan geliştirmiştir (Groq, Llama 3.3, Whisper, ChromaDB). 
Full-stack, Python, React, C++, SQL, Docker yetenekleri vardır. GPA: 3.15. 
Kullanıcılara samimi, profesyonel, Türkçe ve net markdown formatında yanıt ver. Bilmediğin konularda uydurma, Ahmet'e e-posta atabileceklerini söyle: a.ahmetkayar.0@gmail.com`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.5,
      max_tokens: 500,
    }),
  });

  if (!res.ok) throw new Error(`Groq HTTP ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content;
}
