document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation initial states
    const animateElements = document.querySelectorAll('.skill-card, .stat-card, .pricing-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // ROI Calculator
    const calcRole = document.getElementById('calc-role');
    const calcCount = document.getElementById('calc-count');
    const calcProv = document.getElementById('calc-prov');
    const calcHuman = document.getElementById('calc-human');
    const calcAi = document.getElementById('calc-ai');
    const calcSavings = document.getElementById('calc-savings');
    const calcPct = document.getElementById('calc-pct');

    const fmt = n => '$' + Math.round(n).toLocaleString('en-CA');

    const updateCalc = () => {
        if (!calcRole) return;
        const opt = calcRole.options[calcRole.selectedIndex];
        const baseHuman = parseFloat(opt.dataset.human);
        const ai = parseFloat(opt.dataset.ai);
        const seats = Math.max(1, parseInt(calcCount.value, 10) || 1);
        const provMult = parseFloat(calcProv.value) || 1;
        const human = baseHuman * provMult * seats;
        const aiTotal = ai * seats;
        const savings = human - aiTotal;
        const pct = Math.round((savings / human) * 100);
        calcHuman.textContent = fmt(human);
        calcAi.textContent = fmt(aiTotal);
        calcSavings.textContent = fmt(savings);
        calcPct.textContent = pct + '% reduction';
    };

    [calcRole, calcCount, calcProv].forEach(el => el && el.addEventListener('input', updateCalc));
    updateCalc();

    // Mascot interactive glow
    const heroImage = document.querySelector('.hero-image');
    const glowOrb = document.querySelector('.glow-orb');
    
    if (heroImage && glowOrb) {
        heroImage.addEventListener('mousemove', (e) => {
            const rect = heroImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glowOrb.style.transform = `translate(calc(-50% + ${(x - rect.width/2) * 0.1}px), calc(-50% + ${(y - rect.height/2) * 0.1}px))`;
        });
        
        heroImage.addEventListener('mouseleave', () => {
            glowOrb.style.transform = 'translate(-50%, -50%)';
        });
    }
});
