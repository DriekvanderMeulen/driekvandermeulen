"use client"
import * as Menubar from '@radix-ui/react-menubar';
import DarkModeToggle from '@/components/ui/dark-mode-toggle';
import useNavScroll from './nav-scroll';

const tabs = [
    { label: 'About', subItems: ["This is me", "get in touch"] },
    { label: 'Portfolio', subItems: ['Projects', 'Gallery'] },
    { label: 'Lab', subItems: ['Experiments', 'Research'] }
];

const Header = () => {
    useNavScroll();
    return (
        <div className="border-b-2 md:mx-48 fixed top-0 left-0 bg-brand-white-light dark:bg-brand-pureblack right-0 flex items-center justify-between px-4 py-4 navscroll">
            <div className="overflow-hidden w-fit">
                <span className="inline-block overflow-hidden cursor-pointer text-3xl font-extralight transition-all bg-clip-text text-brand-black-regular dark:text-brand-white-regular dark:hover:text-transparent hover:text-transparent bg-flare animate-gradient-x hover:font-light">
                    Driek.dev
                </span>
            </div>
            <div className="flex items-center">
                <Menubar.Root className="flex items-center p-4 bg-transparent">
                    {tabs.map((tab, index) => (
                        <Menubar.Menu key={index}>
                            <Menubar.Trigger asChild>
                                <button
                                    className="text-brand-black-regular dark:text-brand-white-regular p-2 dark:hover:text-transparent hover:text-transparent bg-flare bg-clip-text focus:outline-none"
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
                                                className="text-brand-black-regular dark:text-brand-white-regular p-2 hover:text-brand-black-regular dark:hover:text-brand-white-regular focus:outline-none  "
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