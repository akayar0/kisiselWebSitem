// Kişisel Bilgiler ve Portfolyo Verileri
// Buradaki bilgileri kendi deneyimlerinize göre kolayca güncelleyebilirsiniz!

export const portfolioData = {
  personal: {
    name: "Ahmet Kayar",
    role: "Bilgisayar Mühendisliği Son Sınıf Öğrencisi",
    subRole: "AI / ML & Full-Stack Developer",
    statusBadge: "🚀 İş & Staj Fırsatlarına Açık (Open to Work)",
    location: "Mardin, Türkiye",
    email: "a.ahmetkayar.0@gmail.com",
    githubUsername: "akayar0",
    githubUrl: "https://github.com/akayar0",
    linkedinUrl: "https://www.linkedin.com/in/ahmet-kayar-77a308290/",
    instagramUrl: "https://www.instagram.com/akayarr_/",
    xUrl: "https://x.com/akayar_0",
    cvUrl: "/cv/Ahmet_Kayar_CV.pdf", // CV dosyasının linki
    avatarUrl: "/profile.jpg", // Kendi fotoğrafınızı değiştirmek için public/profile.jpg dosyasını değiştirebilirsiniz
    bio: "Bilgisayar Mühendisliği son sınıf öğrencisiyim. Derin öğrenme, LLM & RAG mimarileri ve modern yazılım ekosisteminde ölçeklenebilir uygulamalar geliştirme tutkusuna sahibim.",
    stats: [
      { label: "Tamamlanan Projeler", value: "5+" },
      { label: "GitHub Katkıları", value: "12+" },
      { label: "Sertifikalar & Başarılar", value: "6+" },
      { label: "AGNO / GPA", value: "3.15 / 4" }
    ]
  },

  about: {
    headline: "Mühendislik Vizyonum ve Yapay Zeka Odağım",
    paragraphs: [
      "Bilgisayar mühendisliği altyapısına sahip, Django ile backend geliştiren, Java ile nesne yönelimli programlama ilkelerine bağlı bir yazılımcı adayıyım. HTML, CSS, JavaScript, React ile frontend temellerine ve veritabanı yönetiminde SQL bilgisine sahibim.", 
      "Ekip çalışması kapsamında ESP32 tabanlı, RAG destekli gerçek zamanlı sesli asistan projesini başarıyla hayata geçirdim. İş akışlarımda Gemini, GPT, DeepSeek, Claude, Antigravity ve Replit gibi LLM ve AI araçlarını aktif ve üst düzey verimlilikle kullanıyor; geliştirme süreçlerimi ve projelerimi GitHub üzerinde düzenli olarak yönetiyorum."
    ],
    bioHeadline: "Ben Kimim?",
    bioParagraphs: [
      "Selam, ben Ahmet.",
      "Kendimden biraz bahsedecek olursam; 2003 Mardin doğumluyum. Babam devlet memuru olduğu için ben 4 yaşındayken Mardin'den Malatya'ya taşınmak zorunda kaldık ve zorunlu eğitim hayatımı Malatya'da geçirdim.",
      "2023 Maraş depremleri yüzünden Malatya'dan tekrar Mardin'e taşınmak zorunda kaldık ve hâlâ burada yaşamaktayım.",
      "Deprem senesi üniversite sınavını kazanıp istediğim bölüm olan Bilgisayar Mühendisliğini kazandım. Bu bölümü tercih etme sebeplerimin en başında bilgisayara olan tutkum ve merakım geliyor. Küçükken oyun oynamaktan ziyade hazır web sitelerini kullanarak yeni, farklı ve özgün tasarımlar yapmayı çok severdim. Ayrıca kod yazmaya da merakım vardı.",
      "Kısacası, şu an aktif olarak İskenderun Teknik Üniversitesinde son sınıf öğrencisiyim ve kendimi geliştirmek için çalışmalarıma devam etmekteyim."


    ],
    quickFacts: [
      { label: "Üniversite", value: "İskenderun Teknik Üniversitesi" },
      { label: "Bölüm", value: "Bilgisayar Mühendisliği" },
      { label: "Odak Alanı", value: "Üretken Yapay Zeka & Full-Stack" },
      { label: "Çalışma Şekli", value: "Hibrit / Remote / Ofis" }
    ]
  },

  experiences: [
    {
      id: 1,
      role: "Yapay Zeka & Bilgisayar Mühendisliği Stajyeri",
      company: "ThinkBro Yapay Zeka Bilişim ve Danışmanlık LTD ŞTİ",
      period: "Haziran 2026 - Ağustos 2026",
      type: "Staj (Yaz Dönemi)",
      location: "Hatay/İskenderun (Hibrit)",
      description: "Staj sürecimde, öğrenciler için MEB müfredatına dayalı, RAG destekli sesli yapay zeka asistanı geliştirdim. Fiziksel bir ESP32 tabanlı cihazın donanımını ve gömülü yazılımını (C++) tasarladım; ses kaydı, I2S ses çıkışı ve OLED görsel yüz entegrasyonunu gerçekleştirdim. Backend tarafında Node.js ile WebSocket üzerinden gerçek zamanlı iletişim sağladım; ChromaDB ile vektör veritabanı oluşturup Groq API (Whisper + Llama 3.3) üzerinden Türkçe STT ve LLM akışını yönettim. Ayrıca MongoDB ile sohbet geçmişini kalıcı hale getirip, öğretmen ve velilerin kullanımı için web tabanlı bir Dashboard geliştirdim. Projenin kaynak kodları ve görselleri GitHub sayfamda mevcuttur.",
      skills: ["LLMOps", "Doğal Dil İşleme (NLP)", "Mühendislik Yönetimi", "Docker", "ChromaDB", "Git","Yapay Zeka"]
    },
  ],

  projects: [
    {
      id: 1,
      title: "ESP32-S3 RAG Destekli Sesli Yapay Zeka Asistanı",
      description: "Bu proje, MEB müfredatındaki kitaplardan bilgi alan, RAG destekli, fiziksel bir sesli asistan cihazıdır. ESP32 donanımı üzerinde çalışır, Node.js backend ile WebSocket üzerinden iletişim kurar ve ChromaDB ile vektör tabanlı bilgi çekimi yapar.",
      category: "Yapay Zeka",
      language: "C++",
      languageColor: "#a53592",
      tags: ["ESP32S3", "Groq API", "NodeJS", "ChromaDB", "WebSocket","RAG","LLM","Llama3","GoogleTTS","WhisperSTT","VectorDB","AIAsistan"],
      githubUrl: "https://github.com/akayar0/esp32-s3-rag-voice-assistant"
    },
    {
      id: 2,
      title: "Belediye Otobüsü Yolcu Takip Sistemi",
      description: "Bu proje, bir belediye otobüsündeki anlık yolcu sayısını izlemek ve kapasite kontrolü sağlamak amacıyla geliştirilmiştir. Sistem, butonlar aracılığıyla yolcu giriş-çıkışını simüle eder ve sonucu 7-segment display üzerinde gösterir.",
      category: "Embedded Full-stack",
      language: "Assembly",
      languageColor: "#7c3b1d",
      tags: ["Assembly", "PIC16F628A", "MPASM", "Proteus Design Suite"],
      githubUrl: "https://github.com/akayar0/pic16f628a-bus-passenger-counter"
    },
    {
      id: 3,
      title: "Bucheen - Statik Modern Web Sitesi",
      description: "Bucheen, kullanıcıların potansiyel eşleşmelerini bulmalarına yardımcı olan, modern ve kullanıcı dostu arayüze sahip bir React projesidir. Statik bir tasarımdan modern bileşen mimarisine (Component Architecture) ve Tailwind CSS yapısına dönüştürülmüştür.",
      category: "Front-end",
      language: "React",
      languageColor: "#1a849e",
      tags: ["React.js", "Vite", "Tailwind CSS", "Vercel","UI/UX","Responsive"],
      githubUrl: "https://github.com/akayar0/Bucheen",
      liveUrl: null
    },
    {
      id: 4,
      title: "SQL Tasarım ve Analiz Portfolyosu",
      description: "Bu depo, hazırladığım veritabanı mimarisi ve SQL sorgu optimizasyonu çalışmalarımı içermektedir. Projelerimde veri bütünlüğü, normalizasyon ve yüksek performanslı sorgu yapılarına odaklanıyorum.",
      category: "Database",
      language: "SQL",
      languageColor: "#f09012",
      tags: ["MySQL", "SQL"],
      githubUrl: "https://github.com/akayar0/SQL-Analysis-and-Design",
      liveUrl: null
    }
  ],

  skills: {
    ai_ml: [
      { name: "RAG & Vector DBs (Chroma/FAISS)", level: "İyi Seviye" },
    ],
    languages: [
      { name: "Python", level: "İyi Seviye" },
      { name: "C", level: "Orta Seviye" },
      { name: "JavaScript / HTML / CSS", level: "İyi Seviye" },
      { name: "SQL (PostgreSQL / MySQL)", level: "İyi Seviye" },
      { name: "Java", level: "İyi Seviye" },
    ],
    web_backend: [
      { name: "React & Next.js", level: "Orta Seviye" },
      { name: "Tailwind CSS", level: "Orta Seviye" },
      { name: "FastAPI & Flask", level: "Giriş Seviye" },
      { name: "Node.js / Express", level: "Giriş Seviye" },
    ],
    tools_devops: [
      { name: "Git & GitHub CI/CD", level: "İyi Seviye" },
      { name: "Docker & Containerizasyon", level: "Giriş Seviye" },
      { name: "VS Code / Cursor / JetBrains", level: "İyi Seviye" }
    ]
  },

  certificates: [
    {
      title: "IBM ile Kodluyoruz : AI4Future - İleri Seviye",
      issuer: "Kodluyoruz",
      date: "Haziran 2026",
      credentialUrl: "https://verified.sertifier.com/en/verify/27866145631376/",
      tags: ["Yapay Zeka", "Siber Güvenlik için Yapay Zeka", "MachineLearning", "Veri Yönetimi","GenerativeAI","GoogleColab","Bulut Bilişim"]
    },
    {
      title: "Otomotiv Yaz Kampı",
      issuer: "OSD - Otomotiv Sanayii Derneği",
      date: "Temmuz 2026",
      credentialUrl: "https://otomotivkampi.com/sertifika/?phone=%2B905317968544",
      tags: ["Otomotiv"]
    },
        {
      title: "İnovasyon",
      issuer: "Bilgeİş",
      date: "Ocak 2026",
      credentialUrl: "https://bilgeis.net/mod/simplecertificate/view.php?id=1654&tab=0&page=0&perpage=30&orderby=username&action=get",
      tags: ["Araştırma", "Yapay Zeka", "Akademik Destek","İnovasyon"]
    },
    {
      title: "Teknopark Ekosistemi ve Teknoloji Girişimciliği",
      issuer: "Teknoloji Kışlası",
      date: "Aralık 2025",
      credentialUrl: "https://www.linkedin.com/in/ahmet-kayar-77a308290/overlay/Certifications/1554762170/treasury?profileId=ACoAAEaGXk4BdJ4il1tqM2fKe-siShIyBN-qI90",
      tags: ["Teknoloji","Girişimcilik","Proje"]
    }

  ],

  goals: [
    {
      title: "Kısa Vade (İlk 1-2 Yıl)",
      icon: "Target",
      points: [
        "Full-stack alanında ileri seviyede olmak",
        "Açık kaynaklı LLM araçlarına (LangChain, vLLM vb.) düzenli pull request katkıları sunmak",
        "Güncel yapay zeka araçlarını kullanarak vizyonlu projeler üretmek"
      ]
    },
  ],

  interests: [
    {
      category: "Teknoloji & Kodlama",
      items: ["Büyük Dil Modelleri","Yapay Zeka","Kodlama"]
    },
    {
      category: "Bilişsel & Strateji",
      items: ["Strateji Online Oyunlar"]
    },
    {
      category: "Yaşam & Üretkenlik",
      items: ["Spor yapmak","Kitap okumak","Müzik dinlemek","Film/dizi izlemek"]
    }
  ]
};
