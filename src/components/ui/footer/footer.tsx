"use client"
import TimeDisplay from './TimeDisplay'
import EmploymentText from './EmploymentText'
import VersionDisplay from './VersionDisplay'
import Link from 'next/link'
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { Drawer } from 'vaul'
import { ChevronUpIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export default function Footer() {
    const [showVideo, setShowVideo] = useState(false)

    return (
        <Drawer.Root onOpenChange={(open) => !open && setShowVideo(false)}>
            <div className="h-[30vh] relative bg-brand-white-200 dark:bg-brand-black-800">
                {/* <div className="absolute top-0 left-0 w-full h-full z-10">
                    <GridBackground />
                </div> */}
                <div className="relative z-20 flex p-8 h-[calc(30vh-4rem)] overflow-hidden">
                    <div className="flex w-full">
                        <div className="flex flex-col justify-between">
                            <Link
                                href="https://instagram.com/driekvandermeulen"
                                target="_blank"
                                className="text-brand-black-1000 dark:text-brand-white-100 hover:opacity-80 transition-colors"
                            >
                                <InstagramLogoIcon className="w-6 h-6" />
                            </Link>
                            <Link
                                href="https://linkedin.com/in/driekvandermeulen"
                                target="_blank"
                                className="text-brand-black-1000 dark:text-brand-white-100 hover:opacity-80 transition-colors"
                            >
                                <LinkedInLogoIcon className="w-6 h-6" />
                            </Link>
                            <Link
                                href="https://github.com/driekvandermeulen"
                                target="_blank"
                                className="text-brand-black-1000 dark:text-brand-white-100 hover:opacity-80 transition-colors"
                            >
                                <GitHubLogoIcon className="w-6 h-6" />
                            </Link>
                        </div>
                        <div className="flex pl-16 flex-col text-xl justify-between">
                            <Link href="/about" className="dark:text-brand-white-100 text-brand-black-1000 relative group">
                                <span className="relative">
                                    <span className="absolute left-0 w-0 hover:opacity-80 overflow-hidden group-hover:w-full transition-all duration-300 ease-in-out">About</span>
                                    <span>About</span>
                                </span>
                            </Link>
                            <Link href="/portfolio" className="dark:text-brand-white-100 text-brand-black-1000 relative group">
                                <span className="relative">
                                    <span className="absolute left-0 w-0 hover:opacity-80 overflow-hidden group-hover:w-full transition-all duration-300 ease-in-out">Portfolio</span>
                                    <span>Portfolio</span>
                                </span>
                            </Link>
                            <Link href="/lab" className="dark:text-brand-white-100 text-brand-black-1000 relative group">
                                <span className="relative">
                                    <span className="absolute left-0 w-0 hover:opacity-80 overflow-hidden group-hover:w-full transition-all duration-300 ease-in-out">Lab</span>
                                    <span>Lab</span>
                                </span>
                            </Link>
                            <Link href="/products" className="dark:text-brand-white-100 text-brand-black-1000 relative group">
                                <span className="relative">
                                    <span className="absolute left-0 w-0 hover:opacity-80 overflow-hidden group-hover:w-full transition-all duration-300 ease-in-out">Products</span>
                                    <span>Products</span>
                                </span>
                            </Link>
                            <Link href="/contact" className="dark:text-brand-white-100 text-brand-black-1000 relative group">
                                <span className="relative">
                                    <span className="absolute left-0 w-0 hover:opacity-80 overflow-hidden group-hover:w-full transition-all duration-300 ease-in-out">Contact</span>
                                    <span>Contact</span>
                                </span>
                            </Link>
                        </div>
                        <TimeDisplay />
                        <EmploymentText />
                        <VersionDisplay />
                    </div>
                </div>
                <Drawer.Trigger asChild>
                    <button className="absolute bottom-0 left-0 right-0 p-2 flex flex-col items-center justify-center cursor-pointer bg-gradient-to-t from-brand-white-300/50 dark:from-brand-black-900/50 to-transparent h-16 z-30 hover:from-brand-white-300/80 dark:hover:from-brand-black-900/80 transition-all group">
                        <ChevronUpIcon className="w-6 h-6 text-brand-black-1000 dark:text-brand-white-100 group-hover:scale-110 transition-transform" />
                    </button>
                </Drawer.Trigger>
            </div>
            <Drawer.Portal>
                <Drawer.Content className="bg-brand-white-200 dark:bg-brand-black-800 fixed bottom-0 left-0 right-0 h-[100vh] rounded-t-[10px] flex flex-col z-40">
                    <div className="p-4 text-center bg-brand-white-300 dark:bg-brand-black-900 rounded-t-[10px] flex-1">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700 mb-8" />
                        <div className="max-w-3xl mx-auto">
                            <Drawer.Title className="font-bold mb-4 text-3xl">You found me!</Drawer.Title>
                            <p>Congratulations, click on the big button for a special surprise, i promise its not a virus!</p>
                            <button
                                onClick={() => setShowVideo(true)}
                                className='bg-brand-white-200 mt-12 text-[5rem] font-semibold p-12 rounded-3xl dark:bg-brand-black-800 hover:scale-105 transition-transform'
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
    )
}