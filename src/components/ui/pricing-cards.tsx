import { useState } from "react";
import { Check, MoveRight, PhoneCall, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

function Pricing() {
    const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

    const togglePlan = (plan: string) => {
        setExpandedPlan(expandedPlan === plan ? null : plan);
    };

    const PlanFeature = ({ text }: { text: string }) => (
        <div className="flex flex-row gap-4">
            <Check className="w-4 h-4 mt-1 text-primary shrink-0" />
            <div className="flex flex-col">
                <p className="text-sm">{text}</p>
            </div>
        </div>
    );

    return (
        <div className="w-full py-20 lg:py-40 bg-background" id="pricing">
            <div className="container mx-auto px-4">
                <div className="flex text-center justify-center items-center gap-4 flex-col mb-16">
                    <Badge variant="secondary">Pricing</Badge>
                    <div className="flex gap-2 flex-col">
                        <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-bold">
                            Prices that make sense!
                        </h2>
                        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
                            Managing a small business today is already tough. We make design easy.
                        </p>
                    </div>
                </div>

                {/* Top Row: Startup, Growth, Scale */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {/* Startup */}
                    <Card className="w-full rounded-[14px] cursor-pointer transition-all hover:border-primary/50" onClick={() => togglePlan('startup')}>
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-center">
                                <CardTitle>Startup</CardTitle>
                                {expandedPlan === 'startup' ? <ChevronUp /> : <ChevronDown />}
                            </div>
                            <CardDescription>Perfect for consistent social media presence.</CardDescription>
                            <div className="mt-4">
                                <span className="text-4xl font-bold">$60</span>
                                <span className="text-sm text-muted-foreground"> / month</span>
                            </div>
                        </CardHeader>
                        <AnimatePresence>
                            {expandedPlan === 'startup' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <CardContent>
                                        <div className="flex flex-col gap-4">
                                            <PlanFeature text="30 social media designs/month" />
                                            <PlanFeature text="1 design per day OR batch delivery" />
                                            <PlanFeature text="48-hour turnaround" />
                                            <PlanFeature text="Unlimited revisions" />
                                            <PlanFeature text="Source files (PNG/JPG)" />
                                            <Button variant="outline" className="w-full mt-4 gap-2">
                                                Sign up today <MoveRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>

                    {/* Growth */}
                    <Card className="w-full rounded-[14px] shadow-xl border-primary/20 bg-primary/5 cursor-pointer relative overflow-hidden" onClick={() => togglePlan('growth')}>
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-lg font-medium">Popular</div>
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-primary">Growth</CardTitle>
                                {expandedPlan === 'growth' ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-primary" />}
                            </div>
                            <CardDescription>For brands ready to scale their visual presence.</CardDescription>
                            <div className="mt-4">
                                <span className="text-4xl font-bold">$149</span>
                                <span className="text-sm text-muted-foreground"> / month</span>
                            </div>
                        </CardHeader>
                        <AnimatePresence>
                            {expandedPlan === 'growth' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <CardContent>
                                        <div className="flex flex-col gap-4">
                                            <PlanFeature text="Everything in Startup, plus:" />
                                            <PlanFeature text="Unlimited design requests" />
                                            <PlanFeature text="Ad creatives & banners" />
                                            <PlanFeature text="Flyers & basic print" />
                                            <PlanFeature text="24-48hr turnaround" />
                                            <Button className="w-full mt-4 gap-2">
                                                Sign up today <MoveRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>

                    {/* Scale */}
                    <Card className="w-full rounded-[14px] cursor-pointer transition-all hover:border-primary/50" onClick={() => togglePlan('scale')}>
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-center">
                                <CardTitle>Scale</CardTitle>
                                {expandedPlan === 'scale' ? <ChevronUp /> : <ChevronDown />}
                            </div>
                            <CardDescription>Complete creative department on demand.</CardDescription>
                            <div className="mt-4">
                                <span className="text-4xl font-bold">$299</span>
                                <span className="text-sm text-muted-foreground"> / month</span>
                            </div>
                        </CardHeader>
                        <AnimatePresence>
                            {expandedPlan === 'scale' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <CardContent>
                                        <div className="flex flex-col gap-4">
                                            <PlanFeature text="Everything in Growth, plus:" />
                                            <PlanFeature text="8 video edits/month" />
                                            <PlanFeature text="Motion graphics" />
                                            <PlanFeature text="Full vector logos" />
                                            <PlanFeature text="UI design (Figma/XD)" />
                                            <Button variant="outline" className="w-full mt-4 gap-2">
                                                Sign up today <MoveRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </div>

                {/* Enterprise - Full Width */}
                <div className="w-full">
                    <Card className="w-full rounded-[14px] cursor-pointer bg-neutral-900 text-white border-neutral-800 transition-all hover:border-neutral-700" onClick={() => togglePlan('enterprise')}>
                        <CardHeader className="pb-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="text-white">Enterprise</CardTitle>
                                        {expandedPlan === 'enterprise' ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
                                    </div>
                                    <CardDescription className="text-neutral-400 mt-2">Full-service creative partnership for high-volume brands.</CardDescription>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold">$499</span>
                                    <span className="text-sm text-neutral-400"> / month</span>
                                </div>
                            </div>
                        </CardHeader>
                        <AnimatePresence>
                            {expandedPlan === 'enterprise' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-neutral-800">
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-neutral-200">Dedicated Support</h4>
                                                <PlanFeature text="2 active requests simultaneously" />
                                                <PlanFeature text="Same-day priority turnaround" />
                                                <PlanFeature text="Slack + Zoom calls" />
                                            </div>
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-neutral-200">Advanced Creative</h4>
                                                <PlanFeature text="12 video edits/month" />
                                                <PlanFeature text="Long-form video (Podcast/YouTube)" />
                                                <PlanFeature text="Complete brand identity suites" />
                                            </div>
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-neutral-200">AI & Tech</h4>
                                                <PlanFeature text="Custom AI models" />
                                                <PlanFeature text="AI voice clones" />
                                                <PlanFeature text="WordPress/Framer development" />
                                            </div>
                                            <div className="col-span-full mt-4">
                                                <Button variant="secondary" className="w-full md:w-auto gap-4">
                                                    Book a meeting <PhoneCall className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </div>

            </div>
        </div>
    );
}

export { Pricing };
