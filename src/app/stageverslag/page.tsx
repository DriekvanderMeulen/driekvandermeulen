"use client"
import { useEffect } from 'react';
import Auth from '@/components/auth/page-auth';

const Page = () => {
    useEffect(() => {
        window.location.href = "https://www.figma.com/deck/CNqpAKpyzslbS6jF6ZvPnn/Stageverslag-Driek?node-id=12002-315&t=scg8ESfeur90QUUv-1"
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