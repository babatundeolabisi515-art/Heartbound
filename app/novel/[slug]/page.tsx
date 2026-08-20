import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getNovelBySlug } from '@/lib/data'
import { Metadata } from 'next'
import { Header } from '@/components/header'

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
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-56 flex-shrink-0 mx-auto md:mx-0">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface-alt dark:bg-surface-alt border border-border dark:border-border shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={novel.cover}
                alt={`${novel.title} cover`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent/10 text-accent rounded-full mb-4">
              {novel.genre}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-primary mb-3 leading-tight">
              {novel.title}
            </h1>
            <p className="text-lg text-text-secondary dark:text-text-muted mb-6">
              by {novel.author}
            </p>
            <p className="text-text-primary dark:text-text-secondary leading-relaxed mb-10 text-base">
              {novel.description}
            </p>

            <div className="mb-10">
              <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary mb-5 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                Chapters ({novel.chapters.length})
              </h2>
              <div className="space-y-2.5">
                {novel.chapters.map((chapter, idx) => (
                  <Link
                    key={chapter.id}
                    href={`/novel/${novel.slug}/chapter/${chapter.id}`}
                    className="flex items-center justify-between p-4 bg-surface dark:bg-surface-alt rounded-xl border border-border dark:border-border hover:border-accent dark:hover:border-accent hover:shadow-md hover:shadow-accent/5 dark:hover:shadow-accent/10 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono text-text-muted dark:text-text-secondary w-8 text-center">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-medium text-text-primary dark:text-text-primary group-hover:text-accent transition-colors">
                        {chapter.title}
                      </span>
                    </div>
                    <span className="text-text-muted group-hover:text-accent transition-colors">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {novel.chapters.length > 0 && (
              <Link
                href={`/novel/${novel.slug}/chapter/${novel.chapters[0].id}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white rounded-xl font-semibold hover:bg-accent-blue transition-colors shadow-lg shadow-accent/20"
              >
                Start Reading
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
