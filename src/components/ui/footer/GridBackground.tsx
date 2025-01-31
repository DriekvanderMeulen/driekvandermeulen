"use client"
import { useEffect, useState } from 'react';

function getRandomColor(isDarkMode: boolean) {
    const blackColors = Object.keys({
        700: '#292929',
        800: '#1c1c1c',
        900: '#0f0f0f',
    });
    const whiteColors = Object.keys({
        200: '#f0f0f0',
        300: '#e5e5e5',
        400: '#d8d8d8',
    });

    const randomBlack = blackColors[Math.floor(Math.random() * blackColors.length)];
    const randomWhite = whiteColors[Math.floor(Math.random() * whiteColors.length)];

    return {
        black: isDarkMode ? `bg-brand-black-${randomBlack}` : `bg-brand-white-${randomWhite}`,
        white: isDarkMode ? `dark:bg-brand-white-${randomWhite}` : `bg-brand-black-${randomBlack}`,
    };
}

function GridBackground() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [colors, setColors] = useState<Array<Array<{ black: string; white: string }>>>(
        Array.from({ length: 36 }, () =>
            Array.from({ length: 4 }, () => getRandomColor(isDarkMode))
        )
    );

    useEffect(() => {
        const handleThemeChange = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        window.addEventListener('storage', handleThemeChange);
        return () => {
            window.removeEventListener('storage', handleThemeChange);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setColors((prevColors) =>
                prevColors.map((gridColors) =>
                    gridColors.map((color) =>
                        Math.random() < 0.5 ? getRandomColor(isDarkMode) : color
                    )
                )
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [isDarkMode]);

    return (
        <div className="grid grid-cols-12 grid-rows-3 bg-brand-black-1000 min-w-full min-h-[30vh] z-10">
            {colors.map((gridColors, index) => (
                <div key={index} className="grid grid-cols-2 grid-rows-2">
                    {gridColors.map((color, subIndex) => (
                        <div key={subIndex} className={`${color.black} ${color.white}`} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default GridBackground; 