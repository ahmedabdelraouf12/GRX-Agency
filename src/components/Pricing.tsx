'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { PricingPlan } from '@/lib/types'
import { Check, Sparkles, Zap, ArrowRight, ArrowLeft } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

interface PricingProps {
  pricingPlans: PricingPlan[]
  onSelectPlan: (planName: string) => void
}

export const Pricing: React.FC<PricingProps> = ({ pricingPlans, onSelectPlan }) => {
  const { t, lang, isRTL } = useLanguage()

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="glow-purple top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('pricing_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            {t('pricing_title')}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            {t('pricing_desc')}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan: PricingPlan, idx: number) => {
            const name = lang === 'ar' ? plan.nameAr : plan.nameEn
            const price = lang === 'ar' ? plan.priceAr : plan.priceEn
            const period = lang === 'ar' ? plan.periodAr : plan.periodEn
            const desc = lang === 'ar' ? plan.descAr : plan.descEn
            const features = lang === 'ar' ? plan.featuresAr : plan.featuresEn

            return (
              <Reveal key={plan.id} index={idx} className="h-full">
              <div
                className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 h-full ${
                  plan.popular
                    ? 'bg-zinc-900/90 border-2 border-brand-500 shadow-2xl shadow-brand-500/20 lg:-translate-y-2'
                    : 'glass-card border border-zinc-800/80'
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 fill-white" />
                      <span>{t('pricing_popular')}</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Description */}
                  <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mb-6 min-h-[40px] leading-relaxed">
                    {desc}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-8 pb-6 border-b border-zinc-800/80">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      {price}
                    </span>
                    {period && (
                      <span className="text-sm font-medium text-zinc-400">{period}</span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3.5 mb-8">
                    {features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                        <div className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Action CTA */}
                <button
                  type="button"
                  onClick={() => onSelectPlan(name)}
                  className={`w-full py-4 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group ${
                    plan.popular
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-600/30'
                      : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white'
                  }`}
                >
                  <span>{t('pricing_cta')}</span>
                  {isRTL ? (
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
