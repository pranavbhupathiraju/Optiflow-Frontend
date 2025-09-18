import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/supabase/types'

export const createClient = () => {
  const client = createClientComponentClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  })
  
  console.log('Supabase client created with URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  
  return client
}