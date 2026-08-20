import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.BETTER_AUTH_SECRET!

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''
    const normalizedName = typeof name === 'string' ? name.trim() : ''

    if (!normalizedEmail || !password || !normalizedName) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    const existing = await query('SELECT id FROM users WHERE email = $1', [normalizedEmail])
    if (existing.rowCount) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, 12)

    await query(
      'INSERT INTO users (id, email, name, password) VALUES ($1, $2, $3, $4)',
      [id, normalizedEmail, normalizedName, hashedPassword]
    )

    const token = jwt.sign({ userId: id, email: email.toLowerCase() }, JWT_SECRET, {
      expiresIn: '7d',
    })

    const response = NextResponse.json(
      { user: { id, email: normalizedEmail, name: normalizedName } },
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
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
