import { motion } from "framer-motion";
import { FileText, PackageCheck, Paintbrush, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const LEFT_DECORATIVE_SQUARES = [
    {
        className: "left-8 top-16 h-20 w-20",
        baseColor: "rgba(254, 205, 211, 0.78)",
        hoverGradient: "linear-gradient(135deg, rgba(251, 113, 133, 0.98) 0%, rgba(244, 114, 182, 0.92) 48%, rgba(251, 146, 60, 0.86) 100%)",
        glow: "0 0 28px rgba(251, 113, 133, 0.28), 0 0 64px rgba(251, 146, 60, 0.16)",
    },
    {
        className: "left-8 top-36 h-20 w-20",
        baseColor: "rgba(255, 255, 255, 0.92)",
        hoverGradient: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 205, 211, 0.96) 45%, rgba(253, 186, 116, 0.9) 100%)",
        glow: "0 0 24px rgba(254, 205, 211, 0.24), 0 0 56px rgba(253, 186, 116, 0.14)",
    },
    {
        className: "left-28 top-36 h-20 w-20",
        baseColor: "rgba(244, 63, 94, 0.88)",
        hoverGradient: "linear-gradient(135deg, rgba(244, 63, 94, 0.98) 0%, rgba(251, 113, 133, 0.92) 45%, rgba(249, 115, 22, 0.88) 100%)",
        glow: "0 0 30px rgba(244, 63, 94, 0.3), 0 0 66px rgba(249, 115, 22, 0.18)",
    },
    {
        className: "left-8 top-56 h-20 w-20",
        baseColor: "rgba(249, 115, 22, 0.88)",
        hoverGradient: "linear-gradient(135deg, rgba(251, 146, 60, 0.98) 0%, rgba(249, 115, 22, 0.94) 50%, rgba(244, 63, 94, 0.84) 100%)",
        glow: "0 0 30px rgba(249, 115, 22, 0.3), 0 0 68px rgba(244, 63, 94, 0.16)",
    },
];

const RIGHT_DECORATIVE_SQUARES = [
    {
        className: "right-8 top-20 h-20 w-20",
        baseColor: "rgba(253, 164, 175, 0.78)",
        hoverGradient: "linear-gradient(135deg, rgba(251, 113, 133, 0.98) 0%, rgba(244, 114, 182, 0.9) 45%, rgba(253, 186, 116, 0.82) 100%)",
        glow: "0 0 28px rgba(251, 113, 133, 0.28), 0 0 64px rgba(253, 186, 116, 0.16)",
    },
    {
        className: "right-28 top-20 h-20 w-20",
        baseColor: "rgba(254, 205, 211, 0.76)",
        hoverGradient: "linear-gradient(135deg, rgba(255, 228, 230, 0.98) 0%, rgba(251, 113, 133, 0.84) 52%, rgba(251, 146, 60, 0.78) 100%)",
        glow: "0 0 24px rgba(254, 205, 211, 0.24), 0 0 56px rgba(251, 146, 60, 0.14)",
    },
    {
        className: "right-48 top-20 h-20 w-20",
        baseColor: "rgba(251, 146, 60, 0.88)",
        hoverGradient: "linear-gradient(135deg, rgba(251, 146, 60, 0.98) 0%, rgba(249, 115, 22, 0.94) 50%, rgba(244, 63, 94, 0.84) 100%)",
        glow: "0 0 30px rgba(251, 146, 60, 0.3), 0 0 68px rgba(244, 63, 94, 0.16)",
    },
    {
        className: "right-8 top-40 h-20 w-20",
        baseColor: "rgba(254, 205, 211, 0.76)",
        hoverGradient: "linear-gradient(135deg, rgba(255, 241, 242, 0.98) 0%, rgba(253, 164, 175, 0.88) 52%, rgba(251, 146, 60, 0.74) 100%)",
        glow: "0 0 24px rgba(253, 164, 175, 0.24), 0 0 56px rgba(251, 146, 60, 0.14)",
    },
    {
        className: "right-48 top-60 h-20 w-20",
        baseColor: "rgba(244, 63, 94, 0.92)",
        hoverGradient: "linear-gradient(135deg, rgba(244, 63, 94, 0.98) 0%, rgba(225, 29, 72, 0.94) 48%, rgba(249, 115, 22, 0.84) 100%)",
        glow: "0 0 30px rgba(244, 63, 94, 0.3), 0 0 68px rgba(249, 115, 22, 0.18)",
    },
];

