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
            <DialogContent className="!max-w-[98vw] !w-[98vw] max-h-[98vh] flex flex-col">
                <div className="p-16 flex flex-col flex-1 overflow-hidden">
                    <DialogHeader className="mb-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-24 h-24 bg-primary/10 rounded-xl flex items-center justify-center">
                                <service.icon className="w-12 h-12 text-primary" />
                            </div>
                            <div>
                                <DialogTitle className="text-5xl font-bold">{service.title} Plans</DialogTitle>
                                <DialogDescription className="text-2xl mt-4 text-muted-foreground max-w-4xl">
                                    {service.description}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="flex justify-start gap-12 xl:gap-16 overflow-x-auto pb-4 h-full">
                        {service.plans.map((plan, index) => (
                            <Card 
                                key={index} 
                                className={`relative flex flex-col min-h-[500px] min-w-[280px] w-[280px] flex-shrink-0 ${
                                    plan.highlight 
                                        ? 'border-2 border-primary shadow-2xl transform scale-105 bg-gradient-to-b from-primary/5 to-primary/10' 
                                        : 'border hover:shadow-xl transition-all duration-300 hover:scale-105'
                                }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                                        <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold flex items-center space-x-1 shadow-lg rounded-full">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span>Most Popular</span>
                                        </Badge>
                                    </div>
                                )}
                                
                                <CardHeader className="text-center pb-4 pt-8">
                                    <CardTitle className="text-2xl font-bold mb-4">{plan.name}</CardTitle>
                                    <div className="text-3xl font-bold text-primary mb-4 leading-none">
                                        {plan.price}
                                    </div>
                                    <CardDescription className="text-sm leading-relaxed px-3">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>
                                
                                <CardContent className="flex-1 flex flex-col px-4 pb-6">
                                    <div className="space-y-3 flex-1 mb-6">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start space-x-2">
                                                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-foreground leading-relaxed">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <Button 
                                        size="lg" 
                                        className={`w-full py-3 text-sm font-semibold ${
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