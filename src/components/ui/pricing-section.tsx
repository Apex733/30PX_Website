import { SectionHeading } from "@/components/ui/section-heading"
"use client"

import * as React from "react"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Tab } from "@/components/ui/pricing-tab"
import { cn } from "@/lib/utils"

interface PricingSectionProps {
    title: string
    subtitle: string
    tiers: PricingTier[]
    professionalTiers?: PricingTier[]
    frequencies: string[]
    frequency: string
    setFrequency: (frequency: string) => void
    onCompareClick: () => void
    isComparisonOpen: boolean
}

export function PricingSection({
    title,
    subtitle,
    tiers,
    professionalTiers = [],
    frequencies,
    frequency,
    setFrequency,
    onCompareClick,
    isComparisonOpen,
}: PricingSectionProps) {
    const [isHireProfessional, setIsHireProfessional] = React.useState(false)

    // Select the current list of tiers based on the local toggle
    const currentTiers = isHireProfessional ? professionalTiers : tiers;

    return (
        <section className="flex flex-col items-center gap-10 py-16 md:py-24 px-12" id="pricing">
            <div className="space-y-7 text-center">
                <SectionHeading
                    badge="Pricing"
                    title={title}
                    description={subtitle}
                    align="center"
                />

                <div className="flex items-center justify-center gap-3 pt-2">
                    <span
                        className={cn("text-sm font-medium cursor-pointer transition-colors", !isHireProfessional ? "text-foreground" : "text-muted-foreground")}
                        onClick={() => setIsHireProfessional(false)}
                    >
                        Show Packages
                    </span>
                    <button
                        onClick={() => setIsHireProfessional(!isHireProfessional)}
                        className={cn(
                            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            isHireProfessional ? "bg-primary" : "bg-neutral-200 dark:bg-neutral-800"
                        )}
                        role="switch"
                        aria-checked={isHireProfessional}
                        aria-label="Toggle between Show Packages and Hire a professional"
                    >
                        <span className={cn(
                            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                            isHireProfessional ? "translate-x-5" : "translate-x-0"
                        )} />
                    </button>
                    <span
                        className={cn("text-sm font-medium cursor-pointer transition-colors", isHireProfessional ? "text-foreground" : "text-muted-foreground")}
                        onClick={() => setIsHireProfessional(true)}
                    >
                        Hire a professional
                    </span>
                </div>

                <div className={cn("mx-auto flex w-fit rounded-full bg-muted p-1 transition-opacity duration-300", isHireProfessional ? "opacity-0 pointer-events-none" : "opacity-100")}>
                    {frequencies.map((freq) => (
                        <Tab
                            key={freq}
                            text={freq}
                            selected={frequency === freq}
                            setSelected={setFrequency}
                            discount={freq === "yearly"}
                        />
                    ))}
                </div>
            </div>

            {/* Adjust grid layout dynamically: 4 columns for regular, 2 columns for professional */}
            <div className={cn("grid w-full max-w-7xl gap-6 grid-cols-1 md:grid-cols-2", !isHireProfessional && "lg:grid-cols-4", isHireProfessional && "max-w-4xl mx-auto")}>
                {currentTiers.map((tier) => (
                    <PricingCard
                        key={tier.name}
                        tier={tier}
                        paymentFrequency={isHireProfessional ? "monthly" : frequency}
                        onCompareClick={onCompareClick}
                        isComparisonOpen={isComparisonOpen}
                        hideCompare={isHireProfessional}
                    />
                ))}
            </div>
            {/* Separating Enterprise or keeping it in grid? The new design is grid based. I'll put Enterprise in the grid as the last item to match the UI component structure provided. */}
        </section>
    )
}
