'use client'

import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

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

      setSuccess('Account created successfully! Redirecting to login...')
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
    <div className="min-h-screen flex items-center bg-[var(--bg)] relative overflow-hidden py-12">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[var(--ember)]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--gold)]/10 blur-[120px]" />
      <div className="container-custom w-full">
        <div className="max-w-md mx-auto">
          <div className="glass relative rounded-2xl shadow-card p-8 md:p-12">
            <h1 className="text-3xl font-display font-semibold text-center text-[var(--ink)] mb-8">
              Join <span className="text-gradient italic">Aroma</span>
            </h1>

            {error && (
              <div className="mb-6 p-4 border border-red-500/40 bg-red-500/10 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] rounded-lg text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[var(--ink)] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] placeholder:text-[var(--smoke)] rounded-xl focus:outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--ember)]/20 transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[var(--ink)] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] placeholder:text-[var(--smoke)] rounded-xl focus:outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--ember)]/20 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-[var(--ink)] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] placeholder:text-[var(--smoke)] rounded-xl focus:outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--ember)]/20 transition-colors"
                  placeholder="+977 98XXXXXXXX"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-[var(--ink)] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] placeholder:text-[var(--smoke)] rounded-xl focus:outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--ember)]/20 transition-colors"
                  placeholder="Create a strong password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-[var(--ink)] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] placeholder:text-[var(--smoke)] rounded-xl focus:outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--ember)]/20 transition-colors"
                  placeholder="Confirm your password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-sm text-[var(--smoke)]">
                Already have an account?{' '}
                <Link href="/login" className="text-[var(--ember-light)] font-semibold hover:underline">
                  Login here
                </Link>
              </p>
              <Link href="/" className="text-sm text-[var(--ember-light)] hover:underline block">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
