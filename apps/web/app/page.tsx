"use client"

import { useState } from "react"
import Link from "next/link"
import { Settings } from "lucide-react"
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

const CLICK_LIMIT = 20

export default function Home() {
    const [count, setCount] = useState(0)
    const [limitReached, setLimitReached] = useState(false)

    function handleClick() {
        if (count >= CLICK_LIMIT) {
            // Already at the limit: show the error and don't increment further
            setLimitReached(true)
            return
        }
        setCount((c) => c + 1)
    }

    function handleReset() {
        setCount(0)
        setLimitReached(false)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
                <Link href="/" className="text-lg font-semibold">
                    Number Counter Mongol
                </Link>
                <nav className="flex items-center gap-1" aria-label="Main">
                    <Link
                        href="/pricing"
                        className={buttonVariants({ variant: "ghost" })}
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/settings"
                        aria-label="Settings"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "icon",
                        })}
                    >
                        <Settings className="size-5" />
                    </Link>
                </nav>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
                {/* 50vw x 50vh = a quarter of the screen; text scales with the viewport */}
                <Button
                    onClick={handleClick}
                    className="h-[50vh] min-h-48 w-[50vw] min-w-64 text-[clamp(4rem,20vmin,14rem)] font-bold tabular-nums"
                    aria-label={`Click counter, currently ${count} of ${CLICK_LIMIT}`}
                >
                    {count}
                </Button>

                <p className="text-sm text-muted-foreground">
                    Click the button to count. Limit: {CLICK_LIMIT}.
                </p>
            </main>

            <AlertDialog open={limitReached} onOpenChange={setLimitReached}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Click limit reached</AlertDialogTitle>
                        <AlertDialogDescription>
                            You&apos;ve used all {CLICK_LIMIT} clicks. Reset the
                            counter to start again.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                        <AlertDialogAction onClick={handleReset}>
                            Reset counter
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
