import Link from 'next/link'
import { novels } from '@/lib/data'
import { Header } from '@/components/header'

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-background relative overflow-hidden">
      <Header />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <section className="mb-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-alt dark:bg-surface-alt border border-border dark:border-border mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-text-primary mb-4 tracking-tight">
            Your Next Great Read
          </h2>
          <p className="text-lg text-text-secondary dark:text-text-muted max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in stories that move you. Beautifully crafted tales of love, mystery, and wonder — 
            all in one place.
          </p>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-text-primary dark:text-text-primary">
              Your Library
            </h3>
            <span className="text-sm text-text-muted dark:text-text-muted">
              {novels.length} {novels.length === 1 ? 'story' : 'stories'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {novels.map((novel) => (
              <Link
                key={novel.id}
                href={`/novel/${novel.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-alt dark:bg-surface-alt border border-border dark:border-border shadow-sm hover:shadow-xl hover:shadow-accent/10 dark:hover:shadow-accent/20 hover:border-accent/50 dark:hover:border-accent/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={novel.cover}
                    alt={`${novel.title} cover`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
                    <span className="inline-block w-fit px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-accent/90 text-white rounded-full mb-2.5 backdrop-blur-sm">
                      {novel.genre}
                    </span>
                    <h4 className="text-lg font-bold text-white leading-tight mb-1 drop-shadow-md">
                      {novel.title}
                    </h4>
                    <p className="text-sm text-white/80">
                      by {novel.author}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary dark:text-text-muted mt-3 line-clamp-2 leading-relaxed px-1">
                  {novel.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border dark:border-border mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-sm text-text-muted dark:text-text-muted">
            heartbound — crafted with love for readers
          </p>
        </div>
      </footer>
    </div>
  )
}
