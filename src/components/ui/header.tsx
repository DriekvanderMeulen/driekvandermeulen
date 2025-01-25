"use client"
import * as Menubar from '@radix-ui/react-menubar';
import DarkModeToggle from '@/components/ui/dark-mode-toggle';

const tabs = [
    { label: 'About', subItems: ["This is me", "get in touch"] },
    { label: 'Portfolio', subItems: ['Projects', 'Gallery'] },
    { label: 'Lab', subItems: ['Experiments', 'Research'] }
];

const Header = () => {
    return (
        <div className="px-4 md:px-48 fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-transparent">
            <div className="overflow-hidden w-fit">
                < span className="inline-block overflow-hidden text-brand-black-regular text-3xl font-extralight dark:text-brand-white-regular animate-typing transition-all duration-300" >
                    Driek.dev
                </span >
            </div >
            <div className="flex items-center">
                <Menubar.Root className="flex items-center p-4 bg-transparent">
                    {tabs.map((tab, index) => (
                        <Menubar.Menu key={index}>
                            <Menubar.Trigger asChild>
                                <button
                                    className="text-brand-black-regular dark:text-brand-white-regular p-2 hover:text-brand-blue-regular dark:hover:text-brand-blue-regular focus:outline-none transition-all duration-300"
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
                                                className="text-brand-black-regular dark:text-brand-white-regular p-2 hover:text-brand-black-regular dark:hover:text-brand-white-regular focus:outline-none transition-all duration-300"
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
        </div >
    );
};

export default Header;