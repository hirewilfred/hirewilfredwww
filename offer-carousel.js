(function () {
    document.querySelectorAll('[data-carousel]').forEach((carousel) => {
        const track = carousel.querySelector('[data-track]');
        if (!track) return;
        carousel.querySelectorAll('[data-scroll]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const direction = btn.dataset.scroll === 'left' ? -1 : 1;
                const amount = track.clientWidth * 0.8 * direction;
                track.scrollBy({ left: amount, behavior: 'smooth' });
            });
        });
    });
})();
