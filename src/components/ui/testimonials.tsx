import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel'
import { Link } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'

const testimonials = [
    {
        name: "DJ Ravi Drums",
        role: "EMMY Award Producer",
        image: "https://funny-business.com/wp-content/uploads/2016/09/dj_ravi_drums_erik_kabik_WEB-e1478620417142.jpg",
        initials: "DR",
        quote: "30PX did great work - They met my expectations and needs in a timely manner. I will work with them again in the future. I appreciated their fluency in English and responsiveness.",
        impact: "Timely Delivery & Global Appeal"
    },
    {
        name: "Mark C. Lawrence",
        role: "Hollywood Actor",
        image: "https://ntvb.tmsimg.com/assets/assets/195202_v9_bb.jpg",
        initials: "MC",
        quote: "Working with 30PX was so seamless and easy! They delivered excellent results and their work is so professional. It was a great experience working with 30PX.",
        impact: "Seamless, Professional Workflow"
    },
    {
        name: "James",
        role: "Ifxit",
        image: "https://cdn.freebiesupply.com/logos/large/2x/ifixit-logo-png-transparent.png",
        initials: "JA",
        isLogo: true,
        quote: "As always, 30PX went all and beyond for the customer's happiness. The level of cooperation is superb, They're not only really talented, but also understanding.",
        impact: "Superb Cooperation & Talent"
    },
    {
        name: "Doug Miller",
        role: "ZenArts",
        image: "https://images.crunchbase.com/image/upload/c_thumb,h_256,w_256,f_auto,g_face,z_0.7,q_auto:eco,dpr_1/hhekvykopm86fb9pi7au?ik-sanitizeSvg=true",
        initials: "DM",
        quote: "30PX did a fantastic job with my website social media integration! They have an excellent understanding of their craft and skill set.",
        impact: "Strategic Digital Progression"
    }
]

export default function Testimonials() {
    const [api, setApi] = useState<CarouselApi>()
    const [isHovered, setIsHovered] = useState(false)
    const [activeModalUrl, setActiveModalUrl] = useState<string | null>(null)

    useEffect(() => {
        if (activeModalUrl) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [activeModalUrl])

    useEffect(() => {
        if (!api) {
            return
        }

        if (isHovered) {
            return
        }

        const interval = setInterval(() => {
            api.scrollNext()
        }, 3000)

        return () => clearInterval(interval)
    }, [api, isHovered])

    return (
        <section className="py-12 md:py-16 bg-background" id="reviews">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <SectionHeading
                            badge="Customer stories"
                            title="Trusted by Industry Leaders"
                            description="Hear from the creative minds, producers, and entrepreneurs who trust 30PX to elevate their brand vision."
                        />
                    </div>

                    <div className="hidden md:flex gap-2">
                        {/* Navigation will be handled by Carousel controls */}
                        <Button variant="default" className="rounded-full">
                            Read all stories <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <CarouselContent className="-ml-4">
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 h-auto">
                                <Card className="h-full flex flex-col justify-between overflow-hidden border-border/50 bg-card hover:shadow-lg transition-shadow duration-300 rounded-[5px]">
                                    {/* Top Section */}
                                    <div className="p-8 space-y-6 flex-1">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        className={testimonial.isLogo ? "object-contain p-1" : "object-cover"}
                                                    />
                                                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                                                </Avatar>
                                            </div>

                                            {testimonial.name === "Mark C. Lawrence" ? (
                                                <button onClick={() => setActiveModalUrl("/portfolio/loudminds?modal=true")} className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                                                    Read Story <ArrowRight className="ml-1 h-3 w-3" />
                                                </button>
                                            ) : testimonial.name === "DJ Ravi Drums" ? (
                                                <button onClick={() => setActiveModalUrl("/portfolio/ghosttongue?modal=true")} className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                                                    Read Story <ArrowRight className="ml-1 h-3 w-3" />
                                                </button>
                                            ) : testimonial.name === "James" ? (
                                                <button onClick={() => setActiveModalUrl("/portfolio/vitavibe?modal=true")} className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                                                    Read Story <ArrowRight className="ml-1 h-3 w-3" />
                                                </button>
                                            ) : testimonial.name === "Doug Miller" ? (
                                                <button onClick={() => setActiveModalUrl("/portfolio/desora?modal=true")} className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                                                    Read Story <ArrowRight className="ml-1 h-3 w-3" />
                                                </button>
                                            ) : (
                                                <button onClick={(e) => e.preventDefault()} className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                                                    Read Story <ArrowRight className="ml-1 h-3 w-3" />
                                                </button>
                                            )}
                                        </div>

                                        <blockquote className="text-lg font-medium leading-relaxed">
                                            "{testimonial.quote}"
                                        </blockquote>

                                        <div>
                                            <cite className="not-italic text-sm font-semibold text-foreground">
                                                {testimonial.name}
                                            </cite>
                                            <span className="block text-sm text-muted-foreground">
                                                {testimonial.role}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom "Metric" Section */}
                                    <div className="bg-primary p-6 mt-auto">
                                        <div className="flex items-center gap-3 text-primary-foreground">
                                            <div className="p-1 bg-white/20 rounded-full">
                                                <ArrowRight className="h-4 w-4 -rotate-45" />
                                            </div>
                                            <span className="font-semibold text-base md:text-lg">
                                                {testimonial.impact}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-between mt-8 md:hidden px-4">
                        <CarouselPrevious className="static translate-y-0" />
                        <CarouselNext className="static translate-y-0" />
                    </div>
                    <div className="hidden md:block">
                        <CarouselPrevious className="absolute top-1/2 -translate-y-1/2" style={{ left: '-48px', right: 'auto' }} />
                        <CarouselNext className="absolute top-1/2 -translate-y-1/2" style={{ right: '-48px', left: 'auto' }} />
                    </div>
                </Carousel>

                {/* Modal Overlay */}
                <div
                    className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-500 flex justify-center items-end md:items-center ${
                        activeModalUrl ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                    onClick={() => setActiveModalUrl(null)}
                >
                    {/* Modal Content - bottom up animation */}
                    <div 
                        className={`relative w-full md:w-[90%] lg:w-[80%] h-[95vh] md:h-[90vh] bg-background rounded-t-[32px] md:rounded-[32px] shadow-2xl transition-transform duration-500 flex flex-col ${
                            activeModalUrl ? "translate-y-0 md:scale-100" : "translate-y-full md:translate-y-12 md:scale-95"
                        }`}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header Area with Close X Icon */}
                        <div className="absolute top-4 right-4 z-[110] md:top-6 md:right-6 mix-blend-difference text-white border-white">
                            <button
                                onClick={() => setActiveModalUrl(null)}
                                className="p-2.5 bg-black/30 hover:bg-black/60 backdrop-blur-md border border-white/20 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Iframe for Content */}
                        {activeModalUrl && (
                            <iframe 
                                src={activeModalUrl} 
                                className="w-full h-full border-none rounded-t-[32px] md:rounded-[32px]"
                                title="Story Modal"
                            />
                        )}
                    </div>
                </div>

            </div>
        </section>
    )
}
