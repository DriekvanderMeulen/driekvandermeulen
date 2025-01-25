'use client';

import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

// Helper functions for dark mode management
const initializeDarkMode = () => {
    const darkModePreference = localStorage.getItem('darkMode');
    if (
        darkModePreference === 'true' ||
        (!darkModePreference && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

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
            className="p-2 text-brand-black-regular hover:text-brand-blue-regular dark:text-brand-white-regular dark:hover:text-brand-blue-regular"
        >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
    );
};

export default DarkModeToggle;