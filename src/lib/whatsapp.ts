// Builds the WhatsApp deep link used by every lead-capture form on the
// site. The destination number comes from the dashboard-managed site
// settings (see src/lib/types.ts SiteSettings) rather than being hardcoded,
// so changing it in /dashboard/content updates every form immediately.

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
export function buildWhatsAppLeadUrl(data: LeadFormData, isAr: boolean, whatsappNumber: string): string {
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
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function formatWhatsAppDisplay(whatsappNumber: string): string {
  // "201090162098" -> "+20 109 016 2098" (best-effort grouping for Egyptian
  // numbers; falls back to just prefixing a + for other lengths).
  const digits = whatsappNumber.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('20')) {
    return `+20 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`
  }
  return `+${digits}`
}
