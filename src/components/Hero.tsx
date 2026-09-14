'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { ArrowRight, ArrowLeft, Play, TrendingUp, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

interface HeroProps {
  onOpenContact: () => void
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const { t, isRTL } = useLanguage()

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Ambient Lighting Orbs */}
      <div className="glow-purple top-10 left-1/2 -translate-x-1/2 -z-10 opacity-70" />
      <div className="glow-cyan -top-20 -left-20 -z-10 opacity-40" />
      <div className="glow-purple bottom-10 right-0 -z-10 opacity-30" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2315_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2315_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-950/60 border border-brand-800/60 text-brand-300 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md shadow-lg shadow-brand-950/50 animate-pulse-slow">
            <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-ping" />
            <span>{t('hero_badge')}</span>
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.15] sm:leading-[1.1] text-white mb-6">
            {t('hero_title_1')}{' '}
            <span className="gradient-text block mt-1">
              {t('hero_title_gradient')}
            </span>
          </h1>

          {/* Description Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-10">
            {t('hero_desc')}
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 group"
            >
              <span>{t('hero_cta_primary')}</span>
              {isRTL ? (
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              )}
            </button>

            <a
              href="#work"
              className="w-full sm:w-auto px-7 py-4 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-600 text-zinc-200 hover:text-white font-semibold text-base rounded-2xl backdrop-blur-md transition-all flex items-center justify-center gap-2.5"
            >
              <Play className="w-4 h-4 text-brand-400 fill-brand-400/20" />
              <span>{t('hero_cta_secondary')}</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-zinc-400 mb-16">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ضمان عائد استثمار إعلاني ROAS</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              <span>تقارير شفافة ولحظية 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent-cyan" />
              <span>إطلاق أسرع للحملات خلال 48 ساعة</span>
            </div>
          </div>
        </div>

        {/* Floating Metrics Showcase Box */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-zinc-700/50 via-zinc-800/30 to-zinc-900/50 shadow-2xl">
            <div className="bg-zinc-950/90 rounded-[22px] p-6 sm:p-10 backdrop-blur-xl border border-white/5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-zinc-800/80 text-center">
                {/* Stat 1 */}
                <div className="flex flex-col items-center justify-center p-2">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2 flex items-center gap-2">
                    {t('hero_stat_sales')}
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </span>
                  <span className="text-sm font-medium text-zinc-400">
                    {t('hero_stat_sales_sub')}
                  </span>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center justify-center p-2 pt-6 sm:pt-2">
                  <span className="text-4xl sm:text-5xl font-black gradient-text tracking-tight mb-2">
                    {t('hero_stat_roas')}
                  </span>
                  <span className="text-sm font-medium text-zinc-400">
                    {t('hero_stat_roas_sub')}
                  </span>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center justify-center p-2 pt-6 sm:pt-2">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
                    {t('hero_stat_clients')}
                  </span>
                  <span className="text-sm font-medium text-zinc-400">
                    {t('hero_stat_clients_sub')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
