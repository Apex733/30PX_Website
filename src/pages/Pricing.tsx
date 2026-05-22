import * as React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
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

const proofPoints = [
    {
        title: "Limited-time 60% yearly savings",
        description: "Lock in the yearly rate and keep premium creative output predictable.",
        icon: Sparkles,
    },
    {
        title: "Fast delivery without agency drag",
        description: "Most requests land in 24 to 48 hours with real designers steering the work.",
        icon: CheckCircle2,
    },
    {
        title: "Built to scale with your brand",
        description: "Start with social, then grow into ads, motion, UI, and enterprise support.",
        icon: ShieldCheck,
    },
];

const valueSnapshots = [
    { label: "Starting at", value: "$24/mo" },
    { label: "Turnaround", value: "24-48h" },
    { label: "Revisions", value: "Unlimited" },
];

function Pricing() {
    const [frequency, setFrequency] = React.useState<string>(PAYMENT_FREQUENCIES[1]);
    const [isComparisonOpen, setIsComparisonOpen] = React.useState(true);

    const scrollToPlans = () => {
        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10">
            <SEO
                title="Pricing | 30PX"
                description="Explore 30PX pricing for subscription design packages and dedicated designer plans. Social content, ads, motion, UI, and enterprise creative support starting at $24/mo billed yearly."
                keywords="30PX pricing, design subscription pricing, social media design pricing, AI design agency packages"
            />
            <Header />

            <main className="overflow-hidden pt-24 md:pt-28">
                <section className="relative overflow-hidden border-b border-border/50 bg-[linear-gradient(to_top,#fafafa,rgba(96,165,250,0.18),rgba(30,58,138,0.92),#020817)] px-4 pb-16 pt-8 text-white md:px-12 md:pb-20 md:pt-12">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute left-[-8rem] top-12 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
                        <div className="absolute right-[-8rem] top-24 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
                        <div className="absolute bottom-[-8rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
                    </div>

                    <div className="container relative z-10 mx-auto max-w-7xl">
                        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                            <div className="space-y-8">
                                <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
                                    Pricing built with the same visual language as the homepage
                                </div>

                                <div className="space-y-5">
                                    <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
                                        Pick the plan that matches your creative velocity.
                                    </h1>
                                    <p className="max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
                                        From daily social content to full-service creative operations, every plan is shaped for predictable output, sharp turnaround times, and premium design without traditional agency overhead.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <Button
                                        size="lg"
                                        className="h-14 rounded-full bg-white px-8 text-base font-semibold text-slate-950 hover:bg-white/90"
                                        onClick={scrollToPlans}
                                    >
                                        View plans
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <Link to="/order">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="h-14 rounded-full border-white/20 bg-white/8 px-8 text-base font-semibold text-white hover:bg-white/12"
                                        >
                                            Start a request
                                        </Button>
                                    </Link>
                                </div>

                                <div className="grid gap-3 md:grid-cols-3">
                                    {proofPoints.map((point) => {
                                        const Icon = point.icon;

                                        return (
                                            <div
                                                key={point.title}
                                                className="rounded-[5px] border border-white/12 bg-white/[0.08] p-5 backdrop-blur"
                                            >
                                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <h2 className="text-base font-semibold text-white">{point.title}</h2>
                                                <p className="mt-2 text-sm leading-6 text-white/70">{point.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="rounded-[5px] border border-white/12 bg-white/[0.08] p-6 shadow-[0_30px_90px_rgba(2,8,23,0.3)] backdrop-blur-md md:p-7">
                                <div className="flex items-center justify-between gap-4 border-b border-white/12 pb-5">
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                                            Snapshot
                                        </p>
                                        <p className="mt-2 text-2xl font-semibold text-white">
                                            One pricing page, two ways to buy
                                        </p>
                                    </div>
                                    <div className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                                        Packages + hires
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                    {valueSnapshots.map((snapshot) => (
                                        <div
                                            key={snapshot.label}
                                            className="rounded-[5px] border border-white/10 bg-black/10 px-4 py-5"
                                        >
                                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                                                {snapshot.label}
                                            </p>
                                            <p className="mt-3 text-2xl font-semibold text-white">{snapshot.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 rounded-[5px] border border-white/10 bg-slate-950/20 p-5">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
                                        What changes as you scale
                                    </p>
                                    <ul className="mt-4 space-y-3 text-sm leading-6 text-white/78">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                                            <span>Start with a structured social content engine, then move into ads, print, motion, and UI as your brand grows.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                                            <span>Keep the same flat-fee logic while unlocking faster turnaround, richer deliverables, and more direct support.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                                            <span>Flip the toggle when you need a dedicated designer instead of a package subscription.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
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
