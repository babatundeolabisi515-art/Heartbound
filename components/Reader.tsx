'use client'

import { useEffect, useRef } from 'react'
import { Novel, Chapter } from '@/lib/types'
import { ChapterNav } from './ChapterNav'
import { ReadingSettings } from './ReadingSettings'
import { useReadingProgress } from '@/hooks/useReadingProgress'

interface ReaderProps {
  novel: Novel
  chapter: Chapter
}

export function Reader({ novel, chapter }: ReaderProps) {
  const { progress, updateScrollPosition } = useReadingProgress(novel.slug, chapter.id)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current && progress.scrollPosition > 0) {
      contentRef.current.scrollTop = progress.scrollPosition
    }
  }, [progress.scrollPosition])

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        updateScrollPosition(contentRef.current.scrollTop)
      }
    }

    const element = contentRef.current
    if (element) {
      element.addEventListener('scroll', handleScroll, { passive: true })
      return () => element.removeEventListener('scroll', handleScroll)
    }
  }, [updateScrollPosition])

  const themeClasses = {
    light: 'bg-surface text-text-primary',
    dark: 'bg-background text-text-primary',
    sepia: 'bg-[#f4ecd8] text-text-primary',
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses[progress.theme]}`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">{chapter.title}</h1>
          <p className="text-sm text-text-secondary dark:text-text-muted">
            {novel.title} by {novel.author}
          </p>
        </div>

        <div className="mb-6">
          <ReadingSettings novelSlug={novel.slug} chapterId={chapter.id} />
        </div>

        <div
          ref={contentRef}
          className="prose prose-lg dark:prose-invert max-w-none overflow-y-auto"
          style={{ fontSize: `${progress.fontSize}px`, lineHeight: 1.8 }}
        >
          {chapter.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-6 text-justify hyphens-auto">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12">
          <ChapterNav novel={novel} currentChapter={chapter} />
        </div>
      </div>
    </div>
  )
}
