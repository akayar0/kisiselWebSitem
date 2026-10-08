import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal - Intersection Observer tabanli scroll animasyonu hook'u.
 * @param {object} options
 * @param {number} options.threshold  - Gorunurluk esigi (0-1), default 0.12
 * @param {number} options.delay      - Animasyon gecikmesi (ms), default 0
 */
export function useScrollReveal({ threshold = 0.12, delay = 0 } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            const t = setTimeout(() => setIsVisible(true), delay);
            return () => clearTimeout(t);
          }
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return { ref, isVisible };
}