const STEPS = [
    {
        title: "Brief",
        description: "We review your request and confirm the fit before any work begins.",
        icon: FileText,
        payment: null,
        theme: {
            card: "bg-slate-500/5 border-slate-300/70",
            icon: "bg-slate-200/80 text-slate-600 border-slate-300/80 dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700/80",
            pill: "bg-slate-500/10 text-slate-600",
        }
    },
    {
        title: "Kickoff",
        description: "Work starts once everything is approved and ready to move.",
        icon: Rocket,
        payment: "30%",
        summaryLabel: "To start",
        summaryNote: "When work begins",
        theme: {
            card: "bg-emerald-500/5 border-emerald-500/20",
            icon: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30",
            pill: "bg-emerald-500/10 text-emerald-500",
        }
    },
    {
        title: "First draft",
        description: "You review the first draft and approve the direction before we continue.",
        icon: Paintbrush,
        payment: "30%",
        summaryLabel: "After first draft",
        summaryNote: "When the direction is approved",
        theme: {
            card: "bg-amber-500/5 border-amber-500/20",
            icon: "bg-amber-500/20 text-amber-500 border-amber-500/30",
            pill: "bg-amber-500/10 text-amber-500",
        }
    },
    {
        title: "Final delivery",
        description: "We package the final files and hand everything over. The last 40% is due when the work is finished.",
        icon: PackageCheck,
        payment: "40%",
        summaryLabel: "On final delivery",
        summaryNote: "When the files are ready",
        theme: {
            card: "bg-rose-500/5 border-rose-500/20",
            icon: "bg-rose-500/20 text-rose-500 border-rose-500/30",
            pill: "bg-rose-500/10 text-rose-500",
        }
    },
];

export function PaymentModel() {
    return (
        <section className="relative overflow-x-hidden bg-background py-16 md:py-24">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-8rem] top-24 h-64 w-64 rounded-full bg-teal-500/8 blur-3xl" />
                <div className="absolute right-[-6rem] top-10 h-72 w-72 rounded-full bg-blue-500/8 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
            </div>



            <div className="container relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
                <div className="mx-auto mb-10 max-w-2xl text-center md:mb-16">
                    <SectionHeading
                        badge="Simple Payments"
                        title="Pay only when the project reaches the next milestone"
                        description="A simple four-step flow that shows exactly when work moves forward and when payment is due."
                        align="center"
                    />
                </div>

                <div className="mb-12 space-y-6 md:mb-16 md:space-y-8">
                    <div className="relative">
                        <div className="pointer-events-none absolute left-[10%] right-[10%] top-[3.2rem] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

                        <div className="relative z-10 flex flex-col pb-24 md:grid md:grid-cols-4 md:gap-4 md:pb-0">
                            {STEPS.map((step, index) => {
                                const Icon = step.icon;
                                const hasPayment = !!step.payment;

                                return (
                                    <div
                                        key={index}
                                        style={{
                                            top: `${4.75 + index * 1.15}rem`,
                                            zIndex: index + 1,
                                        }}
                                        className={`relative mb-3 flex flex-col rounded-[5px] border p-4 backdrop-blur-sm last:mb-0 sm:p-5 md:mb-0 md:static md:items-center md:p-6 md:text-center ${step.theme.card} sticky`}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                        >
                                            <div className="mb-3 flex items-start justify-between gap-3 md:mb-4 md:w-full md:flex-col md:items-center md:justify-start">
                                                <div className="inline-flex rounded-full border border-black/5 bg-white/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                                                    Step {index + 1}
                                                </div>

                                                {hasPayment ? (
                                                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold md:hidden ${step.theme.pill}`}>
                                                        {step.payment}
                                                    </span>
                                                ) : (
                                                    <span className="inline-block h-[24px] md:hidden" />
                                                )}
                                            </div>

                                            <div className="flex items-start gap-3 md:flex-col md:items-center">
                                                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border md:h-12 md:w-12 ${step.theme.icon}`}>
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <div className="flex flex-1 flex-col items-start justify-start text-left md:items-center md:text-center">
                                                    <h3 className="mb-1.5 text-base font-semibold text-foreground md:mb-2">{step.title}</h3>
                                                    <p className="text-sm leading-6 text-muted-foreground md:min-h-[72px] md:pb-4">
                                                        {step.description}
                                                    </p>

                                                    {hasPayment ? (
                                                        <div className="mt-4 hidden md:mt-auto md:block">
                                                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${step.theme.pill}`}>
                                                                {step.payment}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="mt-4 hidden h-[24px] md:mt-auto md:inline-block" />
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <div className="mb-5 text-sm text-muted-foreground">
                        No upfront full payment. No hidden stages.
                    </div>
                    <Button size="lg" className="transform rounded-full bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 py-6 text-lg font-semibold text-white duration-200 animate-shimmer transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105 dark:bg-[linear-gradient(110deg,#ffffff,45%,#e2e8f0,55%,#ffffff)] dark:text-black">
                        Submit a Project Brief
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
