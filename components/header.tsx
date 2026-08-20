'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'

export function Header() {
  const router = useRouter()
  const { user, isPending } = useAuth()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
    router.push('/')
    router.refresh()
  }

  return (
    <header className="border-b border-border dark:border-border">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div>
          <Link href="/" className="text-2xl font-bold tracking-tight text-text-primary dark:text-text-primary hover:text-accent transition-colors">
            heartbound
          </Link>
          <p className="text-sm text-text-secondary dark:text-text-muted mt-1">
            Where stories find you
          </p>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-text-secondary dark:text-text-muted hover:text-accent transition-colors">
            Library
          </Link>
          <Link href="/about" className="text-sm font-medium text-text-secondary dark:text-text-muted hover:text-accent transition-colors">
            About
          </Link>
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-muted dark:bg-surface-alt animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-secondary dark:text-text-muted">
                {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-text-secondary dark:text-text-muted hover:text-accent transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-text-secondary dark:text-text-muted hover:text-accent transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="text-sm font-medium px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-blue transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
