# Email Setup Instructions

## Overview
The booking form now sends emails to `linea.aillc@gmail.com` when users submit consultation requests.

## Setup Required

### 1. Gmail App Password Setup
To enable email sending, you need to set up a Gmail App Password:

1. **Enable 2-Factor Authentication** on your Google Account
2. Go to **Google Account Settings** > **Security**
3. Under "How you sign in to Google", click **App passwords**
4. Select **Mail** as the app and **Other** as the device
5. Enter "OptiFlow Website" as the device name
6. Copy the generated 16-character password

### 2. Environment Configuration
Update the `.env.local` file with your credentials:

```bash
EMAIL_USER=linea.aillc@gmail.com
EMAIL_PASS=your_16_character_app_password_here
```

### 3. Test the Setup
1. Start the development server: `pnpm dev`
2. Open http://localhost:3000
3. Fill out the booking form and submit
4. Check `linea.aillc@gmail.com` for the consultation request email

## Email Features

- **Professional HTML formatting** with OptiFlow branding
- **All form data included** (name, email, company, phone, message)
- **Clear next steps** for follow-up
- **Error handling** with user-friendly messages
- **Loading states** during submission

## Troubleshooting

- **"Failed to send email"**: Check your app password and ensure 2FA is enabled
- **"Network error"**: Check your internet connection
- **Emails not received**: Check spam folder and verify email address

## Security Notes

- Never commit the `.env.local` file to version control
- Use App Passwords instead of your main Gmail password
- The API route includes input validation and sanitization
