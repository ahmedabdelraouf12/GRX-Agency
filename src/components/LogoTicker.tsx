'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { clientLogos } from '@/lib/data'

export const LogoTicker: React.FC = () => {
  const { t } = useLanguage()

  // Repeat the logos list twice for seamless infinite scrolling
  const tickerItems = [...clientLogos, ...clientLogos, ...clientLogos]

  return (
    <section className="py-12 border-y border-zinc-900 bg-zinc-950/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-500 uppercase">
          {t('trusted_title')}
        </p>
      </div>

      {/* Gradient Masks on Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee space-x-12 sm:space-x-16 items-center">
        {tickerItems.map((logo, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 text-zinc-400/60 hover:text-zinc-200 transition-colors font-black tracking-widest text-lg sm:text-xl select-none px-4"
          >
            <span className="h-2 w-2 rounded-full bg-brand-500/40 inline-block mr-2" />
            {logo}
          </div>
        ))}
      </div>
    </section>
  )
}
