export interface Chapter {
  id: string
  title: string
  content: string
}

export interface Novel {
  id: string
  slug: string
  title: string
  author: string
  description: string
  cover: string
  chapters: Chapter[]
  genre: string
}

export interface ReadingProgress {
  novelSlug: string
  chapterId: string
  scrollPosition: number
  fontSize: number
  theme: 'light' | 'dark' | 'sepia'
  lastReadAt: string
}
