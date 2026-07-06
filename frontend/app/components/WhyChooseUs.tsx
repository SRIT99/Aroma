'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="font-display text-5xl font-semibold text-gradient">
      {value}
      {suffix}
    </span>
  );
}

const reasons = [
  {
    title: 'Live-fire kitchen',
    description: 'Every dish touches real charcoal before it reaches your table.',
    span: 'md:col-span-2',
  },
  {
    title: 'Ingredients sourced daily',
    description: 'Nothing sits in a walk-in overnight — the market runs before service.',
    span: '',
  },
  {
    title: '11-minute average ticket time',
    description: 'Fast without cutting a single corner in the process.',
    span: '',
  },
  {
    title: 'Loyalty that actually pays',
    description: 'Points on every order, redeemable the same week you earn them.',
    span: 'md:col-span-2',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding relative overflow-hidden bg-[var(--bg-elevated)]">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[var(--ember)]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--gold)]/10 blur-[120px]" />

      <div className="container-custom relative">
        <div className="mb-16 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow mb-4"
          >
            Why Aroma
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-balance font-display text-4xl font-semibold sm:text-5xl lg:text-6xl"
          >
            Not your average <span className="text-gradient italic">dining room</span>
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={`glass group rounded-3xl p-8 transition-colors duration-300 hover:border-[var(--ember)]/50 ${reason.span}`}
            >
              <h3 className="mb-3 font-display text-2xl font-semibold text-[var(--ink)]">
                {reason.title}
              </h3>
              <p className="text-[var(--smoke)]">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stat strip */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-y border-[var(--line)] py-10 sm:grid-cols-4">
          <div className="text-center">
            <Counter to={4200} suffix="+" />
            <p className="mt-2 text-xs uppercase tracking-wide text-[var(--smoke)]">Plates served / mo</p>
          </div>
          <div className="text-center">
            <Counter to={98} suffix="%" />
            <p className="mt-2 text-xs uppercase tracking-wide text-[var(--smoke)]">Return customers</p>
          </div>
          <div className="text-center">
            <Counter to={11} />
            <p className="mt-2 text-xs uppercase tracking-wide text-[var(--smoke)]">Min. ticket time</p>
          </div>
          <div className="text-center">
            <Counter to={5} />
            <p className="mt-2 text-xs uppercase tracking-wide text-[var(--smoke)]">Signature specials</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <h3 className="text-balance font-display text-2xl font-semibold sm:text-3xl">
            Ready for an exceptional dining experience?
          </h3>
          <Link href="#contact" className="btn-primary" data-cursor="hover">
            Reserve your table
          </Link>
        </div>
      </div>
    </section>
  );
}
