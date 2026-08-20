import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getNovelBySlug, getChapterBySlug } from '@/lib/data'
import { Reader } from '@/components/Reader'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string; chapter: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, chapter } = await params
  const novel = getNovelBySlug(slug)
  const chapterData = getChapterBySlug(slug, chapter)

  if (!novel || !chapterData) {
    return { title: 'Chapter Not Found' }
  }

  return {
    title: `${chapterData.title} — ${novel.title} | heartbound`,
  }
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug, chapter } = await params
  const novel = getNovelBySlug(slug)
  const chapterData = getChapterBySlug(slug, chapter)

  if (!novel || !chapterData) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-surface/80 dark:bg-background/80 backdrop-blur-sm border-b border-border dark:border-border">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href={`/novel/${novel.slug}`}
            className="text-sm font-medium text-text-secondary dark:text-text-muted hover:text-text-primary dark:hover:text-text-primary transition-colors"
          >
            ← {novel.title}
          </Link>
          <Link href="/" className="text-lg font-bold hover:text-text-secondary dark:hover:text-text-muted transition-colors">
            heartbound
          </Link>
        </div>
      </header>

      <Reader novel={novel} chapter={chapterData} />
    </div>
  )
}
