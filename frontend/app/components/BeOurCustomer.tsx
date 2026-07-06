'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BeOurCustomer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      setMessage('Account created successfully! Check your email to verify.');
      setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });

      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-[var(--ink)] placeholder:text-[var(--smoke)] focus:border-[var(--ember)] focus:outline-none focus:ring-2 focus:ring-[var(--ember)]/20 transition-colors';

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-[var(--bg-elevated)] to-[var(--bg)]"
    >
      {/* Ember particles rising */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute bottom-0 h-1.5 w-1.5 rounded-full bg-[var(--ember)] animate-ember-rise"
            style={{
              left: `${(i * 7.3) % 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${4 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow mb-4"
            >
              Join the table
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-balance font-display text-4xl font-semibold sm:text-5xl"
            >
              Become an <span className="text-gradient italic">Aroma regular</span>
            </motion.h2>
            <p className="text-lg text-[var(--smoke)]">
              Earn loyalty points with every order — and hear about specials first.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 shadow-card md:p-12"
          >
            {message && (
              <div className="mb-6 rounded-xl border border-[var(--gold)]/40 bg-[var(--gold)]/10 p-4 text-[var(--gold)]">
                {message}
              </div>
            )}
            {error && (
              <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="+977 98XXXXXXXX"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Create a strong password"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Confirm your password"
                />
              </div>

              <div className="rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4">
                <p className="mb-2 font-semibold text-[var(--ink)]">Join to enjoy:</p>
                <ul className="space-y-1 text-sm text-[var(--smoke)]">
                  <li>✓ Earn loyalty points on every order</li>
                  <li>✓ Exclusive discounts and offers</li>
                  <li>✓ Priority customer support</li>
                  <li>✓ Access to special events</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
                data-cursor="hover"
              >
                {loading ? 'Creating Account...' : 'Create Account & Earn Points'}
              </button>

              <p className="text-center text-sm text-[var(--smoke)]">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-[var(--ember-light)] hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
