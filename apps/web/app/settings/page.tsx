"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { countries } from "countries-list"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Separator } from "@workspace/ui/components/separator"
import {
    Settings2,
    ArrowLeft,
    Globe2,
    Hash,
    Phone,
    ChevronDown,
    Check,
    Search,
} from "lucide-react"

const STORAGE_KEY = "number-counter-settings"
const SUPPORT_PHONE_DISPLAY = "+1 (732) 223-4044"
const SUPPORT_PHONE_TEL = "+17322234044"

type CounterSettings = {
    age: number
    country: string
    increment: number
}

const defaults: CounterSettings = {
    age: 18,
    country: "United States",
    increment: 1,
}

const countryList = Object.values(countries)
    .map((country) => country.name)
    .sort((a, b) => a.localeCompare(b))

export default function SettingsPage() {
    const [settings, setSettings] = useState<CounterSettings>(defaults)

    const [loaded, setLoaded] = useState(false)
    const [countrySearch, setCountrySearch] = useState("")
    const countryDetails = useRef<HTMLDetailsElement>(null)

    // Load settings once on mount.
    useEffect(() => {
        try {
            const stored = sessionStorage.getItem(STORAGE_KEY)

            if (stored) {
                const parsed = JSON.parse(stored)

                setSettings({
                    age:
                        typeof parsed.age === "number" &&
                        Number.isFinite(parsed.age)
                            ? parsed.age
                            : defaults.age,
                    country:
                        typeof parsed.country === "string"
                            ? parsed.country
                            : defaults.country,
                    increment:
                        typeof parsed.increment === "number" &&
                        Number.isFinite(parsed.increment)
                            ? parsed.increment
                            : defaults.increment,
                })
            }
        } catch (error) {
            console.error("Unable to load settings:", error)
        } finally {
            setLoaded(true)
        }
    }, [])

    // Automatically persist changes in sessionStorage.
    useEffect(() => {
        if (!loaded) return

        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
        } catch (error) {
            console.error("Unable to save settings:", error)
        }
    }, [settings, loaded])

    function updateSetting<K extends keyof CounterSettings>(
        key: K,
        value: CounterSettings[K]
    ) {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const filteredCountries = countryList.filter((country) =>
        country.toLowerCase().includes(countrySearch.toLowerCase())
    )

    if (!loaded) {
        return (
            <main className="mx-auto max-w-3xl px-6 py-12">
                <p className="text-sm text-muted-foreground">
                    Loading settings...
                </p>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background px-4 py-12 sm:px-6">
            <div className="mx-auto max-w-3xl space-y-8">
                {/* Back to home */}
                <Link
                    href="/"
                    className="inline-flex w-fit items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    aria-label="Back to home"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>

                {/* Page heading */}
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-muted p-3">
                            <Settings2 className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Settings
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your number counter preferences.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Personal preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle>Personal preferences</CardTitle>
                        <CardDescription>
                            Customize your personal information and region.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Age */}
                        <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                min={0}
                                max={120}
                                step={1}
                                value={settings.age}
                                onChange={(e) => {
                                    const value = Number(e.target.value)
                                    updateSetting(
                                        "age",
                                        Math.max(0, Math.min(120, value))
                                    )
                                }}
                            />
                            <p className="text-xs text-muted-foreground">
                                Your age in years.
                            </p>
                        </div>

                        <Separator />

                        {/* Country dropdown using native HTML details */}
                        <div className="space-y-2">
                            <Label>Country</Label>

                            <details ref={countryDetails} className="group">
                                <summary className="flex h-10 cursor-pointer list-none items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                                    <span className="flex items-center gap-2">
                                        <Globe2 className="h-4 w-4 text-muted-foreground" />
                                        {settings.country || "Select a country"}
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                                </summary>

                                <div className="mt-2 overflow-hidden rounded-md border bg-popover shadow-lg">
                                    <div className="border-b p-2">
                                        <div className="relative">
                                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                value={countrySearch}
                                                onChange={(e) =>
                                                    setCountrySearch(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Search countries..."
                                                aria-label="Search countries"
                                                className="w-full pl-10"
                                            />
                                        </div>
                                    </div>

                                    <div className="max-h-60 overflow-y-auto p-1">
                                        {filteredCountries.length === 0 ? (
                                            <p className="p-3 text-center text-sm text-muted-foreground">
                                                No countries found.
                                            </p>
                                        ) : (
                                            filteredCountries.map((country) => (
                                                <button
                                                    key={country}
                                                    type="button"
                                                    className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:outline-none"
                                                    onClick={() => {
                                                        updateSetting(
                                                            "country",
                                                            country
                                                        )
                                                        setCountrySearch("")
                                                        if (
                                                            countryDetails.current
                                                        ) {
                                                            countryDetails.current.open = false
                                                        }
                                                    }}
                                                >
                                                    {country}
                                                    {settings.country ===
                                                        country && (
                                                        <Check className="h-4 w-4" />
                                                    )}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </details>

                            <p className="text-xs text-muted-foreground">
                                Select your country or region.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Counter settings */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Hash className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Counter settings</CardTitle>
                        </div>
                        <CardDescription>
                            Configure how your number counter behaves.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="increment">Increment</Label>
                            <Input
                                id="increment"
                                type="number"
                                min={1}
                                step={1}
                                value={settings.increment}
                                onChange={(e) => {
                                    updateSetting(
                                        "increment",
                                        Math.max(
                                            1,
                                            Math.floor(
                                                Number(e.target.value) || 1
                                            )
                                        )
                                    )
                                }}
                            />
                            <p className="text-xs text-muted-foreground">
                                The amount added to your counter with each
                                increment.
                            </p>
                        </div>

                        <div className="mt-5 rounded-lg bg-muted/50 p-4">
                            <p className="text-sm text-muted-foreground">
                                Increment preview
                            </p>
                            <p className="mt-2 text-xl font-semibold tracking-tight">
                                0 → {settings.increment} →{" "}
                                {settings.increment * 2} →{" "}
                                {settings.increment * 3}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact support */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Contact support</CardTitle>
                        </div>
                        <CardDescription>
                            Need assistance or have feedback? We're here to
                            help.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">
                                    Get in touch
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Call our support line for questions or
                                    assistance.
                                    <span className="mt-1 block font-medium text-foreground">
                                        {SUPPORT_PHONE_DISPLAY}
                                    </span>
                                </p>
                            </div>

                            <Button
                                className="shrink-0"
                                onClick={() => {
                                    window.location.href = `tel:${SUPPORT_PHONE_TEL}`
                                }}
                            >
                                <Phone className="mr-2 h-4 w-4" />
                                Call support
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-muted-foreground">
                    Changes are saved automatically for this browser tab's
                    session.
                </p>
            </div>
        </main>
    )
}
