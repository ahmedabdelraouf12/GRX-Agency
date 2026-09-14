'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { getToken } from '@/lib/dashboard-auth'

// Guards every /dashboard page (the login page lives outside this route
// group). Auth now lives in the .NET API's JWT rather than a cookie
// Next.js middleware could check server-side, so the gate runs client-side:
// no token in localStorage -> bounce to /dashboard/login.
export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.replace('/dashboard/login')
      return
    }
    setReady(true)
  }, [router])

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-brand-400 animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
