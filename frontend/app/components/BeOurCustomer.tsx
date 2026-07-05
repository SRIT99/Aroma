'use client'

import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
export default function BeOurCustomer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })

      setMessage('Account created successfully! Check your email to verify.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      })

      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-primary to-secondary">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
              Be Our Valued Customer
            </h2>
            <p className="text-lg text-white/90">
              Join our community and earn loyalty points with every order
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 animate-fade-in-up">
            {message && (
              <div className="mb-6 p-4 bg-accent text-white rounded-lg">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="+977 98XXXXXXXX"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Create a strong password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Confirm your password"
                />
              </div>

              {/* Benefits */}
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="font-semibold text-foreground mb-2">Join to enjoy:</p>
                <ul className="space-y-1 text-sm text-muted">
                  <li>✓ Earn loyalty points on every order</li>
                  <li>✓ Exclusive discounts and offers</li>
                  <li>✓ Priority customer support</li>
                  <li>✓ Access to special events</li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account & Earn Points'}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-muted">
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
