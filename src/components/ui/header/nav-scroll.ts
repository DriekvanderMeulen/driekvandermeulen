export function handleNavScroll() {
    console.log('handleNavScroll function called'); // Debugging

    const header = document.querySelector('.navscroll');
    if (!header) {
        console.log('Header element not found'); // Debugging
        return;
    }

    const scrollThreshold = window.innerHeight * 0.1;

    window.addEventListener('scroll', () => {
        console.log('Scroll event triggered'); // Debugging
        console.log('Scroll position:', window.scrollY); // Debugging
        if (window.scrollY > scrollThreshold) {
            console.log('Adding scrolled class'); // Debugging
            header.classList.add('scrolled');
        } else {
            console.log('Removing scrolled class'); // Debugging
            header.classList.remove('scrolled');        }
    });
}