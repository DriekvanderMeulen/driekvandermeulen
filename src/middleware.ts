import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

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