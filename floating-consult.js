(function () {
    const root = document.querySelector('[data-fcb]');
    if (!root) return;

    const btn = root.querySelector('.fcb-btn');
    const popup = root.querySelector('.fcb-popup');
    const backdrop = root.querySelector('.fcb-backdrop');
    const closeBtn = root.querySelector('.fcb-close');

    const openPopup = () => {
        popup.classList.add('open');
        backdrop.classList.add('open');
    };
    const closePopup = () => {
        popup.classList.remove('open');
        backdrop.classList.remove('open');
    };
    const togglePopup = () => {
        if (popup.classList.contains('open')) closePopup();
        else openPopup();
    };

    const bookLink = root.querySelector('[data-fcb-book]');

    btn.addEventListener('click', togglePopup);
    backdrop.addEventListener('click', closePopup);
    closeBtn.addEventListener('click', closePopup);
    if (bookLink) bookLink.addEventListener('click', closePopup);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    });
})();
