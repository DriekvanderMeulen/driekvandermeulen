"use client"
import { useEffect, useState } from "react";
import { initializeDarkMode, toggleDarkMode } from "@/functions/dark-mode";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        console.log("DarkModeToggle mounted");
        initializeDarkMode();
        setIsDarkMode(document.documentElement.classList.contains("dark"));

        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'l' || event.key === 'L') {
                handleToggle();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const handleToggle = () => {
        toggleDarkMode();
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <button onClick={handleToggle} className="p-2 text-brand-black-regular transition-all duration-300 dark:hover:text-brand-blue-regular  hover:text-brand-blue-regular dark:text-brand-white-regular">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
    );
};

export default DarkModeToggle;