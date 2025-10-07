import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Headphones, Mic, BarChart3, Trophy, BookOpen, Zap, Check, Sparkles, Star } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-orange-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-xl font-bold text-white">D</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] bg-clip-text text-transparent">
              DEMIF
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-foreground/70 hover:text-[#FF7A00] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-foreground/70 hover:text-[#FF7A00] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-foreground/70 hover:text-[#FF7A00] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-foreground/70 hover:text-[#FF7A00] transition-colors"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-[#FF7A00]" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              size="sm"
              className="bg-[#FF7A00] hover:bg-[#FF9E2C] text-white shadow-lg shadow-orange-500/30"
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-6 bg-orange-100 text-[#FF7A00] border-orange-200 hover:bg-orange-100">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Learning Platform
          </Badge>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-tight">
            Master Languages with{" "}
            <span className="bg-gradient-to-r from-[#FF7A00] via-[#FF9E2C] to-[#FFB84D] bg-clip-text text-transparent">
              AI Precision
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 mb-12 text-pretty max-w-3xl mx-auto leading-relaxed">
            Transform your listening and speaking skills through intelligent dictation and shadowing exercises. Get
            real-time AI feedback and track your progress like never before.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-[#FF7A00] hover:bg-[#FF9E2C] text-white shadow-xl shadow-orange-500/30"
              asChild
            >
              <Link href="/signup">
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-[#FF7A00] text-[#FF7A00] hover:bg-orange-50 bg-transparent"
              asChild
            >
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#FF7A00]" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#FF7A00]" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#FF7A00]" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-[#FF7A00] border-orange-200">Features</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything you need to excel</h2>
          <p className="text-foreground/70 text-xl max-w-2xl mx-auto leading-relaxed">
            Comprehensive AI-powered tools designed for effective language mastery
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Card className="p-8 bg-card border-2 border-border hover:border-[#FF7A00] hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
              <Headphones className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">AI Dictation</h3>
            <p className="text-foreground/70 leading-relaxed">
              Listen to native speakers and type what you hear. Get instant AI-powered feedback on accuracy and
              comprehension with detailed analysis.
            </p>
          </Card>

          <Card className="p-8 bg-card border-2 border-border hover:border-[#FF7A00] hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
              <Mic className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Shadowing Practice</h3>
            <p className="text-foreground/70 leading-relaxed">
              Record yourself mimicking native pronunciation. Advanced AI analyzes your speech for accuracy, fluency,
              and intonation.
            </p>
          </Card>

          <Card className="p-8 bg-card border-2 border-border hover:border-[#FF7A00] hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Progress Tracking</h3>
            <p className="text-foreground/70 leading-relaxed">
              Visualize your improvement with detailed analytics, radar charts, and insights across all skill
              dimensions.
            </p>
          </Card>

          <Card className="p-8 bg-card border-2 border-border hover:border-[#FF7A00] hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Smart Review</h3>
            <p className="text-foreground/70 leading-relaxed">
              Spaced repetition system powered by AI ensures you remember vocabulary and patterns for the long term.
            </p>
          </Card>

          <Card className="p-8 bg-card border-2 border-border hover:border-[#FF7A00] hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
              <Trophy className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Leaderboards</h3>
            <p className="text-foreground/70 leading-relaxed">
              Compete with learners worldwide. Track your ranking, celebrate achievements, and stay motivated.
            </p>
          </Card>

          <Card className="p-8 bg-card border-2 border-border hover:border-[#FF7A00] hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Adaptive Learning</h3>
            <p className="text-foreground/70 leading-relaxed">
              AI automatically adjusts difficulty based on your performance, keeping you in the optimal learning zone.
            </p>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-[#FF7A00] border-orange-200">Pricing</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose your learning path</h2>
          <p className="text-foreground/70 text-xl max-w-2xl mx-auto leading-relaxed">
            Flexible plans designed to fit your language learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Monthly Plan */}
          <Card className="p-8 bg-card border-2 border-border hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Monthly</h3>
              <p className="text-foreground/60">Perfect for trying out</p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">$19</span>
                <span className="text-foreground/60">/month</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Unlimited dictation exercises</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Unlimited shadowing practice</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">AI-powered feedback</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Progress tracking & analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Mobile app access</span>
              </li>
            </ul>
            <Button className="w-full bg-[#FF7A00] hover:bg-[#FF9E2C] text-white" size="lg">
              Start Free Trial
            </Button>
          </Card>

          {/* Yearly Plan - Popular */}
          <Card className="p-8 bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] border-2 border-[#FF7A00] relative shadow-2xl shadow-orange-500/30 scale-105">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#FF7A00] border-white">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-white">Yearly</h3>
              <p className="text-white/80">Save 40% annually</p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">$11</span>
                <span className="text-white/80">/month</span>
              </div>
              <p className="text-sm text-white/70 mt-2">Billed $132/year</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white/90">Everything in Monthly</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white/90">Priority AI processing</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white/90">Advanced analytics dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white/90">Exclusive content library</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white/90">Email support</span>
              </li>
            </ul>
            <Button className="w-full bg-white text-[#FF7A00] hover:bg-orange-50" size="lg">
              Start Free Trial
            </Button>
          </Card>

          {/* Lifetime Plan */}
          <Card className="p-8 bg-card border-2 border-border hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Lifetime</h3>
              <p className="text-foreground/60">One-time payment</p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">$299</span>
              </div>
              <p className="text-sm text-foreground/60 mt-2">Pay once, learn forever</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Everything in Yearly</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Lifetime access to all features</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">All future updates included</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Priority support forever</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Early access to new features</span>
              </li>
            </ul>
            <Button className="w-full bg-[#FF7A00] hover:bg-[#FF9E2C] text-white" size="lg">
              Get Lifetime Access
            </Button>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-[#FF7A00] border-orange-200">How It Works</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, effective workflow</h2>
          <p className="text-foreground/70 text-xl max-w-2xl mx-auto leading-relaxed">
            Start improving your language skills in just three easy steps
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30">
              <span className="text-3xl font-bold text-white">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Choose Your Exercise</h3>
            <p className="text-foreground/70 leading-relaxed">
              Select from dictation or shadowing exercises tailored to your skill level and learning goals
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30">
              <span className="text-3xl font-bold text-white">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Practice & Record</h3>
            <p className="text-foreground/70 leading-relaxed">
              Listen carefully and respond - type for dictation exercises or speak for shadowing practice
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30">
              <span className="text-3xl font-bold text-white">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Get AI Feedback</h3>
            <p className="text-foreground/70 leading-relaxed">
              Receive instant, detailed AI analysis with personalized improvement tips and progress tracking
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-[#FF7A00] border-orange-200">Testimonials</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Loved by learners worldwide</h2>
          <p className="text-foreground/70 text-xl max-w-2xl mx-auto leading-relaxed">
            See what our community has to say about their learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 bg-card border-2 border-border">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FF7A00] text-[#FF7A00]" />
              ))}
            </div>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              "DEMIF transformed my English listening skills in just 3 months. The AI feedback is incredibly accurate
              and helpful!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C]" />
              <div>
                <p className="font-semibold">Nguyễn Minh Tường</p>
                <p className="text-sm text-foreground/60">Student, Vietnam</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border-2 border-border">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FF7A00] text-[#FF7A00]" />
              ))}
            </div>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              "The shadowing exercises helped me improve my pronunciation dramatically. I feel so much more confident
              speaking now."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C]" />
              <div>
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-sm text-foreground/60">Professional, Singapore</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border-2 border-border">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FF7A00] text-[#FF7A00]" />
              ))}
            </div>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              "Best language learning platform I've used. The progress tracking keeps me motivated and the leaderboard
              adds fun competition."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C]" />
              <div>
                <p className="font-semibold">David Kim</p>
                <p className="text-sm text-foreground/60">Teacher, South Korea</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <Card className="p-16 bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] border-none shadow-2xl shadow-orange-500/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to transform your language learning?
            </h2>
            <p className="text-white/90 text-xl mb-10 leading-relaxed">
              Join thousands of learners improving their skills with AI-powered practice. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-[#FF7A00] hover:bg-orange-50" asChild>
                <Link href="/signup">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 bg-card/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <span className="text-xl font-bold text-white">D</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] bg-clip-text text-transparent">
                  DEMIF
                </span>
              </div>
              <p className="text-foreground/60 leading-relaxed">
                AI-powered language learning through dictation and shadowing exercises
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Product</h4>
              <ul className="space-y-3 text-foreground/70">
                <li>
                  <Link href="#features" className="hover:text-[#FF7A00] transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-[#FF7A00] transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#demo" className="hover:text-[#FF7A00] transition-colors">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link href="/home" className="hover:text-[#FF7A00] transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-foreground/70">
                <li>
                  <Link href="/about" className="hover:text-[#FF7A00] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[#FF7A00] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-[#FF7A00] transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#FF7A00] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Legal</h4>
              <ul className="space-y-3 text-foreground/70">
                <li>
                  <Link href="/privacy" className="hover:text-[#FF7A00] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#FF7A00] transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-[#FF7A00] transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-foreground/60 text-sm">&copy; 2025 DEMIF. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm text-foreground/60">
              <Link href="#" className="hover:text-[#FF7A00] transition-colors">
                English
              </Link>
              <Link href="#" className="hover:text-[#FF7A00] transition-colors">
                Tiếng Việt
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
