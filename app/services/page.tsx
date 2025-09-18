"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Globe, MessageSquare, Wrench, ArrowRight } from 'lucide-react'
import ContactFormModal from "@/components/contact-form-modal"
import Link from "next/link"

const services = [
    {
        id: "ai-content",
        title: "AI Content Creation",
        description: "Generate high-quality, engaging content at scale with our advanced AI writing systems. From blog posts to social media content, we create content that converts.",
        icon: Bot,
        features: ["Blog posts and articles", "Social media content", "Email campaigns", "Product descriptions", "SEO-optimized content"],
    },
    {
        id: "website-optimization",
        title: "Website Optimization",
        description: "Boost your website's performance, speed, and conversion rates with AI-driven optimization strategies and technical improvements.",
        icon: Globe,
        features: ["Performance optimization", "SEO improvements", "Conversion rate optimization", "Mobile responsiveness", "Core Web Vitals optimization"],
    },
    {
        id: "ai-chatbots",
        title: "AI Chatbots & Support",
        description: "Deploy intelligent chatbots that provide 24/7 customer support, answer questions, and guide users through your sales funnel.",
        icon: MessageSquare,
        features: ["24/7 customer support", "Lead qualification", "FAQ automation", "Multi-language support", "CRM integration"],
    },
    {
        id: "technical-solutions",
        title: "Technical Solutions",
        description: "Custom AI integrations, API development, and technical implementations tailored to your specific business needs.",
        icon: Wrench,
        features: ["Custom AI integrations", "API development", "Workflow automation", "Database optimization", "Third-party integrations"],
    },
]

export default function ServicesPage() {
    const [selectedService, setSelectedService] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleServiceClick = (serviceTitle: string) => {
        setSelectedService(serviceTitle)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedService(null)
    }

    return (
        <>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="border-b">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/optiflow-logo-new.png"
                                alt="OptiFlow"
                                width={200}
                                height={60}
                                className="h-8 w-auto"
                                priority
                            />
                        </Link>

                        <div className="flex items-center space-x-6">
                            <nav className="hidden md:flex items-center">
                                <Link href="/services" className="text-foreground font-medium">Services</Link>
                            </nav>

                            <Link href="/services">
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-16 px-4">
                    <div className="container mx-auto text-center max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Our AI-Powered Services</h1>
                        <p className="text-xl text-muted-foreground mb-8 text-pretty">
                            Choose from our core AI solutions designed to transform your business operations and drive measurable growth.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-8 px-4">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {services.map((service) => {
                                const IconComponent = service.icon
                                return (
                                    <Card key={service.id} className="h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleServiceClick(service.title)}>
                                        <CardHeader>
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                                <IconComponent className="w-6 h-6 text-primary" />
                                            </div>
                                            <CardTitle className="text-2xl">{service.title}</CardTitle>
                                            <CardDescription className="text-base">{service.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 mb-6">
                                                {service.features.map((feature, index) => (
                                                    <li key={index} className="flex items-center text-sm text-muted-foreground">
                                                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                            <Button className="w-full">
                                                Get Quote
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-4 bg-muted/50">
                    <div className="container mx-auto text-center max-w-2xl">
                        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                        <p className="text-muted-foreground mb-6">
                            Not sure which service is right for you? Our team can help you choose the perfect AI solution for your business.
                        </p>
                        <Link href="/">
                            <Button size="lg">
                                Back to Home
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>

            {/* Contact Form Modal */}
            {selectedService && (
                <ContactFormModal
                    service={selectedService}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}