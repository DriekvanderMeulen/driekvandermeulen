'use client'
import { Menubar } from "radix-ui"
import DarkModeToggle from '@/components/ui/dark-mode-toggle';
import { handleNavScroll } from '@/components/ui/header/nav-scroll';
import { useEffect } from 'react';
import Link from "next/link";

const tabs = [
    { label: 'About', subItems: ["This is me", ""] },
    { label: 'Portfolio', subItems: ['Projects', 'Gallery'] },
    { label: 'Lab', subItems: ['Experiments', 'Research'] },
    { label: 'Contact', subItems: ['Mail', 'LinkedIn'] }
];

const Header: React.FC = () => {
    console.log('Header component rendering');

    useEffect(() => {
        try {
            handleNavScroll();
        } catch (error) {
            console.error('Error in handleNavScroll:', error);
        }
    }, []);

    return (
        <div className="bg-brand-white-100 dark:bg-brand-black-900 px-48 fixed top-0 left-0 right-0 flex items-center justify-between py-4 navscroll">
            <Link href="/">
                <div className="flex items-center">
                    <span className="dark:text-white text-black text-2xl transition-all duration-300 transform hover:scale-110 hover:text-3xl hover:text-transparent hover:bg-clip-text hover:bg-gradient-custom font-light dark:hover:text-transparent dark:hover:bg-clip-text dark:hover:bg-gradient-custom">Driek.dev</span>
                </div>
            </Link>
            <div className="flex items-center">
                <Menubar.Root className="flex items-center p-4 bg-transparent">
                    {tabs.map((tab, index) => (
                        <Menubar.Menu key={index}>
                            <Menubar.Trigger asChild>
                                <button
                                    className="text-brand-black-1000 dark:text-brand-white-100 p-2 relative group focus:outline-none transition-all duration-300 hover:text-transparent dark:hover:text-transparent hover:bg-clip-text hover:bg-gradient-custom dark:hover:bg-clip-text dark:hover:bg-gradient-custom"
                                    onMouseEnter={(e) => e.currentTarget.click()}
                                >
                                    <span>{tab.label}</span>
                                </button>
                            </Menubar.Trigger>
                            {tab.subItems.length > 0 && (
                                <Menubar.Content className="bg-brand-white-100 dark:bg-brand-black-900 flex flex-col">
                                    <div className="flex flex-row rounded-md bg-brand-black-800">
                                        <div className="w-1/2 h-1/2 bg-brand-green-900"></div>
                                    </div>
                                    <div>
                                        {tab.subItems.map((subItem, subIndex) => (
                                            <Menubar.Item key={subIndex} className="p-2 hover:bg-brand-black-800 dark:hover:bg-brand-white-200">
                                                {subItem}
                                            </Menubar.Item>
                                        ))}
                                    </div>
                                </Menubar.Content>
                            )}
                        </Menubar.Menu>
                    ))}
                </Menubar.Root>
                <DarkModeToggle />
            </div>
        </div >
    );
};

export default Header;