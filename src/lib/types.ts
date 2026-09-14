// Shared data shapes used by both the public site and the /dashboard admin
// panel. Content types mirror what a site editor can change from the
// dashboard; Lead/AnalyticsEvent mirror what the site reports back.

export interface ServiceItem {
  id: string
  titleAr: string
  titleEn: string
  descAr: string
  descEn: string
  icon: string
  badge: string
  roiMetric: string
  deliverablesAr: string[]
  deliverablesEn: string[]
  color: string
}

export interface CaseStudy {
  id: string
  titleAr: string
  titleEn: string
  category: 'ads' | 'branding' | 'ecommerce' | 'video'
  categoryLabelAr: string
  categoryLabelEn: string
  client: string
  image: string
  stat1: string
  stat1LabelAr: string
  stat1LabelEn: string
  stat2: string
  stat2LabelAr: string
  stat2LabelEn: string
  summaryAr: string
  summaryEn: string
}

export interface PricingPlan {
  id: string
  nameAr: string
  nameEn: string
  badge?: string
  priceAr: string
  priceEn: string
  periodAr: string
  periodEn: string
  descAr: string
  descEn: string
  popular?: boolean
  featuresAr: string[]
  featuresEn: string[]
}

export interface Testimonial {
  id: string
  nameAr: string
  nameEn: string
  roleAr: string
  roleEn: string
  avatar: string
  commentAr: string
  commentEn: string
  rating: number
  metric: string
}

export interface SiteSettings {
  whatsappNumber: string // international format, no + or spaces, e.g. "201090162098"
  contactEmail: string
  addressAr: string
  addressEn: string
  hoursAr: string
  hoursEn: string
}

export interface SiteContent {
  settings: SiteSettings
  services: ServiceItem[]
  portfolio: CaseStudy[]
  pricing: PricingPlan[]
  testimonials: Testimonial[]
}

export type LeadSource = 'modal' | 'section'
export type LeadStatus = 'new' | 'contacted' | 'won' | 'lost'

export interface Lead {
  id: string
  createdAt: string
  name: string
  email: string
  phone: string
  company?: string
  service?: string
  budget?: string
  notes?: string
  source: LeadSource
  status: LeadStatus
}

export type AnalyticsEventType = 'page_view' | 'whatsapp_click' | 'form_submit' | 'plan_select'

export interface AnalyticsEvent {
  type: AnalyticsEventType
  meta?: Record<string, string>
  path?: string
  ts: string
}
