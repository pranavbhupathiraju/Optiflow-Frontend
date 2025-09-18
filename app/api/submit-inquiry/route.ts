import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        // Validate required fields
        if (!data.contactName || !data.email || !data.service) {
            return NextResponse.json(
                { error: "Name, email, and service are required" },
                { status: 400 }
            )
        }

        // Format the email content
        const emailContent = `
New Service Inquiry - ${data.service}

COMPANY INFORMATION:
- Company Name: ${data.companyName || "Not provided"}
- Contact Name: ${data.contactName}
- Email: ${data.email}
- Phone: ${data.phone || "Not provided"}
- Location: ${data.location || "Not provided"}
- Industry: ${data.industry || "Not provided"}
- Company Size: ${data.companySize || "Not provided"}

PROJECT DETAILS:
- Service: ${data.service}
- Requirements: ${data.requirements}
- Timeline: ${data.timeline || "Not specified"}
- Budget: ${data.budget || "Not specified"}

Submitted at: ${new Date().toLocaleString()}
    `

        // Log the inquiry (replace with email service integration)
        console.log("New inquiry received:", emailContent)

        // TODO: Integrate with email service (Resend, SendGrid, etc.)
        // or save to database

        return NextResponse.json({ success: true, message: "Inquiry submitted successfully" })
    } catch (error) {
        console.error("Error processing inquiry:", error)
        return NextResponse.json({ success: false, message: "Failed to submit inquiry" }, { status: 500 })
    }
}