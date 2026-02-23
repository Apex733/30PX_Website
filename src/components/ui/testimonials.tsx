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
import { ArrowRight } from 'lucide-react'

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
                                                <Link to="/portfolio/loudminds" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                                    Read Story <ArrowRight className="ml-1 h-3 w-3" />
                                                </Link>
                                            ) : testimonial.name === "DJ Ravi Drums" ? (
                                                <Link to="/portfolio/ghosttongue" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                                    Read Story <ArrowRight className="ml-1 h-3 w-3" />
                                                </Link>
                                            ) : testimonial.name === "James" ? (
                                                <Link to="/portfolio/vitavibe" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                                    Read Story <ArrowRight className="ml-1 h-3 w-3" />
                                                </Link>
                                            ) : testimonial.name === "Doug Miller" ? (
                                                <Link to="/portfolio/desora" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                                    Read Story <ArrowRight className="ml-1 h-3 w-3" />
                                                </Link>
                                            ) : (
                                                <a href="#" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                                    Read Story <ArrowRight className="ml-1 h-3 w-3" />
                                                </a>
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
            </div>
        </section>
    )
}
