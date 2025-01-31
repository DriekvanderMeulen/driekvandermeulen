"use client"

export function handleNavScroll() {
    try {
        console.log('handleNavScroll function called');

        if (typeof window === 'undefined') {
            console.log('Window is undefined - likely server-side');
            return;
        }

        if (typeof document === 'undefined') {
            console.log('Document is undefined - likely server-side');
            return;
        }

        const header = document.querySelector('.navscroll');
        if (!header) {
            console.log('Header element not found');
            return;
        }

        const scrollThreshold = window.innerHeight * 0.1;
        console.log('Scroll threshold set to:', scrollThreshold);

        const handleScroll = () => {
            const scrollY = window.scrollY;
            console.log('Scroll position:', scrollY);
            if (scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        console.log('Scroll event listener added');

        // Clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
            console.log('Scroll event listener removed');
        };
    } catch (error) {
        console.error('Error in handleNavScroll:', error);
    }
}