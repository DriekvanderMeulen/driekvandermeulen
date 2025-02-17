"use client"
import TimeDisplay from './TimeDisplay'
import EmploymentText from './EmploymentText'
import VersionDisplay from './VersionDisplay'
import Link from 'next/link'
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import FooterDrawer from './drawer'
export default function Footer() {
    return (
        <div className="h-[30vh] mt-32 z-50 relative bg-brand-white-200 dark:bg-brand-black-800">
            <div className="flex h-full flex-row p-8 w-full relative">
                <div className="flex flex-col min-h-full justify-between">
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
                    <Link
                        href="mailto:hello@driek.dev"
                        target="_blank"
                        className="text-brand-black-1000 dark:text-brand-white-100 hover:opacity-80 transition-colors"
                    >
                        <EnvelopeClosedIcon className="w-6 h-6" />
                    </Link>
                </div>
                <div className="flex pl-16 flex-col text-xl justify-center gap-8 h-full">
                    <Link href="/" className="dark:text-brand-white-100 text-brand-black-1000 relative group">
                        <span className="relative">
                            <span className="absolute left-0 w-0 hover:opacity-80 overflow-hidden group-hover:w-full transition-all duration-300 ease-in-out">Home</span>
                            <span>Home</span>
                        </span>
                    </Link>
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
                </div>
                <TimeDisplay />
                <EmploymentText />
                <FooterDrawer />
                <VersionDisplay />
            </div>
        </div>
    )
}