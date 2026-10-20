"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"
import { tiers } from "@/lib/pricing"

import { PricingCard } from "./pricing-card"

export function PricingSection() {
    const [yearly, setYearly] = useState(false)

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-24">
            <div className="mb-10">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 border border-border bg-card px-3.5 py-2 text-sm font-medium text-muted-foreground no-underline transition-colors hover:border-foreground/40 hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                    <ArrowLeft className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    <span>Back to home</span>
                </Link>
            </div>

            <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                    Pick one that fits your lifestyle
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
