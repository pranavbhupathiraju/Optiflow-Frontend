"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mail, Lock, User, Building, Phone, ArrowRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  
  const router = useRouter()
  const supabase = createClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🔥 FORM SUBMITTED - handleSignIn called')
    console.log('📝 Form data:', { email: email.trim(), passwordLength: password.length })
    
    setLoading(true)
    setError('')
    setMessage('')
    
    console.log('🔐 Starting sign in process...')
    console.log('📧 Email:', email.trim())
    console.log('🔑 Password length:', password.length)
    console.log('Email:', email)
    
    if (!email || !password) {
      console.log('❌ Missing email or password')
      setError('Please enter both email and password')
      setLoading(false)
      return
    }

    try {
      console.log('📡 About to call Supabase signInWithPassword...')
      console.log('🔧 Supabase client exists:', !!supabase)
      console.log('🔧 Environment check:', {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      })
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      })
      
      console.log('📨 Supabase authentication response received!')
      console.log('✅ Has session:', !!data.session)
      console.log('👤 Has user:', !!data.user)
      console.log('❌ Error:', error?.message || 'None')
      
      if (data.session) {
        console.log('🎫 Session details:', {
          userId: data.session.user.id,
          email: data.session.user.email,
          expiresAt: data.session.expires_at
        })
      }
      console.log('📊 Full response summary:', {
        hasSession: !!data.session,
        hasUser: !!data.user,
        error: error?.message,
        errorCode: error?.status,
        fullError: error
      })

      if (error) {
        console.error('❌ Authentication error:', {
          message: error.message,
          status: error.status,
          fullError: error
        })
        console.error('💥 Authentication error details:', {
          message: error.message,
          status: error.status,
          name: error.name
        })
        setError(`Authentication failed: ${error.message}`)
        setLoading(false)
        return
      }

      if (data.session && data.user) {
        console.log('🎉 Authentication successful! Preparing redirect...')
        console.log('🎯 Session and user details:', {
          userId: data.user.id,
          userEmail: data.user.email,
          sessionExpires: data.session.expires_at,
          accessToken: data.session.access_token ? 'present' : 'missing'
        })
        console.log('User:', data.user.email)
        console.log('Session expires:', data.session.expires_at)
        
        setMessage('Sign in successful! Redirecting to dashboard...')
        
        console.log('⏰ Starting 1.5 second countdown to redirect...')
        // Force a complete page reload to ensure session is detected
        setTimeout(() => {
          console.log('🚀 EXECUTING REDIRECT NOW!')
          console.log('🌐 Current URL:', window.location.href)
          console.log('🎯 Redirecting to:', window.location.origin + '/dashboard')
          window.location.replace('/dashboard')
        }, 1500)
      } else {
        console.error('💔 No session or user created despite no error')
        console.error('🔍 Debug data:', {
          hasSession: !!data.session,
          hasUser: !!data.user,
          sessionData: data.session,
          userData: data.user
        })
        setError('Authentication failed - no session created. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      console.error('💥 UNEXPECTED ERROR during sign in:', {
        error: err,
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : 'No stack trace'
      })
      console.error('💥 Catch block error:', {
        error: err,
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      })
      setError(`Connection error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setLoading(false)
    }
    
    console.log('🏁 handleSignIn function completed')
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    
    console.log('📝 Starting sign up process...')

    if (!email || !password || !fullName) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName,
            company_name: companyName,
            phone: phone,
          }
        }
      })
      
      console.log('📨 Signup response:', {
        hasSession: !!data.session,
        hasUser: !!data.user,
        error: error?.message
      })

      if (error) {
        console.error('❌ Signup error:', error.message)
        setError(error.message)
        setLoading(false)
        return
      }

      if (data.user) {
        if (data.session) {
          console.log('✅ Signup successful with session!')
          setMessage('Account created! Redirecting to dashboard...')
          setTimeout(() => {
            window.location.href = '/dashboard'
          }, 1000)
        } else {
          console.log('✅ Signup successful! Please check your email.')
          setMessage('Account created! Please check your email to verify your account, then sign in.')
        }
      }
    } catch (err) {
      console.error('💥 Signup error:', err)
      setError('An unexpected error occurred during signup')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/optiflow-logo-new.png"
              alt="OptiFlow"
              width={200}
              height={60}
              className="h-10 w-auto mx-auto"
              priority
            />
          </Link>
          <h1 className="text-2xl font-bold mb-2">Welcome to OptiFlow</h1>
          <p className="text-muted-foreground">Access your AI solutions dashboard</p>
        </div>

        <Card className="border-2 border-primary/20 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Account Access</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4 mt-6">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {message && (
                    <Alert>
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10"
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-company">Company Name</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-company"
                        type="text"
                        placeholder="Your Company Inc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                        minLength={6}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {message && (
                    <Alert>
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}