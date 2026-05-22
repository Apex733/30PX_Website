import type { PricingTier } from "@/components/ui/pricing-card";

export const PAYMENT_FREQUENCIES = ["monthly", "yearly"];

export const TIERS: PricingTier[] = [
    {
        name: "Social Media Package",
        price: {
            monthly: 60,
            yearly: 24,
        },
        description: "For startups and solopreneurs who need consistent, scroll-stopping social content.",
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
        name: "Growth",
        price: {
            monthly: 149,
            yearly: 59,
        },
        description: "For brands ready to scale. Unlimited requests, AI-accelerated delivery.",
        features: [
            "Everything in Startup",
            "Unlimited design requests",
            "Ad creatives & banners",
            "Flyers & basic print",
            "24-48hr turnaround",
            "Unlimited revisions",
        ],
        cta: "Start Now",
        popular: true,
        href: {
            monthly: "https://www.paypal.com/ncp/payment/X5FV7E2KSUXTA",
            yearly: "https://www.paypal.com/ncp/payment/44ZVTVLXWKL6N",
        },
    },
    {
        name: "Scale",
        price: {
            monthly: 299,
            yearly: 119,
        },
        description: "Your full creative department on demand. Design, video, and motion included.",
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
        name: "Enterprise",
        price: {
            monthly: 499,
            yearly: 199,
        },
        description: "Full-service AI-powered creative partnership. Dedicated support, custom AI models, and same-day delivery.",
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
        href: "mailto:hello@thirtypixels.com?subject=Enterprise%20Package%20Inquiry",
    },
];

export const PROFESSIONAL_TIERS: PricingTier[] = [
    {
        name: "Hire a designer",
        price: {
            monthly: 120,
            yearly: 120,
        },
        description: "Perfect for simple day to day tasks.",
        features: [
            "1 task a day",
            "Graphic design services",
            "Unlimited revisions",
            "Source files (PNG/JPG)",
        ],
        cta: "Hire Now",
        href: "/order",
    },
    {
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
        href: "/order",
    },
];
