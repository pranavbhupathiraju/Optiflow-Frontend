# ⚡ Quick Deploy to Vercel (5 minutes)

## Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial OptiFlow website"

# Create GitHub repo and push
# Go to github.com → New Repository → Create
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/optiflow-website.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your `optiflow-website` repository
5. Click "Deploy" (automatic)

## Step 3: Add Your Domain
1. In Vercel dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `optiflow.com`)
3. Follow the DNS instructions provided
4. Wait 5-10 minutes for DNS propagation

## Step 4: Set Up Email
1. Get Gmail App Password:
   - Google Account → Security → App passwords
   - Generate password for "Mail"
2. In Vercel → Project Settings → Environment Variables:
   ```
   EMAIL_USER = linea.aillc@gmail.com
   EMAIL_PASS = your_16_character_password
   ```
3. Redeploy (automatic)

## ✅ Done!
Your OptiFlow website is now live at your domain!

### Test Your Site
- Visit your domain
- Fill out the booking form
- Check that you receive emails at `linea.aillc@gmail.com`

### Need Help?
- Check the full `DEPLOYMENT_GUIDE.md` for other options
- Vercel docs: https://vercel.com/docs
- Domain setup: https://vercel.com/docs/concepts/projects/domains
