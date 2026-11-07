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
import { SITE_ORIGIN, SITE_NAME, SITE_DESCRIPTION, PORTRAIT, HERO_SHOT, OG_IMAGE, PERSON_ID, imageObject } from '@/lib/site'
import { CONTACT } from '@/lib/content'
import { LINKS } from '@/lib/portfolio-data'

const BRAND_TITLE = 'Tharun Rathod: Product Engineer & AI Researcher at IIT Roorkee'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: BRAND_TITLE,
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: 'profile',
    url: SITE_ORIGIN,
    title: BRAND_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE.path, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt }],
    siteName: SITE_NAME
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.path]
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
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE_NAME,
      url: SITE_ORIGIN,
      image: [imageObject(PORTRAIT), imageObject(HERO_SHOT)],
      email: `mailto:${CONTACT.email}`,
      jobTitle: 'Product Engineer & AI Researcher',
      givenName: 'Tharun',
      familyName: 'Rathod',
      address: { '@type': 'PostalAddress', addressLocality: 'Roorkee', addressRegion: 'Uttarakhand', addressCountry: 'IN' },
      description: SITE_DESCRIPTION,
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Indian Institute of Technology Roorkee',
        sameAs: 'https://en.wikipedia.org/wiki/Indian_Institute_of_Technology_Roorkee'
      },
      knowsAbout: ['Product Management', 'Large Language Models', 'LLM Evaluation', 'Behavioral AI', 'Full-Stack Development', 'Compilers', 'Product Strategy', 'UX Research'],
      worksFor: { '@type': 'Organization', name: 'Edcore', url: LINKS.edcore },
      sameAs: [LINKS.linkedin, LINKS.linkedin2, LINKS.github, LINKS.scholar, 'https://www.instagram.com/tharunr05/']
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': PERSON_ID }
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_ORIGIN}/#profile`,
      url: `${SITE_ORIGIN}/`,
      name: BRAND_TITLE,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      mainEntity: { '@id': PERSON_ID }
    }
  ]
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
