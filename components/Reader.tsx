'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
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
    light: 'bg-background text-text-primary',
    dark: 'bg-background text-text-primary',
    sepia: 'bg-[#f4ecd8] text-text-primary',
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeClasses[progress.theme]}`}>
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

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold mb-2 text-text-primary dark:text-text-primary">
            {chapter.title}
          </h1>
          <p className="text-sm text-text-secondary dark:text-text-muted">
            {novel.title} by {novel.author}
          </p>
        </div>

        <div className="mb-8">
          <ReadingSettings novelSlug={novel.slug} chapterId={chapter.id} />
        </div>

        <div
          ref={contentRef}
          className="prose prose-lg dark:prose-invert max-w-none overflow-y-auto"
          style={{ fontSize: `${progress.fontSize}px`, lineHeight: 1.9 }}
        >
          {chapter.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-8 text-justify hyphens-auto first-letter:text-3xl first-letter:font-bold first-letter:text-accent first-letter:mr-1 first-letter:float-left">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16">
          <ChapterNav novel={novel} currentChapter={chapter} />
        </div>
      </div>
    </div>
  )
}
