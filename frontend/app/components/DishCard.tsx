'use client';

import { useState } from 'react';
import Image from 'next/image';

interface DishCardProps {
  dish: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    discount?: number;
  };
}

export default function DishCard({ dish }: DishCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const discountedPrice = dish.discount ? dish.price * (1 - dish.discount / 100) : dish.price;

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="card-hover overflow-hidden rounded-xl border border-border bg-background">
      {/* Image Area with Fallback */}
      <div className="from-primary/10 to-secondary/10 relative h-48 w-full overflow-hidden bg-gradient-to-br">
        {dish.image && !imgError ? (
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // onError={() => setImgError(true)} // ✅ Fallback on error
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-6xl">🍽️</div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 font-serif text-xl font-bold text-foreground">{dish.name}</h3>
        <p className="mb-4 text-sm text-muted">{dish.description}</p>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">₹{discountedPrice.toFixed(0)}</span>
            {dish.discount && (
              <>
                <span className="text-sm text-muted line-through">₹{dish.price}</span>
                <span className="ml-auto rounded bg-accent px-2 py-1 text-xs font-bold text-white">
                  -{dish.discount}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full rounded-lg py-2 font-semibold transition-colors ${
            isAdded ? 'bg-accent text-white' : 'bg-primary text-white hover:bg-primary-light'
          }`}
        >
          {isAdded ? '✓ Added to Cart' : 'Quick Buy'}
        </button>
      </div>
    </div>
  );
}
