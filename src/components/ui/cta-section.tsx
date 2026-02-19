import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
    return (
        <section className="relative w-full overflow-hidden bg-black text-white">
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/Work/CTA/Desktop-view.png"
                    alt="Abstract Background"
                    className="w-full h-full object-cover opacity-60 md:opacity-80"
                />
            </div>

            <div className="container relative z-10 mx-auto px-4 max-w-7xl">
                <div className="flex flex-col items-start justify-center min-h-[400px] md:min-h-[500px] py-20 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        Ready to elevate your brand vision?
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-xl">
                        Join the creative minds and entrepreneurs who trust 30PX for premium design without the premium price tag.
                    </p>

                    <Button
                        size="lg"
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-6 rounded-xl text-lg transition-transform hover:scale-105"
                    >
                        Get Started Today
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
