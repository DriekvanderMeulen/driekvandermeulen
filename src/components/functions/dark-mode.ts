"use client"
import { useEffect } from 'react';

export default function DarkModeToggle() {
    console.log('DarkModeToggle component rendered');

    useEffect(() => {
        console.log('useEffect called');
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log('Key pressed:', event.key);
            if (event.key === 'l') {
                event.preventDefault();
                console.log('Toggling dark mode');
                document.body.classList.toggle('dark-mode');
                console.log('Current body classList:', document.body.classList);
            }
        };

        console.log('Adding keydown event listener');
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            console.log('Removing keydown event listener');
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return null;
}