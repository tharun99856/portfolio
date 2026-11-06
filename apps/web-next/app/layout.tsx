import type { Metadata, Viewport } from 'next'
import '@fontsource/unbounded/700.css'
import '@fontsource/unbounded/800.css'
import '@fontsource/vt323/400.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'
import 'lenis/dist/lenis.css'
import './globals.css'
import CrtBackground from '@/components/crt/CrtBackground'
import SmoothScroll from '@/components/crt/SmoothScroll'
import Boot from '@/components/crt/Boot'
import Osd from '@/components/crt/Osd'
import Archivist from '@/components/crt/Archivist'

const SITE = 'https://portfolio-tharun-gray.vercel.app'
const DESCRIPTION =
  'Tharun Rathod: product engineer and AI researcher at IIT Roorkee. Edcore, Rune, IITR Nexus, research on LLM behaviour, and more.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Tharun Rathod: Product Engineer & AI Researcher',
  description: DESCRIPTION,
  authors: [{ name: 'Tharun Rathod' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: SITE,
    title: 'Tharun Rathod: Product Engineer & AI Researcher',
    description: DESCRIPTION,
    images: [{ url: '/my-image.jpeg', width: 1200, height: 630, alt: 'Tharun Rathod' }],
    siteName: 'Tharun Rathod'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tharun Rathod: Product Engineer & AI Researcher',
    description: DESCRIPTION,
    images: ['/my-image.jpeg']
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#060504'
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tharun Rathod',
  url: SITE,
  image: `${SITE}/my-image.jpeg`,
  jobTitle: 'Product Engineer & AI Researcher',
  description: DESCRIPTION,
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Indian Institute of Technology Roorkee',
    sameAs: 'https://en.wikipedia.org/wiki/Indian_Institute_of_Technology_Roorkee'
  },
  knowsAbout: ['Product Management', 'Large Language Models', 'LLM Evaluation', 'Behavioral AI', 'Full-Stack Development', 'Compilers', 'Product Strategy', 'UX Research'],
  worksFor: { '@type': 'Organization', name: 'Edcore', url: 'https://edcore.tech' },
  sameAs: ['https://linkedin.com/in/tharun-rathod', 'https://github.com/tharun99856', 'https://www.instagram.com/tharunr05/']
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip" href="#main">Skip to content</a>
        <CrtBackground />
        <Osd />
        {children}
        <SmoothScroll />
        <Archivist />
        <div className="crt-overlay" aria-hidden="true" />
        <Boot />
      </body>
    </html>
  )
}
