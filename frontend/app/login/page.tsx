'use client'

import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email: formData.email,
        password: formData.password,
      })

      const { token, user } = response.data.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      // Redirect based on user role
      if (user.role === 'admin') {
        window.location.href = '/admin'
      } else if (user.role === 'staff') {
        window.location.href = '/staff'
      } else {
        window.location.href = '/dashboard'
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center bg-[var(--bg)] relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[var(--ember)]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--gold)]/10 blur-[120px]" />
      <div className="container-custom w-full">
        <div className="max-w-md mx-auto">
          <div className="glass relative rounded-2xl shadow-card p-8 md:p-12">
            <h1 className="text-3xl font-display font-semibold text-center text-[var(--ink)] mb-8">
              Welcome <span className="text-gradient italic">back</span>
            </h1>

            {error && (
              <div className="mb-6 p-4 border border-red-500/40 bg-red-500/10 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-sm text-[var(--smoke)]">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-[var(--ember-light)] font-semibold hover:underline">
                  Sign up now
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
