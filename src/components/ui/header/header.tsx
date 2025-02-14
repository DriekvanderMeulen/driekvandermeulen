'use client'
import { handleNavScroll } from '@/components/ui/header/nav-scroll';
import { useEffect } from 'react';
import Nav from '@/components/ui/header/nav';
import Image from 'next/image';
const Header: React.FC = () => {

    useEffect(() => {
        try {
            handleNavScroll();
        } catch (error) {
            console.error('Error in handleNavScroll:', error);
        }
    }, []);

    return (
        <header className='bg-brand-white-100 dark:bg-brand-black-900 fixed top-0 left-0 right-0 navscroll'>
            <div className='px-48 py-4 flex items-center justify-between'>
                <Image src='/logo.svg' alt='Driek van der Meulen' width={75} height={75} />
                <div className="flex items-center">
                    <Nav />
                </div>
            </div>
            <div className="mx-48 border-b-2 border-brand-black dark:border-brand-white-100" />
        </header>
    );
};

export default Header;