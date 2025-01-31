"use client"
import * as HoverCard from '@radix-ui/react-hover-card'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import GitHubCalendar from 'react-ts-github-calendar'
import { useState, useRef, useEffect } from 'react'

interface GitHubHovercardProps {
    link: string
    username: string
}

export function GitHubHovercard({ link, username }: GitHubHovercardProps) {
    const [isOpen, setIsOpen] = useState(false)
    const calendarRef = useRef<HTMLDivElement>(null)
    const [calendarData, setCalendarData] = useState<Array<HTMLElement>>([])

    useEffect(() => {
        if (calendarRef.current) {
            const cells = Array.from(calendarRef.current.querySelectorAll('td[data-level]'))
            const lastYearCells = cells.slice(-364)
            setCalendarData(lastYearCells as Array<HTMLElement>)
        }
    }, [isOpen])

    return (
        <HoverCard.Root openDelay={0} closeDelay={0}>
            <HoverCard.Trigger asChild>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    className="flex items-center justify-center text-brand-black dark:text-brand-white hover:opacity-80 transition-opacity h-12 w-12"
                >
                    <GitHubLogoIcon className="w-5 h-5" />
                </a>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content
                    side="right"
                    align="center"
                    sideOffset={8}
                    className="w-fit data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2 z-50 rounded-md bg-white dark:bg-brand-black-800 border border-brand-black-300 dark:border-brand-black-700 shadow-md"
                >
                    <div className="flex flex-col items-center p-3">
                        <div className="hidden" ref={calendarRef}>
                            <GitHubCalendar
                                userName={username}
                                global_stats={false}
                                tooltips={false}
                                cache={60 * 60 * 24}
                            />
                        </div>
                        <div className="grid grid-cols-[repeat(52,1fr)] grid-rows-7 gap-[2px]">
                            {calendarData.map((cell, index) => (
                                <div
                                    key={index}
                                    data-level={cell.getAttribute('data-level')}
                                    className="w-2 h-2 rounded-sm transition-all hover:scale-110 border border-brand-black-300 dark:border-brand-black-700
                                        data-[level='0']:bg-brand-black-100 
                                        data-[level='1']:bg-green-200 
                                        data-[level='2']:bg-green-300 
                                        data-[level='3']:bg-green-400 
                                        data-[level='4']:bg-green-500
                                        dark:data-[level='0']:bg-brand-black-800
                                        dark:data-[level='1']:bg-green-900
                                        dark:data-[level='2']:bg-green-800
                                        dark:data-[level='3']:bg-green-700
                                        dark:data-[level='4']:bg-green-600"
                                />
                            ))}
                        </div>
                    </div>
                    <HoverCard.Arrow className="fill-white dark:fill-brand-black-800" />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    )
}

export default GitHubHovercard 