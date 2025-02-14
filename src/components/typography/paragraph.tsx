import React from 'react'
import Link from 'next/link'
import * as HoverCard from '@radix-ui/react-hover-card'

type ParagraphProps = {
    children: React.ReactNode
    ctaText?: string
    ctaLink?: string
    hoverContents?: React.ReactNode[]
}

export default function Paragraph({ children, ctaText, ctaLink, hoverContents = [] }: ParagraphProps): React.ReactElement {
    const highlightedText = (text: string) => {
        const parts = text.split(/(#\w+|@\w+)/g)
        let hoverIndex = 0
        return parts.map((part, index) => {
            if ((part.startsWith('#') || part.startsWith('@')) && hoverIndex < hoverContents.length) {
                const currentHoverContent = hoverContents[hoverIndex]
                hoverIndex++
                return (
                    <HoverCard.Root key={index}>
                        <HoverCard.Trigger asChild>
                            <span className="text-blue-500">{part}</span>
                        </HoverCard.Trigger>
                        <HoverCard.Portal>
                            <HoverCard.Content className="z-50 w-fit rounded-md border border-brand-black-300 bg-brand-white-100 p-4 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 dark:bg-brand-black-800 dark:border-brand-white-300">
                                {currentHoverContent}
                                <HoverCard.Arrow className="fill-brand-white-100" />
                            </HoverCard.Content>
                        </HoverCard.Portal>
                    </HoverCard.Root>
                )
            } else {
                return part
            }
        })
    }

    return (
        <div className="group relative transition-all duration-300 hover:pl-4 hover:border-l-2 border-brand-black-1000 dark:border-brand-white-100">
            <p className='max-w-[75ch] mb-16'>
                {highlightedText(children as string)}
            </p>
            {ctaText && ctaLink ? (
                <div className="absolute top-full mt-2 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <Link href={ctaLink}>
                        <button className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium bg-brand-black-1000 text-brand-white-100 dark:bg-brand-white-100 dark:text-brand-black-1000 hover:opacity-90 transition-opacity hover:bg-brand-black-800 dark:hover:bg-brand-black-700 focus">
                            {ctaText}
                        </button>
                    </Link>
                </div>
            ) : null}
        </div>
    )
}
