"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarInitials } from '@/components/ui/avatar'
import { 
  User, 
  Building, 
  Phone, 
  Mail, 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Activity, 
  TrendingUp,
  Bot,
  Globe,
  MessageSquare,
  Wrench,
  LogOut,
  Settings
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Database } from '@/lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']
type Service = Database['public']['Tables']['services']['Row']
type Billing = Database['public']['Tables']['billing']['Row']

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [billing, setBilling] = useState<Billing[]>([])
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      console.log('🔍 Dashboard: Checking authentication...')
      const { data: { user } } = await supabase.auth.getUser()
      console.log('🔍 Dashboard: User data:', user ? user.email : 'NONE')
      
      if (user) {
        console.log('✅ Dashboard: User authenticated, fetching data...')
        setUser(user)
        await fetchUserData(user.id)
      } else {
        console.log('❌ Dashboard: No user found, redirecting to signin')
        setAuthError('Please sign in to access the dashboard')
        router.push('/auth/signin')
        return
      }
      setLoading(false)
    }

    getUser()
  }, [router, supabase.auth])

  const fetchUserData = async (userId: string) => {
    // Fetch profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileData) {
      setProfile(profileData)
    }

    // Fetch services
    const { data: servicesData } = await supabase
      .from('services')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (servicesData) {
      setServices(servicesData)
    }

    // Fetch billing
    const { data: billingData } = await supabase
      .from('billing')
      .select('*')
      .eq('user_id', userId)
      .order('due_date', { ascending: false })
      .limit(5)

    if (billingData) {
      setBilling(billingData)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'ai-content':
        return <Bot className="h-5 w-5" />
      case 'website-optimization':
        return <Globe className="h-5 w-5" />
      case 'ai-chatbots':
        return <MessageSquare className="h-5 w-5" />
      case 'technical-solutions':
        return <Wrench className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const totalMonthlySpend = services
    .filter(service => service.status === 'active')
    .reduce((sum, service) => sum + service.monthly_cost, 0)

  const activeServices = services.filter(service => service.status === 'active').length
  const pendingInvoices = billing.filter(bill => bill.status === 'pending').length
  const overdueAmount = billing
    .filter(bill => bill.status === 'overdue')
    .reduce((sum, bill) => sum + bill.amount, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (authError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-4">{authError}</p>
          <Button onClick={() => router.push('/auth/signin')}>
            Go to Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/optiflow-logo-new.png"
                alt="OptiFlow"
                width={150}
                height={45}
                className="h-8 w-auto"
                priority
              />
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg font-semibold">
                {profile?.full_name ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : user?.email?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">
                Welcome back, {profile?.full_name || user?.email?.split('@')[0]}!
              </h2>
              <p className="text-muted-foreground">
                Here's an overview of your AI solutions and billing
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeServices}</div>
              <p className="text-xs text-muted-foreground">
                AI solutions running
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalMonthlySpend.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Current monthly cost
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingInvoices}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting payment
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Health</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overdueAmount > 0 ? 'Attention' : 'Good'}
              </div>
              <p className="text-xs text-muted-foreground">
                {overdueAmount > 0 ? `$${overdueAmount} overdue` : 'All payments current'}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              
              {profile?.full_name && (
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Full Name</p>
                    <p className="text-sm text-muted-foreground">{profile.full_name}</p>
                  </div>
                </div>
              )}
              
              {profile?.company_name && (
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Company</p>
                    <p className="text-sm text-muted-foreground">{profile.company_name}</p>
                  </div>
                </div>
              )}
              
              {profile?.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{profile.phone}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Services */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Active Services</CardTitle>
              <CardDescription>
                Your current AI solutions and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {services.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Services Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any active services. Contact our team to get started with AI solutions.
                  </p>
                  <Button>Contact Sales</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {getServiceIcon(service.service_type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{service.service_name}</h4>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          ${service.monthly_cost}/month
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Billing */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Recent Billing
            </CardTitle>
            <CardDescription>
              Your latest invoices and payment history
            </CardDescription>
          </CardHeader>
          <CardContent>
            {billing.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Billing History</h3>
                <p className="text-muted-foreground">
                  Your billing information will appear here once services are active.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {billing.map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{bill.description}</h4>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(bill.due_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${bill.amount.toLocaleString()}</p>
                      <Badge className={getStatusColor(bill.status)}>
                        {bill.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}