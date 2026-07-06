'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('aroma-intro-seen')) {
      setDone(true);
      return;
    }

    let raf: number;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem('aroma-intro-seen', '1');
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#0a0906]"
          initial={{ opacity: 1 }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
            <motion.path
              d="M50 10 C30 35, 25 55, 40 72 C48 80, 62 80, 70 68 C80 54, 68 42, 62 48 C68 30, 55 15, 50 10 Z"
              stroke="url(#emberGrad)"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ ease: 'linear' }}
            />
            <defs>
              <linearGradient id="emberGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e3b23c" />
                <stop offset="100%" stopColor="#ff5a1f" />
              </linearGradient>
            </defs>
          </svg>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.4em] text-[#a39a8a]">
            Aroma
          </p>
          <p className="mt-2 font-mono text-2xl text-[#f5ede1]">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
