import type { MetadataRoute } from 'next'
import { COLLECTIONS, ITEMS } from '@/lib/records'
import { RESUMES } from '@/lib/portfolio-data'
import { SITE_ORIGIN, PORTRAIT, HERO_SHOT } from '@/lib/site'

const url = (path: string) => `${SITE_ORIGIN}${path}`
const shot = (p: { path: string }) => url(p.path)

const imagesFor = (it: (typeof ITEMS)[number]) =>
  it.media?.type === 'image' ? [url(encodeURI(it.media.src))] : undefined

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: url('/'), changeFrequency: 'weekly', priority: 1, images: [shot(PORTRAIT), shot(HERO_SHOT)] },
    ...COLLECTIONS.map((d) => ({ url: url(`/${d.slug}`), changeFrequency: 'weekly' as const, priority: 0.9 })),
    { url: url('/about'), changeFrequency: 'monthly' as const, priority: 0.8, images: [shot(PORTRAIT)] },
    { url: url('/contact'), changeFrequency: 'monthly' as const, priority: 0.8 },
    ...ITEMS.map((it) => ({ url: url(it.href), changeFrequency: 'monthly' as const, priority: 0.7, images: imagesFor(it) })),
    ...RESUMES.map((r) => ({ url: url(r.href), changeFrequency: 'monthly' as const, priority: 0.6 }))
  ]
}
