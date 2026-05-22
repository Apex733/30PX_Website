import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { StoryModal } from '@/components/ui/story-modal'
import { ButtonLabel } from '@/components/ui/button-label'
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
    },
    {
        name: "Sarah Jenkins",
        role: "Startup Founder",
        image: "https://i.pravatar.cc/150?img=1",
        initials: "SJ",
        quote: "Our entire product launch was transformed. Quality AI assets created a cohesive brand faster than anything we could have done traditionally.",
        impact: "Exponential Speed to Market"
    },
    {
        name: "David Chen",
        role: "Creative Director",
        image: "https://i.pravatar.cc/150?img=11",
        initials: "DC",
        quote: "The ability to generate tailored, high-fidelity mockups in a fraction of the time has completely changed how our agency pitches.",
        impact: "Elevated Agency Pitches"
    },
    {
        name: "Elena Ross",
        role: "Marketing Head",
        image: "https://i.pravatar.cc/150?img=5",
        initials: "ER",
        quote: "We've scaled our ad testing massively since adopting this AI-driven approach. The visual variation we get is stunning and highly converting.",
        impact: "Scaled Ad Performance"
    }
]

export default function Testimonials() {
    const marqueeRef1 = useRef<HTMLDivElement>(null)
    const marqueeRef2 = useRef<HTMLDivElement>(null)

    const setPlaybackRate = (rate: number) => {
        marqueeRef1.current?.getAnimations().forEach(a => a.playbackRate = rate)
        marqueeRef2.current?.getAnimations().forEach(a => a.playbackRate = rate)
    }

    return (
        <section className="py-12 md:py-16 bg-background overflow-hidden" id="reviews">
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); } 
                }
                .animate-marquee {
                    animation: marquee 50s linear infinite;
                }
            `}</style>
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <SectionHeading
                            badge="Customer stories"
                            title="Don't take our word for it."
                            description="Hear from the producers, founders, and creative directors who switched to AI-powered design and never looked back."
                        />
                    </div>
                </div>
            </div>

            <div 
                className="flex overflow-hidden group"
                onMouseEnter={() => setPlaybackRate(0.5)}
                onMouseLeave={() => setPlaybackRate(1)}
            >
                <div ref={marqueeRef1} className="flex animate-marquee gap-6 pr-6 shrink-0 w-max">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="w-[320px] md:w-[400px] shrink-0 h-auto">
                            <Card className="h-full flex flex-col justify-between overflow-hidden border-border/50 bg-card transition-colors duration-300 rounded-[5px]">
                                {/* Top Section */}
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-6">
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
                                    </div>

                                    <blockquote className="text-lg font-medium leading-relaxed mb-6">
                                        "{testimonial.quote}"
                                    </blockquote>

                                    <div className="mt-auto">
                                        <cite className="not-italic text-sm font-semibold text-foreground">
                                            {testimonial.name}
                                        </cite>
                                        <span className="block text-sm text-muted-foreground">
                                            {testimonial.role}
                                        </span>
                                    </div>
                                </div>

                                {/* Bottom "Metric" Section */}
                                <div className="bg-[#020817] p-6 mt-auto">
                                    <div className="flex items-center gap-3 text-white">
                                        <div className="p-1 bg-white/20 rounded-full">
                                            <ArrowRight className="h-4 w-4 -rotate-45" />
                                        </div>
                                        <span className="font-semibold text-base md:text-lg">
                                            {testimonial.impact}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
                <div ref={marqueeRef2} className="flex animate-marquee gap-6 pr-6 shrink-0 w-max" aria-hidden="true">
                    {testimonials.map((testimonial, index) => (
                        <div key={`copy-${index}`} className="w-[320px] md:w-[400px] shrink-0 h-auto">
                            <Card className="h-full flex flex-col justify-between overflow-hidden border-border/50 bg-card transition-colors duration-300 rounded-[5px]">
                                {/* Top Section */}
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-6">
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
                                    </div>

                                    <blockquote className="text-lg font-medium leading-relaxed mb-6">
                                        "{testimonial.quote}"
                                    </blockquote>

                                    <div className="mt-auto">
                                        <cite className="not-italic text-sm font-semibold text-foreground">
                                            {testimonial.name}
                                        </cite>
                                        <span className="block text-sm text-muted-foreground">
                                            {testimonial.role}
                                        </span>
                                    </div>
                                </div>

                                {/* Bottom "Metric" Section */}
                                <div className="bg-[#020817] p-6 mt-auto">
                                    <div className="flex items-center gap-3 text-white">
                                        <div className="p-1 bg-white/20 rounded-full">
                                            <ArrowRight className="h-4 w-4 -rotate-45" />
                                        </div>
                                        <span className="font-semibold text-base md:text-lg">
                                            {testimonial.impact}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
