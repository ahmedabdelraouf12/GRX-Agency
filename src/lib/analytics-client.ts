'use client'

import { AnalyticsEventType, LeadSource } from './types'
import { apiUrl } from './api'

// Fire-and-forget helpers the public site calls to feed /dashboard, now
// posting straight to the .NET backend (see H:\Grx-Agency-Backend) instead
// of a local Next.js API route. Both swallow errors on purpose - a
// blocked/failed tracking call should never interrupt a visitor's
// experience (form submit, WhatsApp handoff, etc).

// The backend's AnalyticsEventType enum serializes as camelCase
// (pageView, whatsappClick, formSubmit, planSelect); the frontend keeps
// the more conventional snake_case at call sites, translated here.
const EVENT_TYPE_MAP: Record<AnalyticsEventType, string> = {
  page_view: 'pageView',
  whatsapp_click: 'whatsappClick',
  form_submit: 'formSubmit',
  plan_select: 'planSelect',
}

export function trackEvent(type: AnalyticsEventType, meta?: Record<string, string>) {
  try {
    fetch(apiUrl('/api/analytics/event'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: EVENT_TYPE_MAP[type],
        meta,
        path: typeof window !== 'undefined' ? window.location.pathname : undefined,
      }),
      keepalive: true,
    }).catch(() => {})
  } catch {}
}

interface LeadPayload {
  name: string
  email: string
  phone: string
  company?: string
  service?: string
  budget?: string
  notes?: string
}

export function submitLead(data: LeadPayload, source: LeadSource) {
  try {
    fetch(apiUrl('/api/leads'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, source }),
      keepalive: true,
    }).catch(() => {})
  } catch {}
}
