import { NextRequest, NextResponse } from 'next/server'
import * as nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, phone, message } = await request.json()

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'your_app_password_here') {
      console.log('Email not configured, logging form data instead:', { name, email, company, phone, message })
      // For now, just log the data and return success
      // In production, you would set up the email credentials
      return NextResponse.json(
        { message: 'Email sent successfully (logged to console)' },
        { status: 200 }
      )
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // linea.aillc@gmail.com
        pass: process.env.EMAIL_PASS, // App password
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'linea.aillc@gmail.com',
      subject: `New Consultation Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff6b35; border-bottom: 2px solid #ff6b35; padding-bottom: 10px;">
            New Consultation Request
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          </div>

          ${message ? `
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #ff6b35; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}

          <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1976d2;">
              <strong>Next Steps:</strong> Please respond to this consultation request within 24 hours to schedule the free strategy session.
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            This email was sent from the OptiFlow website contact form.
          </p>
        </div>
      `,
      text: `
New Consultation Request

Contact Information:
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${phone ? `Phone: ${phone}` : ''}

${message ? `Message:\n${message}` : ''}

Next Steps: Please respond to this consultation request within 24 hours to schedule the free strategy session.

This email was sent from the OptiFlow website contact form.
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
