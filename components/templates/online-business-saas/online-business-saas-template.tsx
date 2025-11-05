"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { FiCheck, FiZap, FiShield, FiTrendingUp, FiUsers, FiArrowRight, FiStar, FiSlack, FiGithub, FiChrome, FiMail, FiLinkedin, FiTwitter, FiMessageCircle, FiClock, FiTarget } from "react-icons/fi";

export function OnlineBusinessSaasTemplate() {
  const { tt } = useI18n();
  const data = tt.onlineBusinessSaas || {};

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gradient-to-b from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-3 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {tt.common?.back || "← Back"}
          </Link>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-primary transition-colors">
              {data.nav?.features || tt.common?.features || "Features"}
            </a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">
              {data.nav?.pricing || tt.common?.pricing || "Pricing"}
            </a>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-3 pt-32 pb-20 text-center">
        <FadeIn>
          <Badge className="mb-6" variant="secondary">
            {data.badge || "Trusted by 10,000+ teams"}
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold mb-6 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent break-words">
            {data.name || "ProductFlow"}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-full mx-auto">
            {data.tagline || "Ship products faster with AI-powered project management"}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="gap-2">
              {data.hero?.startTrial || "Start Free Trial"} <FiArrowRight />
            </Button>
            <Button size="lg" variant="outline" className="text-slate-900 dark:text-white">
              {data.hero?.watchDemo || "Watch Demo"}
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-3 py-20">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl  font-bold text-center mb-16">
            {data.features?.title || "Powerful features for modern teams"}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FiZap />,
              title: data.features?.aiPlanning?.title || "AI Task Planning",
              description: data.features?.aiPlanning?.description || "Automatically break down features into actionable tasks"
            },
            {
              icon: <FiUsers />,
              title: data.features?.collaboration?.title || "Real-time Collaboration",
              description: data.features?.collaboration?.description || "Work together seamlessly across time zones"
            },
            {
              icon: <FiTrendingUp />,
              title: data.features?.analytics?.title || "Advanced Analytics",
              description: data.features?.analytics?.description || "Track velocity, burndown, and team performance"
            },
            {
              icon: <FiShield />,
              title: data.features?.security?.title || "Enterprise Security",
              description: data.features?.security?.description || "SOC 2 compliant with advanced encryption"
            }
          ].map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-primary mb-4 text-3xl">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-3 py-20">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl  font-bold text-center mb-4">
            {data.pricing?.title || "Simple, transparent pricing"}
          </h2>
          <p className="text-center text-muted-foreground mb-16">
            {data.pricing?.subtitle || "Choose the plan that fits your team size"}
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto">
          {[
            {
              name: data.pricing?.starter?.name || "Starter",
              price: data.pricing?.starter?.price || "$29/mo",
              features: data.pricing?.starter?.features || ["Up to 10 team members", "Unlimited projects", "Basic analytics", "Email support"],
              popular: false
            },
            {
              name: data.pricing?.professional?.name || "Professional",
              price: data.pricing?.professional?.price || "$99/mo",
              features: data.pricing?.professional?.features || ["Unlimited team members", "Advanced AI features", "Priority support", "Custom integrations"],
              popular: true
            },
            {
              name: data.pricing?.enterprise?.name || "Enterprise",
              price: data.pricing?.enterprise?.price || "Custom",
              features: data.pricing?.enterprise?.features || ["Dedicated account manager", "SLA guarantee", "On-premise deployment", "24/7 phone support"],
              popular: false
            }
          ].map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    {data.pricing?.mostPopular || "Most Popular"}
                  </Badge>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl sm:text-4xl  font-bold mb-6">{plan.price}</div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FiCheck className="text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {data.pricing?.getStarted || "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="container mx-auto px-3 py-20 bg-muted/50 rounded-3xl my-20">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md: text-3xl sm:text-4xl  font-bold mb-4">
              {data.stats?.title || "Trusted by teams worldwide"}
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-full mx-auto">
          <ScrollReveal delay={0.1}>
            <div>
              <div className="text-3xl sm:text-5xl   font-bold text-primary mb-2 break-words">10,000+</div>
              <p className="text-muted-foreground">{data.stats?.teams || "Active Teams"}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div>
              <div className="text-3xl sm:text-5xl   font-bold text-primary mb-2 break-words">98%</div>
              <p className="text-muted-foreground">{data.stats?.satisfaction || "Customer Satisfaction"}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div>
              <div className="text-3xl sm:text-5xl   font-bold text-primary mb-2 break-words">500K+</div>
              <p className="text-muted-foreground">{data.stats?.projects || "Projects Completed"}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div>
              <div className="text-3xl sm:text-5xl   font-bold text-primary mb-2 break-words">50+</div>
              <p className="text-muted-foreground">{data.stats?.countries || "Countries"}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-3 py-20">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl  font-bold text-center mb-4">
            {data.testimonials?.title || "Loved by teams everywhere"}
          </h2>
          <p className="text-center text-muted-foreground mb-16">
            {data.testimonials?.subtitle || "See what our customers have to say"}
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto">
          {[
            {
              name: "Sarah Johnson",
              role: "Product Manager at TechCorp",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
              quote: data.testimonials?.quote1 || "ProductFlow completely transformed how our team works. We ship features 3x faster now!"
            },
            {
              name: "Michael Chen",
              role: "CEO at StartupXYZ",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
              quote: data.testimonials?.quote2 || "The AI planning feature is a game-changer. It's like having an extra project manager on the team."
            },
            {
              name: "Emily Rodriguez",
              role: "Engineering Lead at InnovateCo",
              avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
              quote: data.testimonials?.quote3 || "Best project management tool we've ever used. The analytics alone are worth the price."
            }
          ].map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Integrations Section */}
      <section className="container mx-auto px-3 py-20">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl  font-bold text-center mb-4">
            {data.integrations?.title || "Integrates with your favorite tools"}
          </h2>
          <p className="text-center text-muted-foreground mb-16">
            {data.integrations?.subtitle || "Connect ProductFlow with the tools you already use"}
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-full mx-auto">
          {[
            { icon: <FiSlack className="w-8 h-8" />, name: "Slack" },
            { icon: <FiGithub className="w-8 h-8" />, name: "GitHub" },
            { icon: <FiChrome className="w-8 h-8" />, name: "Chrome" },
            { icon: <FiMail className="w-8 h-8" />, name: "Gmail" },
            { icon: <FiLinkedin className="w-8 h-8" />, name: "LinkedIn" },
            { icon: <FiMessageCircle className="w-8 h-8" />, name: "Zoom" }
          ].map((integration, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-primary mb-2 flex justify-center">{integration.icon}</div>
                  <p className="text-sm font-medium">{integration.name}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-3 py-20 max-w-full">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl  font-bold text-center mb-16">
            {data.faq?.title || "Frequently Asked Questions"}
          </h2>
        </ScrollReveal>
        <div className="space-y-6">
          {[
            {
              question: data.faq?.q1?.question || "How does the free trial work?",
              answer: data.faq?.q1?.answer || "Start with a 14-day free trial with full access to all features. No credit card required. Cancel anytime."
            },
            {
              question: data.faq?.q2?.question || "Can I change plans later?",
              answer: data.faq?.q2?.answer || "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
            },
            {
              question: data.faq?.q3?.question || "What kind of support do you offer?",
              answer: data.faq?.q3?.answer || "We offer email support for all plans, priority support for Professional, and dedicated account managers for Enterprise customers."
            },
            {
              question: data.faq?.q4?.question || "Is my data secure?",
              answer: data.faq?.q4?.answer || "Absolutely. We're SOC 2 compliant with enterprise-grade encryption. Your data is safe with us."
            },
            {
              question: data.faq?.q5?.question || "Do you offer discounts for non-profits?",
              answer: data.faq?.q5?.answer || "Yes! We offer special pricing for non-profits and educational institutions. Contact our sales team for details."
            }
          ].map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-3 py-20 text-center">
        <ScrollReveal>
          <Card className="bg-primary text-primary-foreground p-12">
            <h2 className="text-3xl md: text-4xl sm:text-5xl  font-bold mb-4 break-words">
              {data.cta?.title || "Ready to transform your workflow?"}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {data.cta?.subtitle || "Join thousands of teams shipping better products, faster."}
            </p>
            <Button size="lg" variant="secondary">
              {data.cta?.button || "Start Your Free 14-Day Trial"}
            </Button>
          </Card>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20 py-12 bg-muted/30">
        <div className="container mx-auto px-3 max-w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{data.name || "ProductFlow"}</h3>
              <p className="text-sm text-muted-foreground">
                {data.footer?.tagline || "Ship products faster with AI-powered project management"}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{data.footer?.product || "Product"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">{data.footer?.features || "Features"}</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">{data.footer?.pricing || "Pricing"}</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">{data.footer?.integrations || "Integrations"}</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">{data.footer?.changelog || "Changelog"}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{data.footer?.company || "Company"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">{data.footer?.about || "About"}</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">{data.footer?.blog || "Blog"}</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">{data.footer?.careers || "Careers"}</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">{data.footer?.contact || "Contact"}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{data.footer?.connect || "Connect"}</h4>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <FiTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <FiGithub className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>{data.footer?.copyright || "© 2025 ProductFlow. All rights reserved."}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
