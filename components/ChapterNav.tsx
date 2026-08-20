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
    <nav className="flex items-center justify-between py-8 border-t border-b border-border dark:border-border">
      <div className="flex-1">
        {prevChapter ? (
          <Link
            href={`/novel/${novel.slug}/chapter/${prevChapter.id}`}
            className="group flex items-center gap-3 text-sm text-text-secondary dark:text-text-muted hover:text-accent transition-colors"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-border dark:border-border group-hover:border-accent group-hover:bg-accent/5 transition-all">
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            </span>
            <div className="text-left">
              <div className="text-xs text-text-muted dark:text-text-muted mb-0.5">Previous</div>
              <div className="max-w-[180px] truncate font-medium">{prevChapter.title}</div>
            </div>
          </Link>
        ) : (
          <Link
            href={`/novel/${novel.slug}`}
            className="group flex items-center gap-3 text-sm text-text-muted hover:text-accent transition-colors"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-border dark:border-border group-hover:border-accent group-hover:bg-accent/5 transition-all">
              <span>←</span>
            </span>
            <div className="text-left">
              <div className="text-xs text-text-muted dark:text-text-muted mb-0.5">Back to</div>
              <div className="font-medium">{novel.title}</div>
            </div>
          </Link>
        )}
      </div>

      <div className="px-6">
        <div className="text-xs text-text-muted dark:text-text-muted text-center">
          Chapter {currentIndex + 1} of {novel.chapters.length}
        </div>
      </div>

      <div className="flex-1 flex justify-end">
        {nextChapter ? (
          <Link
            href={`/novel/${novel.slug}/chapter/${nextChapter.id}`}
            className="group flex items-center gap-3 text-sm text-text-secondary dark:text-text-muted hover:text-accent transition-colors"
          >
            <div className="text-right">
              <div className="text-xs text-text-muted dark:text-text-muted mb-0.5">Next</div>
              <div className="max-w-[180px] truncate font-medium">{nextChapter.title}</div>
            </div>
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-border dark:border-border group-hover:border-accent group-hover:bg-accent/5 transition-all">
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </span>
          </Link>
        ) : (
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <div className="text-right">
              <div className="text-xs text-text-muted dark:text-text-muted mb-0.5">End</div>
              <div className="font-medium">The last page</div>
            </div>
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-border dark:border-border">
              <span>→</span>
            </span>
          </div>
        )}
      </div>
    </nav>
  )
}
