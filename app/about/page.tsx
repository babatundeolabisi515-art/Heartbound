import { Metadata } from 'next'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'About — heartbound',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-text-primary dark:text-text-primary">About heartbound</h1>
        <div className="text-text-primary dark:text-text-secondary leading-relaxed space-y-4">
          <p>
            heartbound is a novel reading experience designed to help you lose yourself in stories
            without distractions. Built with care for readers who value clean design, comfortable
            typography, and thoughtful interactions.
          </p>
          <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary pt-4">Features</h3>
          <ul className="space-y-2 text-left max-w-sm mx-auto">
            <li className="flex items-center gap-2">
              <span className="text-accent">✦</span> Clean, distraction-free reading interface
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">✦</span> Adjustable font size and reading themes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">✦</span> In-session reading progress tracking
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">✦</span> Chapter navigation with ease
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary pt-4">Built with</h3>
          <p>
            Next.js 16, React 19, Tailwind CSS, and a deep love for literature.
          </p>
        </div>
      </main>
    </div>
  )
}
