"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star } from 'lucide-react'

interface Plan {
    name: string
    description: string
    price: string
    features: string[]
    highlight?: boolean
}

interface Service {
    title: string
    description: string
    icon: any
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
                <div className="p-8 flex flex-col flex-1 overflow-hidden">
                    <DialogHeader className="mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                                <service.icon className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <DialogTitle className="text-3xl font-bold">{service.title} Plans</DialogTitle>
                                <DialogDescription className="text-lg mt-2 text-muted-foreground max-w-4xl">
                                    {service.description}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="grid grid-cols-4 gap-6 w-full">
                        {service.plans.map((plan, index) => (
                            <Card 
                                key={index} 
                                className={`relative flex flex-col ${
                                    plan.highlight 
                                        ? 'border-2 border-primary shadow-lg bg-gradient-to-b from-primary/5 to-primary/10' 
                                        : 'border hover:shadow-lg transition-all duration-300'
                                }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                                        <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold flex items-center space-x-1 shadow-lg rounded-full">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span>Most Popular</span>
                                        </Badge>
                                    </div>
                                )}
                                
                                <CardHeader className="text-center pb-2 pt-4">
                                    <CardTitle className="text-lg font-bold mb-2">{plan.name}</CardTitle>
                                    <div className="text-2xl font-bold text-primary mb-2 leading-none">
                                        {plan.price}
                                    </div>
                                    <CardDescription className="text-xs leading-relaxed px-2">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>
                                
                                <CardContent className="flex-1 flex flex-col px-3 pb-4">
                                    <div className="space-y-2 flex-1 mb-4">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start space-x-2">
                                                <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-xs text-foreground leading-relaxed">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <Button 
                                        size="sm" 
                                        className={`w-full py-2 text-xs font-semibold ${
                                            plan.highlight 
                                                ? 'bg-primary hover:bg-primary/90 shadow-lg' 
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