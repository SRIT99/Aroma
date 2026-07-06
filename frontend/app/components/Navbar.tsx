'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#today-special', label: "Today's Special" },
  { href: '#menu', label: 'Menu' },
  { href: '#leaderboard', label: 'Leaderboard' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl font-semibold italic tracking-tight text-[var(--ink)]"
            data-cursor="hover"
          >
            Aroma<span className="text-[var(--ember)]">.</span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm uppercase tracking-wide text-[var(--ink)]/80 transition-colors hover:text-[var(--ink)]"
                data-cursor="hover"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--ember)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="btn-outline px-6 py-2.5 text-xs" data-cursor="hover">
              Login
            </Link>
            <Link href="/register" className="btn-primary px-6 py-2.5 text-xs" data-cursor="hover">
              Sign Up
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-px w-6 bg-[var(--ink)] transition-transform duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`h-px w-6 bg-[var(--ink)] transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`h-px w-6 bg-[var(--ink)] transition-transform duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen mobile overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-[var(--bg)] md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-3xl font-semibold text-[var(--ink)]"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex gap-3"
            >
              <Link href="/login" className="btn-outline" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link href="/register" className="btn-primary" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
