'use client'

import React, { useMemo, useState } from 'react'
import { Search, Trash2, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Lead, LeadStatus } from '@/lib/types'
import { useProtectedApi } from '../useProtectedApi'

interface LeadsTableProps {
  initialLeads: Lead[]
}

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'جديد',
  contacted: 'تم التواصل',
  won: 'تم الإغلاق',
  lost: 'خسارة',
}

const STATUS_BADGE: Record<LeadStatus, string> = {
  new: 'bg-brand-950/80 border-brand-800/60 text-brand-300',
  contacted: 'bg-amber-950/60 border-amber-800/60 text-amber-300',
  won: 'bg-emerald-950/80 border-emerald-800/60 text-emerald-300',
  lost: 'bg-zinc-900 border-zinc-800 text-zinc-500',
}

const SOURCE_LABELS: Record<string, string> = {
  modal: 'نافذة منبثقة',
  section: 'قسم التواصل',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' })
}

export const LeadsTable: React.FC<LeadsTableProps> = ({ initialLeads }) => {
  const protectedFetch = useProtectedApi()
  const [leads, setLeads] = useState(initialLeads)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | LeadStatus>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [pendingId, setPendingId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
      const matchesQuery =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        (lead.service || '').toLowerCase().includes(q)
      return matchesStatus && matchesQuery
    })
  }, [leads, search, statusFilter])

  const updateStatus = async (id: string, status: LeadStatus) => {
    setPendingId(id)
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    try {
      await protectedFetch(`/api/leads/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
    } finally {
      setPendingId(null)
    }
  }

  const removeLead = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب نهائياً؟')) return
    setPendingId(id)
    const prev = leads
    setLeads((cur) => cur.filter((l) => l.id !== id))
    try {
      const res = await protectedFetch(`/api/leads/${id}`, { method: 'DELETE' })
      if (!res.ok) setLeads(prev)
    } catch {
      setLeads(prev)
    } finally {
      setPendingId(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute top-1/2 -translate-y-1/2 right-3.5" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث بالاسم، الإيميل، الموبايل أو الخدمة..."
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | LeadStatus)}
          className="bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
        >
          <option value="all">كل الحالات</option>
          {(Object.keys(STATUS_LABELS) as LeadStatus[]).map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl border border-zinc-800/80 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-zinc-500">لا توجد طلبات مطابقة.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800/80 text-xs text-zinc-500">
                  <th className="text-right font-semibold px-5 py-3">العميل</th>
                  <th className="text-right font-semibold px-5 py-3 hidden md:table-cell">الخدمة / الميزانية</th>
                  <th className="text-right font-semibold px-5 py-3 hidden lg:table-cell">المصدر</th>
                  <th className="text-right font-semibold px-5 py-3 hidden sm:table-cell">التاريخ</th>
                  <th className="text-right font-semibold px-5 py-3">الحالة</th>
                  <th className="text-right font-semibold px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filtered.map((lead) => {
                  const expanded = expandedId === lead.id
                  return (
                    <React.Fragment key={lead.id}>
                      <tr className="hover:bg-zinc-900/40 transition-colors">
                        <td className="px-5 py-3.5 align-top">
                          <div className="font-semibold text-white">{lead.name}</div>
                          <div className="text-xs text-zinc-500">{lead.email}</div>
                          <div className="text-xs text-zinc-500">{lead.phone}</div>
                        </td>
                        <td className="px-5 py-3.5 align-top hidden md:table-cell">
                          <div className="text-zinc-300 text-xs max-w-[220px] truncate">{lead.service || '—'}</div>
                          <div className="text-zinc-500 text-xs">{lead.budget || ''}</div>
                        </td>
                        <td className="px-5 py-3.5 align-top hidden lg:table-cell text-xs text-zinc-400">
                          {SOURCE_LABELS[lead.source] || lead.source}
                        </td>
                        <td className="px-5 py-3.5 align-top hidden sm:table-cell text-xs text-zinc-400 whitespace-nowrap">
                          {formatDate(lead.createdAt)}
                        </td>
                        <td className="px-5 py-3.5 align-top">
                          <select
                            value={lead.status}
                            disabled={pendingId === lead.id}
                            onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                            className={`text-[11px] font-bold px-2.5 py-1.5 rounded-full border focus:outline-none disabled:opacity-50 ${STATUS_BADGE[lead.status]}`}
                          >
                            {(Object.keys(STATUS_LABELS) as LeadStatus[]).map((s) => (
                              <option key={s} value={s} className="bg-zinc-900 text-white">{STATUS_LABELS[s]}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-5 py-3.5 align-top">
                          <div className="flex items-center gap-1.5 justify-end">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-900/60 text-emerald-400 flex items-center justify-center hover:border-emerald-600 transition-colors"
                              title="تواصل عبر واتساب"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => setExpandedId(expanded ? null : lead.id)}
                              className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center hover:text-white transition-colors"
                              title="تفاصيل"
                            >
                              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => removeLead(lead.id)}
                              disabled={pendingId === lead.id}
                              className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center hover:text-rose-400 hover:border-rose-900/60 transition-colors disabled:opacity-50"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expanded && (
                        <tr className="bg-zinc-950/60">
                          <td colSpan={6} className="px-5 py-4 text-xs text-zinc-400 space-y-1.5">
                            <div className="md:hidden"><span className="text-zinc-500">الخدمة: </span>{lead.service || '—'}</div>
                            <div className="md:hidden"><span className="text-zinc-500">الميزانية: </span>{lead.budget || '—'}</div>
                            {lead.company && <div><span className="text-zinc-500">الشركة: </span>{lead.company}</div>}
                            <div><span className="text-zinc-500">ملاحظات: </span>{lead.notes || '—'}</div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
