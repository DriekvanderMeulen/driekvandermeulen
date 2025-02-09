"use client"
import TimeDisplay from './TimeDisplay'
import EmploymentText from './EmploymentText'
import VersionDisplay from './VersionDisplay'
import Link from 'next/link'
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import FooterDrawer from './drawer'
import Breadcrumb from '@/components/ui/Breadcrumb'
export default function Footer() {
    return (
        <div className="h-[30vh] relative bg-brand-white-200 dark:bg-brand-black-800">
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
                </div>
                <div className="flex pl-16 flex-col text-xl justify-center gap-8 h-full">
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
                    <div className="flex flex-col dark:text-brand-white-100 text-brand-black-1000 gap-2">
                        <Breadcrumb />
                    </div>
                </div>
                <div className="absolute text-xl font-bold left-1/2 -translate-x-1/2 top-8 text-brand-black-1000 dark:text-brand-white-100 opacity-10">
                    © {new Date().getFullYear()} Driek van der Meulen
                </div>
                <TimeDisplay />
                <EmploymentText />
                <VersionDisplay />
                <FooterDrawer />
            </div>
        </div>
    )
}