import React, { useState } from 'react';
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer-section";
import { ChevronDown } from "lucide-react";

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-border/50 rounded-lg bg-card overflow-hidden">
            <button
                className="w-full flex justify-between items-center p-5 text-left font-medium text-lg hover:bg-secondary/50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {question}
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-5 pt-0 text-muted-foreground leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default function FAQs() {
    const faqs = [
        {
            question: "Why wouldn't I just hire a full-time designer?",
            answer: "Good question! For starters, the annual cost of a full-time senior-level designer now exceeds $100,000, plus benefits (and good luck finding one available). Aside from that, you may not always have enough work to keep them busy at all times, so you're stuck paying for time you aren't able to utilize. With the monthly plan, you can pause and resume your subscription as often as you need to ensure you're only paying your designer when you have work for them."
        },
        {
            question: "Is there a limit to how many requests I can have?",
            answer: "Once subscribed, you're able to add as many design requests to your queue as you'd like, and they will be delivered one by one."
        },
        {
            question: "How fast will I receive my designs?",
            answer: "On average, most requests are completed in just two days or less. However, more complex requests can take longer."
        },
        {
            question: "Who is doing the design work?",
            answer: "You might be surprised to hear this, but 30PX is actually an agency founded by veteran designers. This means you'll work directly with our highly-curated team of design pros."
        },
        {
            question: "How does the pause feature work?",
            answer: "We understand you may not have enough design work to fill up an entire month. Perhaps you only have one or two design requests at the moment. That's where pausing comes in handy.\n\nBilling cycles are based on 31 day period. Let's say you sign up and use the service for 21 days, and then decide to pause your subscription. This means that the billing cycle will be paused and you'll have 10 days of service remaining to be used anytime in the future."
        },
        {
            question: "What programs do you design in?",
            answer: "Most requests are designed using Figma, Adobe Illustrator, Premiere Pro, After Effects, and various AI tools for augmented workflows."
        },
        {
            question: "What if I don't like the design?",
            answer: "No worries! We'll continue to revise the design until you're 100% satisfied."
        },
        {
            question: "Are there any refunds if I don't like the service?",
            answer: "Due to the high quality nature of the work, there will be no refunds issued."
        }
    ];

    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-4xl space-y-12">
                    <div className="text-center space-y-4">
                        <span className="website-pill">Support</span>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Everything you need to know about the product and billing.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
