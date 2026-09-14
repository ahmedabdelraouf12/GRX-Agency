'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { servicesData, ServiceItem } from '@/lib/data'
import {
  TrendingUp,
  Search,
  Share2,
  Palette,
  Video,
  Code2,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'

interface ServicesProps {
  onSelectService: (serviceName: string) => void
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { t, lang, isRTL } = useLanguage()

  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6" />
      case 'Search':
        return <Search className="w-6 h-6" />
      case 'Share2':
        return <Share2 className="w-6 h-6" />
      case 'Palette':
        return <Palette className="w-6 h-6" />
      case 'Video':
        return <Video className="w-6 h-6" />
      case 'Code2':
        return <Code2 className="w-6 h-6" />
      default:
        return <Sparkles className="w-6 h-6" />
    }
  }

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-purple -top-40 right-10 -z-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('services_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            {t('services_title')}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            {t('services_desc')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service: ServiceItem) => {
            const title = t(service.titleKey)
            const desc = t(service.descKey)
            const deliverables = lang === 'ar' ? service.deliverablesAr : service.deliverablesEn

            return (
              <div
                key={service.id}
                className="glass-card rounded-3xl p-8 flex flex-col justify-between relative group overflow-hidden border border-zinc-800/80"
              >
                {/* Top Ambient Highlight */}
                <div
                  className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${service.color} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
                />

                <div>
                  {/* Card Header: Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {getIcon(service.icon)}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 border border-zinc-800 text-brand-300">
                      {service.roiMetric}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {desc}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2.5 mb-8 border-t border-zinc-800/60 pt-5">
                    {deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => onSelectService(title)}
                  className="w-full py-3 px-4 rounded-xl bg-zinc-900 hover:bg-brand-600 border border-zinc-800 hover:border-brand-500 text-zinc-200 hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>{lang === 'ar' ? 'طلب استشارة للخدمة' : 'Request Service Audit'}</span>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform ${
                      isRTL ? 'group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'
                    } group-hover/btn:-translate-y-1`}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
