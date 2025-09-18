import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/supabase/types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  try {
    const supabase = createMiddlewareClient<Database>({ req, res })
    
    // Get the session
    const { data: { session }, error } = await supabase.auth.getSession()
    
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard')
    
    console.log(`🔍 Middleware Check: ${req.nextUrl.pathname}`)
    console.log(`   Session: ${session ? 'EXISTS' : 'NONE'}`)
    console.log(`   User: ${session?.user?.email || 'NONE'}`)
    
    // If trying to access dashboard without session, redirect to signin
    if (isDashboardPage && !session) {
      console.log('🚫 No session for dashboard - redirecting to signin')
      return NextResponse.redirect(new URL('/auth/signin', req.url))
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