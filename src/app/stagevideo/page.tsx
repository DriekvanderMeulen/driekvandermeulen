"use client"
import { useEffect } from 'react';
import Auth from '@/components/auth/page-auth';

const Page = () => {
    useEffect(() => {
        window.location.href = "https://youtu.be/Dpnqa3WUUeI"
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