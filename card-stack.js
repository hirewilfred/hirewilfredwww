(function () {
    const OPTIONS = {
        cardWidth: 460,
        overlap: 0.48,
        spreadDeg: 48,
        depthPx: 140,
        tiltXDeg: 12,
        activeLiftPx: 22,
        activeScale: 1.03,
        inactiveScale: 0.94,
        maxOffset: 3,
    };

    function signedOffset(i, active, len) {
        const raw = i - active;
        const alt = raw > 0 ? raw - len : raw + len;
        return Math.abs(alt) < Math.abs(raw) ? alt : raw;
    }

    function init(root) {
        const stage = root.querySelector('[data-stack-stage]');
        const cards = Array.from(root.querySelectorAll('[data-stack-card]'));
        const dots = Array.from(root.querySelectorAll('[data-stack-dot]'));
        if (!stage || cards.length === 0) return;

        let active = 0;
        const len = cards.length;

        // Mobile: shrink card-spacing config
        const isSmall = window.matchMedia('(max-width: 768px)').matches;
        const cardWidth = isSmall ? 320 : OPTIONS.cardWidth;
        const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - OPTIONS.overlap)));
        const stepDeg = OPTIONS.maxOffset > 0 ? OPTIONS.spreadDeg / OPTIONS.maxOffset : 0;

        function layout() {
            cards.forEach((card, i) => {
                const off = signedOffset(i, active, len);
                const abs = Math.abs(off);
                const visible = abs <= OPTIONS.maxOffset;

                if (!visible) {
                    card.style.opacity = '0';
                    card.style.pointerEvents = 'none';
                    return;
                }

                const rotateZ = off * stepDeg;
                const x = off * cardSpacing;
                const y = abs * 10;
                const z = -abs * OPTIONS.depthPx;
                const isActive = off === 0;
                const scale = isActive ? OPTIONS.activeScale : OPTIONS.inactiveScale;
                const lift = isActive ? -OPTIONS.activeLiftPx : 0;
                const rotateX = isActive ? 0 : OPTIONS.tiltXDeg;

                card.style.opacity = '1';
                card.style.zIndex = String(100 - abs);
                card.style.pointerEvents = 'auto';
                card.style.transform =
                    'translate(' + x + 'px, ' + (y + lift) + 'px) ' +
                    'rotateX(' + rotateX + 'deg) ' +
                    'rotateZ(' + rotateZ + 'deg) ' +
                    'translateZ(' + z + 'px) ' +
                    'scale(' + scale + ')';
                card.dataset.active = isActive ? 'true' : 'false';
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === active);
            });
        }

        function setActive(i) {
            active = ((i % len) + len) % len;
            layout();
        }

        cards.forEach((card, i) => {
            card.addEventListener('click', () => setActive(i));
        });
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => setActive(i));
        });

        // Keyboard nav
        root.tabIndex = 0;
        root.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft')  { setActive(active - 1); }
            if (e.key === 'ArrowRight') { setActive(active + 1); }
        });

        // Re-layout on resize (in case mobile breakpoint flips)
        let rTimer;
        window.addEventListener('resize', () => {
            clearTimeout(rTimer);
            rTimer = setTimeout(layout, 150);
        });

        layout();
    }

    document.querySelectorAll('[data-card-stack]').forEach(init);
})();
