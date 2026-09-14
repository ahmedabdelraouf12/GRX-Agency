'use client'

import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, Loader2, ShieldAlert } from 'lucide-react'
import { apiUrl } from '@/lib/api'
import { saveToken } from '@/lib/dashboard-auth'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/dashboard'

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body.error || 'حدث خطأ، حاول مرة أخرى')
        setLoading(false)
        return
      }
      const { token } = await res.json()
      saveToken(token)
      router.push(next)
    } catch {
      setError('تعذر الاتصال بالسيرفر')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-cyan p-0.5 shadow-lg shadow-brand-500/25 mb-4">
            <div className="w-full h-full bg-[#09090b] rounded-[14px] flex items-center justify-center">
              <Lock className="w-6 h-6 text-brand-400" />
            </div>
          </div>
          <h1 className="text-xl font-black text-white">لوحة تحكم GRX Agency</h1>
          <p className="text-xs text-zinc-500 mt-1">أدخل كلمة المرور للمتابعة</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 border border-zinc-800/80 space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">كلمة المرور</label>
            <input
              type="password"
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-900/60 rounded-xl px-3 py-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>دخول</span>}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function DashboardLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
