'use client'

import React, { useEffect, useState } from 'react'
import { Eye, MessageCircle, Send, Percent, Loader2 } from 'lucide-react'
import { useProtectedApi } from '../useProtectedApi'
import { AnalyticsSummary } from '../types'

function formatDayLabel(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })
}

export default function DashboardAnalyticsPage() {
  const protectedFetch = useProtectedApi()
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)

  useEffect(() => {
    let cancelled = false
    protectedFetch('/api/analytics/summary').then(async (res) => {
      if (!cancelled && res.ok) setSummary(await res.json())
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!summary) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 text-brand-400 animate-spin" />
      </div>
    )
  }

  const maxDay = Math.max(1, ...summary.dailyPageViews.map((d) => d.count))
  const maxPlan = Math.max(1, ...summary.topPlans.map((p) => p.count))

  const stats = [
    { label: 'مشاهدات الصفحة', value: summary.totalPageViews, icon: Eye },
    { label: 'ضغطات واتساب', value: summary.totalWhatsappClicks, icon: MessageCircle },
    { label: 'نماذج مُرسلة', value: summary.totalFormSubmits, icon: Send },
    { label: 'معدل التحويل', value: `${summary.conversionRate}%`, icon: Percent },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">الإحصائيات</h1>
        <p className="text-sm text-zinc-400 mt-1">أداء الموقع خلال آخر 14 يوماً.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="glass-card rounded-2xl p-5 border border-zinc-800/80">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-brand-400" />
              </div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Page views chart */}
      <div className="glass-card rounded-2xl border border-zinc-800/80 p-6">
        <h2 className="text-sm font-bold text-white mb-6">مشاهدات الصفحة يومياً</h2>
        <div className="flex items-end gap-2 h-48">
          {summary.dailyPageViews.map((d) => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-accent-cyan/80 group-hover:opacity-80 transition-opacity relative"
                  style={{ height: `${Math.max(4, (d.count / maxDay) * 100)}%` }}
                  title={`${d.count} مشاهدة`}
                />
              </div>
              <span className="text-[10px] text-zinc-500 whitespace-nowrap">{formatDayLabel(d.date)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top selected plans */}
      <div className="glass-card rounded-2xl border border-zinc-800/80 p-6">
        <h2 className="text-sm font-bold text-white mb-4">الباقات الأكثر اختياراً</h2>
        {summary.topPlans.length === 0 ? (
          <p className="text-sm text-zinc-500">لا توجد بيانات كافية بعد.</p>
        ) : (
          <div className="space-y-3">
            {summary.topPlans.map((p) => (
              <div key={p.plan}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-zinc-300">{p.plan}</span>
                  <span className="text-zinc-500 font-semibold">{p.count}</span>
                </div>
                <div className="h-2 rounded-full bg-zinc-900 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 to-indigo-500"
                    style={{ width: `${(p.count / maxPlan) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
