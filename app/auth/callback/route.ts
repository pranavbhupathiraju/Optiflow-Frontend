import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/lib/supabase/types'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  console.log('Auth callback triggered with code:', code ? 'present' : 'missing')

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    
    console.log('Exchanging code for session...')
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Auth callback error:', error.message)
      // Redirect to signin with error
      return NextResponse.redirect(new URL('/auth/signin?error=auth_callback_error', request.url))
    } else {
      console.log('✅ Session exchange successful')
    }
  }

  console.log('Redirecting to dashboard...')
  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/dashboard', request.url))
}