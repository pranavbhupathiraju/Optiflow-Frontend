import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/supabase/types'

export const createServerClient = () => {
  return createServerComponentClient<Database>({ cookies })
}