import * as HoverCard from '@radix-ui/react-hover-card';
import {
    GitHubLogoIcon,
    InstagramLogoIcon,
    LinkedInLogoIcon,
} from '@radix-ui/react-icons'
import { motion, AnimatePresence } from 'framer-motion'

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
        <div className="relative">
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
            </HoverCard.Root>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2"
                >
                    <HoverCard.Content
                        side="right"
                        align="start"
                        className="absolute w-48 h-48 p-4 bg-white dark:bg-brand-black-800 border border-brand-black-300 dark:border-brand-black-700 rounded shadow-lg"
                    >
                        {mockData}
                    </HoverCard.Content>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default Hovercard