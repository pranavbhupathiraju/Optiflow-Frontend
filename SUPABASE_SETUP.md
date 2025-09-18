# Supabase Setup Guide for OptiFlow Authentication

## Quick Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project name: "optiflow-auth"
5. Generate a strong database password
6. Select a region close to your users
7. Click "Create new project"

### 2. Get Your Project Credentials
Once your project is created:
1. Go to **Settings** → **API**
2. Copy your **Project URL**
3. Copy your **anon/public key**

### 3. Update Environment Variables
Replace the values in `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Database Migrations
1. Go to **SQL Editor** in your Supabase dashboard
2. Create a new query
3. Copy and paste the content from `supabase/migrations/create_auth_schema.sql`
4. Click "Run"
5. Repeat for `supabase/migrations/seed_sample_data.sql` (optional - for demo data)

### 5. Configure Authentication
1. Go to **Authentication** → **Settings**
2. Under **Site URL**, add: `http://localhost:3000`
3. Under **Redirect URLs**, add: `http://localhost:3000/auth/callback`
4. Disable **Email Confirmations** for development (optional)

### 6. Test the Setup
1. Run `npm run dev`
2. Go to `http://localhost:3000`
3. Click "Sign In"
4. Create a new account
5. Check that you're redirected to the dashboard

## Database Schema Overview

### Tables Created:
- **profiles**: User profile information
- **services**: AI services assigned to users
- **billing**: Billing and invoice records

### Security:
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Automatic profile creation on signup

## Features Included:
- ✅ Email/password authentication
- ✅ User profiles with company info
- ✅ Protected dashboard route
- ✅ Service management display
- ✅ Billing overview
- ✅ Sample data for demo purposes
- ✅ Responsive design
- ✅ TypeScript support

## Next Steps:
1. Connect with your sales team to populate real services
2. Integrate with your billing system
3. Add service management features
4. Implement admin dashboard for service assignment

## Production Deployment:
When deploying to production:
1. Update Site URL and Redirect URLs in Supabase
2. Remove sample data migration
3. Set up proper email templates
4. Configure custom SMTP (optional)