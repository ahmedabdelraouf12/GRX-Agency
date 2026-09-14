'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { buildWhatsAppLeadUrl, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '@/lib/whatsapp'

interface ContactSectionProps {
  initialService?: string
  initialBudget?: string
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = '',
  initialBudget = '',
}) => {
  const { t, lang } = useLanguage()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService,
    budget: initialBudget,
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Update form if initial props change
  React.useEffect(() => {
    if (initialService) setFormData((prev) => ({ ...prev, service: initialService }))
    if (initialBudget) setFormData((prev) => ({ ...prev, budget: initialBudget }))
    // Picking a new package/plan is a fresh request - bring the form back
    // even if a previous message was already sent, so another one can go out.
    if (initialService || initialBudget) setIsSuccess(false)
  }, [initialService, initialBudget])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const whatsappUrl = buildWhatsAppLeadUrl(formData, lang === 'ar')

    // Simulate instant processing & validation
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Hand the lead straight to WhatsApp with the form data pre-filled
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      } catch (err) {
        // Fallback gracefully if canvas isn't supported
      }
    }, 800)
  }

  const isAr = lang === 'ar'

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="glow-purple bottom-10 left-10 -z-10 opacity-30" />
      <div className="glow-cyan top-10 right-10 -z-10 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('contact_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            {t('contact_title')}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            {t('contact_desc')}
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-zinc-800/80 space-y-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {isAr ? 'تواصل معنا مباشرة' : 'Direct Inquiries'}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {isAr
                  ? 'هل لديك استفسار عاجل أو ترغب في بدء حملتك فوراً؟ فريقنا متاح للتواصل السريع عبر واتساب والهاتف.'
                  : 'Have an urgent campaign launch or questions? Our growth leads are available directly on WhatsApp and phone.'}
              </p>

              <div className="space-y-4 pt-2">
                {/* WhatsApp Direct */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 hover:border-emerald-500 text-emerald-300 hover:text-emerald-200 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/80 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">{isAr ? 'محادثة فورية عبر واتساب' : 'Chat on WhatsApp'}</div>
                    <div className="text-sm font-bold">{WHATSAPP_DISPLAY}</div>
                  </div>
                </a>

                {/* Email */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">{isAr ? 'البريد الإلكتروني' : 'Email Us'}</div>
                    <div className="text-sm font-bold text-white">growth@apexagency.digital</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">{isAr ? 'المقر الرئيسي' : 'Headquarters'}</div>
                    <div className="text-sm font-bold text-white">
                      {isAr ? 'القاهرة الجديدة، مصر / دبي، الإمارات' : 'New Cairo, Egypt / Dubai, UAE'}
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">{isAr ? 'ساعات العمل' : 'Working Hours'}</div>
                    <div className="text-sm font-bold text-white">
                      {isAr ? 'الأحد - الخميس: 9:00 ص - 6:00 م' : 'Sun - Thu: 9:00 AM - 6:00 PM'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 sm:p-10 border border-zinc-800/80 shadow-2xl relative">
              {isSuccess ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-600 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">{t('form_success_title')}</h3>
                  <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                    {t('form_success_desc')}
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false)
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        service: '',
                        budget: '',
                        notes: '',
                      })
                    }}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-colors"
                  >
                    {isAr ? 'إرسال طلب آخر' : 'Submit Another Request'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                        {t('form_name')} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('form_name_ph')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                        {t('form_email')} *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={t('form_email_ph')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                        {t('form_phone')} *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder={t('form_phone_ph')}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                        {t('form_company')}
                      </label>
                      <input
                        type="text"
                        placeholder={t('form_company_ph')}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Service */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                        {t('form_service')}
                      </label>
                      <input
                        type="text"
                        placeholder={isAr ? 'مثال: إعلانات ممولة / SEO' : 'e.g. Media Buying, SEO'}
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                        {t('form_budget')}
                      </label>
                      <input
                        type="text"
                        placeholder={isAr ? 'مثال: 30,000 ج.م شهرياً' : 'e.g. $2,000 / month'}
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                      {t('form_notes')}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={t('form_notes_ph')}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t('form_submit')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
