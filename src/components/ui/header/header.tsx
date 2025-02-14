'use client'
import { handleNavScroll } from '@/components/ui/header/nav-scroll';
import { useEffect } from 'react';
import Nav from '@/components/ui/header/nav';
import Logo from '@/components/ui/logo';

const Header: React.FC = () => {

    useEffect(() => {
        try {
            handleNavScroll();
        } catch (error) {
            console.error('Error in handleNavScroll:', error);
        }
    }, []);

    return (
        <header className='bg-brand-white-100 z-20 dark:bg-brand-black-900 fixed top-0 left-0 right-0 navscroll'>
            <div className='px-48 flex items-center justify-between'>
                <Logo width={75} height={75} />
                <div className="flex items-center">
                    <Nav />
                </div>
            </div>
            <div className="mx-48 h-0.5 bg-gradient-to-r from-[#0066DB] to-[#18bf74]" />
        </header>
    );
};

export default Header;