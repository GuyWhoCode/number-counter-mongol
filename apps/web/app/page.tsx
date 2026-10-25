"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Settings } from "lucide-react"
import { useNumberCounter } from "../lib/use-number-counter"
import { Button, buttonVariants } from "@workspace/ui/components/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog"

export default function Home() {
    const {
        count,
        settings,
        limitReached,
        setLimitReached,
        progress,
        hydrated,
        handleClick,
        handleReset,
    } = useNumberCounter()

    useEffect(() => {
        if (!hydrated || !window.location.search) return

        // The hook has read the plan from the URL; remove the query string
        // without refreshing the page or losing the URL hash.
        window.history.replaceState(
            window.history.state,
            "",
            window.location.pathname + window.location.hash
        )
    }, [hydrated])

    const limitLabel =
        settings.maxNumber === null ? "Unlimited" : settings.maxNumber

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
                <Link
                    href="/"
                    className="text-lg font-semibold tracking-tight transition-opacity hover:opacity-70"
                >
                    Number Counter Mongol
                </Link>
                <nav className="flex items-center gap-1" aria-label="Main">
                    <Link
                        href="/pricing"
                        className={buttonVariants({
                            variant: "ghost",
                            className: "rounded-full px-4",
                        })}
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/settings"
                        aria-label="Settings"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "icon",
                            className:
                                "rounded-full transition-transform duration-300 hover:rotate-90",
                        })}
                    >
                        <Settings className="size-5" />
                    </Link>
                </nav>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center gap-10 p-6">
                {/* Circular counter, sized by the smaller viewport dimension */}
                <div className="relative grid place-items-center">
                    {/* Soft halo ring that fills as you approach the limit */}
                    <svg
                        className="pointer-events-none absolute -rotate-90"
                        style={{
                            width: "calc(min(60vmin, 28rem) + 3rem)",
                            height: "calc(min(60vmin, 28rem) + 3rem)",
                        }}
                        viewBox="0 0 100 100"
                        aria-hidden="true"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="48"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.6"
                            className="text-border"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="48"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            pathLength={100}
                            strokeDasharray={100}
                            strokeDashoffset={100 - progress}
                            className="text-primary transition-[stroke-dashoffset] duration-500 ease-out"
                        />
                    </svg>

                    <Button
                        onClick={handleClick}
                        disabled={!hydrated}
                        className="aspect-square h-[min(60vmin,28rem)] min-h-56 w-[min(60vmin,28rem)] min-w-56 rounded-full text-[clamp(4rem,22vmin,12rem)] leading-none font-bold tracking-tighter tabular-nums shadow-2xl transition-all duration-150 ease-out hover:scale-[1.03] hover:shadow-[0_0_60px_-10px] active:scale-95"
                        aria-label={`Click counter, currently ${count} of ${limitLabel}`}
                    >
                        {count}
                    </Button>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                    <p className="text-sm tracking-wide text-muted-foreground">
                        Click the button to count.
                    </p>
                    <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground/70 uppercase tabular-nums">
                        {count} / {limitLabel}
                    </p>
                </div>
            </main>

            <AlertDialog open={limitReached} onOpenChange={setLimitReached}>
                <AlertDialogContent className="rounded-3xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="tracking-tight">
                            Click limit reached
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You&apos;ve used all {settings.maxNumber} clicks.
                            Reset the counter to start again.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-full">
                            Close
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleReset}
                            className="rounded-full"
                        >
                            Reset counter
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
