// Single source for the production origin. VERCEL_PROJECT_PRODUCTION_URL is the
// production domain even on preview deploys, so canonicals never point at a preview URL.
const ENV_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')

export const SITE_ORIGIN = (ENV_URL || 'https://portfolio-tharun-gray.vercel.app').replace(/\/+$/, '')

export const SITE_NAME = 'Tharun Rathod'

export const SITE_DESCRIPTION =
  'Tharun Rathod: product engineer and AI researcher at IIT Roorkee. Edcore, Rune, IITR Nexus, research on LLM behaviour, and more.'

export const canonical = (path: string) => `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`

export const PORTRAIT = {
  path: '/tharun-rathod-portrait.jpeg',
  alt: 'Tharun Rathod, product engineer and AI researcher at IIT Roorkee',
  width: 1440,
  height: 1440
}

export const HERO_SHOT = {
  path: '/tharun-rathod-hero.jpeg',
  alt: 'Tharun Rathod, founder of Edcore, photographed at IIT Roorkee',
  width: 1600,
  height: 900
}

export const OG_IMAGE = {
  path: '/tharun-rathod-og.jpg',
  alt: 'Tharun Rathod, product engineer and AI researcher at IIT Roorkee',
  width: 1200,
  height: 630
}

export const PERSON_ID = `${SITE_ORIGIN}/#person`

type Shot = { path: string; alt: string; width: number; height: number }

export const imageObject = (img: Shot) => ({
  '@type': 'ImageObject',
  url: canonical(img.path),
  contentUrl: canonical(img.path),
  caption: img.alt,
  creditText: SITE_NAME,
  creator: { '@id': PERSON_ID },
  width: img.width,
  height: img.height
})
