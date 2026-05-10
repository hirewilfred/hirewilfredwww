(function () {
    const reveals = document.querySelectorAll('[data-reveal]');
    if (reveals.length === 0) return;

    if (!('IntersectionObserver' in window)) {
        reveals.forEach((el) => el.classList.add('in-view'));
        return;
    }

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    reveals.forEach((el) => io.observe(el));
})();
