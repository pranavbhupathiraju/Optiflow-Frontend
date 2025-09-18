import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Bot, BarChart3, TrendingUp } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/optiflow-logo-new.png"
              alt="OptiFlow"
              width={200}
              height={60}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center">
              <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
            </nav>

            <Link href="/services">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">AI Autonomous Agents That Drive Results</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Transform your business with cutting-edge AI solutions. From technical solutions to AI automated workers, we
            deliver intelligent systems that scale with your success.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Automation</h3>
                <p className="text-muted-foreground">
                  AI agents that work around the clock to optimize your business processes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Premium Reporting</h3>
                <p className="text-muted-foreground">Detailed analytics and insights to track your AI-driven growth</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Proven Growth</h3>
                <p className="text-muted-foreground">Measurable results that scale your business to new heights</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Not sure which service is right for you? Our team can help you choose the perfect AI solution for your business.
          </p>
          <Link href="/services">
            <Button size="lg">
              Explore Our Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
