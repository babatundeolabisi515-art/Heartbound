import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getNovelBySlug } from '@/lib/data'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const novel = getNovelBySlug(slug)
  if (!novel) return { title: 'Novel Not Found' }
  return { title: `${novel.title} — heartbound` }
}

export default async function NovelPage({ params }: PageProps) {
  const { slug } = await params
  const novel = getNovelBySlug(slug)

  if (!novel) {
    notFound()
  }

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

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-48 flex-shrink-0">
            <div className="aspect-[3/4] bg-muted dark:bg-surface-alt rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={novel.cover}
                alt={`${novel.title} cover`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-text-primary dark:text-text-primary mb-2">
              {novel.title}
            </h1>
            <p className="text-lg text-text-secondary dark:text-text-muted mb-4">
              by {novel.author}
            </p>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-muted dark:bg-surface-alt text-text-secondary dark:text-text-muted rounded-full mb-6">
              {novel.genre}
            </span>
            <p className="text-text-primary dark:text-text-muted leading-relaxed mb-8">
              {novel.description}
            </p>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-text-primary dark:text-text-primary">
                Chapters ({novel.chapters.length})
              </h2>
              <div className="space-y-2">
                {novel.chapters.map((chapter, idx) => (
                  <Link
                    key={chapter.id}
                    href={`/novel/${novel.slug}/chapter/${chapter.id}`}
                    className="flex items-center justify-between p-4 bg-surface dark:bg-surface-alt rounded-lg border border-border dark:border-border hover:border-accent dark:hover:border-accent hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono text-text-muted dark:text-text-secondary w-8">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-medium text-text-primary dark:text-text-primary group-hover:text-text-secondary dark:group-hover:text-text-muted transition-colors">
                        {chapter.title}
                      </span>
                    </div>
                    <span className="text-text-muted group-hover:text-text-secondary dark:group-hover:text-text-muted transition-colors">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {novel.chapters.length > 0 && (
              <Link
                href={`/novel/${novel.slug}/chapter/${novel.chapters[0].id}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-surface-alt dark:bg-muted text-surface dark:text-text-primary rounded-lg font-medium hover:bg-surface-alt dark:hover:bg-border transition-colors"
              >
                Start Reading
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
