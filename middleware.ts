import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/supabase/types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  try {
    // Explicitly pass Supabase credentials to avoid env variable issues
    const supabase = createMiddlewareClient<Database>({ 
      req, 
      res,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    console.log(`Middleware: Path=${req.nextUrl.pathname}, Session=${session ? 'exists' : 'none'}`);

    // Handle auth callback first
    if (req.nextUrl.pathname === '/auth/callback') {
      console.log('Middleware: Handling auth callback');
      return res
    }

    // Protect dashboard routes
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      if (!session) {
        console.log('Middleware: No session for dashboard, redirecting to /auth/signin');
        const redirectUrl = new URL('/auth/signin', req.url)
        return NextResponse.redirect(redirectUrl)
      }
      console.log('Middleware: Session exists for dashboard, allowing access');
    }

    // Redirect authenticated users away from auth pages to dashboard
    if (req.nextUrl.pathname.startsWith('/auth/signin') && session) {
      console.log('Middleware: Authenticated user on signin page, redirecting to /dashboard');
      const redirectUrl = new URL('/dashboard', req.url)
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // If middleware fails, allow the request to continue
    return res
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}