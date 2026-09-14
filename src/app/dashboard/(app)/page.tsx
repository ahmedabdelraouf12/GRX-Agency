'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, Eye, MessageCircle, TrendingUp, ArrowUpRight, Loader2 } from 'lucide-react'
import { useProtectedApi } from './useProtectedApi'
import { Lead } from '@/lib/types'
import { AnalyticsSummary } from './types'

const STATUS_LABELS: Record<string, string> = {
  new: 'جديد',
  contacted: 'تم التواصل',
  won: 'تم الإغلاق',
  lost: 'خسارة',
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-brand-500',
  contacted: 'bg-amber-500',
  won: 'bg-emerald-500',
  lost: 'bg-zinc-600',
}

export default function DashboardOverviewPage() {
  const protectedFetch = useProtectedApi()
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const [summaryRes, leadsRes] = await Promise.all([
        protectedFetch('/api/analytics/summary'),
        protectedFetch('/api/leads'),
      ])
      if (cancelled) return
      if (summaryRes.ok) setSummary(await summaryRes.json())
      if (leadsRes.ok) setLeads(await leadsRes.json())
      setLoading(false)
    }
    load()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading || !summary) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 text-brand-400 animate-spin" />
      </div>
    )
  }

  const recentLeads = leads.slice(0, 5)
  const maxStatus = Math.max(1, ...Object.values(summary.leadsByStatus))

  const stats = [
    { label: 'إجمالي طلبات التواصل', value: summary.totalLeads, icon: Users, color: 'text-brand-400' },
    { label: 'طلبات هذا الأسبوع', value: summary.leadsThisWeek, icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'مشاهدات الصفحة', value: summary.totalPageViews, icon: Eye, color: 'text-accent-cyan' },
    { label: 'ضغطات واتساب المباشرة', value: summary.totalWhatsappClicks, icon: MessageCircle, color: 'text-emerald-400' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">نظرة عامة</h1>
        <p className="text-sm text-zinc-400 mt-1">ملخص أداء الموقع وطلبات التواصل الواردة.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="glass-card rounded-2xl p-5 border border-zinc-800/80">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl font-black text-white">{stat.value.toLocaleString('en-US')}</div>
              <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-zinc-800/80 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/80">
            <h2 className="text-sm font-bold text-white">أحدث طلبات التواصل</h2>
            <Link href="/dashboard/leads" className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1">
              <span>عرض الكل</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="p-8 text-center text-sm text-zinc-500">لا توجد طلبات تواصل حتى الآن.</div>
          ) : (
            <div className="divide-y divide-zinc-800/60">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{lead.name}</div>
                    <div className="text-xs text-zinc-500 truncate">{lead.email} · {lead.phone}</div>
                  </div>
                  <span className="shrink-0 ms-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {STATUS_LABELS[lead.status] || lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leads by status */}
        <div className="glass-card rounded-2xl border border-zinc-800/80 p-5">
          <h2 className="text-sm font-bold text-white mb-4">طلبات التواصل حسب الحالة</h2>
          <div className="space-y-3">
            {Object.entries(summary.leadsByStatus).map(([status, count]) => (
              <div key={status}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-zinc-400">{STATUS_LABELS[status] || status}</span>
                  <span className="text-zinc-300 font-semibold">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-zinc-900 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${STATUS_COLORS[status] || 'bg-zinc-600'}`}
                    style={{ width: `${(count / maxStatus) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
            <span className="text-xs text-zinc-400">معدل التحويل</span>
            <span className="text-sm font-black text-emerald-400">{summary.conversionRate}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
