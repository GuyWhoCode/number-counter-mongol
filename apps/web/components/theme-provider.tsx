"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

export const COLOR_THEMES = [
    { id: "red", label: "Red", color: "#f06a70" },
    { id: "coral", label: "Coral", color: "#fb9278" },
    { id: "orange", label: "Orange", color: "#ffa45b" },
    { id: "yellow", label: "Yellow", color: "#f1d166" },
    { id: "lime", label: "Lime green", color: "#b5dd76" },
    { id: "emerald", label: "Emerald green", color: "#61d6a0" },
    { id: "forest", label: "Forest green", color: "#83bf8b" },
    { id: "mint", label: "Mint green", color: "#8ee1be" },
    { id: "teal", label: "Teal", color: "#65d5cc" },
    { id: "cyan", label: "Cyan", color: "#70d5f0" },
    { id: "blue", label: "Blue", color: "#80b2fb" },
    { id: "indigo", label: "Indigo", color: "#a29cf8" },
    { id: "violet", label: "Violet", color: "#ce9bf6" },
] as const

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            themes={["light", "dark", ...COLOR_THEMES.map((theme) => theme.id)]}
            {...props}
        >
            <ThemeHotkey />
            {children}
        </NextThemesProvider>
    )
}

function isTypingTarget(target: EventTarget | null) {
    return target instanceof HTMLElement && (
        target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
    )
}

function ThemeHotkey() {
    const { theme, resolvedTheme, setTheme } = useTheme()

    React.useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.defaultPrevented || event.repeat || event.metaKey || event.ctrlKey || event.altKey) return
            if (event.key.toLowerCase() !== "d" || isTypingTarget(event.target)) return

            // D switches to the opposite neutral mode; colored themes are preserved
            // until the user explicitly chooses another theme.
            setTheme(theme === "dark" || (theme === "system" && resolvedTheme === "dark") ? "light" : "dark")
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [theme, resolvedTheme, setTheme])

    return null
}
