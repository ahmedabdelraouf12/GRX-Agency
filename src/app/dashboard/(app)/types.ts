// Shape of GET /api/analytics/summary from the .NET backend
// (H:\Grx-Agency-Backend\...\Dtos\AnalyticsDtos.cs: AnalyticsSummaryDto).
export interface AnalyticsSummary {
  totalPageViews: number
  totalWhatsappClicks: number
  totalFormSubmits: number
  totalLeads: number
  leadsThisWeek: number
  conversionRate: number
  dailyPageViews: { date: string; count: number }[]
  topPlans: { plan: string; count: number }[]
  leadsByStatus: Record<string, number>
}
