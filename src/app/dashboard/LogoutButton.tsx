'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { clearToken } from '@/lib/dashboard-auth'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    // The JWT lives only in this browser's localStorage - there's no
    // server-side session to invalidate, so logging out is just forgetting it.
    clearToken()
    router.push('/dashboard/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-colors w-full"
    >
      <LogOut className="w-4 h-4" />
      <span>تسجيل الخروج</span>
    </button>
  )
}
