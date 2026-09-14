'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics-client'

// Mounted once on the public homepage (not inside /dashboard) so the
// owner's own dashboard visits never inflate the site's page-view count.
export function AnalyticsTracker() {
  useEffect(() => {
    trackEvent('page_view')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
