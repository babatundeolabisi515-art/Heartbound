import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not Found — heartbound',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background dark:bg-background flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-text-muted dark:text-text-primary mb-4">404</h1>
      <p className="text-lg text-text-secondary dark:text-text-muted mb-8">
        This page has wandered off the map.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-surface-alt dark:bg-muted text-surface dark:text-text-primary rounded-lg font-medium hover:bg-surface-alt dark:hover:bg-border transition-colors"
      >
        Return to Library
      </Link>
    </div>
  )
}
