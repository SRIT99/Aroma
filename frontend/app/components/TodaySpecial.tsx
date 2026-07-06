'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import DishCard from './DishCard';

interface Dish {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  video?: string;
  discount?: number;
}

export default function TodaySpecial() {
  const [dishes, setDishes] = useState<Dish[]>([
    {
      _id: '1',
      name: 'Chicken Mo:Mo',
      description: 'Hand-folded dumplings, steamed over charcoal, served with smoked tomato chutney.',
      price: 150,
      image: '/images/momo.jpg',
      discount: 20,
    },
    {
      _id: '2',
      name: 'Charcoal Burger',
      description: 'Flame-grilled patty, aged cheddar, house pickles, brioche bun.',
      price: 290,
      image: '/images/burger.jpg',
      discount: 15,
    },
    {
      _id: '3',
      name: 'Smoked Wings',
      description: 'Slow-smoked wings tossed in a fire-oil glaze, finished over open flame.',
      price: 320,
      image: '/images/chickenwings.jpg',
      discount: 25,
    },
  ]);

  useEffect(() => {
    const fetchSpecials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/specials/today');
        if (response.data?.data && response.data.data.length > 0) {
          const apiDishes = response.data.data.map((item: any) => ({
            _id: item._id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image || '/images/placeholder.jpg',
            video: item.video,
            discount: item.discount || 0,
          }));
          setDishes(apiDishes.slice(0, 3));
        }
      } catch {
        console.log('Using default dishes');
      }
    };
    fetchSpecials();
  }, []);

  return (
    <section id="today-special" className="section-padding relative bg-[var(--bg)]">
      <div className="container-custom">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow mb-4"
            >
              Fresh off the grill
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="max-w-xl text-balance font-display text-4xl font-semibold sm:text-5xl lg:text-6xl"
            >
              Today&apos;s <span className="text-gradient italic">special</span>
            </motion.h2>
          </div>
          <p className="max-w-sm text-[var(--smoke)]">
            Three dishes, hand-picked from the pass every morning — while the discount lasts.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {dishes.map((dish, index) => (
            <DishCard key={dish._id} dish={dish} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#menu" className="btn-outline inline-block" data-cursor="hover">
            View full menu
          </a>
        </div>
      </div>
    </section>
  );
}
