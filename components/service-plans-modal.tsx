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
            <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto p-8">
                <DialogHeader>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                                <service.icon className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <DialogTitle className="text-3xl font-bold">{service.title} Plans</DialogTitle>
                                <DialogDescription className="text-lg mt-2 text-muted-foreground max-w-2xl">
                                    {service.description}
                                </DialogDescription>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-10 w-10">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {service.plans.map((plan, index) => (
                            <Card 
                                key={index} 
                                className={`relative h-full flex flex-col min-h-[500px] ${
                                    plan.highlight 
                                        ? 'border-2 border-primary shadow-xl transform scale-105 bg-gradient-to-b from-primary/5 to-primary/10' 
                                        : 'border hover:shadow-lg transition-all duration-300 hover:scale-102'
                                }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                        <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold flex items-center space-x-2 shadow-lg">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span>Most Popular</span>
                                        </Badge>
                                    </div>
                                )}
                                
                                <CardHeader className="text-center pb-6 pt-8">
                                    <CardTitle className="text-2xl font-bold mb-4">{plan.name}</CardTitle>
                                    <div className="text-4xl font-bold text-primary mb-4">
                                        {plan.price}
                                    </div>
                                    <CardDescription className="text-base leading-relaxed px-2">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>
                                
                                <CardContent className="flex-1 flex flex-col px-6 pb-8">
                                    <div className="space-y-4 flex-1 mb-8">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start space-x-3">
                                                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-foreground leading-relaxed">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <Button 
                                        size="lg"
                                        className={`w-full py-3 text-base font-semibold ${
                                            plan.highlight 
                                                ? 'bg-primary hover:bg-primary/90 shadow-lg' 
                                                : 'bg-secondary hover:bg-secondary/90'
                                        } transition-all duration-200`}
                                        onClick={() => onSelectPlan(service.title, plan.name)}
                                    >
                                        Select {plan.name}
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