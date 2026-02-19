import { SectionHeading } from "@/components/ui/section-heading"
"use client"

import * as React from "react"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Tab } from "@/components/ui/pricing-tab"

interface PricingSectionProps {
    title: string
    subtitle: string
    tiers: PricingTier[]
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
    frequencies,
    frequency,
    setFrequency,
    onCompareClick,
    isComparisonOpen,
}: PricingSectionProps) {

    return (
        <section className="flex flex-col items-center gap-10 py-16 md:py-24 px-12" id="pricing">
            <div className="space-y-7 text-center">
                <SectionHeading
                    badge="Pricing"
                    title={title}
                    description={subtitle}
                    align="center"
                />
                <div className="mx-auto flex w-fit rounded-full bg-muted p-1">
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

            <div className="grid w-full max-w-7xl gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {tiers.map((tier) => (
                    <PricingCard
                        key={tier.name}
                        tier={tier}
                        paymentFrequency={frequency}
                        onCompareClick={onCompareClick}
                        isComparisonOpen={isComparisonOpen}
                    />
                ))}
            </div>
            {/* Separating Enterprise or keeping it in grid? The new design is grid based. I'll put Enterprise in the grid as the last item to match the UI component structure provided. */}
        </section>
    )
}
