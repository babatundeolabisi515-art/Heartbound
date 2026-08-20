import Link from 'next/link'
import { novels } from '@/lib/data'

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <header className="border-b border-border dark:border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">heartbound</h1>
            <p className="text-sm text-text-secondary dark:text-text-muted mt-1">
              A novel reading experience
            </p>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-text-secondary dark:hover:text-text-muted transition-colors">
              Library
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-text-secondary dark:hover:text-text-muted transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-lg font-semibold mb-6 text-text-primary dark:text-text-primary">
            Your Library
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {novels.map((novel) => (
              <Link
                key={novel.id}
                href={`/novel/${novel.slug}`}
                className="group block bg-surface dark:bg-surface-alt rounded-lg border border-border dark:border-border overflow-hidden hover:shadow-lg hover:border-accent dark:hover:border-accent transition-all"
              >
                <div className="aspect-[3/4] bg-muted dark:bg-surface-alt relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={novel.cover}
                    alt={`${novel.title} cover`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-text-primary dark:text-text-primary group-hover:text-text-secondary dark:group-hover:text-text-muted transition-colors">
                    {novel.title}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-text-muted mt-1">
                    by {novel.author}
                  </p>
                  <p className="text-xs text-text-muted dark:text-text-secondary mt-2">
                    {novel.genre}
                  </p>
                  <p className="text-sm text-text-secondary dark:text-text-muted mt-3 line-clamp-2">
                    {novel.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
