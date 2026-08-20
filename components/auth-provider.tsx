'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name?: string
}

interface Session {
  user: User | null
  isPending: boolean
}

const AuthContext = createContext<Session>({
  user: null,
  isPending: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>({
    user: null,
    isPending: true,
  })

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/session', {
          cache: 'no-store',
          credentials: 'include',
        })
        const data = await res.json()
        setSession({
          user: data.user,
          isPending: false,
        })
      } catch {
        setSession({ user: null, isPending: false })
      }
    }

    checkSession()
  }, [])

  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
