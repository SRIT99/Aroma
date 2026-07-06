'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Link from 'next/link';

const EmberScene = dynamic(() => import('./three/EmberScene'), { ssr: false });

interface HeroData {
  title?: string;
  subtitle?: string;
  discount?: number;
  discountLabel?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  specialToday?: { name: string; price?: number };
}

const MARQUEE_DISHES = [
  'Chicken Mo:Mo',
  'Smoked Wings',
  'Charcoal Burger',
  'Sizzling Sukuti',
  'Ember Rice',
  'Steamed Dumplings',
];

function splitWords(text: string) {
  return text.split(' ');
}

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData>({
    title: 'Fire, Smoke & Flavor',
    subtitle:
      'Aroma is a live-fire kitchen in Gauradaha, Jhapa — where every plate leaves the pass still smoking.',
    discount: 20,
    discountLabel: 'Tonight only',
    ctaText: 'Order Now',
    ctaLink: '/menu',
    secondaryCtaText: "Today's Special",
    secondaryCtaLink: '/specials',
    specialToday: { name: 'Chicken Mo:Mo Platter', price: 250 },
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/hero/active');
        if (response.data?.data) {
          setHeroData((prev) => ({ ...prev, ...response.data.data }));
        }
      } catch {
        console.log('Using default hero data');
      }
    };
    fetchHeroData();
  }, []);

  const titleWords = splitWords(heroData.title || 'Fire, Smoke & Flavor');

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--bg)]"
    >
      {/* WebGL backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <EmberScene />
      </div>

      {/* Vignette + gradient wash so the type stays legible over the 3D scene */}
      <div className="vignette pointer-events-none absolute inset-0 z-[1]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)]/40" />

      <div className="container-custom relative z-10 pt-24">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="eyebrow mb-6"
          >
            Gauradaha · Jhapa — Est. Today, Cooking Forever
          </motion.p>

          <h1 className="mb-8 text-balance font-display text-5xl font-semibold leading-[0.98] sm:text-7xl lg:text-8xl">
            {titleWords.map((word, i) => (
              <span key={i} className="mr-4 inline-block overflow-hidden align-top">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.15 * i, duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
                >
                  {i === titleWords.length - 1 ? (
                    <span className="text-gradient italic">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-10 max-w-xl text-lg text-[var(--smoke)] sm:text-xl"
          >
            {heroData.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link href={heroData.ctaLink || '/menu'} className="btn-primary" data-cursor="hover">
              {heroData.ctaText || 'Order Now'}
            </Link>
            <Link
              href={heroData.secondaryCtaLink || '/specials'}
              className="btn-outline"
              data-cursor="hover"
            >
              {heroData.secondaryCtaText || "Today's Special"}
            </Link>

            {heroData.discount ? (
              <div className="glass ml-0 flex items-center gap-3 rounded-full px-5 py-3 sm:ml-4">
                <span className="font-mono text-2xl font-bold text-[var(--gold)]">
                  {heroData.discount}%
                </span>
                <span className="text-xs uppercase tracking-wide text-[var(--smoke)]">
                  {heroData.discountLabel || 'off'}
                  <br />
                  today
                </span>
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>

      {/* Diagonal marquee ribbon of dish names */}
      <div className="absolute inset-x-0 bottom-24 z-10 -rotate-2 border-y border-[var(--line)] bg-[var(--ember)]/10 py-3 backdrop-blur-sm">
        <div className="marquee-track">
          {[...MARQUEE_DISHES, ...MARQUEE_DISHES, ...MARQUEE_DISHES].map((dish, i) => (
            <span
              key={i}
              className="mx-6 flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-[var(--ink)]/80"
            >
              {dish} <span className="text-[var(--ember)]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-[var(--line)] pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-[var(--ember)]"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
