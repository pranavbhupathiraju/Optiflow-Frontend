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
            <DialogContent className="!max-w-[95vw] !w-[95vw] !max-h-[90vh] flex flex-col">
                <div className="p-4 flex flex-col flex-1 overflow-hidden">
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

                    <div className={`grid gap-6 w-full h-[400px] ${
                        service.plans.length <= 2 
                            ? 'grid-cols-2 max-w-4xl mx-auto' 
                            : service.plans.length === 3 
                                ? 'grid-cols-3 max-w-5xl mx-auto' 
                                : 'grid-cols-4'
                    }`}>
                        {service.plans.map((plan, index) => (
                            <Card 
                                key={index} 
                                className="flex flex-col h-full overflow-hidden border hover:shadow-lg transition-all duration-300 min-w-0"
                            >
                                
                                <CardHeader className="text-center pb-2 px-4 pt-4">
                                    <CardTitle className="text-xl font-bold mb-3">{plan.name}</CardTitle>
                                    <div className="text-2xl font-bold text-primary mb-3 leading-none text-center">
                                        {plan.price}
                                    </div>
                                    <CardDescription className="text-sm leading-relaxed text-center h-12 flex items-center justify-center">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>
                                
                                <CardContent className="flex-1 flex flex-col px-4 pb-4 justify-between">
                                    <div className="space-y-2 mb-4 h-[140px] overflow-y-auto">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start space-x-2">
                                                <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-foreground leading-tight">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <Button 
                                        size="default"
                                        className="w-full py-2 text-sm font-semibold mt-auto bg-primary hover:bg-primary/90 transition-all duration-200"
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