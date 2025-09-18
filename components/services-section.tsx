"use client"

import { Card } from "@/components/ui/card"
import { Bot, BarChart3, Megaphone, Search, MessageSquare, Globe, Database, Wrench } from "lucide-react"

const services = [
  {
    icon: Bot,
    title: "AI Content Creation",
    description:
      "Autonomous agents that create compelling, brand-aligned content across all your marketing channels with zero human intervention.",
  },
  {
    icon: Globe,
    title: "Website Optimization",
    description:
      "Complete website overhauls, performance improvements, and modern redesigns that convert visitors into customers.",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbots & Support",
    description:
      "Intelligent chatbots that handle customer inquiries, qualify leads, and provide 24/7 support for your business.",
  },
  {
    icon: Database,
    title: "Custom CRM Systems",
    description:
      "Tailored customer relationship management systems that streamline your sales process and boost conversions.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Real-time optimization powered by AI that continuously analyzes and improves your marketing performance for maximum ROI.",
  },
  {
    icon: Wrench,
    title: "Technical Solutions",
    description:
      "From API integrations to custom software development - we build whatever your business needs to succeed online.",
  },
  {
    icon: Megaphone,
    title: "Multi-Channel Campaigns",
    description:
      "Coordinated marketing campaigns across social media, email, and digital platforms, all managed by intelligent agents.",
  },
  {
    icon: Search,
    title: "SEO Domination",
    description:
      "AI-driven SEO strategies that automatically optimize your content and website for search engine supremacy.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Everything Your Business Needs</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            We don't just do marketing - we transform your entire online presence. From AI automation to custom
            development, we handle anything and everything to make your business dominate digitally.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
