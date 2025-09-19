# GitHub Setup Instructions

## Quick Setup (5 minutes)

### Step 1: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial OptiFlow website with authentication"
```

### Step 2: Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New Repository"
3. Name it `optiflow-website`
4. Don't initialize with README (we already have files)
5. Click "Create repository"

### Step 3: Connect and Push
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/optiflow-website.git
git branch -M main
git push -u origin main
```

## Environment Variables for Production

When you deploy this to Vercel/Netlify, you'll need these environment variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://mkkioyoifrodcihckxim.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Email Configuration (for contact form)
EMAIL_USER=linea.aillc@gmail.com
EMAIL_PASS=your_gmail_app_password
```

## Current Project Status

✅ **Working Features:**
- Homepage with hero section
- Services page
- Contact form with email sending
- Supabase authentication setup
- Dashboard with user profiles
- Database migrations

🔧 **Known Issues:**
- Sign-in authentication flow needs debugging
- Session management may need adjustment

## Next Steps in Cursor

1. **Debug Authentication:**
   - Check browser console during sign-in
   - Verify Supabase configuration
   - Test session creation

2. **Test Database:**
   - Verify migrations ran successfully
   - Test user profile creation
   - Check RLS policies

3. **Deploy:**
   - Push to GitHub
   - Deploy to Vercel
   - Set environment variables

## File Structure
```
optiflow-website/
├── app/                    # Next.js app directory
│   ├── auth/signin/       # Authentication pages
│   ├── dashboard/         # Protected dashboard
│   ├── services/          # Services page
│   └── api/               # API routes
├── components/            # Reusable components
├── lib/                   # Utilities and Supabase client
├── supabase/             # Database migrations
└── public/               # Static assets
```