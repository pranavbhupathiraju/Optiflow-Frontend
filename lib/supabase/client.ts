import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/supabase/types'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mkkioyoifrodcihckxim.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ra2lveW9pZnJvZGNpaGNreGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NjE0NzQsImV4cCI6MjA1MjUzNzQ3NH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8'
  
  console.log('Creating Supabase client with:', { supabaseUrl, supabaseKey: supabaseKey ? 'present' : 'missing' })
  
  const client = createClientComponentClient<Database>()
  
  console.log('Supabase client created successfully')
  
  return client
}