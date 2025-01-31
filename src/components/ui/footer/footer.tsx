"use client"

// import InstagramHovercard from './InstagramHovercard'
// import LinkedInHovercard from './LinkedInHovercard'
// import GitHubHovercard from './GitHubHovercard'
import GridBackground from './GridBackground'
import TimeDisplay from './TimeDisplay'
import EmploymentText from './EmploymentText'
import Link from 'next/link'

export default function Footer() {
    return (
        <div className="min-h-[30vh] relative">
            <div className="absolute top-0 left-0 w-full h-full z-10">
                <GridBackground />
            </div>
            <div className="relative z-20 flex items-center min-h-[30vh]">
                <div className="flex space-x-16 px-8 items-center">
                    <div className="flex flex-col space-y-8">
                        {/* <InstagramHovercard
                            link="https://instagram.com/yourprofile"
                            mockData="Instagram Profile Embed or Mock Data"
                        />
                        <LinkedInHovercard
                            link="https://linkedin.com/in/yourprofile"
                            mockData="LinkedIn Profile Embed or Mock Data"
                        />
                        <GitHubHovercard
                            link="https://github.com/driekvandermeulen"
                            username="driekvandermeulen"
                        /> */}
                    </div>
                    <div className="flex pl-16 flex-col text-xl space-y-4 mt-4">
                        <Link href="/about" className="text-white relative group">
                            <span className="relative">
                                <span className="absolute left-0 w-0 text-brand-green-500 overflow-hidden group-hover:w-full transition-all duration-300 ease-in-out">About</span>
                                <span>About</span>
                            </span>
                        </Link>
                        <Link href="/portfolio" className="text-white relative group">
                            <span className="relative">
                                <span className="absolute left-0 w-0 text-brand-green-500 overflow-hidden group-hover:w-full transition-all duration-300 ease-in-out">Portfolio</span>
                                <span>Portfolio</span>
                            </span>
                        </Link>
                        <Link href="/lab" className="text-white relative group">
                            <span className="relative">
                                <span className="absolute left-0 w-0 text-brand-green-500 overflow-hidden group-hover:w-full transition-all duration-300 ease-in-out">Lab</span>
                                <span>Lab</span>
                            </span>
                        </Link>
                        <Link href="/contact" className="text-white relative group">
                            <span className="relative">
                                <span className="absolute left-0 w-0 text-brand-green-500 overflow-hidden group-hover:w-full transition-all duration-300 ease-in-out">Contact</span>
                                <span>Contact</span>
                            </span>
                        </Link>
                    </div>
                </div>
                <TimeDisplay />
                <EmploymentText />
            </div>
        </div>
    )
}