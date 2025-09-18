"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Target, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main headline */}
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up gradient-text"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-balance">AI Autonomous Agents</span>
            <br />
            <span className="text-balance">That Drive Results</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto animate-fade-up text-balance"
            style={{ animationDelay: "0.4s" }}
          >
            Transform your business with intelligent AI solutions. From website optimization and chatbots to CRMs and
            marketing automation - we do anything and everything to dominate your online presence.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">24/7 Automation</span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border">
              <Target className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">Precision Targeting</span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Proven Growth</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-up" style={{ animationDelay: "0.8s" }}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
