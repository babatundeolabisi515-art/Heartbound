'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid email or password')
        setLoading(false)
        return
      }

      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Header />

      <main className="mx-auto grid min-h-[calc(100vh-105px)] w-full max-w-6xl items-center gap-12 px-4 py-12 lg:grid-cols-[1fr_420px] lg:px-8">
        <div className="hidden lg:block">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Your reading room</p>
          <h1 className="max-w-xl font-serif text-5xl font-semibold leading-tight text-text-primary dark:text-text-primary">
            Return to the stories that stay with you.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-text-secondary dark:text-text-muted">
            Sign in to continue your library, pick up where you left off, and keep your reading progress close.
          </p>
        </div>

        <div className="w-full max-w-md justify-self-center lg:justify-self-end">
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent lg:hidden">Welcome back</p>
            <h2 className="mt-2 text-3xl font-bold text-text-primary dark:text-text-primary">Sign in to Heartbound</h2>
            <p className="mt-2 text-sm text-text-secondary dark:text-text-muted">
              Your next chapter is waiting.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-7 shadow-xl shadow-accent/5 dark:border-border dark:bg-surface-alt sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/30">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-primary dark:text-text-primary">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-border dark:bg-background dark:text-text-primary"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-text-primary dark:text-text-primary">
                  Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="text-xs font-semibold text-accent hover:text-accent-blue"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-border dark:bg-background dark:text-text-primary"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-accent px-4 py-3 font-semibold text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent-blue disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-text-secondary dark:text-text-muted">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-accent hover:text-accent-blue font-medium transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
