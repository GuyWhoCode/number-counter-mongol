import Link from "next/link"
import { Check } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { buttonVariants } from "@workspace/ui/components/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@workspace/ui/components/card"

import type { Tier } from "@/lib/pricing"
import { cn } from "@workspace/ui/lib/utils"

type PricingCardProps = {
    tier: Tier
    yearly: boolean
}

export function PricingCard({ tier, yearly }: PricingCardProps) {
    const monthlyPrice = yearly ? Math.round(tier.price.yearly) : Math.round(tier.price.monthly)
    const isFree = tier.price.monthly === 0

    return (
        <Card
            className={cn(
                "relative flex h-full flex-col",
                tier.featured && "border-primary shadow-lg ring-1 ring-primary"
            )}
        >
            <CardHeader>
                <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    {tier.featured && <Badge>Most popular</Badge>}
                </div>
                <CardDescription>{tier.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-6">
                <div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-semibold tracking-tight">
                            ${monthlyPrice}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            / month
                        </span>
                    </div>
                    <p className="mt-1 h-5 text-sm text-muted-foreground">
                        {isFree
                            ? "Free forever"
                            : yearly
                              ? `Billed $${Math.round(tier.price.yearly * 12)} per year`
                              : "Billed monthly"}
                    </p>
                </div>

                <ul className="space-y-3 text-sm">
                    {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                            <Check
                                className="mt-0.5 size-4 shrink-0 text-primary"
                                aria-hidden="true"
                            />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter>
                <Link
                    href={`/?plan=${tier.id}`}
                    className={cn(
                        buttonVariants({
                            variant: tier.featured ? "default" : "outline",
                        }),
                        "w-full"
                    )}
                >
                    {tier.cta}
                </Link>
            </CardFooter>
        </Card>
    )
}
