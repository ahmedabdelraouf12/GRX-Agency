'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Sparkles, Send, Check } from 'lucide-react'

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
      setSubscribed(false)
    }, 4000)
  }

  const isAr = lang === 'ar'

  return (
    <footer className="bg-[#060608] border-t border-zinc-900 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-cyan p-0.5 shadow-lg shadow-brand-500/25">
                <div className="w-full h-full bg-[#09090b] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-brand-400" />
                </div>
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                GRX <span className="text-brand-400 font-normal">AGENCY</span>
              </span>
            </a>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              {t('footer_desc')}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {['Twitter', 'Instagram', 'LinkedIn', 'YouTube', 'Facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 hover:text-white hover:border-brand-500 transition-colors"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('footer_quick_links')}
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><a href="#services" className="hover:text-brand-300 transition-colors">{t('nav_services')}</a></li>
              <li><a href="#work" className="hover:text-brand-300 transition-colors">{t('nav_work')}</a></li>
              <li><a href="#calculator" className="hover:text-brand-300 transition-colors">{t('nav_calculator')}</a></li>
              <li><a href="#process" className="hover:text-brand-300 transition-colors">{t('nav_process')}</a></li>
              <li><a href="#pricing" className="hover:text-brand-300 transition-colors">{t('nav_pricing')}</a></li>
            </ul>
          </div>

          {/* Col 3: Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('footer_services')}
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><a href="#services" className="hover:text-brand-300 transition-colors">Media Buying</a></li>
              <li><a href="#services" className="hover:text-brand-300 transition-colors">SEO & CRO</a></li>
              <li><a href="#services" className="hover:text-brand-300 transition-colors">Social Media</a></li>
              <li><a href="#services" className="hover:text-brand-300 transition-colors">Branding Design</a></li>
              <li><a href="#services" className="hover:text-brand-300 transition-colors">Next.js Web Dev</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('footer_newsletter_title')}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {t('footer_newsletter_desc')}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder={isAr ? 'أدخل بريدك الإلكتروني' : 'Enter your work email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="absolute left-1.5 top-1.5 bottom-1.5 px-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg flex items-center justify-center text-xs transition-colors"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-medium">
                  {isAr ? 'تم الاشتراك بنجاح في النشرة!' : 'Successfully subscribed!'}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>{t('footer_rights')}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">{isAr ? 'الشروط والأحكام' : 'Terms of Service'}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
