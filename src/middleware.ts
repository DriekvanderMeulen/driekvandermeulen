import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { env } from '@/env.mjs'

export function middleware(request: NextRequest) {
  // Get the pathname
  const { pathname } = request.nextUrl

  // Construction mode check
  // if (env.CONSTRUCTION === true) {
  //   if (pathname !== '/construction') {
  //     return NextResponse.redirect(new URL('/construction', request.url))
  //   }
  // }

  // Stage video access check
  if (env.IS_VIDEO_PUBLIC === false && pathname === '/stagevideo') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Stage figma access check
  if (env.IS_FIGMA_PUBLIC === false && pathname === '/stageverslag') {
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