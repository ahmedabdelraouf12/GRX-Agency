import HomeClient from './HomeClient'
import { apiUrl } from '@/lib/api'
import { SiteContent } from '@/lib/types'
import { defaultSiteContent } from '@/lib/data'

// Content is editable live from /dashboard/content (backed by the .NET API
// at H:\Grx-Agency-Backend), so this page must always fetch the current
// data on each request instead of being statically cached at build time.
export const dynamic = 'force-dynamic'

async function getSiteContent(): Promise<SiteContent> {
  try {
    const res = await fetch(apiUrl('/api/content'), { cache: 'no-store' })
    if (!res.ok) throw new Error(`API returned ${res.status}`)
    return await res.json()
  } catch (err) {
    // If the backend is briefly unreachable, ship the built-in seed
    // content rather than a broken page.
    console.error('Failed to fetch site content from API, using fallback:', err)
    return defaultSiteContent
  }
}

// Server Component: fetches the live, dashboard-editable content from the
// backend API on each request and hands it down to the interactive client
// tree. Keeping this file a Server Component (instead of 'use client')
// avoids a client-side fetch/loading flash for content that rarely changes.
export default async function Home() {
  const content = await getSiteContent()
  return <HomeClient content={content} />
}
