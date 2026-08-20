'use client'

import { useState, useCallback } from 'react'
import { ReadingProgress } from '@/lib/types'

const defaultProgress: Omit<ReadingProgress, 'novelSlug' | 'chapterId'> = {
  scrollPosition: 0,
  fontSize: 18,
  theme: 'light',
  lastReadAt: new Date().toISOString(),
}

export function useReadingProgress(novelSlug: string, chapterId: string) {
  const [progress, setProgress] = useState<ReadingProgress>(() => ({
    ...defaultProgress,
    novelSlug,
    chapterId,
  }))

  const updateProgress = useCallback((updates: Partial<ReadingProgress>) => {
    setProgress((prev) => ({
      ...prev,
      ...updates,
      lastReadAt: new Date().toISOString(),
    }))
  }, [])

  const updateScrollPosition = useCallback((position: number) => {
    updateProgress({ scrollPosition: position })
  }, [updateProgress])

  const updateFontSize = useCallback((size: number) => {
    updateProgress({ fontSize: size })
  }, [updateProgress])

  const updateTheme = useCallback((theme: ReadingProgress['theme']) => {
    updateProgress({ theme })
  }, [updateProgress])

  return {
    progress,
    updateScrollPosition,
    updateFontSize,
    updateTheme,
  }
}
