import * as HoverCard from '@radix-ui/react-hover-card'
import { LinkedInLogoIcon } from '@radix-ui/react-icons'

interface LinkedInHovercardProps {
    link: string
    mockData: React.ReactNode // Explicitly define the type for mockData
}

const LinkedInHovercard = ({ link, mockData }: LinkedInHovercardProps) => {
    return (
        <HoverCard.Root>
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
            <HoverCard.Content
                side="right"
                align="start"
                className="absolute top-[-5.5rem] w-48 h-48 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg"
            >
                {mockData}
            </HoverCard.Content>
        </HoverCard.Root>
    )
}

export default LinkedInHovercard 