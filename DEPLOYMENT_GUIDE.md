# 🚀 OptiFlow Website Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)
**Best for**: Quick deployment, automatic builds, custom domains

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial OptiFlow website"
   git branch -M main
   git remote add origin https://github.com/yourusername/optiflow-website.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Deploy (automatic)

3. **Add Custom Domain**:
   - In Vercel dashboard → Project → Settings → Domains
   - Add your domain (e.g., `optiflow.com`)
   - Follow DNS instructions

### Option 2: Netlify
**Best for**: Static sites, easy custom domains

1. **Build for Netlify**:
   ```bash
   pnpm build
   pnpm export  # Creates static files
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `out` folder
   - Add custom domain in settings

### Option 3: VPS/Server (Advanced)
**Best for**: Full control, custom server setup

1. **Prepare for VPS**:
   ```bash
   pnpm build
   pnpm start  # Runs on port 3000
   ```

2. **Server Setup**:
   - Install Node.js 20+
   - Install PM2: `npm install -g pm2`
   - Upload files to server
   - Run: `pm2 start npm --name "optiflow" -- start`

## 🔧 Production Configuration

### Environment Variables
Set these in your deployment platform:

```bash
# For Vercel/Netlify
EMAIL_USER=linea.aillc@gmail.com
EMAIL_PASS=your_gmail_app_password

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Email Setup for Production
1. **Get Gmail App Password**:
   - Google Account → Security → App passwords
   - Generate password for "Mail"
   - Use 16-character password

2. **Add to Environment Variables**:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables

## 🌐 Custom Domain Setup

### DNS Configuration
Add these records to your domain provider:

**For Vercel**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

**For Netlify**:
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app

Type: A
Name: @
Value: 75.2.60.5
```

## 📊 Performance Optimization

Your site is already optimized with:
- ✅ Static generation for fast loading
- ✅ Image optimization
- ✅ Code splitting
- ✅ Modern CSS with Tailwind
- ✅ TypeScript for reliability

## 🔍 Post-Deployment Checklist

- [ ] Test booking form on live site
- [ ] Verify email sending works
- [ ] Check mobile responsiveness
- [ ] Test page load speeds
- [ ] Set up Google Analytics (optional)
- [ ] Configure SSL certificate (automatic on Vercel/Netlify)

## 🆘 Troubleshooting

**Email not working?**
- Check environment variables are set
- Verify Gmail App Password is correct
- Check server logs for errors

**Domain not working?**
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Verify domain is pointing to correct platform

**Build errors?**
- Check all dependencies are in package.json
- Verify environment variables
- Check for TypeScript errors
