"use client"

import * as React from "react"
import { Check, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { COLOR_THEMES } from "./theme-provider"

const NEUTRAL_THEMES = [
    { id: "system", label: "System", color: "linear-gradient(135deg, #f5f5f4 50%, #171717 50%)" },
    { id: "light", label: "Light", color: "#f5f5f4" },
    { id: "dark", label: "Dark", color: "#171717" },
]

export function ThemePicker() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const wrapperRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => setMounted(true), [])
    React.useEffect(() => {
        if (!open) return
        function closeOnOutside(event: PointerEvent) {
            if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false)
        }
        function closeOnEscape(event: KeyboardEvent) {
            if (event.key === "Escape") setOpen(false)
        }
        document.addEventListener("pointerdown", closeOnOutside)
        document.addEventListener("keydown", closeOnEscape)
        return () => {
            document.removeEventListener("pointerdown", closeOnOutside)
            document.removeEventListener("keydown", closeOnEscape)
        }
    }, [open])

    return (
        <div ref={wrapperRef} className="relative">
            <button
                type="button"
                aria-label="Choose color theme"
                aria-haspopup="true"
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
                className="inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
                <Palette className="size-5" />
            </button>
            {open && (
                <div
                    role="group"
                    aria-label="Color theme choices"
                    className="absolute right-0 top-full z-50 mt-2 w-[min(19rem,calc(100vw-2rem))] rounded-2xl border border-border bg-popover p-3 text-popover-foreground shadow-2xl"
                >
                    <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Appearance</p>
                    <div className="grid grid-cols-3 gap-1">
                        {NEUTRAL_THEMES.map((option) => (
                            <ThemeOption key={option.id} {...option} selected={mounted && theme === option.id} onChoose={() => { setTheme(option.id); setOpen(false) }} />
                        ))}
                    </div>
                    <div className="my-3 h-px bg-border" />
                    <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Colors · 13 themes</p>
                    <div className="grid grid-cols-2 gap-1">
                        {COLOR_THEMES.map((option) => (
                            <ThemeOption key={option.id} {...option} selected={mounted && theme === option.id} onChoose={() => { setTheme(option.id); setOpen(false) }} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

function ThemeOption({ label, color, selected, onChoose }: {
    label: string
    color: string
    selected: boolean
    onChoose: () => void
}) {
    return (
        <button
            type="button"
            aria-pressed={selected}
            onClick={onChoose}
            className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
            <span className="size-4 shrink-0 rounded-full border border-white/20" style={{ background: color }} />
            <span className="min-w-0 flex-1 truncate">{label}</span>
            {selected && <Check className="size-3.5 shrink-0" aria-hidden="true" />}
        </button>
    )
}
