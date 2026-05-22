import { Header } from "@/components/ui/header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/ui/footer-section";
import { Users, Target, Zap } from "lucide-react";
import { Logos } from "@/sections/Logos";
import { AIDesignPerformance } from "@/sections/AIDesignPerformance";
import { ProjectProcess } from "@/sections/ProjectProcess";
import { JourneyTimeline } from "@/sections/JourneyTimeline";
import Testimonials from "@/components/ui/testimonials";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 flex flex-col">
            <SEO
                title="About Us — Meet the Team Behind 30PX"
                description="30PX pairs veteran designers with enterprise-grade AI to deliver agency-quality creative work at a price that makes sense. No drama. No surprises."
            />
            <Header />

            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-4xl space-y-16">
                    {/* Hero Section */}
                    <div className="text-center space-y-6">
                        <span className="website-pill">About 30PX</span>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                            World-class design,<br />without the drama.
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            We are a team of veteran designers, animators, and AI specialists. We replaced the traditional agency model with a simple, scalable process that ships faster and costs less.
                        </p>
                    </div>

                    {/* Mission Section */}
                    <div className="grid md:grid-cols-3 gap-8 pt-8">
                        <div className="bg-card border border-border/50 p-6 rounded-[5px] flex flex-col items-center text-center space-y-4">
                            <div className="h-12 w-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold">Vetted designers</h3>
                            <p className="text-muted-foreground">
                                We have worked with global brands and startups alike. Our team consists of highly vetted, senior-level creatives with proven portfolios.
                            </p>
                        </div>
                        <div className="bg-card border border-border/50 p-6 rounded-[5px] flex flex-col items-center text-center space-y-4">
                            <div className="h-12 w-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold">24-48 hour turnaround</h3>
                            <p className="text-muted-foreground">
                                Most requests are turned around in less than 48 hours. No slow agencies. No missed deadlines. No excuses.
                            </p>
                        </div>
                        <div className="bg-card border border-border/50 p-6 rounded-[5px] flex flex-col items-center text-center space-y-4">
                            <div className="h-12 w-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                                <Target size={24} />
                            </div>
                            <h3 className="text-xl font-bold">One flat fee</h3>
                            <p className="text-muted-foreground">
                                You always know what you are paying. No scope creep. No unexpected invoices. Pause or cancel anytime.
                            </p>
                        </div>
                    </div>

                    {/* Story Section */}
                    <div className="space-y-6 pt-8">
                        <h2 className="text-3xl font-bold">Our Story</h2>
                        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                30PX was built out of frustration with the traditional design process. Hiring full-time designers is expensive and time-consuming. Working with freelancers can be unreliable. Traditional agencies are slow and charge exorbitant hourly rates.
                            </p>
                            <p>
                                We knew there had to be a better way. We combined years of design expertise with streamlined workflows and AI-enhanced processes to build an agency model that actually works.
                            </p>
                            <p>
                                Today, we partner with growing brands to give them a full creative team, on demand, for a flat monthly fee. Whether you need daily social media creatives, a full website redesign, or a complex motion graphics video, 30PX delivers top-tier quality when you need it.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Logos />
            <AIDesignPerformance />

            <div className="container mx-auto px-4 max-w-7xl py-12 md:py-16">
                <ProjectProcess />
            </div>

            <JourneyTimeline />
            <Testimonials />
            <Footer />
        </div>
    );
}
