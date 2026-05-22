"use client"

import * as React from "react"
import { ArrowRight, BadgeCheck } from "lucide-react"
import NumberFlow from "./number-flow"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export interface PricingTier {
    name: string
    price: Record<string, number | string>
    description: string
    features: string[]
    cta: string
    highlighted?: boolean
    popular?: boolean
    href?: string | Record<string, string>
}

interface PricingCardProps {
    tier: PricingTier
    paymentFrequency: string
    onCompareClick?: () => void
    isComparisonOpen?: boolean
    hideCompare?: boolean
}

type TierTheme = {
    cardClassName: string
    pricePanelClassName: string
    priceClassName: string
    featureIconClassName: string
    buttonClassName: string
    compareClassName: string
    dividerClassName: string
    isDarkCard: boolean
}

function getTierTheme(tier: PricingTier): TierTheme {
    const name = tier.name.toLowerCase()
    const brandBorder = "border-[#3ca2fa]/24"
    const brandRing = "ring-1 ring-inset ring-[#3ca2fa]/10"
    const brandPricePanel = "border-[#3ca2fa]/16 bg-white shadow-sm"
    const brandPriceText = "text-[#1f3a8a]"
    const brandFeatureIcon = "text-[#1f3a8a]"
    const brandButton = "bg-[#1f3a8a] text-white hover:bg-[#17306f]"
    const brandCompare = "text-[#1f3a8a]/80 hover:bg-[#3ca2fa]/8 hover:text-[#1f3a8a]"
    const brandDivider = "border-[#3ca2fa]/14"

    if (name.includes("growth")) {
        return {
            cardClassName:
                `${brandBorder} bg-[#3ca2fa]/[0.08] ${brandRing}`,
            pricePanelClassName: brandPricePanel,
            priceClassName: brandPriceText,
            featureIconClassName: brandFeatureIcon,
            buttonClassName: brandButton,
            compareClassName: brandCompare,
            dividerClassName: brandDivider,
            isDarkCard: false,
        }
    }

    return {
        cardClassName: `${brandBorder} bg-white ${brandRing}`,
        pricePanelClassName: brandPricePanel,
        priceClassName: brandPriceText,
        featureIconClassName: brandFeatureIcon,
        buttonClassName: brandButton,
        compareClassName: brandCompare,
        dividerClassName: brandDivider,
        isDarkCard: false,
    }
}

export function PricingCard({ tier, paymentFrequency, onCompareClick, isComparisonOpen, hideCompare }: PricingCardProps) {
    const price = tier.price[paymentFrequency]
    const theme = React.useMemo(() => getTierTheme(tier), [tier])
    const isDarkCard = theme.isDarkCard

    const href = typeof tier.href === "object"
        ? tier.href[paymentFrequency]
        : tier.href
    const isExternalHref = typeof href === "string" && /^https?:\/\//.test(href)

    return (
        <Card
            className={cn(
                "relative flex h-full flex-col gap-6 overflow-hidden rounded-[5px] border p-6 shadow-none",
                theme.cardClassName
            )}
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#3ca2fa]/25" />

            <div className="relative z-10 flex min-h-[124px] flex-col gap-4 md:min-h-[136px]">
                <h2 className={cn("text-2xl font-semibold leading-tight", isDarkCard ? "text-white" : "text-foreground")}>
                    {tier.name}
                </h2>
                <p className={cn("max-w-[28ch] text-sm leading-relaxed", isDarkCard ? "text-white/72" : "text-muted-foreground")}>
                    {tier.description}
                </p>
            </div>

            <div className={cn("relative z-10 rounded-[5px] border p-5", theme.pricePanelClassName)}>
                {typeof price === "number" ? (
                    <div className="space-y-2">
                        <div className="flex items-baseline gap-1.5">
                            <span className={cn("text-4xl font-semibold leading-none tracking-tight", theme.priceClassName)}>
                                $
                            </span>
                            <NumberFlow
                                value={price}
                                className={cn("text-5xl font-semibold leading-none tracking-tight", theme.priceClassName)}
                            />
                            <span className={cn("text-sm font-medium leading-none", isDarkCard ? "text-white/70" : "text-muted-foreground")}>
                                / month
                            </span>
                        </div>
                        {paymentFrequency === "yearly" && typeof tier.price.monthly === "number" && (
                            <p className={cn("text-xs", isDarkCard ? "text-white/65" : "text-muted-foreground")}>
                                Billed yearly.
                                {" "}
                                <span className="line-through opacity-70">
                                    ${(tier.price.monthly as number) * 12}
                                </span>
                                {" "}
                                ${price * 12} total.
                            </p>
                        )}
                    </div>
                ) : (
                    <h1 className={cn("text-4xl font-semibold", theme.priceClassName)}>{price}</h1>
                )}
            </div>

            <div className="relative z-10 flex-1">
                <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                        <li
                            key={index}
                            className={cn(
                                "flex items-start gap-3 text-sm leading-relaxed",
                                isDarkCard ? "text-white/88" : "text-foreground/88"
                            )}
                        >
                            <BadgeCheck className={cn("mt-0.5 h-4 w-4 shrink-0", theme.featureIconClassName)} />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={cn("relative z-10 mt-auto space-y-3 border-t pt-5", theme.dividerClassName)}>
                {href ? (
                    <a
                        href={href}
                        target={isExternalHref ? "_blank" : undefined}
                        rel={isExternalHref ? "noopener noreferrer" : undefined}
                        className="w-full"
                    >
                        <Button
                            variant={isDarkCard ? "secondary" : "default"}
                            className={cn("w-full rounded-full text-sm font-semibold", theme.buttonClassName)}
                        >
                            {tier.cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                ) : (
                    <Button
                        variant={isDarkCard ? "secondary" : "default"}
                        className={cn("w-full rounded-full text-sm font-semibold", theme.buttonClassName)}
                    >
                        {tier.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}

                {!hideCompare && (
                    <Button
                        variant="ghost"
                        className={cn("h-9 w-full rounded-full text-sm", theme.compareClassName)}
                        onClick={onCompareClick}
                    >
                        {isComparisonOpen ? "Hide Comparison" : "Compare Plans"}
                    </Button>
                )}
            </div>
        </Card>
    )
}
