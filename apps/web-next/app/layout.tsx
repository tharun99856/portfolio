import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tharun Rathod - Product Manager, AI Engineer & Researcher | IIT Roorkee',
  description: 'Product Manager and AI Engineer at IIT Roorkee. Building AI-first products at Edcore, conducting behavioral AI research, and solving real-world problems through technology.',
  keywords: 'Tharun Rathod, Product Manager, AI Engineer, IIT Roorkee, Edcore, Behavioral AI, LLM Research, Full-Stack Developer, UX Research, Product Strategy',
  authors: [{ name: 'Tharun Rathod' }],
  openGraph: {
    type: 'profile',
    url: 'https://portfolio-tharun-gray.vercel.app/',
    title: 'Tharun Rathod - Product Manager, AI Engineer & Researcher',
    description: 'Product Manager and AI Engineer at IIT Roorkee. Building AI-first products, conducting behavioral AI research, and solving real-world problems through technology.',
    images: [{
      url: 'https://portfolio-tharun-gray.vercel.app/my-image.jpeg',
      width: 1200,
      height: 630,
      alt: 'Tharun Rathod'
    }],
    siteName: 'Tharun Rathod Portfolio'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tharun Rathod - Product Manager, AI Engineer & Researcher',
    description: 'Product Manager and AI Engineer at IIT Roorkee. Building AI-first products, conducting behavioral AI research, and solving real-world problems through technology.',
    images: ['https://portfolio-tharun-gray.vercel.app/my-image.jpeg']
  },
  other: {
    'canonical': 'https://portfolio-tharun-gray.vercel.app/'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org JSON-LD for Rich Results & Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Tharun Rathod",
              "url": "https://portfolio-tharun-gray.vercel.app",
              "image": "https://portfolio-tharun-gray.vercel.app/my-image.jpeg",
              "jobTitle": "Product Manager & AI Engineer",
              "description": "Product Manager and AI Engineer at IIT Roorkee. Building AI-first products, conducting behavioral AI research, and solving real-world problems through technology.",
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Indian Institute of Technology Roorkee",
                "sameAs": "https://en.wikipedia.org/wiki/Indian_Institute_of_Technology_Roorkee"
              },
              "knowsAbout": [
                "Product Management",
                "Artificial Intelligence",
                "Large Language Models",
                "Full-Stack Development",
                "React",
                "Next.js",
                "TypeScript",
                "Python",
                "Behavioral AI",
                "UX Research",
                "Product Strategy"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Edcore",
                "url": "https://edcore.tech"
              },
              "sameAs": [
                "https://www.linkedin.com/in/tharunrathod/",
                "https://github.com/tharun99856",
                "https://x.com/tharunrathod"
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
