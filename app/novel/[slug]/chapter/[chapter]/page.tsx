import { notFound } from 'next/navigation'
import { getNovelBySlug, getChapterBySlug } from '@/lib/data'
import { Reader } from '@/components/Reader'
import { Metadata } from 'next'
import { Header } from '@/components/header'

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
      <Header />

      <Reader novel={novel} chapter={chapterData} />
    </div>
  )
}
