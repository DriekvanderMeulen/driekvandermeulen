'use client'
import { Menubar } from "radix-ui"
import DarkModeToggle from '@/components/ui/dark-mode-toggle';
import { handleNavScroll } from '@/components/ui/header/nav-scroll';
import { useEffect } from 'react';

const tabs = [
    { label: 'About', subItems: ["This is me", ""] },
    { label: 'Portfolio', subItems: ['Projects', 'Gallery'] },
    { label: 'Lab', subItems: ['Experiments', 'Research'] }
];

const Header: React.FC = () => {
    useEffect(() => {
        handleNavScroll();
    }, []);

    return (
        <div className="border-b-2 dark:border-brand-white-regular border-brand-pureblack md:mx-48 fixed top-0 left-0 bg-brand-white-light dark:bg-brand-pureblack right-0 flex items-center justify-between px-4 py-4 navscroll">
            <div className="overflow-hidden w-fit">
                <span className="inline-block overflow-hidden cursor-pointer transition-all duration-200 text-3xl font-extralight bg-clip-text text-brand-black-regular dark:text-brand-white-regular hover:font-light">
                    Driek.dev
                </span>
            </div>
            <div className="flex items-center">
                <Menubar.Root className="flex items-center p-4 bg-transparent">
                    {tabs.map((tab, index) => (
                        <Menubar.Menu key={index}>
                            <Menubar.Trigger asChild>
                                <button
                                    className="text-brand-black-regular dark:text-brand-white-regular p-2 bg-clip-text transition-all duration-200 focus:outline-none"
                                    onMouseEnter={(e) => e.currentTarget.click()}
                                >
                                    {tab.label}
                                </button>
                            </Menubar.Trigger>
                            {tab.subItems.length > 0 && (
                                <Menubar.Content className="bg-brand-white-light dark:bg-brand-black-regular flex flex-col">
                                    {tab.subItems.map((subItem, subIndex) => (
                                        <Menubar.Item key={subIndex} asChild>
                                            <button
                                                className="text-brand-black-regular transition-all duration-200 dark:text-brand-white-regular p-2 hover:text-brand-black-regular dark:hover:text-brand-white-regular focus:outline-none"
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