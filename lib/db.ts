import Database, { RunResult } from 'better-sqlite3'

const databaseUrl = process.env.DATABASE_URL
const databasePath = databaseUrl?.startsWith('file:')
  ? databaseUrl.replace(/^file:/, '')
  : './heartbound.db'
const db = new Database(databasePath)

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`)

export async function query<T extends Record<string, unknown> = Record<string, unknown>>(
  text: string,
  values: unknown[] = []
) {
  const sqliteText = text.replace(/\$\d+/g, '?')
  const statement = db.prepare(sqliteText)

  if (/^\s*SELECT\b/i.test(text)) {
    return {
      rows: statement.all(...values) as T[],
      rowCount: 0,
    }
  }

  const result = statement.run(...values) as RunResult
  return {
    rows: [] as T[],
    rowCount: result.changes,
  }
}
