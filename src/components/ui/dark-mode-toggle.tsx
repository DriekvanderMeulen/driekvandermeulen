'use client';

import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

// Helper functions for dark mode management
const initializeDarkMode = () => {
    const darkModePreference = localStorage.getItem('darkMode');
    const currentHour = new Date().getHours();
    const isNightTime = currentHour >= 20 || currentHour < 6;

    const shouldBeDark = darkModePreference === 'true' ||
        (!darkModePreference &&
            (isNightTime || window.matchMedia('(prefers-color-scheme: dark)').matches));

    if (shouldBeDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    return shouldBeDark;
};

export { initializeDarkMode };

const toggleDarkMode = () => {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
    return isDarkMode;
};

// Dark Mode Toggle Component
const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Initialize dark mode based on user's preference
        initializeDarkMode();
        setIsDarkMode(document.documentElement.classList.contains('dark'));

        // Keyboard shortcut for toggling dark mode
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === 'l') {
                handleToggle();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    // Toggle dark mode
    const handleToggle = () => {
        const newDarkModeState = toggleDarkMode();
        setIsDarkMode(newDarkModeState);
    };

    return (
        <button
            onClick={handleToggle}
            aria-label="Toggle dark mode"
            className="p-2 text-brand-black-500 dark:text-brand-white-500 "
        >
            <div className='bg-transparent w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300'>
                <div className='w-5 h-5 rounded-full  flex items-center justify-center'>
                    {isDarkMode ? <SunIcon /> : <MoonIcon />}
                </div>
            </div>
        </button>
    );
};

export default DarkModeToggle;