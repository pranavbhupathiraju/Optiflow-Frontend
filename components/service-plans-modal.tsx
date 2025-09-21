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

                                    <CardHeader className="text-center pb-2 pt-4">
                                        <CardTitle className="text-lg font-bold mb-2">{plan.name}</CardTitle>
                                        <div className="text-2xl font-bold text-primary mb-2 leading-none">
    description: string
    icon: any
                                        <CardDescription className="text-xs leading-relaxed px-2">
    plans: Plan[]
}

interface ServicePlansModalProps {
                                    }
                                    <CardContent className="flex-1 flex flex-col px-3 pb-4">
                                        <div className="space-y-2 flex-1 mb-4">
    onClose: () => void
    onSelectPlan: (serviceTitle: string, planName: string) => void
                                                    <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                                                    <span className="text-xs text-foreground leading-relaxed">{feature}</span>
export default function ServicePlansModal({ service, isOpen, onClose, onSelectPlan }: ServicePlansModalProps) {
                                    }
    if (!service) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
                                            size="sm" 
                                            className={`w-full py-2 text-xs font-semibold ${
                    <DialogHeader className="mb-16">
                                                    ? 'bg-primary hover:bg-primary/90 shadow-lg' 
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
                                }
                                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <service.icon className="w-8 h-8 text-primary" />
                                {plan.highlight && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                                    <DialogTitle className="text-3xl font-bold">{service.title} Plans</DialogTitle>
                                    <DialogDescription className="text-lg mt-2 text-muted-foreground max-w-4xl">
                                            <span>Most Popular</span>
                                        </Badge>
                                    </div>
                                )}
                                
                                <CardHeader className="text-center pb-4 pt-8">
                        <div className="grid grid-cols-4 gap-6 w-full">
                                    <div className="text-3xl font-bold text-primary mb-4 leading-none">
                                        {plan.price}
                                    </div>
                                    <CardDescription className="text-sm leading-relaxed px-3">
                                        {plan.description}
                                            ? 'border-2 border-primary shadow-lg bg-gradient-to-b from-primary/5 to-primary/10' 
                                            : 'border hover:shadow-lg transition-all duration-300'
                                
                                <CardContent className="flex-1 flex flex-col px-4 pb-6">
                                    <div className="space-y-3 flex-1 mb-6">
                                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                                            <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold flex items-center space-x-1 shadow-lg rounded-full">
                                                <Star className="w-3 h-3 fill-current" />
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
                    )
                    )
                    }
        }
        </Dialog>
    )
}