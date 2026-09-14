'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { CaseStudy } from '@/lib/types'
import { Sparkles, ArrowUpRight, TrendingUp, X, CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

interface PortfolioProps {
  portfolio: CaseStudy[]
  onOpenContact: () => void
}

export const Portfolio: React.FC<PortfolioProps> = ({ portfolio, onOpenContact }) => {
  const { t, lang, isRTL } = useLanguage()
  const [filter, setFilter] = useState<string>('all')
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)

  const filters = [
    { key: 'all', label: t('filter_all') },
    { key: 'ads', label: t('filter_ads') },
    { key: 'branding', label: t('filter_branding') },
    { key: 'ecommerce', label: t('filter_ecommerce') },
    { key: 'video', label: t('filter_video') },
  ]

  const filteredItems = filter === 'all'
    ? portfolio
    : portfolio.filter((item) => item.category === filter)

  return (
    <section id="work" className="py-24 bg-zinc-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('portfolio_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            {t('portfolio_title')}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            {t('portfolio_desc')}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                filter === f.key
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item, idx) => {
            const title = lang === 'ar' ? item.titleAr : item.titleEn
            const categoryLabel = lang === 'ar' ? item.categoryLabelAr : item.categoryLabelEn
            const stat1Label = lang === 'ar' ? item.stat1LabelAr : item.stat1LabelEn
            const stat2Label = lang === 'ar' ? item.stat2LabelAr : item.stat2LabelEn

            return (
              <Reveal key={item.id} index={idx} className="h-full">
              <div
                onClick={() => setSelectedCase(item)}
                className="glass-card rounded-3xl overflow-hidden cursor-pointer group flex flex-col border border-zinc-800/80 h-full"
              >
                {/* Image & Badges */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={item.image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {/* Client Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                      {item.client}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1.5 rounded-xl bg-brand-600/90 backdrop-blur-md text-xs font-semibold text-white">
                      {categoryLabel}
                    </span>
                  </div>

                  {/* Highlight Metrics Bar */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 rounded-2xl p-3 px-5">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      <div>
                        <div className="text-lg font-black text-white leading-none">{item.stat1}</div>
                        <div className="text-[11px] text-zinc-400">{stat1Label}</div>
                      </div>
                    </div>
                    <div className="h-7 w-[1px] bg-zinc-700" />
                    <div>
                      <div className="text-lg font-black gradient-text leading-none">{item.stat2}</div>
                      <div className="text-[11px] text-zinc-400">{stat2Label}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-2">
                      {lang === 'ar' ? item.summaryAr : item.summaryEn}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-800/80">
                    <span className="text-xs font-semibold text-brand-400 group-hover:underline">
                      {lang === 'ar' ? 'عرض تفاصيل دراسة الحالة' : 'Read Case Study'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} group-hover:-translate-y-0.5 transition-transform`} />
                    </div>
                  </div>
                </div>
              </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Case Study Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-zinc-900/80 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={selectedCase.image}
                alt={selectedCase.client}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs uppercase font-bold text-brand-400 tracking-wider">
                  {selectedCase.client}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {lang === 'ar' ? selectedCase.titleAr : selectedCase.titleEn}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Metrics Row */}
              <div className="grid grid-cols-2 gap-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 text-center">
                <div>
                  <div className="text-2xl font-black text-emerald-400">{selectedCase.stat1}</div>
                  <div className="text-xs text-zinc-400">{lang === 'ar' ? selectedCase.stat1LabelAr : selectedCase.stat1LabelEn}</div>
                </div>
                <div>
                  <div className="text-2xl font-black gradient-text">{selectedCase.stat2}</div>
                  <div className="text-xs text-zinc-400">{lang === 'ar' ? selectedCase.stat2LabelAr : selectedCase.stat2LabelEn}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-zinc-300 uppercase mb-2">
                  {lang === 'ar' ? 'ملخص الاستراتيجية والنتائج' : 'Strategy & Impact'}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {lang === 'ar' ? selectedCase.summaryAr : selectedCase.summaryEn}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCase(null)
                    onOpenContact()
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'حقق نتائج مماثلة لعلامتك' : 'Scale Similar Results For Your Brand'}</span>
                </button>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-sm font-medium"
                >
                  {lang === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
