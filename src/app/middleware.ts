import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { env } from '@/env.mjs'

export function middleware(request: NextRequest) {
  // Get the pathname
  const { pathname } = request.nextUrl

  // Construction mode check
  if (env.CONSTRUCTION && process.env.NODE_ENV !== 'development') {
    if (pathname !== '/construction') {
      return NextResponse.redirect(new URL('/construction', request.url))
    }
  }

  // Stage video access check
  if (!env.SET_PUBLIC_VIDEO && process.env.NODE_ENV !== 'development' && pathname === '/stagevideo') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Stage figma access check
  if (!env.SET_PUBLIC_FIGMA && process.env.NODE_ENV !== 'development' && pathname === '/stageverslag') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
