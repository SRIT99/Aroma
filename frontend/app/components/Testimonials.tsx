'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Testimonial {
  _id: string;
  name: string;
  message: string;
  rating: number;
}

const DEFAULTS: Testimonial[] = [
  { _id: '1', name: 'Ramesh K.', message: 'The food quality is outstanding! Best restaurant in Gauradaha.', rating: 5 },
  { _id: '2', name: 'Priya M.', message: 'Amazing ambiance and friendly staff. Will definitely come back!', rating: 5 },
  { _id: '3', name: 'Amit S.', message: 'Fresh ingredients and authentic flavors. Highly recommended!', rating: 5 },
  { _id: '4', name: 'Sunita R.', message: 'The Mo:Mo platter alone is worth the trip. Perfectly smoked.', rating: 5 },
  { _id: '5', name: 'Bikash T.', message: 'Fast service, huge portions, and the wings are unreal.', rating: 4 },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="ticket mx-3 w-80 shrink-0 p-6">
      <div className="mb-4 flex gap-1 font-mono text-sm text-[var(--gold)]">
        {'★'.repeat(t.rating)}
        <span className="text-[var(--line)]">{'★'.repeat(5 - t.rating)}</span>
      </div>
      <p className="mb-6 text-[var(--ink)]/90">&ldquo;{t.message}&rdquo;</p>
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--smoke)]">{t.name}</p>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULTS);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/testimonials');
        if (response.data.data && response.data.data.length > 0) {
          setTestimonials(response.data.data);
        }
      } catch {
        console.log('Using default testimonials');
      }
    };
    fetchTestimonials();
  }, []);

  const half = Math.ceil(testimonials.length / 2) || 1;
  const rowA = testimonials.slice(0, half);
  const rowB = testimonials.slice(half).length ? testimonials.slice(half) : testimonials;

  return (
    <section className="section-padding relative overflow-hidden bg-[var(--bg)]">
      <div className="container-custom mb-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-4"
        >
          Word on the street
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl text-balance font-display text-4xl font-semibold sm:text-5xl lg:text-6xl"
        >
          What the <span className="text-gradient italic">regulars</span> say
        </motion.h2>
      </div>

      {/* Row 1 — left to right */}
      <div className="mb-6 flex overflow-hidden">
        <div className="flex animate-marquee">
          {[...rowA, ...rowA, ...rowA].map((t, i) => (
            <Card key={`a-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left (reverse) */}
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee" style={{ animationDirection: 'reverse' }}>
          {[...rowB, ...rowB, ...rowB].map((t, i) => (
            <Card key={`b-${i}`} t={t} />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />
    </section>
  );
}
