#!/bin/bash

echo "🚀 Preparing OptiFlow for GitHub deployment..."

# Check if git is already initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
else
    echo "✅ Git repository already initialized"
fi

# Add all files
echo "📁 Adding all files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial OptiFlow website with authentication

Features:
- Homepage with hero section and services
- Contact form with email integration
- Supabase authentication setup
- Protected dashboard with user profiles
- Database migrations for users, services, billing
- Responsive design with Tailwind CSS

Known issues:
- Sign-in authentication flow needs debugging in Cursor"

echo ""
echo "✅ Repository prepared for GitHub!"
echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub named 'optiflow-website'"
echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/optiflow-website.git"
echo "3. Run: git branch -M main"
echo "4. Run: git push -u origin main"
echo ""
echo "Then open in Cursor to debug the authentication issue!"