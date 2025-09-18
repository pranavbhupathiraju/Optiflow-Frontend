#!/bin/bash

# OptiFlow Website Deployment Script
echo "🚀 Deploying OptiFlow Website..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial OptiFlow website deployment"
fi

# Build the project
echo "🔨 Building project..."
pnpm build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🌐 Ready for deployment! Choose your platform:"
    echo ""
    echo "1. Vercel (Recommended):"
    echo "   - Go to https://vercel.com"
    echo "   - Connect your GitHub account"
    echo "   - Import this repository"
    echo "   - Deploy automatically"
    echo ""
    echo "2. Netlify:"
    echo "   - Go to https://netlify.com"
    echo "   - Drag & drop the .next folder"
    echo "   - Add custom domain"
    echo ""
    echo "3. Manual VPS:"
    echo "   - Upload files to your server"
    echo "   - Run: pnpm install && pnpm start"
    echo ""
    echo "📧 Don't forget to set up email environment variables!"
    echo "   EMAIL_USER=linea.aillc@gmail.com"
    echo "   EMAIL_PASS=your_gmail_app_password"
else
    echo "❌ Build failed! Please check for errors."
    exit 1
fi
