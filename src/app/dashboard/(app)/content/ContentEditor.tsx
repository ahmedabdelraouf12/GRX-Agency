'use client'

import React, { useState } from 'react'
import { Plus, Save, Loader2, CheckCircle2 } from 'lucide-react'
import { SiteContent, ServiceItem, CaseStudy, PricingPlan, Testimonial } from '@/lib/types'
import { Field, TextAreaField, ListField, SelectField, CheckboxField, AccordionItem } from './fields'
import { apiUrl } from '@/lib/api'
import { useProtectedApi } from '../useProtectedApi'

interface ContentEditorProps {
  initialContent: SiteContent
}

const TABS = [
  { key: 'settings', label: 'إعدادات التواصل' },
  { key: 'services', label: 'الخدمات' },
  { key: 'portfolio', label: 'أعمالنا' },
  { key: 'pricing', label: 'الباقات' },
  { key: 'testimonials', label: 'آراء العملاء' },
] as const

type TabKey = typeof TABS[number]['key']

const ICON_OPTIONS = ['TrendingUp', 'Search', 'Share2', 'Palette', 'Video', 'Code2'].map((v) => ({ value: v, label: v }))
const CATEGORY_OPTIONS = [
  { value: 'ads', label: 'ads' },
  { value: 'branding', label: 'branding' },
  { value: 'ecommerce', label: 'ecommerce' },
  { value: 'video', label: 'video' },
]

function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

