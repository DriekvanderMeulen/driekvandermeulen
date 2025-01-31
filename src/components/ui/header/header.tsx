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
        console.log('Header useEffect - about to call handleNavScroll');
        try {
            handleNavScroll();
            console.log('handleNavScroll called successfully');
        } catch (error) {
            console.error('Error in handleNavScroll:', error);
        }
    }, []);

    return (
        <div className="border-b-2 dark:border-brand-white-100 border-brand-black-1000 md:mx-48 fixed top-0 left-0 bg-brand-white-100 dark:bg-brand-black-900 right-0 flex items-center justify-between px-4 py-4 navscroll">
            <div className="overflow-hidden w-fit">
                <span className="inline-block overflow-hidden cursor-pointer transition-all duration-200 text-3xl font-extralight">
                    <Link href="/" className="relative group">
                        <span className="relative">
                            <span className="absolute left-0 w-0 text-brand-green-500 overflow-hidden group-hover:w-full transition-all duration-300 ease-in-out">
                                Driek.dev
                            </span>
                            <span className="text-brand-black-1000 dark:text-brand-white-100">
                                Driek.dev
                            </span>
                        </span>
                    </Link>
                </span>
            </div>
            <div className="flex items-center">
                <Menubar.Root className="flex items-center p-4 bg-transparent">
                    {tabs.map((tab, index) => (
                        <Menubar.Menu key={index}>
                            <Menubar.Trigger asChild>
                                <button
                                    className="text-brand-black-1000 dark:text-brand-white-100 p-2 relative group focus:outline-none"
                                    onMouseEnter={(e) => e.currentTarget.click()}
                                >
                                    <span className="relative">
                                        <span className={`absolute left-0 w-0 overflow-hidden group-hover:w-full transition-all duration-300 ease-in-out ${tab.label === 'Lab' ? 'text-brand-green-500' : 'text-brand-green-500'
                                            }`}>
                                            {tab.label}
                                        </span>
                                        <span>{tab.label}</span>
                                    </span>
                                </button>
                            </Menubar.Trigger>
                            {tab.subItems.length > 0 && (
                                <Menubar.Content className="bg-brand-white-100 dark:bg-brand-black-900 flex flex-col">
                                    {tab.subItems.map((subItem, subIndex) => (
                                        <Menubar.Item key={subIndex} asChild>
                                            <button
                                                className="text-brand-black-1000 transition-all duration-200 dark:text-brand-white-100 p-2 hover:text-brand-black-1000 dark:hover:text-brand-white-100 focus:outline-none"
                                            >
                                                {subItem}
                                            </button>
                                        </Menubar.Item>
                                    ))}
                                </Menubar.Content>
                            )}
                        </Menubar.Menu>
                    ))}
                </Menubar.Root>
                <DarkModeToggle />
            </div>
        </div>
    );
};

export default Header;