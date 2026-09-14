'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react'

export function Field({
  label,
  value,
  onChange,
  placeholder,
  dir,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  dir?: 'rtl' | 'ltr'
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-zinc-400 mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir={dir}
        className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none"
      />
    </div>
  )
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
  dir,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  dir?: 'rtl' | 'ltr'
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-zinc-400 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        dir={dir}
        className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none resize-none"
      />
    </div>
  )
}

export function ListField({
  label,
  value,
  onChange,
  dir,
}: {
  label: string
  value: string[]
  onChange: (v: string[]) => void
  dir?: 'rtl' | 'ltr'
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-zinc-400 mb-1">{label} <span className="font-normal text-zinc-600">(سطر لكل عنصر)</span></label>
      <textarea
        value={value.join('\n')}
        onChange={(e) => onChange(e.target.value.split('\n'))}
        rows={4}
        dir={dir}
        className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none resize-none"
      />
    </div>
  )
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-zinc-400 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-center gap-2 text-xs text-zinc-300 font-medium cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-brand-500"
      />
      <span>{label}</span>
    </label>
  )
}

export function AccordionItem({
  title,
  subtitle,
  onDelete,
  children,
  defaultOpen = false,
}: {
  title: string
  subtitle?: string
  onDelete: () => void
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-950/40">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white truncate">{title || 'بدون عنوان'}</div>
          {subtitle && <div className="text-xs text-zinc-500 truncate">{subtitle}</div>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (confirm('حذف هذا العنصر نهائياً؟')) onDelete()
            }}
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-900/60 flex items-center justify-center transition-colors"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {open ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
        </div>
      </div>
      {open && <div className="px-4 pb-4 pt-1 border-t border-zinc-800/60 grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>}
    </div>
  )
}
