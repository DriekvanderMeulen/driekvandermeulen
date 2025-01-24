import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { env } from '@/env.mjs'

export function middleware(request: NextRequest) {
  // Get the pathname
  const { pathname } = request.nextUrl

  // Construction mode check
  if (env.CONSTRUCTION === true) {
    if (pathname !== '/construction') {
      return NextResponse.redirect(new URL('/construction', request.url))
    }
  }

  // Stage video access check
  if (env.IS_VIDEO_PUBLIC === false && pathname === '/stagevideo') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Stage figma access check
  if (env.IS_FIGMA_PUBLIC === false && pathname === '/stageverslag') {
    return NextResponse.redirect(new URL('/', request.url))
  }

    // Check for dark mode preference
    const prefersDarkMode = request.headers.get('sec-ch-prefers-color-scheme') === 'dark'
    const response = NextResponse.next()
  
    if (prefersDarkMode) {
      response.headers.set('Content-Security-Policy', "default-src 'self'; style-src 'unsafe-inline'")
      response.headers.set('Set-Cookie', 'darkmode=true; Path=/; HttpOnly')
    }
  

    return response
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}