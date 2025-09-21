"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, Star } from 'lucide-react'

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

interface ServicePlansModalProps {
    service: Service | null
    isOpen: boolean
    onClose: () => void
    onSelectPlan: (serviceTitle: string, planName: string) => void
}

export default function ServicePlansModal({ service, isOpen, onClose, onSelectPlan }: ServicePlansModalProps) {
    if (!service) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[95vw] w-[95vw] max-h-[95vh] overflow-y-auto p-12">
                <DialogHeader>
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center space-x-3">
                            <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center">
                                <service.icon className="w-10 h-10 text-primary" />
                            </div>
                            <div>
                                <DialogTitle className="text-4xl font-bold">{service.title} Plans</DialogTitle>
                                <DialogDescription className="text-xl mt-3 text-muted-foreground max-w-3xl">
                                    {service.description}
                                </DialogDescription>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-12 w-12">
                            <X className="w-6 h-6" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="mt-12">
                    <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                        {service.plans.map((plan, index) => (
                            <Card 
                                key={index} 
                                className={`relative flex flex-col min-h-[600px] w-full max-w-[350px] lg:max-w-[400px] ${
                                    plan.highlight 
                                        ? 'border-2 border-primary shadow-2xl transform scale-105 bg-gradient-to-b from-primary/5 to-primary/10' 
                                        : 'border hover:shadow-xl transition-all duration-300 hover:scale-105'
                                }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                                        <Badge className="bg-primary text-primary-foreground px-6 py-3 text-base font-semibold flex items-center space-x-2 shadow-lg rounded-full">
                                            <Star className="w-5 h-5 fill-current" />
                                            <span>Most Popular</span>
                                        </Badge>
                                    </div>
                                )}
                                
                                <CardHeader className="text-center pb-8 pt-12">
                                    <CardTitle className="text-3xl font-bold mb-6">{plan.name}</CardTitle>
                                    <div className="text-5xl font-bold text-primary mb-6 leading-none">
                                        {plan.price}
                                    </div>
                                    <CardDescription className="text-lg leading-relaxed px-4">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>
                                
                                <CardContent className="flex-1 flex flex-col px-8 pb-10">
                                    <div className="space-y-5 flex-1 mb-10">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start space-x-4">
                                                <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-base text-foreground leading-relaxed">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <Button 
                                        size="lg" 
                                        className={`w-full py-4 text-lg font-semibold ${
                                            plan.highlight 
                                                ? 'bg-primary hover:bg-primary/90 shadow-xl' 
                                                : 'bg-secondary hover:bg-secondary/90'
                                        } transition-all duration-200`}
                                        onClick={() => onSelectPlan(service.title, plan.name)}
                                    >
                                        Select {plan.name} Plan
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}