'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface DishCardProps {
  dish: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    /** Optional looping clip (mp4/webm) — drop a file in /public/videos to enable */
    video?: string;
    discount?: number;
  };
  index?: number;
}

export default function DishCard({ dish, index = 0 }: DishCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hovering, setHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const discountedPrice = dish.discount ? dish.price * (1 - dish.discount / 100) : dish.price;

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => {
        setHovering(true);
        videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => setHovering(false)}
      className="ticket group relative overflow-hidden"
      data-cursor="hover"
    >
      {/* discount corner tag */}
      {dish.discount ? (
        <div className="absolute right-4 top-4 z-20 rounded-full bg-[var(--ember)] px-3 py-1 font-mono text-xs font-bold text-[#0a0906]">
          -{dish.discount}%
        </div>
      ) : null}

      {/* Media area: real video if provided, else Ken-Burns animated image */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[var(--bg-elevated-2)] to-[var(--bg-elevated)]">
        {dish.video ? (
          <video
            ref={videoRef}
            src={dish.video}
            muted
            loop
            playsInline
            poster={dish.image}
            className="h-full w-full object-cover"
          />
        ) : dish.image && !imgError ? (
          <motion.div
            animate={{ scale: hovering ? 1.12 : 1.02 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative h-full w-full"
          >
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          </motion.div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-6xl">🍽️</div>
        )}

        {/* Rising steam/spark SVG accent */}
        <svg
          className="pointer-events-none absolute bottom-2 right-4 h-14 w-10 opacity-70"
          viewBox="0 0 40 60"
          fill="none"
        >
          <motion.path
            d="M8 55 C 2 45, 14 40, 8 30 C 2 20, 14 15, 10 5"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0.3, opacity: 0.2 }}
            animate={{ pathLength: [0.3, 1, 0.3], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M22 58 C 16 48, 28 43, 22 33 C 16 23, 28 18, 24 8"
            stroke="var(--ember-light)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0.5, opacity: 0.15 }}
            animate={{ pathLength: [0.5, 1, 0.5], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
        </svg>

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 font-display text-xl font-semibold text-[var(--ink)]">{dish.name}</h3>
        <p className="mb-5 text-sm text-[var(--smoke)]">{dish.description}</p>

        <div className="mb-6 flex items-center gap-2 font-mono">
          <span className="text-2xl font-bold text-[var(--gold)]">
            Rs. {discountedPrice.toFixed(0)}
          </span>
          {dish.discount ? (
            <span className="text-sm text-[var(--smoke)] line-through">Rs. {dish.price}</span>
          ) : null}
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full rounded-full py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
            isAdded
              ? 'bg-[var(--gold)] text-[#0a0906]'
              : 'border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ember)] hover:text-[var(--ember-light)]'
          }`}
        >
          {isAdded ? '✓ Added to cart' : 'Quick add'}
        </button>
      </div>
    </motion.div>
  );
}
