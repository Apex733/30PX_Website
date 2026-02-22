import React from 'react';
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer-section";
import { Users, Target, Zap } from "lucide-react";
import { JourneyTimeline } from "@/sections/JourneyTimeline";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 flex flex-col">
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
                            We're a team of veteran designers, animators, and AI specialists replacing the traditional agency model with a simple, scalable subscription.
                        </p>
                    </div>

                    {/* Mission Section */}
                    <div className="grid md:grid-cols-3 gap-8 pt-8">
                        <div className="bg-card border border-border/50 p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
                            <div className="h-12 w-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold">Expert Team</h3>
                            <p className="text-muted-foreground">
                                We've worked with global brands and startups alike. Our team consists of highly vetted, senior-level creatives.
                            </p>
                        </div>
                        <div className="bg-card border border-border/50 p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
                            <div className="h-12 w-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold">Fast Delivery</h3>
                            <p className="text-muted-foreground">
                                Say goodbye to slow agencies. Most requests are turned around in less than 48 hours without sacrificing quality.
                            </p>
                        </div>
                        <div className="bg-card border border-border/50 p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
                            <div className="h-12 w-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                                <Target size={24} />
                            </div>
                            <h3 className="text-xl font-bold">Predictable Pricing</h3>
                            <p className="text-muted-foreground">
                                Flat-rate subscriptions mean you always know what you're paying. No more scope creep or unexpected invoices.
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
                                We knew there had to be a better way. We combined our years of design expertise with streamlined workflows and AI-enhanced processes to create a revolutionary subscription service.
                            </p>
                            <p>
                                Today, we partner with growing brands to provide them with instant access to a full creative department. Whether you need daily social media creatives, a full website redesign, or a complex motion graphics video, 30PX delivers top-tier quality on demand.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <JourneyTimeline />
            <Footer />
        </div>
    );
}
