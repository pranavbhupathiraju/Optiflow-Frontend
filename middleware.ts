import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/supabase/types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Skip middleware for static files and API routes
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/api') ||
    req.nextUrl.pathname.includes('.')
  ) {
    return res
  }

  try {
    const supabase = createMiddlewareClient<Database>({ req, res })
    
    // Refresh the session to get the latest state
    const { data: { session }, error } = await supabase.auth.getSession()
    
    console.log(`🔍 Middleware Check: ${req.nextUrl.pathname}`)
    console.log(`   Session: ${session ? 'EXISTS' : 'NONE'}`)
    console.log(`   User: ${session?.user?.email || 'NONE'}`)
    
    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard')
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    
    // TEMPORARILY DISABLE DASHBOARD PROTECTION FOR DEBUGGING
    // Let's see if the dashboard loads without middleware blocking it
    if (isDashboardPage && !session) {
      console.log('⚠️ TEMPORARILY ALLOWING DASHBOARD ACCESS FOR DEBUGGING')
      // return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
    
    // If signed in and trying to access auth pages, redirect to dashboard
    if (isAuthPage && session && req.nextUrl.pathname !== '/auth/callback') {
      console.log('✅ Already signed in - redirecting to dashboard')
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    
    return res
  } catch (error) {
    console.error('💥 Middleware error:', error)
    return res
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|optiflow-logo-new.png).*)',
  ]
}