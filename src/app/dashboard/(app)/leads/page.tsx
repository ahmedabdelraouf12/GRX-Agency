'use client'

import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useProtectedApi } from '../useProtectedApi'
import { LeadsTable } from './LeadsTable'
import { Lead } from '@/lib/types'

export default function DashboardLeadsPage() {
  const protectedFetch = useProtectedApi()
  const [leads, setLeads] = useState<Lead[] | null>(null)

  useEffect(() => {
    let cancelled = false
    protectedFetch('/api/leads').then(async (res) => {
      if (!cancelled && res.ok) setLeads(await res.json())
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">طلبات التواصل</h1>
        <p className="text-sm text-zinc-400 mt-1">
          كل طلب يتم إرساله من الموقع عبر الفورم يظهر هنا فوراً، سواء أكمل الزائر الإرسال على واتساب أم لا.
        </p>
      </div>

      {leads === null ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-6 h-6 text-brand-400 animate-spin" />
        </div>
      ) : (
        <LeadsTable initialLeads={leads} />
      )}
    </div>
  )
}
