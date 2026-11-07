import { NextResponse, type NextRequest } from 'next/server'
import { SITE_ORIGIN } from '@/lib/site'

// Google already gets a canonical pointing here, but a redirect is what actually
// stops the old *.vercel.app copy from competing with tharunrathod.me.
export function middleware(req: NextRequest) {
  if (req.headers.get('host') !== 'portfolio-tharun-gray.vercel.app') return NextResponse.next()
  return NextResponse.redirect(`${SITE_ORIGIN}${req.nextUrl.pathname}${req.nextUrl.search}`, 308)
}

export const config = {
  matcher: ['/((?!_next|icon|apple-icon).*)']
}
