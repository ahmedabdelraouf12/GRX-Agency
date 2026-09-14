'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  Globe, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Brain,
  Activity,
  ShieldCheck,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

interface HeroProps {
  onOpenContact: () => void
}

// Medical flower/star 8-point asterisk icon matching reference image
const MedicalAsterisk: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 44 44" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M22 3.5C23.933 3.5 25.5 5.067 25.5 7V14.88L31.07 9.31C32.437 7.943 34.653 7.943 36.02 9.31C37.387 10.677 37.387 12.893 36.02 14.26L30.45 19.83H38.33C40.263 19.83 41.83 21.397 41.83 23.33C41.83 25.263 40.263 26.83 38.33 26.83H30.45L36.02 32.4C37.387 33.767 37.387 35.983 36.02 37.35C34.653 38.717 32.437 38.717 31.07 37.35L25.5 31.78V39.66C25.5 41.593 23.933 43.16 22 43.16C20.067 43.16 18.5 41.593 18.5 39.66V31.78L12.93 37.35C11.563 38.717 9.347 38.717 7.98 37.35C6.613 35.983 6.613 33.767 7.98 32.4L13.55 26.83H5.67C3.737 26.83 2.17 25.263 2.17 23.33C2.17 21.397 3.737 19.83 5.67 19.83H13.55L7.98 14.26C6.613 12.893 6.613 10.677 7.98 9.31C9.347 7.943 11.563 7.943 12.93 9.31L18.5 14.88V7C18.5 5.067 20.067 3.5 22 3.5Z"
      stroke="#12272c"
      strokeWidth="2.8"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const { lang, setLang, t, isRTL } = useLanguage()

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar')
  }

  return (
    <section className="relative w-full pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 overflow-hidden">
      {/* Outer ambient canvas container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Hero Card Container - Exactly matching reference screenshot */}
        <div className="relative rounded-[28px] sm:rounded-[38px] lg:rounded-[48px] overflow-hidden border border-[#d1f4ec]/80 shadow-[0_25px_70px_-15px_rgba(0,180,160,0.18)] bg-gradient-to-br from-[#eaf9f5] via-[#f4fcf9] to-[#e6f7f2] p-6 sm:p-10 lg:p-14 transition-all">
          
          {/* Ambient Mint & Cyan Lighting Orbs inside Card */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#5eead4]/35 blur-3xl pointer-events-none -z-0" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#2dd4bf]/25 blur-3xl pointer-events-none -z-0" />
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#a7f3d0]/30 blur-3xl pointer-events-none -z-0" />

          {/* Top In-Hero Navigation Header */}
          <header className="relative z-20 flex items-center justify-between pb-8 sm:pb-12 border-b border-[#12272c]/5">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <MedicalAsterisk className="w-7 h-7 sm:w-8 sm:h-8 text-[#12272c]" />
              <span className="text-xl sm:text-2xl font-black text-[#12272c] tracking-tight">
                {t('hero_ginkgo_brand')}
              </span>
            </div>

            {/* Center Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#496569]">
              <a 
                href="#" 
                className="text-[#12272c] font-semibold hover:text-[#00b2a2] transition-colors"
              >
                {isRTL ? 'الرئيسية' : 'Home'}
              </a>
              <a 
                href="#services" 
                className="hover:text-[#12272c] transition-colors"
              >
                {isRTL ? 'المنتجات' : 'Product'}
              </a>
              <a 
                href="#process" 
                className="hover:text-[#12272c] transition-colors"
              >
                {isRTL ? 'من نحن' : 'About us'}
              </a>
              <a 
                href="#contact" 
                className="hover:text-[#12272c] transition-colors"
              >
                {isRTL ? 'تواصل معنا' : 'Contact us'}
              </a>
            </nav>

            {/* Right Actions: Lang Switcher + Consult Now Button */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#345256] hover:text-[#12272c] bg-white/70 hover:bg-white border border-[#12272c]/10 rounded-full backdrop-blur-md transition-all shadow-sm"
                title={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                <Globe className="w-3.5 h-3.5 text-[#00b2a2]" />
                <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              <button
                onClick={onOpenContact}
                className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#12272c] border border-[#12272c]/30 rounded-full hover:bg-[#12272c] hover:text-white transition-all duration-200 shadow-sm"
              >
                {t('hero_ginkgo_consult')}
              </button>
            </div>
          </header>

          {/* Main Hero Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-6 pt-6 sm:pt-10">
            
            {/* Left Column: Heading, Asterisk, Description & CTA */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-start">
              
              {/* Medical Star Icon */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4 sm:mb-6"
              >
                <MedicalAsterisk className="w-9 h-9 sm:w-12 sm:h-12 text-[#12272c]" />
              </motion.div>

              {/* Main Bold Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.8rem] xl:text-[5.4rem] font-black text-[#12282c] tracking-tight leading-[0.92] uppercase mb-6 sm:mb-8"
              >
                {isRTL ? (
                  <>
                    <span className="block">{t('hero_ginkgo_title_line1')}</span>
                    <span className="block">{t('hero_ginkgo_title_line2')}</span>
                    <span className="block text-[#00a896]">{t('hero_ginkgo_title_line3')}</span>
                  </>
                ) : (
                  <>
                    <span className="block">EXTRA</span>
                    <span className="block">STRENGTH</span>
                    <span className="block">GINKGO</span>
                  </>
                )}
              </motion.h1>

              {/* Description with Small Bullet Dot */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-start gap-2.5 sm:gap-3 text-[#466064] text-sm sm:text-base leading-relaxed max-w-md mb-8 sm:mb-10 font-normal"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#12282c] mt-2 flex-shrink-0" />
                <p>{t('hero_ginkgo_desc')}</p>
              </motion.div>

              {/* Pill-shaped Teal CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <button
                  onClick={onOpenContact}
                  className="relative inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-white font-semibold text-sm sm:text-base bg-gradient-to-r from-[#00d2be] via-[#00c5b4] to-[#00b2a2] hover:from-[#00c5b4] hover:to-[#009e90] shadow-[0_12px_28px_-6px_rgba(0,197,180,0.6)] hover:shadow-[0_18px_38px_-6px_rgba(0,197,180,0.8)] transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300"
                >
                  <span>{t('hero_ginkgo_cta')}</span>
                </button>
              </motion.div>
            </div>

            {/* Right Column: 3D Bottles Visual & Floating Frosted Glass Badges */}
            <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center pt-4 lg:pt-0">
              
              {/* Subtle Glowing Aura */}
              <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#5eead4]/40 blur-3xl -z-0 pointer-events-none" />

              {/* Floating Container */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                className="relative max-w-[540px] w-full"
              >
                {/* 3D Supplement Bottles Mockup Image */}
                <img
                  src="/images/supplement-bottles.png"
                  alt="Extra Strength Ginkgo Supplement Bottle Mockup"
                  className="w-full h-auto object-contain drop-shadow-[0_25px_40px_rgba(0,150,136,0.18)] select-none pointer-events-none"
                />
              </motion.div>
            </div>

          </div>

          {/* Bottom Trust Indicators Pill Bar */}
          <div className="relative z-10 mt-10 pt-6 border-t border-[#12272c]/5 flex flex-wrap items-center justify-between gap-4 text-xs text-[#486367]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00b2a2]" />
              <span>{isRTL ? 'تركيبة نباتية نقية 100%' : '100% Vegan & Lab Tested Formula'}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00b2a2]" />
              <span>{isRTL ? 'معتمد ومطابق لأعلى معايير الجودة العالمية GMP' : 'GMP Certified & FDA Registered Facility'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00b2a2]" />
              <span>{isRTL ? 'شحن سريع وضمان استرجاع 30 يوم' : 'Fast Worldwide Shipping & 30-Day Guarantee'}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
