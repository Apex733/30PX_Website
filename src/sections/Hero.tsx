import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Typewriter } from "@/components/ui/typewriter";
import { AwardBadge } from "@/components/ui/award-badge";
import { HeroCarousel } from "@/components/ui/hero-vertical-carousel";

export function Hero() {
    const words = ["Startup pricing.", "Premium design.", "Zero headaches.", "Scale fast."];

    return (
        <section className="pt-36 pb-32 text-center lg:text-left px-12 relative overflow-hidden bg-[linear-gradient(to_top,#FAFAFA,#60a5fa,#1e3a8a,#020817)] text-white">

            {/* Background decorations - Subtle overlay if needed, otherwise clean */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                {/* Optional subtle noise or pattern could go here */}
            </div>

            <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col items-center lg:items-start justify-start gap-6">
                    <div className="flex flex-col items-center lg:items-start justify-start mb-2 gap-6">
                        <Badge variant="secondary" className="px-4 py-2 text-sm rounded-full border-[#FAFAFA]/10 bg-[#FAFAFA]/5 text-[#FAFAFA]/90 hover:bg-[#FAFAFA]/10">
                            Top Rated • 200+ Five-Star Reviews
                        </Badge>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#FAFAFA] leading-[1.1]">
                        World-class creative.<br />
                        <span className="text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                            <Typewriter words={words} speed={100} delayBetweenWords={2000} cursor={true} />
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
                        30 social media designs for $60/month. Created by veteran designers who've worked with Hollywood, Fortune 500, and global brands. AI-enhanced. Zero drama.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center lg:items-start w-full">
                        <Button size="lg" className="h-14 px-8 text-xl w-full sm:w-auto shadow-lg shadow-blue-900/20 bg-[#FAFAFA] text-black hover:bg-gray-100 rounded-full">
                            Start for $24/month
                        </Button>
                        <Button
                            variant="default"
                            size="lg"
                            className="h-14 px-8 text-xl w-full sm:w-auto bg-white text-black hover:bg-gray-200 rounded-full"
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            See pricing
                        </Button>
                    </div>
                </div>

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
