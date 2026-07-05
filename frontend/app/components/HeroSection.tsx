'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image'; // <-- ADD THIS
import Link from 'next/link';

interface HeroData {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  discount?: number;
  discountLabel?: string;
  discountDescription?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  specialToday?: {
    name: string;
    description?: string;
    image?: string;
    price?: number;
    link?: string;
  };
  stats?: Array<{ label: string; value: string; icon?: string }>;
}

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData>({
    title: 'Welcome to Aroma Restaurant',
    subtitle: 'Experience the finest cuisine in Gauradaha, Jhapa',
    discount: 20,
    discountLabel: 'Special Offer',
    discountDescription: 'Get 20% off on your first order',
    ctaText: 'Order Now',
    ctaLink: '/menu',
    secondaryCtaText: "Today's Special",
    secondaryCtaLink: '/specials',
    specialToday: {
      name: 'Chicken Mo:Mo Platter',
      price: 250,
    },
    backgroundImage: '/images/hero-bg.jpg', // default static image
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // ✅ Correct endpoint (no /api prefix)
        const response = await axios.get('http://localhost:5000/hero/active');
        if (response.data?.data) {
          setHeroData(response.data.data);
        }
      } catch (error) {
        console.log('Using default hero data');
      }
    };

    fetchHeroData();
  }, []);

  return (
    <section className="section-padding relative flex min-h-[600px] items-center overflow-hidden bg-gradient-to-br from-primary to-secondary lg:min-h-[700px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-white"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Left Content */}
          <div className="animate-fade-in-up text-white">
            <h1 className="mb-4 text-balance font-serif text-4xl font-bold sm:text-5xl lg:text-6xl">
              {heroData.title || 'Welcome to Aroma'}
            </h1>
            <p className="mb-8 text-lg opacity-90 sm:text-xl">
              {heroData.subtitle || 'Experience authentic flavors and exceptional dining.'}
            </p>

            {heroData.discount && (
              <div className="mb-8 inline-block">
                <div className="rounded-lg bg-white px-6 py-3 text-lg font-bold text-primary">
                  {heroData.discountLabel || 'Get'} {heroData.discount}% OFF Today!
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={heroData.ctaLink || '/menu'}
                className="rounded-lg bg-white px-8 py-3 text-center font-semibold text-primary transition-colors hover:bg-opacity-90"
              >
                {heroData.ctaText || 'Order Now'}
              </Link>
              <Link
                href={heroData.secondaryCtaLink || '/specials'}
                className="rounded-lg border-2 border-white px-8 py-3 text-center font-semibold text-white transition-colors hover:bg-white hover:text-primary"
              >
                {heroData.secondaryCtaText || "Today's Special"}
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden h-80 lg:block lg:h-96">
            <div className="absolute inset-0 overflow-hidden rounded-2xl bg-white shadow-2xl">
              {heroData.backgroundImage ? (
                <Image
                  src={heroData.backgroundImage}
                  alt={heroData.title || 'Aroma Restaurant'}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                // Fallback if no image
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500">
                  <div className="p-6 text-center text-white">
                    <p className="mb-4 text-6xl">🍜</p>
                    <p className="font-serif text-2xl font-bold">
                      {heroData.specialToday?.name || "Today's Special"}
                    </p>
                    {heroData.specialToday?.price && (
                      <p className="mt-2 text-lg">Rs. {heroData.specialToday.price}/-</p>
                    )}
                  </div>
                </div>
              )}

              {heroData.discount && heroData.discount > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute right-4 top-4 rounded-lg bg-white p-3 text-center shadow-lg"
                >
                  <div className="text-2xl font-bold text-red-500">{heroData.discount}%</div>
                  <div className="text-xs text-gray-600">OFF</div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
