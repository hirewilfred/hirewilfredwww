(function () {
    document.querySelectorAll('[data-bento]').forEach((root) => {
        const tabs = Array.from(root.querySelectorAll('[data-bento-tab]'));
        const panels = Array.from(root.querySelectorAll('[data-bento-panel]'));
        const headerH = root.querySelector('[data-bento-h]');
        const headerP = root.querySelector('[data-bento-p]');
        if (tabs.length === 0) return;

        const setActive = (id) => {
            tabs.forEach((t) => t.dataset.active = (t.dataset.bentoTab === id) ? 'true' : 'false');
            panels.forEach((p) => p.classList.toggle('active', p.dataset.bentoPanel === id));
            const tab = tabs.find((t) => t.dataset.bentoTab === id);
            if (tab && headerH && headerP) {
                headerH.textContent = tab.dataset.header || '';
                headerP.textContent = tab.dataset.desc || '';
            }
        };

        tabs.forEach((t) => t.addEventListener('click', () => setActive(t.dataset.bentoTab)));

        const initial = tabs.find((t) => t.dataset.active === 'true') || tabs[0];
        setActive(initial.dataset.bentoTab);
    });
})();
