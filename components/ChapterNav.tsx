import Link from 'next/link'
import { Novel, Chapter } from '@/lib/types'

interface ChapterNavProps {
  novel: Novel
  currentChapter: Chapter
}

export function ChapterNav({ novel, currentChapter }: ChapterNavProps) {
  const currentIndex = novel.chapters.findIndex((c) => c.id === currentChapter.id)
  const prevChapter = currentIndex > 0 ? novel.chapters[currentIndex - 1] : null
  const nextChapter = currentIndex < novel.chapters.length - 1 ? novel.chapters[currentIndex + 1] : null

  return (
    <nav className="flex items-center justify-between py-6 border-t border-b border-border dark:border-border">
      <div>
        {prevChapter ? (
          <Link
            href={`/novel/${novel.slug}/chapter/${prevChapter.id}`}
            className="group flex items-center gap-2 text-sm text-text-secondary dark:text-text-muted hover:text-text-primary dark:hover:text-text-primary transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="max-w-[200px] truncate">{prevChapter.title}</span>
          </Link>
        ) : (
          <Link
            href={`/novel/${novel.slug}`}
            className="text-sm text-text-muted hover:text-text-secondary dark:hover:text-text-muted transition-colors"
          >
            ← Back to novel
          </Link>
        )}
      </div>

      <div className="text-xs text-text-muted">
        Chapter {currentIndex + 1} of {novel.chapters.length}
      </div>

      <div>
        {nextChapter ? (
          <Link
            href={`/novel/${novel.slug}/chapter/${nextChapter.id}`}
            className="group flex items-center gap-2 text-sm text-text-secondary dark:text-text-muted hover:text-text-primary dark:hover:text-text-primary transition-colors"
          >
            <span className="max-w-[200px] truncate">{nextChapter.title}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        ) : (
          <span className="text-sm text-text-muted">End</span>
        )}
      </div>
    </nav>
  )
}
