'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { authFetch } from '@/lib/api'
import { clearToken, getToken } from '@/lib/dashboard-auth'

/**
 * Returns a fetch function for dashboard pages to call the protected .NET
 * API endpoints with. Attaches the stored JWT automatically and, if the
 * API ever comes back with 401 (missing/expired token), clears it and
 * bounces to the login page instead of leaving the page half-broken.
 */
export function useProtectedApi() {
  const router = useRouter()

  return useCallback(
    async (path: string, init?: RequestInit): Promise<Response> => {
      const token = getToken()
      if (!token) {
        router.replace('/dashboard/login')
        throw new Error('Not authenticated')
      }
      const res = await authFetch(path, token, init)
      if (res.status === 401) {
        clearToken()
        router.replace('/dashboard/login')
      }
      return res
    },
    [router]
  )
}
