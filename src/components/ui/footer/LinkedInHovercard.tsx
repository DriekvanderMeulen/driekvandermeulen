"use client"
import * as HoverCard from '@radix-ui/react-hover-card'
import { LinkedInLogoIcon } from '@radix-ui/react-icons'

interface LinkedInHovercardProps {
    link: string
    mockData: React.ReactNode // Explicitly define the type for mockData
}

const LinkedInHovercard = ({ link }: LinkedInHovercardProps) => {
    return (
        <HoverCard.Root openDelay={0} closeDelay={0}>
            <HoverCard.Trigger asChild>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-brand-black dark:text-brand-white hover:opacity-80 transition-opacity h-12 w-12"
                >
                    <LinkedInLogoIcon className="w-5 h-5" />
                </a>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content
                    side="right"
                    align="start"
                    sideOffset={5}
                    className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 absolute top-[-5.5rem] w-48 h-48 p-4 bg-white dark:bg-brand-black-800 border border-brand-black-300 dark:border-brand-black-700 rounded shadow-lg"
                >
                    <div className="flex flex-col items-center gap-2 p-2">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            Connect with me on LinkedIn
                        </span>
                    </div>
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    )
}

export default LinkedInHovercard 