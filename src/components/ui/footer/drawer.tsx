'use client'

import { useState } from 'react'
import { Drawer } from 'vaul'
import { ChevronUpIcon } from '@radix-ui/react-icons'

export default function FooterDrawer() {
    const [showVideo, setShowVideo] = useState(false)

    return (
        <>
            <Drawer.Root onOpenChange={(open) => !open && setShowVideo(false)}>
                <Drawer.Trigger asChild>
                    <button className="absolute bottom-0 left-0 right-0 p-2 flex flex-col items-center justify-center cursor-pointer bg-gradient-to-t from-brand-white-300/50 dark:from-brand-black-900/50 to-transparent h-16 z-30 hover:from-brand-white-300/80 dark:hover:from-brand-black-900/80 transition-all group">
                        <ChevronUpIcon className="w-6 h-6 text-brand-black-1000 dark:text-brand-white-100 group-hover:scale-110 transition-transform" />
                    </button>
                </Drawer.Trigger>

                <Drawer.Portal>
                    <Drawer.Content className="bg-brand-white-200 dark:bg-brand-black-800 fixed bottom-0 left-0 right-0 h-[100vh] rounded-t-[10px] flex flex-col z-[99]">
                        <div className="p-4 text-center bg-brand-white-300 dark:bg-brand-black-900 rounded-t-[10px] flex-1">
                            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700 mb-8" />
                            <div className="max-w-3xl mx-auto">
                                <Drawer.Title className="font-bold mb-4 text-3xl">
                                    You found me!
                                </Drawer.Title>
                                <p>
                                    Congratulations, click on the big button for a special surprise, i
                                    promise its not a virus!
                                </p>
                                <button
                                    onClick={() => setShowVideo(true)}
                                    className="bg-brand-white-200 mt-12 text-[5rem] font-semibold p-12 rounded-3xl dark:bg-brand-black-800 hover:scale-105 transition-transform"
                                >
                                    BIG BUTTON
                                </button>
                                {showVideo && (
                                    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                                        <Drawer.Close
                                            onClick={() => {
                                                setShowVideo(false)
                                            }}
                                            className="absolute top-4 right-4 text-white text-xl p-2 hover:opacity-80"
                                        >
                                            Close
                                        </Drawer.Close>
                                        <iframe
                                            width="1279"
                                            height="720"
                                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                            allow="autoplay"
                                            className="rounded-lg shadow-2xl"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Drawer.Content>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                </Drawer.Portal>
            </Drawer.Root>
        </>
    )
}
