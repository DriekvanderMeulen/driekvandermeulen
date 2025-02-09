'use client'
import DarkModeToggle from '@/components/ui/dark-mode-toggle';
import { handleNavScroll } from '@/components/ui/header/nav-scroll';
import { useEffect } from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Nav from '@/components/ui/header/nav';

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
                <Breadcrumb />
                <div className="flex items-center">
                    <Nav />
                    <DarkModeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;