'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, FileEdit, BarChart3, UserCog } from 'lucide-react'

const links = [
  { href: '/dashboard', label: 'نظرة عامة', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/leads', label: 'طلبات التواصل', icon: Users, exact: false },
  { href: '/dashboard/content', label: 'محتوى الموقع', icon: FileEdit, exact: false },
  { href: '/dashboard/analytics', label: 'الإحصائيات', icon: BarChart3, exact: false },
  { href: '/dashboard/users', label: 'حسابات الدخول', icon: UserCog, exact: false },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {links.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href)
        const Icon = link.icon
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              active
                ? 'bg-brand-600/15 text-brand-300 border border-brand-800/60'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{link.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
