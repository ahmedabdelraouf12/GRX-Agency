'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { buildWhatsAppLeadUrl } from '@/lib/whatsapp'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  initialService?: string
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialService = '',
}) => {
  const { t, lang } = useLanguage()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    budget: '',
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }))
      // A newly picked service means a fresh request - bring the form
      // back even if a previous message was already sent.
      setIsSuccess(false)
    }
  }, [initialService])

  useEffect(() => {
    // The modal never unmounts (it just renders null while closed), so
    // reset the success screen every time it's reopened - otherwise a
    // visitor who already sent one message would be stuck looking at the
    // "Done" screen forever and could never send another.
    if (isOpen) {
      setIsSuccess(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const whatsappUrl = buildWhatsAppLeadUrl(formData, lang === 'ar')

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
        })
      } catch (err) {}
    }, 600)
  }

  const isAr = lang === 'ar'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-600 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">{t('form_success_title')}</h3>
            <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
              {t('form_success_desc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setIsSuccess(false)}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-600/30"
              >
                {isAr ? 'إرسال رسالة أخرى' : 'Send Another Message'}
              </button>
              <button
                onClick={() => {
                  setIsSuccess(false)
                  onClose()
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-zinc-200 text-sm font-bold"
              >
                {isAr ? 'حسناً، تم' : 'Done'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-300 text-xs font-bold mb-2">
                <Sparkles className="w-3 h-3" />
                <span>{isAr ? 'جلسة استشارية مجانية' : 'Complimentary Growth Session'}</span>
              </div>
              <h3 className="text-2xl font-black text-white">{t('nav_cta')}</h3>
              <p className="text-xs text-zinc-400 mt-1">
                {isAr
                  ? 'املأ البيانات وسيقوم خبير النمو بدراسة علامتك والتواصل معك فوراً.'
                  : 'Fill the form and an executive strategist will audit your funnel.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  {t('form_name')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('form_name_ph')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    {t('form_email')} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t('form_email_ph')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    {t('form_phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t('form_phone_ph')}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    {t('form_service')}
                  </label>
                  <input
                    type="text"
                    placeholder={isAr ? 'الخدمة المطلوبة' : 'Service'}
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    {t('form_budget')}
                  </label>
                  <input
                    type="text"
                    placeholder={isAr ? 'الميزانية الشهرية' : 'Budget'}
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  {t('form_notes')}
                </label>
                <textarea
                  rows={3}
                  placeholder={t('form_notes_ph')}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('form_submit')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