export default function ContentEditor({ initialContent }: ContentEditorProps) {
  const protectedFetch = useProtectedApi()
  const [content, setContent] = useState<SiteContent>(initialContent)
  // Snapshot of what the server currently has, used to diff against on
  // save - the .NET API has no bulk "replace everything" endpoint, only
  // per-item create/update/delete, so we figure out which of those to call.
  const [originalContent, setOriginalContent] = useState<SiteContent>(initialContent)
  const [tab, setTab] = useState<TabKey>('settings')
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [error, setError] = useState('')

  async function syncCollection<T extends { id?: string }>(endpoint: string, original: T[], current: T[]) {
    const currentIds = new Set(current.map((i) => i.id).filter(Boolean) as string[])
    const originalIds = new Set(original.map((i) => i.id).filter(Boolean) as string[])

    for (const item of original) {
      if (item.id && !currentIds.has(item.id)) {
        await protectedFetch(`${endpoint}/${item.id}`, { method: 'DELETE' })
      }
    }
    for (const item of current) {
      if (item.id && originalIds.has(item.id)) {
        await protectedFetch(`${endpoint}/${item.id}`, { method: 'PUT', body: JSON.stringify(item) })
      } else {
        await protectedFetch(endpoint, { method: 'POST', body: JSON.stringify(item) })
      }
    }
  }

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await protectedFetch('/api/settings', { method: 'PUT', body: JSON.stringify(content.settings) })
      await syncCollection('/api/services', originalContent.services, content.services)
      await syncCollection('/api/portfolio', originalContent.portfolio, content.portfolio)
      await syncCollection('/api/pricing', originalContent.pricing, content.pricing)
      await syncCollection('/api/testimonials', originalContent.testimonials, content.testimonials)

      // Reload the canonical state (server-assigned ids for new items, etc.)
      const res = await fetch(apiUrl('/api/content'), { cache: 'no-store' })
      if (res.ok) {
        const fresh = await res.json()
        setContent(fresh)
        setOriginalContent(fresh)
      } else {
        setOriginalContent(content)
      }
      setSavedAt(new Date())
    } catch {
      setError('تعذر حفظ التعديلات، حاول مرة أخرى')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">محتوى الموقع</h1>
          <p className="text-sm text-zinc-400 mt-1">أي تعديل هنا يظهر على الموقع مباشرة بعد الحفظ.</p>
        </div>
        <div className="flex items-center gap-3">
          {savedAt && !saving && (
            <span className="text-xs text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>تم الحفظ</span>
            </span>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center gap-2 disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>حفظ التعديلات</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="text-xs text-rose-400 bg-rose-950/40 border border-rose-900/60 rounded-xl px-3 py-2">{error}</div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-800/80 pb-3">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              tab === t.key
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'settings' && (
        <div className="glass-card rounded-2xl border border-zinc-800/80 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          <Field
            label="رقم واتساب (بصيغة دولية بدون + أو مسافات، مثال 201090162098)"
            value={content.settings.whatsappNumber}
            onChange={(v) => setContent({ ...content, settings: { ...content.settings, whatsappNumber: v } })}
            dir="ltr"
          />
          <Field
            label="البريد الإلكتروني"
            value={content.settings.contactEmail}
            onChange={(v) => setContent({ ...content, settings: { ...content.settings, contactEmail: v } })}
            dir="ltr"
          />
          <Field
            label="العنوان (عربي)"
            value={content.settings.addressAr}
            onChange={(v) => setContent({ ...content, settings: { ...content.settings, addressAr: v } })}
          />
          <Field
            label="العنوان (إنجليزي)"
            value={content.settings.addressEn}
            onChange={(v) => setContent({ ...content, settings: { ...content.settings, addressEn: v } })}
            dir="ltr"
          />
          <Field
            label="ساعات العمل (عربي)"
            value={content.settings.hoursAr}
            onChange={(v) => setContent({ ...content, settings: { ...content.settings, hoursAr: v } })}
          />
          <Field
            label="ساعات العمل (إنجليزي)"
            value={content.settings.hoursEn}
            onChange={(v) => setContent({ ...content, settings: { ...content.settings, hoursEn: v } })}
            dir="ltr"
          />
        </div>
      )}

      {tab === 'services' && (
        <div className="space-y-3">
          {content.services.map((service, idx) => (
            <AccordionItem
              key={service.id}
              title={service.titleAr}
              subtitle={service.titleEn}
              onDelete={() => setContent({ ...content, services: content.services.filter((_, i) => i !== idx) })}
            >
              <Field label="العنوان (عربي)" value={service.titleAr} onChange={(v) => updateAt(setContent, content, 'services', idx, { titleAr: v })} />
              <Field label="العنوان (إنجليزي)" value={service.titleEn} onChange={(v) => updateAt(setContent, content, 'services', idx, { titleEn: v })} dir="ltr" />
              <TextAreaField label="الوصف (عربي)" value={service.descAr} onChange={(v) => updateAt(setContent, content, 'services', idx, { descAr: v })} />
              <TextAreaField label="الوصف (إنجليزي)" value={service.descEn} onChange={(v) => updateAt(setContent, content, 'services', idx, { descEn: v })} dir="ltr" />
              <SelectField label="الأيقونة" value={service.icon} onChange={(v) => updateAt(setContent, content, 'services', idx, { icon: v })} options={ICON_OPTIONS} />
              <Field label="الشارة (Badge)" value={service.badge} onChange={(v) => updateAt(setContent, content, 'services', idx, { badge: v })} dir="ltr" />
              <Field label="مؤشر العائد (roiMetric)" value={service.roiMetric} onChange={(v) => updateAt(setContent, content, 'services', idx, { roiMetric: v })} dir="ltr" />
              <Field label="تدرج اللون (Tailwind, مثال from-blue-500 to-cyan-500)" value={service.color} onChange={(v) => updateAt(setContent, content, 'services', idx, { color: v })} dir="ltr" />
              <ListField label="المخرجات (عربي)" value={service.deliverablesAr} onChange={(v) => updateAt(setContent, content, 'services', idx, { deliverablesAr: v })} />
              <ListField label="المخرجات (إنجليزي)" value={service.deliverablesEn} onChange={(v) => updateAt(setContent, content, 'services', idx, { deliverablesEn: v })} dir="ltr" />
            </AccordionItem>
          ))}
          <AddButton
            label="إضافة خدمة جديدة"
            onClick={() => {
              const item: ServiceItem = {
                id: newId('service'),
                titleAr: 'خدمة جديدة',
                titleEn: 'New Service',
                descAr: '',
                descEn: '',
                icon: 'Sparkles',
                badge: '',
                roiMetric: '',
                deliverablesAr: [],
                deliverablesEn: [],
                color: 'from-brand-500 to-indigo-600',
              }
              setContent({ ...content, services: [...content.services, item] })
            }}
          />
        </div>
      )}

      {tab === 'portfolio' && (
        <div className="space-y-3">
          {content.portfolio.map((item, idx) => (
            <AccordionItem
              key={item.id}
              title={item.titleAr}
              subtitle={`${item.client} · ${item.category}`}
              onDelete={() => setContent({ ...content, portfolio: content.portfolio.filter((_, i) => i !== idx) })}
            >
              <Field label="العنوان (عربي)" value={item.titleAr} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { titleAr: v })} />
              <Field label="العنوان (إنجليزي)" value={item.titleEn} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { titleEn: v })} dir="ltr" />
              <Field label="اسم العميل" value={item.client} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { client: v })} dir="ltr" />
              <Field label="رابط الصورة" value={item.image} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { image: v })} dir="ltr" />
              <SelectField label="التصنيف" value={item.category} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { category: v as CaseStudy['category'] })} options={CATEGORY_OPTIONS} />
              <Field label="اسم التصنيف (عربي)" value={item.categoryLabelAr} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { categoryLabelAr: v })} />
              <Field label="اسم التصنيف (إنجليزي)" value={item.categoryLabelEn} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { categoryLabelEn: v })} dir="ltr" />
              <div />
              <Field label="القيمة الإحصائية الأولى" value={item.stat1} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { stat1: v })} dir="ltr" />
              <Field label="تسمية القيمة الأولى (عربي)" value={item.stat1LabelAr} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { stat1LabelAr: v })} />
              <Field label="تسمية القيمة الأولى (إنجليزي)" value={item.stat1LabelEn} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { stat1LabelEn: v })} dir="ltr" />
              <Field label="القيمة الإحصائية الثانية" value={item.stat2} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { stat2: v })} dir="ltr" />
              <Field label="تسمية القيمة الثانية (عربي)" value={item.stat2LabelAr} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { stat2LabelAr: v })} />
              <Field label="تسمية القيمة الثانية (إنجليزي)" value={item.stat2LabelEn} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { stat2LabelEn: v })} dir="ltr" />
              <TextAreaField label="الملخص (عربي)" value={item.summaryAr} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { summaryAr: v })} />
              <TextAreaField label="الملخص (إنجليزي)" value={item.summaryEn} onChange={(v) => updateAt(setContent, content, 'portfolio', idx, { summaryEn: v })} dir="ltr" />
            </AccordionItem>
          ))}
          <AddButton
            label="إضافة عمل جديد"
            onClick={() => {
              const item: CaseStudy = {
                id: newId('case'),
                titleAr: 'مشروع جديد',
                titleEn: 'New Case Study',
                category: 'ads',
                categoryLabelAr: '',
                categoryLabelEn: '',
                client: '',
                image: '',
                stat1: '',
                stat1LabelAr: '',
                stat1LabelEn: '',
                stat2: '',
                stat2LabelAr: '',
                stat2LabelEn: '',
                summaryAr: '',
                summaryEn: '',
              }
              setContent({ ...content, portfolio: [...content.portfolio, item] })
            }}
          />
        </div>
      )}

      {tab === 'pricing' && (
        <div className="space-y-3">
          {content.pricing.map((plan, idx) => (
            <AccordionItem
              key={plan.id}
              title={plan.nameAr}
              subtitle={`${plan.priceAr} ${plan.periodAr}`}
              onDelete={() => setContent({ ...content, pricing: content.pricing.filter((_, i) => i !== idx) })}
            >
              <Field label="اسم الباقة (عربي)" value={plan.nameAr} onChange={(v) => updateAt(setContent, content, 'pricing', idx, { nameAr: v })} />
              <Field label="اسم الباقة (إنجليزي)" value={plan.nameEn} onChange={(v) => updateAt(setContent, content, 'pricing', idx, { nameEn: v })} dir="ltr" />
              <Field label="السعر (عربي)" value={plan.priceAr} onChange={(v) => updateAt(setContent, content, 'pricing', idx, { priceAr: v })} dir="ltr" />
              <Field label="السعر (إنجليزي)" value={plan.priceEn} onChange={(v) => updateAt(setContent, content, 'pricing', idx, { priceEn: v })} dir="ltr" />
              <Field label="الفترة (عربي، مثال: / شهرياً)" value={plan.periodAr} onChange={(v) => updateAt(setContent, content, 'pricing', idx, { periodAr: v })} />
              <Field label="الفترة (إنجليزي، مثال: / month)" value={plan.periodEn} onChange={(v) => updateAt(setContent, content, 'pricing', idx, { periodEn: v })} dir="ltr" />
              <Field label="الشارة (اختياري)" value={plan.badge || ''} onChange={(v) => updateAt(setContent, content, 'pricing', idx, { badge: v })} />
              <div className="flex items-center">
                <CheckboxField label="الباقة الأكثر طلباً (Popular)" checked={!!plan.popular} onChange={(v) => updateAt(setContent, content, 'pricing', idx, { popular: v })} />
              </div>
              <TextAreaField label="الوصف (عربي)" value={plan.descAr} onChange={(v) => updateAt(setContent, content, 'pricing', idx, { descAr: v })} />
              <TextAreaField label="الوصف (إنجليزي)" value={plan.descEn} onChange={(v) => updateAt(setContent, content, 'pricing', idx, { descEn: v })} dir="ltr" />
              <ListField label="المميزات (عربي)" value={plan.featuresAr} onChange={(v) => updateAt(setContent, content, 'pricing', idx, { featuresAr: v })} />
              <ListField label="المميزات (إنجليزي)" value={plan.featuresEn} onChange={(v) => updateAt(setContent, content, 'pricing', idx, { featuresEn: v })} dir="ltr" />
            </AccordionItem>
          ))}
          <AddButton
            label="إضافة باقة جديدة"
            onClick={() => {
              const item: PricingPlan = {
                id: newId('plan'),
                nameAr: 'باقة جديدة',
                nameEn: 'New Plan',
                priceAr: '',
                priceEn: '',
                periodAr: '/ شهرياً',
                periodEn: '/ month',
                descAr: '',
                descEn: '',
                featuresAr: [],
                featuresEn: [],
              }
              setContent({ ...content, pricing: [...content.pricing, item] })
            }}
          />
        </div>
      )}

      {tab === 'testimonials' && (
        <div className="space-y-3">
          {content.testimonials.map((item, idx) => (
            <AccordionItem
              key={item.id}
              title={item.nameAr}
              subtitle={item.roleAr}
              onDelete={() => setContent({ ...content, testimonials: content.testimonials.filter((_, i) => i !== idx) })}
            >
              <Field label="الاسم (عربي)" value={item.nameAr} onChange={(v) => updateAt(setContent, content, 'testimonials', idx, { nameAr: v })} />
              <Field label="الاسم (إنجليزي)" value={item.nameEn} onChange={(v) => updateAt(setContent, content, 'testimonials', idx, { nameEn: v })} dir="ltr" />
              <Field label="الوظيفة (عربي)" value={item.roleAr} onChange={(v) => updateAt(setContent, content, 'testimonials', idx, { roleAr: v })} />
              <Field label="الوظيفة (إنجليزي)" value={item.roleEn} onChange={(v) => updateAt(setContent, content, 'testimonials', idx, { roleEn: v })} dir="ltr" />
              <Field label="رابط الصورة الشخصية" value={item.avatar} onChange={(v) => updateAt(setContent, content, 'testimonials', idx, { avatar: v })} dir="ltr" />
              <Field label="المؤشر (metric)" value={item.metric} onChange={(v) => updateAt(setContent, content, 'testimonials', idx, { metric: v })} dir="ltr" />
              <Field
                label="التقييم (1-5)"
                value={String(item.rating)}
                onChange={(v) => updateAt(setContent, content, 'testimonials', idx, { rating: Math.max(1, Math.min(5, Number(v) || 5)) })}
              />
              <div />
              <TextAreaField label="التعليق (عربي)" value={item.commentAr} onChange={(v) => updateAt(setContent, content, 'testimonials', idx, { commentAr: v })} />
              <TextAreaField label="التعليق (إنجليزي)" value={item.commentEn} onChange={(v) => updateAt(setContent, content, 'testimonials', idx, { commentEn: v })} dir="ltr" />
            </AccordionItem>
          ))}
          <AddButton
            label="إضافة رأي عميل جديد"
            onClick={() => {
              const item: Testimonial = {
                id: newId('testimonial'),
                nameAr: 'اسم العميل',
                nameEn: 'Client Name',
                roleAr: '',
                roleEn: '',
                avatar: '',
                commentAr: '',
                commentEn: '',
                rating: 5,
                metric: '',
              }
              setContent({ ...content, testimonials: [...content.testimonials, item] })
            }}
          />
        </div>
      )}
    </div>
  )
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 rounded-2xl border-2 border-dashed border-zinc-800 hover:border-brand-600 text-zinc-400 hover:text-brand-300 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
    >
      <Plus className="w-4 h-4" />
      <span>{label}</span>
    </button>
  )
}

// Generic "update one field on the item at `idx` inside `key` array" helper,
// used by every tab above to avoid repeating the same immutable-update
// boilerplate for each input's onChange.
function updateAt<K extends 'services' | 'portfolio' | 'pricing' | 'testimonials'>(
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>,
  content: SiteContent,
  key: K,
  idx: number,
  patch: Partial<SiteContent[K][number]>
) {
  const list = content[key] as unknown as Array<Record<string, unknown>>
  const next = list.map((it, i) => (i === idx ? { ...it, ...patch } : it))
  setContent({ ...content, [key]: next } as SiteContent)
}
