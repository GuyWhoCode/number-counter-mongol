"use client"

import { useEffect, useRef, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"
import { Play, Volume2, Lock } from "lucide-react"

const videoOptions = [
    { label: "Video 1", src: "/video/Ad1.mp4" },
    { label: "Video 2", src: "/video/Ad2.mp4" },
    { label: "Video 3", src: "/video/Ad3.mp4" },
    { label: "Video 4", src: "/video/Ad4.mp4" },
    { label: "Video 5", src: "/video/Ad5.mp4" },
]

type VideoPopupProps = {
    open: boolean
    onComplete: () => void
}

export function VideoPopup({ open, onComplete }: VideoPopupProps) {
    const [playing, setPlaying] = useState(false)
    const [error, setError] = useState("")
    const [selectedVideo, setSelectedVideo] = useState(
        videoOptions[0]?.src ?? "/video/video1.mp4"
    )

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (open) {
            setPlaying(false)
            setError("")
        } else {
            videoRef.current?.pause()
        }
    }, [open])

    const handlePlay = async () => {
        const video = videoRef.current
        if (!video) return

        try {
            video.muted = false
            video.volume = 1
            await video.play()
            setError("")
            setPlaying(true)
        } catch {
            setError("Unable to play the video. Please try again.")
        }
    }

    const handleEnded = () => {
        setPlaying(false)
        onComplete()
    }

    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                // Do not allow user-initiated dismissal.
            }}
        >
            <DialogContent
                showCloseButton={false}
                className="overflow-hidden border-0 bg-black p-0 sm:max-w-3xl"
            >
                <DialogTitle className="sr-only">Watch Video</DialogTitle>

                <DialogDescription className="sr-only">
                    Please watch the full video to continue.
                </DialogDescription>

                <div className="relative aspect-video w-full bg-black">
                    <video
                        key={selectedVideo}
                        ref={videoRef}
                        src={selectedVideo}
                        playsInline
                        preload="metadata"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                        controlsList="nodownload nofullscreen noremoteplayback"
                        onEnded={handleEnded}
                        onError={() => setError("Failed to load the video.")}
                        className="h-full w-full object-contain"
                    />

                    {!playing && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60">
                            <label
                                htmlFor="video-selection"
                                className="text-sm font-medium text-white"
                            >
                                Choose a video
                            </label>
                            <select
                                id="video-selection"
                                value={selectedVideo}
                                onChange={(event) => {
                                    setSelectedVideo(event.target.value)
                                    setError("")
                                }}
                                className="w-60 rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-white"
                            >
                                {videoOptions.map((option) => (
                                    <option key={option.src} value={option.src}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <Button
                                size="lg"
                                onClick={handlePlay}
                                className="h-16 rounded-full px-8 text-lg"
                            >
                                <Play className="mr-2 h-6 w-6 fill-current" />
                                Play Video
                            </Button>

                            <div className="flex items-center gap-2 text-sm text-white">
                                <Volume2 className="h-4 w-4" />
                                Sound enabled
                            </div>

                            {error && (
                                <p
                                    role="alert"
                                    className="px-4 text-center text-sm text-red-400"
                                >
                                    {error}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center gap-2 bg-zinc-950 px-4 py-3 text-sm text-zinc-400">
                    <Lock className="h-4 w-4" />
                    Please watch the full video to continue
                </div>
            </DialogContent>
        </Dialog>
    )
}
