
import { Hero } from "@/sections/Hero";
import { SEO } from "@/components/SEO";
import { Logos } from "@/sections/Logos";
import { OurServices } from "@/sections/OurServices";
import { LatestWork } from "@/sections/LatestWork";
import { ComparisonTable } from "@/sections/ComparisonTable";
import { PricingSection } from "@/components/ui/pricing-section";
import { DetailedComparison } from "@/sections/DetailedComparison";
import { PAYMENT_FREQUENCIES, PROFESSIONAL_TIERS, TIERS } from "@/lib/pricing";

import Testimonials from "@/components/ui/testimonials";


import { JourneyTimeline } from "@/sections/JourneyTimeline";
import { Footer } from "@/components/ui/footer-section";
import * as React from "react";
import { Header } from "@/components/ui/header";

function Home() {
    const [frequency, setFrequency] = React.useState(PAYMENT_FREQUENCIES[1]) // Default to yearly
    const [isComparisonOpen, setIsComparisonOpen] = React.useState(false)

    // Handle scroll-to from cross-page navigation (e.g. portfolio → /?scrollTo=pricing)
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sectionId = params.get('scrollTo');
        if (sectionId) {
            // Small delay to let DOM render
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                // Clean up the URL
                window.history.replaceState(null, "", "/");
            }, 300);
        }
    }, []);

    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10">
            <SEO
                title="30PX | AI-Powered Design Agency. Premium Work, Fair Pricing."
                description="30PX pairs veteran designers with top-tier AI like Claude, Gemini, and Midjourney. Agency-quality branding, social media, web design, and motion graphics starting at $24/mo."
                keywords="AI design agency, AI-powered graphic design, social media design service, affordable design agency"
            />
            <Header />

            <main>
                <div data-theme="dark">
                    <Hero />
                    <Logos />
                </div>

                <LatestWork />

                <ComparisonTable />

                <OurServices />

                <PricingSection
                    title="Premium AI-powered creative. One flat fee."
                    subtitle="No contracts. No hidden fees. Pause or cancel anytime. The AI we use is not cheap, but your monthly fee is."
                    tiers={TIERS}
                    professionalTiers={PROFESSIONAL_TIERS}
                    frequencies={PAYMENT_FREQUENCIES}
                    frequency={frequency}
                    setFrequency={setFrequency}
                    onCompareClick={() => setIsComparisonOpen(!isComparisonOpen)}
                    isComparisonOpen={isComparisonOpen}
                />

                <DetailedComparison
                    isOpen={isComparisonOpen}
                    frequency={frequency}
                />

                <Testimonials />

                <JourneyTimeline />

            </main>

            <Footer />
        </div>
    )
}

export default Home
