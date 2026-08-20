import Link from 'next/link'
import { Metadata } from 'next'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Not Found — heartbound',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Header />

      <div className="flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6">
          <span className="text-3xl font-serif font-bold text-accent">404</span>
        </div>
        <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary mb-3">
          This page has wandered off the map
        </h1>
        <p className="text-text-secondary dark:text-text-muted mb-8 max-w-md">
          Looks like this story has not been written yet. Let&apos;s get you back to somewhere familiar.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent-blue transition-colors shadow-lg shadow-accent/20"
        >
          Return to Library
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}
