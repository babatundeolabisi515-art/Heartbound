import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'

const JWT_SECRET = process.env.BETTER_AUTH_SECRET!

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const token = url.searchParams.get('token')

    if (!token) {
      const cookieHeader = request.headers.get('cookie') || ''
      const match = cookieHeader.match(/heartbound_session=([^;]+)/)
      const cookieToken = match ? match[1] : null

      if (!cookieToken) {
        return NextResponse.json({ user: null })
      }

      try {
        const payload = jwt.verify(cookieToken, JWT_SECRET) as { userId: string; email: string }
        const user = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(payload.userId) as
          | { id: string; email: string; name: string }
          | undefined

        if (!user) {
          return NextResponse.json({ user: null })
        }

        return NextResponse.json({ user })
      } catch {
        return NextResponse.json({ user: null })
      }
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
      const user = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(payload.userId) as
        | { id: string; email: string; name: string }
        | undefined

      if (!user) {
        return NextResponse.json({ user: null })
      }

      return NextResponse.json({ user })
    } catch {
      return NextResponse.json({ user: null })
    }
  } catch (error) {
    console.error('Session error:', error)
    return NextResponse.json({ user: null })
  }
}
