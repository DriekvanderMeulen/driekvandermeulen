import * as HoverCard from '@radix-ui/react-hover-card';
import {
    GitHubLogoIcon,
    InstagramLogoIcon,
    LinkedInLogoIcon,
} from '@radix-ui/react-icons'

type SocialPlatform = 'Instagram' | 'LinkedIn' | 'GitHub'

interface HovercardProps {
    platform: SocialPlatform
    link: string
    mockData: React.ReactNode
}

const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
        case 'Instagram':
            return <InstagramLogoIcon className="w-5 h-5" />
        case 'LinkedIn':
            return <LinkedInLogoIcon className="w-5 h-5" />
        case 'GitHub':
            return <GitHubLogoIcon className="w-5 h-5" />
    }
}

const Hovercard = ({ platform, link, mockData }: HovercardProps) => {
    return (
        <HoverCard.Root>
            <HoverCard.Trigger asChild>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-brand-black dark:text-brand-white hover:opacity-80 transition-opacity h-12 w-12"
                >
                    {getPlatformIcon(platform)}
                </a>
            </HoverCard.Trigger>
            <HoverCard.Content
                side="right"
                align="start"
                className="absolute w-48 h-48 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg"
            >
                {mockData}
            </HoverCard.Content>
        </HoverCard.Root>
    )
}

export default Hovercard