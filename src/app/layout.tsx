import type { Metadata } from 'next'
import { Cairo, Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'GRX Agency | وكالة التسويق الرقمي والنمو المتكامل',
  description: 'وكالة رائدة في إدارة الإعلانات الممولة، تحسين محركات البحث، وصناعة المحتوى الإبداعي لمضاعفة مبيعاتك وأرباحك.',
  keywords: ['تسويق رقمي', 'إعلانات فيسبوك', 'تيك توك', 'سوشيال ميديا', 'SEO', 'متاجر إلكترونية', 'Digital Marketing Agency'],
  authors: [{ name: 'GRX Agency' }],
  openGraph: {
    title: 'GRX Agency | حلول تسويق ونمو استثنائية',
    description: 'نضاعف مبيعاتك ونبني علامات تجارية لا تُنسى بأحدث تقنيات التسويق الرقمي.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable}`}>
      <body className="bg-[#09090b] text-slate-100 min-h-screen antialiased selection:bg-brand-500 selection:text-white font-sans">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
