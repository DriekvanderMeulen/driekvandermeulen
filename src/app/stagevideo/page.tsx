"use client"
import { useEffect } from 'react';
import Auth from '@/components/auth/page-auth';
import { env } from '@/env.mjs'

const Page = () => {
    useEffect(() => {
        window.location.href = env.VIDEO_LINK
    }, []);

    return null;
};

export default function AuthenticatedPage() {
    return (
        <Auth>
            <Page />
        </Auth>
    );
}