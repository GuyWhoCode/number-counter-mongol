import type { Metadata } from "next"

import { PricingSection } from "@/components/pricing/pricing-section"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Compare the Free, Basic, Pro, and Unlimited plans.",
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <PricingSection />
    </main>
  )
}