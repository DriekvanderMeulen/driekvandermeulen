"use client"
import * as HoverCard from '@radix-ui/react-hover-card'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { useEffect, useRef } from 'react'
import GitHubCalendar from 'github-calendar'
import 'github-calendar/dist/github-calendar.css'

interface GitHubHovercardProps {
    link: string
    username: string
}

const GitHubHovercard = ({ link, username }: GitHubHovercardProps) => {
    const calendarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!calendarRef.current) return

        console.log(`Fetching GitHub calendar for user: ${username}`)

        // Initialize calendar with proper options
        GitHubCalendar(calendarRef.current, username, {
            responsive: true,
            tooltips: true,
            global_stats: false, // Disable global stats to save space
        })
            .then(() => console.log('Calendar loaded successfully'))
            .catch((error: Error) => console.error('Failed to load calendar:', error))
    }, [username])

    return (
        <HoverCard.Root>
            <HoverCard.Trigger asChild>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-brand-black dark:text-brand-white hover:opacity-80 transition-opacity h-12 w-12"
                >
                    <GitHubLogoIcon className="w-5 h-5" />
                </a>
            </HoverCard.Trigger>
            <HoverCard.Content
                side="right"
                align="start"
                className="absolute top-[-10rem] w-[480px] p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg"
            >
                <div ref={calendarRef}>
                    Loading the data just for you.
                </div>
            </HoverCard.Content>
        </HoverCard.Root>
    )
}

export default GitHubHovercard 