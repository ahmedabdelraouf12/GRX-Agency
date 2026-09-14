'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Plus, Trash2, UserCog, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { useProtectedApi } from '../useProtectedApi'
import { getUsername } from '@/lib/dashboard-auth'

interface AdminUser {
  id: number
  username: string
  createdAt: string
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function DashboardUsersPage() {
  const protectedFetch = useProtectedApi()
  const currentUsername = getUsername()

  const [users, setUsers] = useState<AdminUser[] | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)

  const loadUsers = async () => {
    const res = await protectedFetch('/api/auth/users')
    if (res.ok) setUsers(await res.json())
  }

  useEffect(() => {
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password.length < 8) {
      setError('كلمة المرور لازم تكون 8 حروف على الأقل')
      return
    }
    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين')
      return
    }

    setCreating(true)
    try {
      const res = await protectedFetch('/api/auth/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body.error || 'تعذر إنشاء الحساب')
        return
      }
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      setSuccess('تم إنشاء الحساب بنجاح')
      await loadUsers()
    } catch {
      setError('تعذر الاتصال بالسيرفر')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الحساب نهائياً؟')) return
    setPendingDeleteId(id)
    setError('')
    try {
      const res = await protectedFetch(`/api/auth/users/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body.error || 'تعذر حذف الحساب')
        return
      }
      await loadUsers()
    } finally {
      setPendingDeleteId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">حسابات الدخول</h1>
        <p className="text-sm text-zinc-400 mt-1">
          كل حساب هنا له اسم مستخدم وكلمة مرور خاصة للدخول على لوحة التحكم.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Existing users */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-zinc-800/80 overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-800/80">
            <h2 className="text-sm font-bold text-white">الحسابات الحالية</h2>
          </div>
          {users === null ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-brand-400 animate-spin" />
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/60">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                      <UserCog className="w-4 h-4 text-brand-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white flex items-center gap-2">
                        <span>{u.username}</span>
                        {u.username === currentUsername && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-300">أنت</span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500">أُنشئ في {formatDate(u.createdAt)}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(u.id)}
                    disabled={pendingDeleteId === u.id || users.length <= 1}
                    title={users.length <= 1 ? 'لا يمكن حذف آخر حساب متبقي' : 'حذف الحساب'}
                    className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center hover:text-rose-400 hover:border-rose-900/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create new user */}
        <div className="glass-card rounded-2xl border border-zinc-800/80 p-5">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-brand-400" />
            <span>إضافة حساب جديد</span>
          </h2>
          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">اسم المستخدم</label>
              <input
                type="text"
                required
                minLength={3}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none"
                placeholder="مثال: sara"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">كلمة المرور</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none"
                placeholder="8 حروف على الأقل"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">تأكيد كلمة المرور</label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none"
                placeholder="أعد كتابة كلمة المرور"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-900/60 rounded-lg px-3 py-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 rounded-lg px-3 py-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={creating}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm rounded-lg shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>إنشاء الحساب</span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
