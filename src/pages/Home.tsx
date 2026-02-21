
import { Hero } from "@/sections/Hero";
import { Industries } from "@/sections/Industries";
import { Logos } from "@/sections/Logos";
import { OurWork } from "@/sections/OurWork";
import { OurServices } from "@/sections/OurServices";
import GlobeSection from "@/components/ui/globe-feature-section";
import { ComparisonTable } from "@/sections/ComparisonTable";
import { PricingSection } from "@/components/ui/pricing-section";
import { DetailedComparison } from "@/sections/DetailedComparison";
import { AIDesignPerformance } from "@/sections/AIDesignPerformance";

import Testimonials from "@/components/ui/testimonials";

import { JourneyTimeline } from "@/sections/JourneyTimeline";
import { Footer } from "@/components/ui/footer-section";
import * as React from "react";
import { Header } from "@/components/ui/header";

export const PAYMENT_FREQUENCIES = ["monthly", "yearly"];

export const TIERS = [
    {
        id: "startup",
        name: "Social Media Package",
        price: {
            monthly: 60,
            yearly: 24,
        },
        description: "Best suitable for Startups or people who are looking for just social media.",
        features: [
            "30 social media designs/month",
            "1 design per day OR batch delivery",
            "48-hour turnaround",
            "Unlimited revisions",
            "Source files (PNG/JPG)",
        ],
        cta: "Start Now",
        href: {
            monthly: "https://www.paypal.com/ncp/payment/J8RR522KULEJW",
            yearly: "https://www.paypal.com/ncp/payment/A3ACZ76C2CX9S",
        },
    },
    {
        id: "growth",
        name: "Growth",
        price: {
            monthly: 149,
            yearly: 59,
        },
        description: "For brands ready to scale their visual presence.",
        features: [
            "Everything in Startup",
            "Unlimited design requests",
            "Ad creatives & banners",
            "Flyers & basic print",
            "24-48hr turnaround",
            "Unlimited revisions", // Added to match previous
        ],
        cta: "Start Now",
        popular: true,
        href: {
            monthly: "https://www.paypal.com/ncp/payment/X5FV7E2KSUXTA",
            yearly: "https://www.paypal.com/ncp/payment/44ZVTVLXWKL6N",
        },
    },
    {
        id: "scale",
        name: "Scale",
        price: {
            monthly: 299,
            yearly: 119,
        },
        description: "Complete creative department on demand.",
        features: [
            "Everything in Growth",
            "8 video edits/month",
            "Motion graphics",
            "Full vector logos",
            "UI design (Figma/XD)",
        ],
        cta: "Start Now",
        href: {
            monthly: "https://www.paypal.com/ncp/payment/8HS4XMKWYQFXU",
            yearly: "https://www.paypal.com/ncp/payment/67UDJAT546CG6",
        },
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: {
            monthly: 499,
            yearly: 199,
        },
        description: "Full-service creative partnership for high-volume brands.",
        features: [
            "Dedicated Support",
            "Same-day priority turnaround",
            "Slack + Zoom calls",
            "12 video edits/month",
            "Long-form video & Brand Identity",
            "Custom AI models & Voice Clones",
            "WordPress/Framer development",
        ],
        cta: "Book Meeting",
        highlighted: true,
    },
];


export const PROFESSIONAL_TIERS = [
    {
        id: "hire-designer",
        name: "Hire a designer",
        price: {
            monthly: 120,
            yearly: 120, // Keep same if yearly isn't specified, or just let the user handle it
        },
        description: "Perfect for simple day to day tasks.",
        features: [
            "1 task a day",
            "Graphic design services",
            "Unlimited revisions",
            "Source files (PNG/JPG)",
        ],
        cta: "Hire Now",
    },
    {
        id: "hire-full-stack-designer",
        name: "Graphic, Web and UI Designer",
        price: {
            monthly: 199,
            yearly: 199,
        },
        description: "Complete creative coverage for your growing brand.",
        features: [
            "2 tasks per day",
            "Graphic design",
            "Web design",
            "UI/UX design",
            "Source files included",
        ],
        cta: "Hire Now",
        popular: true,
    }
];

function Home() {
    const [frequency, setFrequency] = React.useState(PAYMENT_FREQUENCIES[1]) // Default to yearly
    const [isComparisonOpen, setIsComparisonOpen] = React.useState(false)

    // Handle scroll-to from cross-page navigation (e.g. portfolio → /#/?scrollTo=pricing)
    React.useEffect(() => {
        const hash = window.location.hash; // e.g. "#/?scrollTo=services"
        const match = hash.match(/scrollTo=(\w+)/);
        if (match) {
            const sectionId = match[1];
            // Small delay to let DOM render
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                // Clean up the URL
                window.history.replaceState(null, "", "/#/");
            }, 300);
        }
    }, []);

    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10">

            <Header />

            <main>
                <div data-theme="dark">
                    <Hero />
                    <Logos />
                </div>

                <GlobeSection />


                <ComparisonTable />

                <Industries />

                <OurServices />

                <OurWork />

                <PricingSection
                    title="Everything your brand needs. One subscription."
                    subtitle="Simple, transparent pricing. Pause or cancel anytime."
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



                <AIDesignPerformance />

                <Testimonials />

                <JourneyTimeline />

            </main>

            <Footer />
        </div>
    )
}

export default Home
