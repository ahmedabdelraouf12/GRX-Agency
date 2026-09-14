'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { LogoTicker } from '@/components/LogoTicker'
import { Services } from '@/components/Services'
import { Portfolio } from '@/components/Portfolio'
import { RoiCalculator } from '@/components/RoiCalculator'
import { Process } from '@/components/Process'
import { Pricing } from '@/components/Pricing'
import { Testimonials } from '@/components/Testimonials'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { ContactModal } from '@/components/ContactModal'

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')

  const handleOpenContactModal = (service?: string) => {
    if (service) setSelectedService(service)
    setIsContactModalOpen(true)
  }

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName)
    // Scroll smoothly to contact section or open modal
    const contactElem = document.getElementById('contact')
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' })
    } else {
      setIsContactModalOpen(true)
    }
  }

  const handleSelectPlan = (planName: string) => {
    setSelectedService(`باقة: ${planName}`)
    const contactElem = document.getElementById('contact')
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' })
    } else {
      setIsContactModalOpen(true)
    }
  }

  const handleClaimCalculatedPlan = (budget: string, objective: string) => {
    setSelectedBudget(budget)
    setSelectedService(`حملة: ${objective}`)
    const contactElem = document.getElementById('contact')
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' })
    } else {
      setIsContactModalOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 selection:bg-brand-500 selection:text-white relative">
      {/* Navigation */}
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenContact={() => setIsContactModalOpen(true)} />
        <LogoTicker />
        <Services onSelectService={handleSelectService} />
        <Portfolio onOpenContact={() => setIsContactModalOpen(true)} />
        <RoiCalculator onClaimPlan={handleClaimCalculatedPlan} />
        <Process />
        <Pricing onSelectPlan={handleSelectPlan} />
        <Testimonials />
        <ContactSection
          initialService={selectedService}
          initialBudget={selectedBudget}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Reusable Lead Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  )
}
