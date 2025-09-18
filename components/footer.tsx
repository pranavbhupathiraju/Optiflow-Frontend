"use client"

import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-card/50 backdrop-blur-sm border-t py-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          <div className="flex flex-col items-center md:items-start">
            <Image src="/optiflow-logo-new.png" alt="Optiflow" width={160} height={48} className="opacity-80 mb-4" />
            <p className="text-muted-foreground text-center md:text-left">
              Transform your business with AI autonomous agents
            </p>
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-4 text-foreground">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">lineai.aillc@gmail.com</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">+1 (774) 224-4447</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Amherst, MA</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h3 className="font-semibold mb-4 text-foreground">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-4">
              Book your free consultation today and discover how AI can transform your business.
            </p>
            <button
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Schedule Consultation →
            </button>
          </div>
        </div>

        <div className="border-t pt-4 text-center">
          <p className="text-sm text-muted-foreground">© 2025 Linea AI LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
