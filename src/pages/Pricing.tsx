import * as React from "react";
import { Link } from "react-router-dom";

import { SEO } from "@/components/SEO";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer-section";
import { Button } from "@/components/ui/button";
import { PricingSection } from "@/components/ui/pricing-section";
import Testimonials from "@/components/ui/testimonials";
import { DetailedComparison } from "@/sections/DetailedComparison";
import { ComparisonTable } from "@/sections/ComparisonTable";
import { OurServices } from "@/sections/OurServices";
import { JourneyTimeline } from "@/sections/JourneyTimeline";
import { PAYMENT_FREQUENCIES, PROFESSIONAL_TIERS, TIERS } from "@/lib/pricing";
import { HeroCarousel } from "@/components/ui/hero-vertical-carousel";
import { Badge } from "@/components/ui/badge";
import { Typewriter } from "@/components/ui/typewriter";
import { motion } from "framer-motion";

function Pricing() {
    const [frequency, setFrequency] = React.useState<string>(PAYMENT_FREQUENCIES[1]);
    const [isComparisonOpen, setIsComparisonOpen] = React.useState(true);

    const scrollToPlans = () => {
        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const words = ["No hourly billing.", "No surprise invoices.", "No traditional agency fees.", "Cancel or pause anytime."];

    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10">
            <SEO
                title="Pricing | 30PX"
                description="Explore 30PX pricing for subscription design packages and dedicated designer plans. Social content, ads, motion, UI, and enterprise creative support starting at $24/mo billed yearly."
                keywords="30PX pricing, design subscription pricing, social media design pricing, AI design agency packages"
            />
            <Header />

            <main className="overflow-hidden">
                <section className="min-h-[100svh] pt-28 pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20 text-center lg:text-left px-4 md:px-12 relative overflow-hidden bg-[linear-gradient(to_top,#FAFAFA,#60a5fa,#1e3a8a,#020817)] text-white">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                        {/* Optional subtle noise or pattern could go here */}
                    </div>

                    <div className="container mx-auto relative z-10 grid min-h-[calc(100svh-10rem)] grid-cols-1 gap-12 items-center md:min-h-[calc(100svh-12rem)] lg:min-h-[calc(100svh-14rem)] lg:grid-cols-2">
                        <motion.div layout className="flex flex-col items-center lg:items-start justify-start gap-6">
                            <motion.div layout className="flex flex-col items-center lg:items-start justify-start mb-2 gap-6">
                                <Badge variant="secondary" className="px-4 py-2 text-sm rounded-full border-[#FAFAFA]/10 bg-[#FAFAFA]/5 text-[#FAFAFA]/90 hover:bg-[#FAFAFA]/10 transition-colors duration-300">
                                    Subscription Plans • Flat Monthly Rates
                                </Badge>
                            </motion.div>

                            <motion.h1 layout className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#FAFAFA] leading-[1.1]">
                                Premium design packages. Flat monthly rates.<br />
                                <span className="text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200 inline-block min-h-[2.4em] md:min-h-0 leading-[1.2]">
                                    <Typewriter words={words} speed={100} delayBetweenWords={2000} cursor={true} />
                                </span>
                            </motion.h1>

                            <motion.p layout transition={{ duration: 0.3 }} className="text-xl md:text-2xl text-white mb-12 max-w-3xl leading-relaxed">
                                From daily social content to full-service creative operations, every plan is shaped for predictable output, sharp turnaround times, and premium design without traditional agency overhead.
                            </motion.p>

                            <motion.div layout className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center lg:items-start w-full">
                                <Button
                                    size="lg"
                                    className="h-14 px-8 text-xl w-full sm:w-auto shadow-lg shadow-blue-900/20 bg-[#FAFAFA] text-black hover:bg-gray-100 rounded-full"
                                    onClick={scrollToPlans}
                                >
                                    View plans
                                </Button>
                                <Link to="/order" className="w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="h-14 px-8 text-xl w-full sm:w-auto bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/50 rounded-full"
                                    >
                                        Start a request
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Hero Carousel - Extends to top under navigation */}
                        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden pointer-events-none">
                            <div className="h-full w-full pointer-events-auto">
                                <HeroCarousel />
                            </div>
                        </div>
                    </div>
                    {/* Mobile carousel - visible below content on mobile */}
                    <div className="lg:hidden mt-12 w-full h-[300px] overflow-hidden">
                        <HeroCarousel />
                    </div>
                </section>

                <PricingSection
                    title="Creative subscriptions for every growth stage."
                    subtitle="Choose a package for predictable output, or flip the switch to hire a dedicated designer. Monthly keeps things flexible. Yearly unlocks the limited-time 60% savings."
                    tiers={TIERS}
                    professionalTiers={PROFESSIONAL_TIERS}
                    frequencies={[...PAYMENT_FREQUENCIES]}
                    frequency={frequency}
                    setFrequency={setFrequency}
                    onCompareClick={() => setIsComparisonOpen((open) => !open)}
                    isComparisonOpen={isComparisonOpen}
                />

                <DetailedComparison
                    isOpen={isComparisonOpen}
                    frequency={frequency}
                />

                <ComparisonTable />
                <OurServices />
                <Testimonials />
                <JourneyTimeline />
            </main>

            <Footer />
        </div>
    );
}

export default Pricing;
