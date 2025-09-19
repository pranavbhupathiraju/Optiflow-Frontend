import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Skip middleware for static files, API routes, and images
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/api') ||
    req.nextUrl.pathname.includes('.') ||
    req.nextUrl.pathname === '/auth/callback'
  ) {
    return res
  }

  // Only protect the dashboard route
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    try {
      const supabase = createMiddlewareClient({ req, res })
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    } catch (error) {
      console.error('Middleware error:', error)
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
  }
  
  return res
}

export const config = {
  matcher: ['/dashboard/:path*']
}