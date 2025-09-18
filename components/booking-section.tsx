"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, CheckCircle, Send } from "lucide-react"

export function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
        })
      } else {
        const errorData = await response.json()
        setSubmitError(errorData.error || 'Failed to send email. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isSubmitted) {
    return (
      <section id="booking" className="py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <Card className="max-w-2xl mx-auto p-12 text-center border-0 bg-card/80 backdrop-blur-sm">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">Thank You!</h3>
            <p className="text-lg text-muted-foreground mb-6">
              You'll receive an email shortly about your appointment details. We'll get back to you within 24 hours to schedule your consultation.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full">
              Submit Another Request
            </Button>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Ready to Dominate Your Market?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Book a free consultation and discover how our comprehensive AI solutions can transform your business in
              the next 30 days.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">What You'll Get:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Free Strategy Session</h4>
                    <p className="text-muted-foreground">
                      45-minute deep dive into your current marketing challenges and opportunities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Custom AI Roadmap</h4>
                    <p className="text-muted-foreground">
                      Personalized plan showing exactly how AI agents will accelerate your growth.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">ROI Projection</h4>
                    <p className="text-muted-foreground">
                      Clear projections of the results you can expect in 30, 60, and 90 days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <Card className="p-8 border-2 border-primary/20 bg-card/90 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-primary/40">
              <div className="mb-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Start Your Transformation</h3>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
                    {submitError}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-2"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="mt-2"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Tell us about your business and goals</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 min-h-[120px]"
                    placeholder="What are your biggest marketing challenges? What results are you looking to achieve?"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 font-semibold text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send className="mr-2 w-5 h-5" />
                  {isSubmitting ? 'Sending...' : 'Book Your Free Consultation'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
