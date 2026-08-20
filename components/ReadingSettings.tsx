'use client'

import { useReadingProgress } from '@/hooks/useReadingProgress'

interface ReadingSettingsProps {
  novelSlug: string
  chapterId: string
}

export function ReadingSettings({ novelSlug, chapterId }: ReadingSettingsProps) {
  const { progress, updateFontSize, updateTheme } = useReadingProgress(novelSlug, chapterId)

  return (
    <div className="flex items-center gap-4 p-3 bg-background dark:bg-surface-alt rounded-lg border border-border dark:border-border">
      <div className="flex items-center gap-2">
        <label className="text-xs text-text-secondary dark:text-text-muted">Size</label>
        <div className="flex items-center border border-border dark:border-border rounded">
          <button
            onClick={() => updateFontSize(Math.max(14, progress.fontSize - 2))}
            className="px-2 py-1 text-xs hover:bg-muted dark:hover:bg-surface-alt transition-colors"
          >
            A-
          </button>
          <span className="px-2 py-1 text-xs border-x border-border dark:border-border min-w-[2rem] text-center">
            {progress.fontSize}
          </span>
          <button
            onClick={() => updateFontSize(Math.min(28, progress.fontSize + 2))}
            className="px-2 py-1 text-xs hover:bg-muted dark:hover:bg-surface-alt transition-colors"
          >
            A+
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <label className="text-xs text-text-secondary dark:text-text-muted mr-1">Theme</label>
        {(['light', 'dark', 'sepia'] as const).map((theme) => (
          <button
            key={theme}
            onClick={() => updateTheme(theme)}
            className={`w-6 h-6 rounded-full border-2 transition-all ${
              progress.theme === theme
                ? 'border-text-primary dark:border-text-primary scale-110'
                : 'border-text-muted dark:border-text-muted hover:border-accent'
            }`}
            style={{
              backgroundColor:
                theme === 'light'
                  ? '#ffffff'
                  : theme === 'dark'
                  ? '#1a1a1a'
                  : '#f4ecd8',
            }}
            title={theme.charAt(0).toUpperCase() + theme.slice(1)}
          />
        ))}
      </div>
    </div>
  )
}
