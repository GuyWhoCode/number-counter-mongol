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
        description: "Just to get a taste of the mongoling.",
        price: { monthly: 0, yearly: 0 },
        cta: "Start for free",
        features: [
            "Ad supported",
            "Ad per 10 clicks",
            "Maxed out at 100 SigFigs",
            "Community support",
        ],
    },
    {
        id: "basic",
        name: "Choco Chip",
        description: "For getting the toe wet.",
        price: { monthly: 25, yearly: 19.92 }, // $239/yr
        cta: "Choose Choco Chip",
        features: [
            "10 unique sound effects",
            "More numbers to click",
            "Priority Support",
        ],
    },
    {
        id: "pro",
        name: "Goofy",
        description: "For those who become goof.",
        price: { monthly: 62, yearly: 49.92 }, // $599/yr
        cta: "Choose Goofy",
        featured: true,
        features: [
            "New sounds effects", 
            "Become goof. E.",
            "Booglily Woogily",
            "Priority support",
            "All perks of previous tiers",
        ],
    },
    {
        id: "unlimited",
        name: "BUSINESS MONGOL",
        description: "Can't stop the business mongol.",
        price: { monthly: 169, yearly: 133.25 }, // $1,599/yr
        cta: "Choose THE BUSINESS MONGOL",
        features: [
            "All of the business",
            "All of the Mongol",
            "All of the business Mongoling",
            "Supports the developers",
            "All perks of previous tiers"
        ],
    },
]
