'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface Testimonial {
  _id: string
  name: string
  message: string
  rating: number
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      _id: '1',
      name: 'Ramesh K.',
      message: 'The food quality is outstanding! Best restaurant in Gauradaha.',
      rating: 5,
    },
    {
      _id: '2',
      name: 'Priya M.',
      message: 'Amazing ambiance and friendly staff. Will definitely come back!',
      rating: 5,
    },
    {
      _id: '3',
      name: 'Amit S.',
      message: 'Fresh ingredients and authentic flavors. Highly recommended!',
      rating: 5,
    },
  ])
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/testimonials')
        if (response.data.data && response.data.data.length > 0) {
          setTestimonials(response.data.data.slice(0, 3))
        }
      } catch (error) {
        console.log('Using default testimonials')
      }
    }

    fetchTestimonials()
  }, [])

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Real experiences from real customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial._id}
              className="animate-fade-in-up bg-background p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-2xl">⭐</span>
                ))}
              </div>

              {/* Message */}
              <p className="text-muted mb-4 italic">
                &quot;{testimonial.message}&quot;
              </p>

              {/* Author */}
              <p className="font-semibold text-foreground">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
