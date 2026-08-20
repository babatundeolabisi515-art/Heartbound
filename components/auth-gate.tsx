'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'

const publicPaths = new Set(['/login', '/signup'])

export function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isPending } = useAuth()
  const isPublicPath = publicPaths.has(pathname)

  useEffect(() => {
    if (!isPending && !user && !isPublicPath) {
      router.replace('/login')
    }
  }, [isPending, isPublicPath, pathname, router, user])

  if (isPublicPath || (!isPending && user)) {
    return children
  }

  return (
    <main className="min-h-screen bg-background" aria-busy="true">
      <div className="flex min-h-screen items-center justify-center text-sm text-text-muted">
        Checking your account...
      </div>
    </main>
  )
}