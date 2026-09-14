'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Sparkles, Globe, Menu, X, ArrowUpRight, PhoneCall } from 'lucide-react'

interface NavbarProps {
  onOpenContact: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const { lang, setLang, t, isRTL } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#services', label: t('nav_services') },
    { href: '#work', label: t('nav_work') },
    { href: '#calculator', label: t('nav_calculator') },
    { href: '#process', label: t('nav_process') },
    { href: '#pricing', label: t('nav_pricing') },
  ]

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-2xl py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-cyan p-0.5 shadow-lg shadow-brand-500/25 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#09090b] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                GRX <span className="text-brand-400 font-normal">AGENCY</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-medium tracking-widest uppercase">
                {lang === 'ar' ? 'نمو وتسويق استراتيجي' : 'Digital Growth Lab'}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/80 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors rounded-full hover:bg-zinc-800/60"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Lang Switch + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white rounded-xl transition-all"
              title={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-brand-400" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            <button
              onClick={onOpenContact}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold text-white rounded-xl group bg-gradient-to-br from-brand-600 to-indigo-600 group-hover:from-brand-600 group-hover:to-indigo-500 shadow-lg shadow-brand-600/30 hover:shadow-brand-600/50 transition-all active:scale-95"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#0d0c15] group-hover:bg-opacity-0 rounded-[10px] flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-brand-400 group-hover:text-white transition-colors" />
                <span>{t('nav_cta')}</span>
                <ArrowUpRight className={`w-4 h-4 transition-transform ${isRTL ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} group-hover:-translate-y-0.5`} />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-xl"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-zinc-800 px-4 pt-4 pb-6 mt-3 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-base font-medium text-zinc-200 hover:bg-zinc-800/80 rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-zinc-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenContact()
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t('nav_cta')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
