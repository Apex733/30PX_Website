import * as React from "react";
import { Header } from "@/components/ui/header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/ui/footer-section";
import { OurServices } from "@/sections/OurServices";
import { ComparisonTable } from "@/sections/ComparisonTable";
import { PaymentModel } from "@/sections/PaymentModel";
import { PricingSection } from "@/components/ui/pricing-section";
import { DetailedComparison } from "@/sections/DetailedComparison";
import { PAYMENT_FREQUENCIES, PROFESSIONAL_TIERS, TIERS } from "@/lib/pricing";
import Testimonials from "@/components/ui/testimonials";

export default function Services() {
    const [frequency, setFrequency] = React.useState(PAYMENT_FREQUENCIES[1]);
    const [isComparisonOpen, setIsComparisonOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 flex flex-col">
            <SEO
                title="Services — 30PX | Design, Branding, Web, Video, AI"
                description="Social media, branding, web design, video editing, AI creative, and more, powered by Claude, Gemini, and Midjourney."
                keywords="design services, AI design agency, branding services, web design, social media design, motion design"
            />
            <Header />

            <main className="flex-grow pt-32 pb-8">
                <OurServices />
                <ComparisonTable />
                <PaymentModel />

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
            </main>

            <Footer />
        </div>
    );
}
