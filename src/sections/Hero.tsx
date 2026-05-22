import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Typewriter } from "@/components/ui/typewriter";
import { AwardBadge } from "@/components/ui/award-badge";
import { HeroCarousel } from "@/components/ui/hero-vertical-carousel";
import { motion } from "framer-motion";

export function Hero() {
    const words = ["Without the agency invoice.", "Powered by top-tier AI.", "Delivered in 24 hours.", "Built to scale with you."];

    return (
        <section className="min-h-[100svh] pt-28 pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20 text-center lg:text-left px-4 md:px-12 relative overflow-hidden bg-[linear-gradient(to_top,#FAFAFA,#60a5fa,#1e3a8a,#020817)] text-white">

            {/* Background decorations - Subtle overlay if needed, otherwise clean */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                {/* Optional subtle noise or pattern could go here */}
            </div>

            <div className="container mx-auto relative z-10 grid min-h-[calc(100svh-10rem)] grid-cols-1 gap-12 items-center md:min-h-[calc(100svh-12rem)] lg:min-h-[calc(100svh-14rem)] lg:grid-cols-2">
                <motion.div layout className="flex flex-col items-center lg:items-start justify-start gap-6">
                    <motion.div layout className="flex flex-col items-center lg:items-start justify-start mb-2 gap-6">
                        <Badge variant="secondary" className="px-4 py-2 text-sm rounded-full border-[#FAFAFA]/10 bg-[#FAFAFA]/5 text-[#FAFAFA]/90 hover:bg-[#FAFAFA]/10 transition-colors duration-300">
                            AI-Powered Agency • 200+ Five-Star Reviews
                        </Badge>
                    </motion.div>

                    <motion.h1 layout className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#FAFAFA] leading-[1.1]">
                        Agency-quality design. AI-powered speed.<br />
                        <span className="text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200 inline-block min-h-[2.4em] md:min-h-0 leading-[1.2]">
                            <Typewriter words={words} speed={100} delayBetweenWords={2000} cursor={true} />
                        </span>
                    </motion.h1>

                    <motion.p layout transition={{ duration: 0.3 }} className="text-xl md:text-2xl text-white mb-12 max-w-3xl leading-relaxed">
                        Veteran designers backed by Claude, Gemini, and Midjourney. We deliver branding, social media, and web design faster, at a price that actually makes sense. AI handles the heavy lifting. Our designers handle the thinking.
                    </motion.p>

                    <motion.div layout className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center lg:items-start w-full">
                        <Button
                            size="lg"
                            className="h-14 px-8 text-xl w-full sm:w-auto shadow-lg shadow-blue-900/20 bg-[#FAFAFA] text-black hover:bg-gray-100 rounded-full"
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Start for $24/month
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-14 px-8 text-xl w-full sm:w-auto bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/50 rounded-full"
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            See pricing
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Right Column - Hero Carousel - Extends to top under navigation */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden pointer-events-none">
                    {/* Scale up slightly to ensure coverage if needed, or just h-full */}
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
    );
}
