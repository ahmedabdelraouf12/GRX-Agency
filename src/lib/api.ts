// Base URL of the GRX Agency .NET backend (see H:\Grx-Agency-Backend). All
// site content, leads, and analytics now live there instead of in local
// JSON files - this frontend is a pure client of that API.
//
// Set NEXT_PUBLIC_API_URL in .env.local for local dev, and in the Vercel
// project's Environment Variables for production. Falls back to the
// deployed MonsterASP.NET instance so the site still works without it set.
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://grx-agency.runasp.net').replace(/\/$/, '')

export function apiUrl(path: string): string {
  return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** Fetch wrapper that attaches a Bearer token for dashboard-protected endpoints. */
export async function authFetch(path: string, token: string, init: RequestInit = {}): Promise<Response> {
  return fetch(apiUrl(path), {
    ...init,
    headers: {
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      Authorization: `Bearer ${token}`,
      ...init.headers,
    },
  })
}
