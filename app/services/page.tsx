"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Globe, MessageSquare, Wrench, ArrowRight } from 'lucide-react'
import ContactFormModal from "@/components/contact-form-modal"
import ServicePlansModal from "@/components/service-plans-modal"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface Plan {
    name: string
    description: string
    price: string
    features: string[]
    highlight?: boolean
}

interface Service {
    id: string
    title: string
    description: string
    icon: any
    features: string[]
    plans: Plan[]
}

const services: Service[] = [
    {
        id: "ai-content",
        title: "AI Content Creation",
        description: "Generate high-quality, engaging content at scale with our advanced AI writing systems. From blog posts to social media content, we create content that converts.",
        icon: Bot,
        features: ["Blog posts and articles", "Social media content", "Email campaigns", "Product descriptions", "SEO-optimized content"],
        plans: [
            {
                name: "Starter",
                description: "Perfect for small businesses getting started with AI content",
                price: "$499/month",
                features: [
                    "10 blog posts per month",
                    "20 social media posts",
                    "Basic SEO optimization",
                    "Email support",
                    "Content calendar"
                ]
            },
            {
                name: "Pro",
                description: "Ideal for growing businesses with regular content needs",
                price: "$999/month",
                features: [
                    "25 blog posts per month",
                    "50 social media posts",
                    "Advanced SEO optimization",
                    "Email campaigns (5/month)",
                    "Priority support",
                    "Content strategy consultation"
                ],
                highlight: true
            },
            {
                name: "Premium",
                description: "For established businesses with high-volume content requirements",
                price: "$1,999/month",
                features: [
                    "50 blog posts per month",
                    "100 social media posts",
                    "Premium SEO optimization",
                    "Unlimited email campaigns",
                    "Dedicated account manager",
                    "Custom content templates",
                    "Performance analytics"
                ]
            },
            {
                name: "Enterprise",
                description: "Custom solutions for large organizations",
                price: "Custom Quote",
                features: [
                    "Unlimited content generation",
                    "Multi-brand management",
                    "Custom AI model training",
                    "API access",
                    "24/7 dedicated support",
                    "Custom integrations",
                    "White-label solutions"
                ]
            }
        ]
    },
    {
        id: "website-optimization",
        title: "Website Optimization",
        description: "Boost your website's performance, speed, and conversion rates with AI-driven optimization strategies and technical improvements.",
        icon: Globe,
        features: ["Performance optimization", "SEO improvements", "Conversion rate optimization", "Mobile responsiveness", "Core Web Vitals optimization"],
        plans: [
            {
                name: "Refactor",
                description: "Optimize your existing website for better performance and conversions",
                price: "$2,499",
                features: [
                    "Complete performance audit",
                    "Speed optimization",
                    "SEO improvements",
                    "Mobile responsiveness fixes",
                    "Core Web Vitals optimization",
                    "3 months of monitoring",
                    "Performance report"
                ],
                highlight: true
            },
            {
                name: "Create",
                description: "Build a brand new, high-converting website from scratch",
                price: "$4,999",
                features: [
                    "Custom website design",
                    "Modern tech stack",
                    "SEO-optimized structure",
                    "Mobile-first approach",
                    "CMS integration",
                    "Analytics setup",
                    "6 months of support",
                    "Training included"
                ]
            }
        ]
    },
    {
        id: "ai-chatbots",
        title: "AI Chatbots & Support",
        description: "Deploy intelligent chatbots that provide 24/7 customer support, answer questions, and guide users through your sales funnel.",
        icon: MessageSquare,
        features: ["24/7 customer support", "Lead qualification", "FAQ automation", "Multi-language support", "CRM integration"],
        plans: [
            {
                name: "Basic",
                description: "Essential chatbot functionality for small businesses",
                price: "$299/month",
                features: [
                    "Basic FAQ automation",
                    "Up to 1,000 conversations/month",
                    "Email integration",
                    "Basic analytics",
                    "Standard support"
                ]
            },
            {
                name: "Advanced",
                description: "Comprehensive chatbot solution with CRM integration",
                price: "$699/month",
                features: [
                    "Advanced conversation flows",
                    "Up to 5,000 conversations/month",
                    "CRM integration",
                    "Lead qualification",
                    "Multi-language support",
                    "Priority support",
                    "Custom training"
                ],
                highlight: true
            },
            {
                name: "Enterprise",
                description: "Full-scale AI support system for large organizations",
                price: "$1,499/month",
                features: [
                    "Unlimited conversations",
                    "Advanced AI training",
                    "Multiple bot deployment",
                    "Custom integrations",
                    "Dedicated support team",
                    "Advanced analytics",
                    "White-label options"
                ]
            }
        ]
    },
    {
        id: "technical-solutions",
        title: "Technical Solutions",
        description: "Custom AI integrations, API development, and technical implementations tailored to your specific business needs.",
        icon: Wrench,
        features: ["Custom AI integrations", "API development", "Workflow automation", "Database optimization", "Third-party integrations"],
        plans: [
            {
                name: "Consultation",
                description: "Expert technical consultation and planning",
                price: "$199/hour",
                features: [
                    "Technical assessment",
                    "Solution architecture",
                    "Implementation roadmap",
                    "Technology recommendations",
                    "Risk analysis",
                    "Cost estimation"
                ]
            },
            {
                name: "Integration",
                description: "Connect your existing systems with AI capabilities",
                price: "$3,999",
                features: [
                    "API development",
                    "System integration",
                    "Data migration",
                    "Testing & QA",
                    "Documentation",
                    "3 months support",
                    "Training included"
                ],
                highlight: true
            },
            {
                name: "Custom Build",
                description: "Complete custom AI solution development",
                price: "Custom Quote",
                features: [
                    "Custom AI model development",
                    "Full-stack development",
                    "Cloud infrastructure setup",
                    "Ongoing maintenance",
                    "Dedicated development team",
                    "Scalable architecture",
                    "Enterprise support"
                ]
            }
        ]
    },
]

export default function ServicesPage() {
    const [selectedService, setSelectedService] = useState<string | null>(null)
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isPlansModalOpen, setIsPlansModalOpen] = useState(false)
    const [selectedServiceForPlans, setSelectedServiceForPlans] = useState<Service | null>(null)
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }

        getUser()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [supabase.auth])

    const handleServiceClick = (service: Service) => {
        setSelectedServiceForPlans(service)
        setIsPlansModalOpen(true)
    }

    const handleSelectPlan = (serviceTitle: string, planName: string) => {
        setIsPlansModalOpen(false)
        setSelectedService(serviceTitle)
        setSelectedPlan(planName)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedService(null)
        setSelectedPlan(null)
    }

    const handleClosePlansModal = () => {
        setIsPlansModalOpen(false)
        setSelectedServiceForPlans(null)
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

                            <Link href="/dashboard">
                                <Button>Dashboard</Button>
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
                                    <Card key={service.id} className="h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleServiceClick(service)}>
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
                                                View Plans
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
            {selectedService && selectedPlan && (
                <ContactFormModal
                    service={selectedService}
                    selectedPlan={selectedPlan}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}

            {/* Service Plans Modal */}
            <ServicePlansModal
                service={selectedServiceForPlans}
                isOpen={isPlansModalOpen}
                onClose={handleClosePlansModal}
                onSelectPlan={handleSelectPlan}
            />
        </>
    )
}