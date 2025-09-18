import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/supabase/types'

export const createClient = () => {
  return createClientComponentClient<Database>()
}