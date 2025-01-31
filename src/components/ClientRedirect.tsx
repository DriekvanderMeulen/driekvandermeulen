'use client'

import { useEffect } from 'react'

interface ClientRedirectProps {
    url: string
}

export default function ClientRedirect({ url }: ClientRedirectProps) {
    useEffect(() => {
        window.location.href = url
    }, [url])

    return null
} 