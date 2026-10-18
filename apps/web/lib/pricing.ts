export type TierId = "free" | "basic" | "pro" | "unlimited"

export type Tier = {
    id: TierId
    name: string
    description: string
    /** Price per month in USD. `yearly` is the per-month price when billed annually. */
    price: { monthly: number; yearly: number }
    cta: string
    featured?: boolean
    features: string[]
}

export const tiers: Tier[] = [
    {
        id: "free",
        name: "Free",
        description: "Try it out on a personal project.",
        price: { monthly: 0, yearly: 0 },
        cta: "Start for free",
        features: [
            "3 projects",
            "1 GB storage",
            "1 team member",
            "Community support",
        ],
    },
    {
        id: "basic",
        name: "Basic",
        description: "For freelancers and small side projects.",
        price: { monthly: 9, yearly: 7 },
        cta: "Choose Basic",
        features: [
            "25 projects",
            "20 GB storage",
            "3 team members",
            "Email support",
        ],
    },
    {
        id: "pro",
        name: "Pro",
        description: "For small teams shipping every week.",
        price: { monthly: 29, yearly: 23 },
        cta: "Choose Pro",
        featured: true,
        features: [
            "Unlimited projects",
            "200 GB storage",
            "15 team members",
            "Priority support",
            "Advanced analytics",
        ],
    },
    {
        id: "unlimited",
        name: "Unlimited",
        description: "For organizations with no ceilings.",
        price: { monthly: 79, yearly: 63 },
        cta: "Choose Unlimited",
        features: [
            "Unlimited projects",
            "Unlimited storage",
            "Unlimited team members",
            "Dedicated support",
            "Advanced analytics",
            "Single sign-on (SSO)",
        ],
    },
]
