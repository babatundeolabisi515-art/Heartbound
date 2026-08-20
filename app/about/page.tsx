import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — heartbound',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <header className="border-b border-border dark:border-border">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold hover:text-text-secondary dark:hover:text-text-muted transition-colors">
            heartbound
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-text-secondary dark:hover:text-text-muted transition-colors">
              Library
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">About heartbound</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            heartbound is a novel reading experience designed to help you lose yourself in stories
            without distractions. Built with care for readers who value clean design, comfortable
            typography, and thoughtful interactions.
          </p>
          <h3>Features</h3>
          <ul>
            <li>Clean, distraction-free reading interface</li>
            <li>Adjustable font size and reading themes</li>
            <li>Automatic reading progress tracking</li>
            <li>Chapter navigation with ease</li>
          </ul>
          <h3>Built with</h3>
          <p>
            Next.js 16, React 19, Tailwind CSS, and a deep love for literature.
          </p>
        </div>
      </main>
    </div>
  )
}
