'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFoundClient() {
    const [countdown, setCountdown] = useState(3)
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/')
        }, 3000)

        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1)
        }, 1000)

        return () => {
            clearTimeout(timer)
            clearInterval(interval)
        }
    }, [router])

    return (
        <div className="flex h-screen items-center justify-center">
            <span className="font-inter text-2xl">
                Not found, redirecting in {countdown}
            </span>
        </div>
    )
} 