// Central WhatsApp destination for all lead-capture forms on the site.
// Update this single value if the number ever changes.
export const WHATSAPP_NUMBER = '201090162098' // +20 109 016 2098
export const WHATSAPP_DISPLAY = '+20 109 016 2098'

interface LeadFormData {
  name: string
  email: string
  phone: string
  service?: string
  budget?: string
  company?: string
  notes?: string
}

/**
 * Builds a wa.me deep link that opens WhatsApp with a pre-filled message
 * containing everything the visitor entered in a lead-capture form.
 */
export function buildWhatsAppLeadUrl(data: LeadFormData, isAr: boolean): string {
  const lines = isAr
    ? [
        'طلب استشارة جديد من الموقع:',
        `الاسم: ${data.name}`,
        `الإيميل: ${data.email}`,
        `رقم الموبايل: ${data.phone}`,
        data.company ? `الشركة: ${data.company}` : null,
        data.service ? `الخدمة المطلوبة: ${data.service}` : null,
        data.budget ? `الميزانية: ${data.budget}` : null,
        data.notes ? `ملاحظات: ${data.notes}` : null,
      ]
    : [
        'New consultation request from the website:',
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        data.company ? `Company: ${data.company}` : null,
        data.service ? `Service: ${data.service}` : null,
        data.budget ? `Budget: ${data.budget}` : null,
        data.notes ? `Notes: ${data.notes}` : null,
      ]

  const message = lines.filter(Boolean).join('\n')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
