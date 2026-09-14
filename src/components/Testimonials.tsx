'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { testimonialsData } from '@/lib/data'
import { Star, Sparkles, Quote, TrendingUp } from 'lucide-react'

export const Testimonials: React.FC = () => {
  const { t, lang } = useLanguage()

  return (
    <section className="py-24 bg-zinc-950/50 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('testimonials_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            {t('testimonials_title')}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-8 border border-zinc-800/80 flex flex-col justify-between relative group hover:-translate-y-1.5 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-zinc-800/60 -z-0 pointer-events-none group-hover:text-brand-500/20 transition-colors" />

              <div>
                {/* Metric pill & Stars */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 border border-emerald-800/60 text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{item.metric}</span>
                  </span>
                </div>

                {/* Comment */}
                <p className="text-zinc-300 text-sm leading-relaxed mb-8 italic">
                  "{lang === 'ar' ? item.commentAr : item.commentEn}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-800/60">
                <img
                  src={item.avatar}
                  alt={item.nameEn}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-500/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {lang === 'ar' ? item.nameAr : item.nameEn}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {lang === 'ar' ? item.roleAr : item.roleEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
