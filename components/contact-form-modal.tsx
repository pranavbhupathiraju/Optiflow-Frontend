"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Send } from 'lucide-react'

interface ContactFormModalProps {
    service: string
    selectedPlan?: string
    isOpen: boolean
    onClose: () => void
}

export default function ContactFormModal({ service, selectedPlan, isOpen, onClose }: ContactFormModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            service,
            plan: selectedPlan,
            companyName: formData.get("companyName"),
            contactName: formData.get("contactName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            location: formData.get("location"),
            industry: formData.get("industry"),
            companySize: formData.get("companySize"),
            requirements: formData.get("requirements"),
            timeline: formData.get("timeline"),
            budget: formData.get("budget"),
        }

        try {
            const response = await fetch("/api/submit-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                toast({
                    title: "Inquiry Submitted!",
                    description: "We'll get back to you within 24 hours with a detailed proposal.",
                })
                    ; (e.target as HTMLFormElement).reset()
                onClose()
            } else {
                throw new Error("Failed to submit")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit inquiry. Please try again or contact us directly.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Get Quote for {service}
                        {selectedPlan && ` (${selectedPlan} Plan)`}
                    </DialogTitle>
                    <DialogDescription>
                        Tell us about your project and we'll provide a custom quote.
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hidden field for selected plan */}
                    {selectedPlan && (
                        <input type="hidden" name="plan" value={selectedPlan} />
                    )}
                    
                    {/* Company Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Company Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name *</Label>
                                <Input id="companyName" name="companyName" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contactName">Contact Name *</Label>
                                <Input id="contactName" name="contactName" required />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <Input id="email" name="email" type="email" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" name="phone" type="tel" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" placeholder="City, Country" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="industry">Industry *</Label>
                                <Select name="industry" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                        <SelectItem value="finance">Finance</SelectItem>
                                        <SelectItem value="retail">Retail</SelectItem>
                                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                        <SelectItem value="education">Education</SelectItem>
                                        <SelectItem value="real-estate">Real Estate</SelectItem>
                                        <SelectItem value="consulting">Consulting</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="companySize">Company Size</Label>
                            <Select name="companySize">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select company size" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1-10">1-10 employees</SelectItem>
                                    <SelectItem value="11-50">11-50 employees</SelectItem>
                                    <SelectItem value="51-200">51-200 employees</SelectItem>
                                    <SelectItem value="201-1000">201-1000 employees</SelectItem>
                                    <SelectItem value="1000+">1000+ employees</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Project Requirements */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Project Requirements</h3>
                        <div className="space-y-2">
                            <Label htmlFor="requirements">Describe your specific needs *</Label>
                            <Textarea
                                id="requirements"
                                name="requirements"
                                placeholder="Please provide detailed information about what you're looking for, your current challenges, and your goals..."
                                className="min-h-[120px]"
                                required
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="timeline">Desired Timeline</Label>
                                <Select name="timeline">
                                    <SelectTrigger>
                                        <SelectValue placeholder="When do you need this?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="asap">ASAP</SelectItem>
                                        <SelectItem value="1-month">Within 1 month</SelectItem>
                                        <SelectItem value="2-3-months">2-3 months</SelectItem>
                                        <SelectItem value="3-6-months">3-6 months</SelectItem>
                                        <SelectItem value="6-months+">6+ months</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="budget">Budget Range</Label>
                                <Select name="budget">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select budget range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="under-5k">Under $5,000</SelectItem>
                                        <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                                        <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                                        <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                                        <SelectItem value="100k+">$100,000+</SelectItem>
                                        <SelectItem value="discuss">Let's discuss</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : (
                            <>
                                Submit Inquiry
                                <Send className="ml-2 w-4 h-4" />
                            </>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}