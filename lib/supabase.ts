import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createClient = () => {
  return createClientComponentClient()
}

export const createServerClient = () => {
  return createServerComponentClient({ cookies })
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company_name: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          company_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          company_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          user_id: string
          service_name: string
          service_type: string
          status: 'active' | 'inactive' | 'pending'
          monthly_cost: number
          start_date: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          service_name: string
          service_type: string
          status?: 'active' | 'inactive' | 'pending'
          monthly_cost: number
          start_date: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          service_name?: string
          service_type?: string
          status?: 'active' | 'inactive' | 'pending'
          monthly_cost?: number
          start_date?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      billing: {
        Row: {
          id: string
          user_id: string
          amount: number
          status: 'paid' | 'pending' | 'overdue'
          due_date: string
          invoice_date: string
          description: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          status?: 'paid' | 'pending' | 'overdue'
          due_date: string
          invoice_date: string
          description: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          status?: 'paid' | 'pending' | 'overdue'
          due_date?: string
          invoice_date?: string
          description?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}