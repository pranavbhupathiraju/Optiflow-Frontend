# Quick Email Setup Guide

## ✅ Current Status
The booking form is now working! When users submit the form:
- ✅ Form data is captured and logged to the console
- ✅ Users see "You'll receive an email shortly about your appointment details"
- ✅ Users can submit another form if needed

## 📧 To Enable Real Email Sending

### Step 1: Get Gmail App Password
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click **Security** in the left sidebar
3. Under "How you sign in to Google", click **App passwords**
4. If you don't see this option, enable **2-Step Verification** first
5. Select **Mail** and **Other (Custom name)**
6. Enter "OptiFlow Website" as the name
7. Copy the 16-character password (like: abcd efgh ijkl mnop)

### Step 2: Update Environment File
Edit the `.env.local` file and replace `your_app_password_here` with your actual app password:

```bash
EMAIL_USER=linea.aillc@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

### Step 3: Restart the Server
```bash
pnpm dev
```

## 🧪 Test the Setup
1. Go to http://localhost:3000
2. Fill out the booking form
3. Submit it
4. Check your email at `linea.aillc@gmail.com`

## 📋 What You'll Receive
When someone submits the form, you'll get an email with:
- Their name, email, company, phone
- Their message about their business goals
- Professional formatting with OptiFlow branding
- Clear next steps for follow-up

## 🔧 Current Fallback
Right now, form submissions are logged to the console (you can see them in your terminal where `pnpm dev` is running). This means you can still see all the consultation requests even without email setup!
