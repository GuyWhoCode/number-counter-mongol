"use client"

import { useEffect, useState } from "react"

const SETTINGS_KEY = "number-counter-settings"
const COUNT_KEY = "number-counter-count"

export type TierId = "free" | "basic" | "pro" | "unlimited"

const PLAN_LIMITS: Record<TierId, number | null> = {
    free: 20,
    basic: 100,
    pro: 1000,
    unlimited: null,
}

function isTierId(value: unknown): value is TierId {
    return (
        value === "free" ||
        value === "basic" ||
        value === "pro" ||
        value === "unlimited"
    )
}

export type CounterSettings = {
    maxNumber: number | null // null means unlimited
    increment: number
    country: string
    age: number
    plan: TierId
}

export const DEFAULT_COUNTER_SETTINGS: CounterSettings = {
    maxNumber: PLAN_LIMITS.free,
    increment: 1,
    country: "US",
    age: 20,
    plan: "free",
}

function readSettings(): CounterSettings {
    let storedSettings: Partial<CounterSettings> = {}
    try {
        const stored = sessionStorage.getItem(SETTINGS_KEY)
        if (stored) {
            const value: unknown = JSON.parse(stored)
            if (value && typeof value === "object" && !Array.isArray(value)) {
                storedSettings = value as Partial<CounterSettings>
            }
        }
    } catch {
        // Use defaults if storage is unavailable or invalid.
    }

    // A valid ?plan= query parameter overrides the saved plan.
    const queryPlan = new URLSearchParams(window.location.search).get("plan")
    const plan: TierId = isTierId(queryPlan)
        ? queryPlan
        : isTierId(storedSettings.plan)
          ? storedSettings.plan
          : "free"

    return {
        maxNumber: PLAN_LIMITS[plan],
        increment:
            typeof storedSettings.increment === "number" &&
            Number.isFinite(storedSettings.increment) &&
            storedSettings.increment > 0
                ? storedSettings.increment
                : DEFAULT_COUNTER_SETTINGS.increment,
        country:
            typeof storedSettings.country === "string"
                ? storedSettings.country
                : DEFAULT_COUNTER_SETTINGS.country,
        age:
            typeof storedSettings.age === "number" &&
            Number.isFinite(storedSettings.age)
                ? storedSettings.age
                : DEFAULT_COUNTER_SETTINGS.age,
        plan,
    }
}

function readCount(): number {
    try {
        const stored = sessionStorage.getItem(COUNT_KEY)
        const count = stored === null ? 0 : Number(stored)
        return Number.isFinite(count) && count >= 0 ? count : 0
    } catch {
        return 0
    }
}

export function useNumberCounter() {
    const [settings, setSettingsState] = useState<CounterSettings>(
        DEFAULT_COUNTER_SETTINGS
    )
    const [count, setCount] = useState(0)
    const [limitReached, setLimitReached] = useState(false)
    const [hydrated, setHydrated] = useState(false)

    // Keep the limit synchronized if callers change settings (e.g. a settings page).
    function setSettings(
        next: CounterSettings | ((current: CounterSettings) => CounterSettings)
    ) {
        setSettingsState((current) => {
            const updated = typeof next === "function" ? next(current) : next
            const plan = isTierId(updated.plan) ? updated.plan : "free"
            return { ...updated, plan, maxNumber: PLAN_LIMITS[plan] }
        })
    }

    useEffect(() => {
        setSettingsState(readSettings())
        setCount(readCount())
        setHydrated(true)
    }, [])

    useEffect(() => {
        if (!hydrated) return
        try {
            sessionStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
            sessionStorage.setItem(COUNT_KEY, String(count))
        } catch {
            // Storage may be disabled; the counter still works in memory.
        }
    }, [settings, count, hydrated])

    function handleClick() {
        if (!hydrated) return
        if (settings.maxNumber !== null && count >= settings.maxNumber) {
            setLimitReached(true)
            return
        }
        setCount((current) =>
            settings.maxNumber === null
                ? current + settings.increment
                : Math.min(current + settings.increment, settings.maxNumber)
        )
    }

    function handleReset() {
        setCount(0)
        setLimitReached(false)
    }

    const progress =
        settings.maxNumber === null
            ? 0
            : Math.min((count / settings.maxNumber) * 100, 100)

    return {
        count,
        settings,
        setSettings,
        limitReached,
        setLimitReached,
        progress,
        hydrated,
        handleClick,
        handleReset,
    }
}
