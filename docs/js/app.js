let startY;
let scrollTop;

const setupActionPage = () => {
    window.addEventListener('wheel', (event) => {
        event.preventDefault();
        const scrollAmount = window.innerHeight;
        window.scrollBy({
            top: event.deltaY > 0 ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    });

    window.addEventListener('touchstart', (event) => {
        startY = event.touches[0].pageY;
        scrollTop = window.scrollY;
    });

    window.addEventListener('touchmove', (event) => {
        const y = event.touches[0].pageY;
        const walk = y - startY;
        if (Math.abs(walk) > 50) { // Adjust the threshold as needed
            const scrollAmount = window.innerHeight;
            window.scrollBy({
                top: walk < 0 ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
            startY = y; // Reset startY to avoid multiple scrolls
        }
    });
}

(function () {
    document.addEventListener('DOMContentLoaded', setupActionPage, false);
})();

const clearCacheWorker = () => {
    caches.delete('lyrics-cache');
    alert("Cleared cached data!!!");
}