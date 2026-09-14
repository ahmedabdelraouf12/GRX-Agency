'use client'

import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { apiUrl } from '@/lib/api'
import { SiteContent } from '@/lib/types'
import ContentEditor from './ContentEditor'

// Public GET (no auth needed for reads) - editing is what's protected,
// enforced per-endpoint by the .NET API when ContentEditor saves.
export default function DashboardContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(apiUrl('/api/content'), { cache: 'no-store' }).then(async (res) => {
      if (!cancelled && res.ok) setContent(await res.json())
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (!content) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 text-brand-400 animate-spin" />
      </div>
    )
  }

  return <ContentEditor initialContent={content} />
}
