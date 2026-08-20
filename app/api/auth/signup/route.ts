import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.BETTER_AUTH_SECRET!

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, 12)

    db.prepare('INSERT INTO users (id, email, name, password) VALUES (?, ?, ?, ?)').run(
      id,
      email.toLowerCase(),
      name,
      hashedPassword
    )

    const token = jwt.sign({ userId: id, email: email.toLowerCase() }, JWT_SECRET, {
      expiresIn: '7d',
    })

    const response = NextResponse.json(
      { user: { id, email: email.toLowerCase(), name } },
      { status: 201 }
    )

    response.cookies.set('heartbound_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
