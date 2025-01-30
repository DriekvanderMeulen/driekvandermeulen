import * as HoverCard from '@radix-ui/react-hover-card'
import { InstagramLogoIcon } from '@radix-ui/react-icons'

interface InstagramHovercardProps {
    link: string
    mockData: React.ReactNode
}

const InstagramHovercard = ({ link, mockData }: InstagramHovercardProps) => {
    return (
        <HoverCard.Root>
            <HoverCard.Trigger asChild>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-brand-black dark:text-brand-white hover:opacity-80 transition-opacity h-12 w-12"
                >
                    <InstagramLogoIcon className="w-5 h-5" />
                </a>
            </HoverCard.Trigger>
            <HoverCard.Content
                side="right"
                align="start"
                className="absolute top-[-1.7rem] w-48 h-48 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg"
            >
                {mockData}
            </HoverCard.Content>
        </HoverCard.Root>
    )
}

export default InstagramHovercard 