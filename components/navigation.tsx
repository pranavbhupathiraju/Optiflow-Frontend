"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/optiflow-logo-new.png"
              alt="Optiflow"
              width={200}
              height={60}
              className="h-8 w-auto"
              priority
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Button
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
