'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Calculator, Sparkles, TrendingUp, Users, DollarSign, ArrowRight, ArrowLeft } from 'lucide-react'

interface RoiCalculatorProps {
  onClaimPlan: (budget: string, objective: string) => void
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onClaimPlan }) => {
  const { t, lang, isRTL } = useLanguage()

  // Budget slider state
  const isAr = lang === 'ar'
  const minBudget = isAr ? 15000 : 1000
  const maxBudget = isAr ? 300000 : 25000
  const step = isAr ? 5000 : 500

  const [budget, setBudget] = useState<number>(isAr ? 45000 : 3500)
  const [objective, setObjective] = useState<'sales' | 'leads' | 'brand'>('sales')

  // Projections calculation logic
  const roasMultiplier = objective === 'sales' ? 4.6 : objective === 'leads' ? 5.2 : 3.8
  const projectedRevenue = Math.round(budget * roasMultiplier)

  const estimatedLeads = objective === 'leads'
    ? Math.round(budget / (isAr ? 75 : 12))
    : objective === 'sales'
    ? Math.round(budget / (isAr ? 95 : 18))
    : Math.round(budget / (isAr ? 30 : 5))

  const estimatedReach = Math.round((budget * (isAr ? 45 : 320)) / 1000)

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const currencyLabel = isAr ? 'ج.م' : '$'

  const objectiveName =
    objective === 'sales'
      ? t('calc_goal_sales')
      : objective === 'leads'
      ? t('calc_goal_leads')
      : t('calc_goal_brand')

  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="glow-cyan -top-20 left-1/4 -z-10 opacity-30" />
      <div className="glow-purple bottom-0 right-1/4 -z-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-bold mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t('calc_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            {t('calc_title')}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            {t('calc_desc')}
          </p>
        </div>

        {/* Calculator Body */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-12 border border-zinc-800/80 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Objective Selector */}
              <div>
                <label className="block text-sm font-bold text-zinc-200 mb-3">
                  {t('calc_goal_label')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setObjective('sales')}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                      objective === 'sales'
                        ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-600/30'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {isAr ? '🛒 مبيعات وتجارة' : '🛒 E-Commerce'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setObjective('leads')}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                      objective === 'leads'
                        ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-600/30'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {isAr ? '🎯 ليدز وعملاء' : '🎯 Lead Gen'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setObjective('brand')}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                      objective === 'brand'
                        ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-600/30'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {isAr ? '🚀 انتشار وبراند' : '🚀 Brand Awareness'}
                  </button>
                </div>
              </div>

              {/* Slider Component */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-zinc-200">
                    {t('calc_budget_label')}
                  </label>
                  <span className="text-xl font-black text-brand-400 bg-brand-950/60 border border-brand-800/60 px-3.5 py-1 rounded-xl">
                    {formatNumber(budget)} {currencyLabel}
                  </span>
                </div>

                <input
                  type="range"
                  min={minBudget}
                  max={maxBudget}
                  step={step}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-500 focus:outline-none"
                />

                <div className="flex justify-between text-[11px] text-zinc-500 mt-2">
                  <span>{formatNumber(minBudget)} {currencyLabel}</span>
                  <span>{formatNumber(maxBudget / 2)} {currencyLabel}</span>
                  <span>{formatNumber(maxBudget)}+ {currencyLabel}</span>
                </div>
              </div>

              {/* Strategy Highlights */}
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 text-xs text-zinc-400 leading-relaxed space-y-1">
                <div className="text-zinc-300 font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  <span>{isAr ? 'استراتيجية التحسين المتوقعة:' : 'Optimization Strategy:'}</span>
                </div>
                <p>
                  {isAr
                    ? '• توزيع مدروس للميزانية: 65% حملات تحويل باردة (Top of Funnel)، 25% إعادة استهداف (Retargeting)، و10% اختبار إبداعي.'
                    : '• Calculated budget allocation: 65% cold acquisition (TOF), 25% dynamic retargeting, 10% creative testing.'}
                </p>
              </div>
            </div>

            {/* Right Projected Results Box (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 sm:p-8 rounded-3xl border border-brand-500/20 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase font-extrabold text-brand-400 tracking-wider">
                  {isAr ? 'النتائج المتوقعة شهرياً' : 'Projected Monthly Outcome'}
                </span>

                {/* Projected Revenue */}
                <div className="mt-4 mb-6">
                  <div className="text-xs text-zinc-400 mb-1">{t('calc_result_expected_sales')}</div>
                  <div className="text-3xl sm:text-4xl font-black text-white flex items-center gap-2">
                    <span className="gradient-text">{formatNumber(projectedRevenue)}</span>
                    <span className="text-lg font-bold text-zinc-400">{currencyLabel}</span>
                  </div>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/80 pt-4">
                  <div>
                    <div className="text-xs text-zinc-400 mb-0.5">{t('calc_result_roas')}</div>
                    <div className="text-xl font-bold text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{roasMultiplier}x</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 mb-0.5">{t('calc_result_leads')}</div>
                    <div className="text-xl font-bold text-white flex items-center gap-1">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span>~{formatNumber(estimatedLeads)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onClaimPlan(`${formatNumber(budget)} ${currencyLabel}`, objectiveName)}
                className="w-full py-4 px-4 bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/30 hover:shadow-brand-600/50 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{t('calc_result_cta')}</span>
                {isRTL ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
