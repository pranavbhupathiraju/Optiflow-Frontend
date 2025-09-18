import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/supabase'

export const createServerClient = () => {
  return createServerComponentClient<Database>({ cookies })
}