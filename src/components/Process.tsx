'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Search, Compass, Rocket, TrendingUp, Sparkles } from 'lucide-react'

export const Process: React.FC = () => {
  const { t, lang } = useLanguage()

  const steps = [
    {
      num: t('process_1_num'),
      title: t('process_1_title'),
      desc: t('process_1_desc'),
      icon: <Search className="w-6 h-6 text-cyan-400" />,
      color: 'border-cyan-500/30 group-hover:border-cyan-500/60',
    },
    {
      num: t('process_2_num'),
      title: t('process_2_title'),
      desc: t('process_2_desc'),
      icon: <Compass className="w-6 h-6 text-brand-400" />,
      color: 'border-brand-500/30 group-hover:border-brand-500/60',
    },
    {
      num: t('process_3_num'),
      title: t('process_3_title'),
      desc: t('process_3_desc'),
      icon: <Rocket className="w-6 h-6 text-pink-400" />,
      color: 'border-pink-500/30 group-hover:border-pink-500/60',
    },
    {
      num: t('process_4_num'),
      title: t('process_4_title'),
      desc: t('process_4_desc'),
      icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
      color: 'border-emerald-500/30 group-hover:border-emerald-500/60',
    },
  ]

  return (
    <section id="process" className="py-24 relative overflow-hidden bg-zinc-950/70 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('process_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            {t('process_title')}
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-8 relative group border border-zinc-800/80 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300"
            >
              <div>
                {/* Number Badge & Icon */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl font-black text-zinc-700 group-hover:text-brand-400 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Progress indicator bottom bar */}
              <div className="mt-8 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-500 to-accent-cyan w-0 group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
