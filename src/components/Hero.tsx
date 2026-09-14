'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Sparkles, ArrowRight, ArrowLeft, PlayCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeroProps {
  onOpenContact: () => void
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const { t, isRTL } = useLanguage()

  const stats = [
    { value: t('hero_stat_sales'), label: t('hero_stat_sales_sub') },
    { value: t('hero_stat_roas'), label: t('hero_stat_roas_sub') },
    { value: t('hero_stat_clients'), label: t('hero_stat_clients_sub') },
  ]

  return (
    <section className="relative w-full pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Ambient glow orbs, matching the rest of the site */}
      <div className="glow-purple top-0 -right-20 -z-10 opacity-40" />
      <div className="glow-cyan top-40 -left-20 -z-10 opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Brand mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-cyan p-0.5 shadow-lg shadow-brand-500/25 mb-6"
          >
            <div className="w-full h-full bg-[#09090b] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-brand-400" />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-300 text-xs font-bold mb-6"
          >
            <span>{t('hero_badge')}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6"
          >
            <span className="block">{t('hero_title_1')}</span>
            <span className="block gradient-text">{t('hero_title_gradient')}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-10"
          >
            {t('hero_desc')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-600/30 hover:shadow-brand-600/50 transform hover:-translate-y-0.5 transition-all"
            >
              <span>{t('hero_cta_primary')}</span>
              {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </button>
            <a
              href="#work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white font-bold text-sm sm:text-base transition-all"
            >
              <PlayCircle className="w-5 h-5" />
              <span>{t('hero_cta_secondary')}</span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-zinc-800/80"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-4xl font-black text-white tracking-tight">{stat.value}</div>
                <div className="text-[11px] sm:text-xs text-zinc-500 mt-1.5 leading-snug">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
