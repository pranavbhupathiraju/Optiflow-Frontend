import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/supabase'

export const createClient = () => {
  return createClientComponentClient<Database>()
}