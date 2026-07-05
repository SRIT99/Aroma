'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import DishCard from './DishCard';
interface Dish {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  discount?: number;
}

export default function TodaySpecial() {
  const [dishes, setDishes] = useState<Dish[]>([
    {
      _id: '1',
      name: 'chicken Mo-mo',
      description: 'Steamed dumplings with meat filling',
      price: 150,
      image: '/images/momo.jpg',
      discount: 20,
    },
    {
      _id: '2',
      name: 'Burger',
      description: 'Juicy grilled burger with fresh vegetables and special sauce',
      price: 290,
      image: '/images/burger.jpg',
      discount: 15,
    },
    {
      _id: '3',
      name: 'Chicken wings',
      description: 'Crispy fried chicken wings tossed in spicy sauce',
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
          // Map API response to match our Dish interface
          const apiDishes = response.data.data.map((item: any) => ({
            _id: item._id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image || '/../../public/images/placeholder.jpg',
            discount: item.discount || 0,
          }));
          setDishes(apiDishes.slice(0, 3));
        }
      } catch (error) {
        console.log('Using default dishes');
      }
    };

    fetchSpecials();
  }, []);

  return (
    <section id="today-special" className="section-padding bg-white">
      <div className="container-custom">
        <div className="animate-fade-in-up mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
            Today&apos;s Special
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Handpicked dishes prepared fresh daily with the finest ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {dishes.map((dish, index) => (
            <div
              key={dish._id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DishCard dish={dish} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#menu" className="btn-primary inline-block">
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
}
