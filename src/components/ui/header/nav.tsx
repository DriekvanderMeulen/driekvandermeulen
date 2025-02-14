import * as React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { CaretDownIcon } from "@radix-ui/react-icons";
import MatrixBackground from '../matrix/MatrixBackground'
import DarkModeToggle from "../dark-mode-toggle";

const NavigationMenuDemo = () => {
    return (
        <NavigationMenu.Root className="relative z-10 flex w-full justify-end">
            <style jsx global>{`
                @keyframes gradient-rotate {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            `}</style>
            <NavigationMenu.List className="m-0 flex list-none">
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-medium leading-none text-brand-black-1000 dark:text-brand-white-100 outline-none hover:opacity-80 transition-colors focus:shadow-[0_0_0_2px] focus:shadow-brand-green-500">
                        About me{" "}
                        <CaretDownIcon
                            className="relative top-px transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                            aria-hidden
                        />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute right-0 top-0 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto bg-brand-white-200 dark:bg-brand-black-800 rounded-md">
                        <ul className="one m-0 grid list-none gap-x-2.5 p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr] relative z-[1]">
                            <li className="row-span-3 grid">
                                <NavigationMenu.Link href="/about/who-am-i" asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px] focus:shadow-brand-green-500 bg-cover bg-center"
                                        style={{ backgroundImage: "url('/driek.jpg')" }}
                                    >
                                    </a>
                                </NavigationMenu.Link>
                            </li>
                            <ListItem href="/about/who-am-i" title="Who am I?">
                                Who am I, wow that&apos;s a good question.
                            </ListItem>
                            <ListItem href="/about/what-do-i-do" title="What do I do?">
                                What subject keep me busy these days?
                            </ListItem>
                            <ListItem href="/about/get-in-touch" title="Get in touch!">
                                Lets get to know each other.
                            </ListItem>
                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-medium leading-none text-brand-black-1000 dark:text-brand-white-100 outline-none hover:opacity-80 transition-colors focus:shadow-[0_0_0_2px] focus:shadow-brand-green-500">
                        Portfolio{" "}
                        <CaretDownIcon
                            className="relative top-px transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                            aria-hidden
                        />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute right-0 top-0 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto bg-brand-white-200 dark:bg-brand-black-800 rounded-md">
                        <ul className="one m-0 grid list-none gap-x-2.5 p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr] relative z-[1]">
                            <li className="row-span-3 grid">
                                <NavigationMenu.Link href="/portfolio" asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px] focus:shadow-brand-green-500 bg-cover bg-center"
                                        style={{ backgroundImage: "url('/keyboard.jpg')" }}
                                    >
                                    </a>
                                </NavigationMenu.Link>
                            </li>
                            <ListItem href="/portfolio/" title="Portfolio">
                                Here you can find my portfolio.
                            </ListItem>
                            <ListItem href="/portfolio/mario-kart" title="Mario Kart">
                                My latest project, a mario kart office tournament.
                            </ListItem>
                            <ListItem href="/portfolio/lust-for-live" title="Lust for Live">
                                A website for an event company I made at 35®.
                            </ListItem>
                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-medium leading-none text-brand-black-1000 dark:text-brand-white-100 outline-none hover:opacity-80 transition-colors focus:shadow-[0_0_0_2px] focus:shadow-brand-green-500">
                        Lab{" "}
                        <CaretDownIcon
                            className="relative top-px transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                            aria-hidden
                        />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute right-0 top-0 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto bg-brand-white-200 dark:bg-brand-black-800 rounded-md">
                        <ul className="one m-0 grid list-none gap-x-2.5 p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr] relative z-[1]">
                            <li className="row-span-full col-span-full">
                                <NavigationMenu.Link href="/lab" asChild>
                                    <a
                                        className="relative flex h-full w-full select-none flex-col justify-end rounded-md p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px] focus:shadow-brand-green-500 bg-brand-black-900 overflow-hidden"
                                    >
                                        <MatrixBackground charset="01" size={15} fps={30} />
                                        <div className="relative mb-[7px] mt-16 text-xl font-medium text-center leading-[1.2] text-white">
                                            Lab
                                        </div>
                                        <p className="relative text-[14px] leading-[1.3] text-center text-mauve4 mb-16">
                                            Visit the lab to see my latest projects. you can even interact with some of them.
                                        </p>
                                    </a>
                                </NavigationMenu.Link>
                            </li>
                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-medium leading-none text-brand-black-1000 dark:text-brand-white-100 outline-none hover:opacity-80 transition-colors focus:shadow-[0_0_0_2px] focus:shadow-brand-green-500">
                        <DarkModeToggle />
                    </NavigationMenu.Trigger>
                </NavigationMenu.Item>
                <NavigationMenu.Indicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
                    <div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-brand-white-100 dark:bg-brand-black-800" />
                </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div className="perspective-[2000px] absolute right-0 top-full">
                <NavigationMenu.Viewport className="relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] origin-[top_right] overflow-hidden rounded-md bg-brand-white-100 dark:bg-brand-black-800 transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
            </div>
        </NavigationMenu.Root>
    );
};

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
    title: string;
    children: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
    ({ className, children, title, ...props }, forwardedRef) => (
        <li>
            <NavigationMenu.Link asChild>
                <a
                    className={classNames(
                        'block select-none rounded-md p-3 text-[15px] leading-none no-underline outline-none transition-colors group hover:bg-opacity-5 focus:shadow-[0_0_0_2px] focus:shadow-brand-green-500',
                        className
                    )}
                    {...props}
                    ref={forwardedRef}
                >
                    <div className="mb-[5px] font-medium leading-[1.2] text-brand-black-1000 dark:text-brand-white-100 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#0066DB] group-hover:via-[#18bf74] group-hover:to-[#0066DB] group-hover:bg-clip-text group-hover:text-transparent">
                        {title}
                    </div>
                    <p className="leading-[1.4] text-brand-black-100 dark:text-brand-white-300">{children}</p>
                </a>
            </NavigationMenu.Link>
        </li>
    ),
);
ListItem.displayName = 'ListItem';

export default NavigationMenuDemo;
