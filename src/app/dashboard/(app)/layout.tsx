import React from 'react'
import Link from 'next/link'
import { Sparkles, ExternalLink } from 'lucide-react'
import { NavLinks } from './NavLinks'
import { LogoutButton } from '../LogoutButton'
import { AuthGate } from './AuthGate'

export default function DashboardAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
    <div className="min-h-screen bg-[#09090b] text-slate-100 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 shrink-0 flex-col border-l border-zinc-900 bg-zinc-950/60 p-5">
        <Link href="/dashboard" className="flex items-center gap-2.5 mb-8 px-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-cyan p-0.5 shadow-lg shadow-brand-500/25">
            <div className="w-full h-full bg-[#09090b] rounded-[9px] flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-brand-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight text-white">GRX <span className="text-brand-400 font-normal">DASHBOARD</span></span>
          </div>
        </Link>

        <NavLinks />

        <div className="mt-auto space-y-2 pt-6">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>عرض الموقع</span>
          </a>
          <LogoutButton />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-zinc-950/60">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-black text-white">GRX Dashboard</span>
          </Link>
        </div>
        <div className="md:hidden border-b border-zinc-900 px-4 py-3 overflow-x-auto">
          <NavLinks />
        </div>

        <main className="p-5 sm:p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
    </AuthGate>
  )
}
