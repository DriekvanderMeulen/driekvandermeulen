"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const [countdown, setCountdown] = useState(3);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            router.push('/');
        }, 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <span className="text-2xl font-inter">Not found, redirecting in {countdown}</span>
        </div>
    );
}