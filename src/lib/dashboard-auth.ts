'use client'

// The dashboard now authenticates directly against the .NET API (a
// different origin than this Next.js app), so there's no shared cookie -
// the JWT it issues is kept in localStorage and sent as a Bearer token on
// every protected request instead.

const TOKEN_KEY = 'grx_dashboard_token'

export function saveToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {}
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function clearToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {}
}
