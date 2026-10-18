"use client"

import { useState } from "react"

import { Badge } from "@workspace/ui/components/badge"
import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"
import { tiers } from "@/lib/pricing"

import { PricingCard } from "./pricing-card"

export function PricingSection() {
    const [yearly, setYearly] = useState(false)

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                    Pick the plan that fits your work
                </h1>
                <p className="mt-4 text-pretty text-muted-foreground">
                    Start free and upgrade when you need more room. Change or
                    cancel your plan at any time.
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">
                    <Label htmlFor="billing-toggle" className="cursor-pointer">
                        Monthly
                    </Label>
                    <Switch
                        id="billing-toggle"
                        checked={yearly}
                        onCheckedChange={setYearly}
                        aria-label="Bill yearly"
                    />
                    <Label htmlFor="billing-toggle" className="cursor-pointer">
                        Yearly
                    </Label>
                    <Badge variant="secondary">Save 20%</Badge>
                </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {tiers.map((tier) => (
                    <PricingCard key={tier.id} tier={tier} yearly={yearly} />
                ))}
            </div>
        </section>
    )
}
