/* ============================================
   SIMPLI — Main JavaScript
   Shared components: Nav, Footer, Language, Animations
   ============================================ */

// ====== TRANSLATIONS (nav & footer) ======
const i18n = {
    nav: {
        home:      { es: 'Inicio',    en: 'Home' },
        apps:      { es: 'Apps',      en: 'Apps' },
        manifesto: { es: 'Manifiesto', en: 'Manifesto' },
        contact:   { es: 'Contacto',  en: 'Contact' },
    },
    footer: {
        tagline:    { es: 'Simpli Apps for a Simpli Life', en: 'Simpli Apps for a Simpli Life' },
        pages:      { es: 'Paginas',   en: 'Pages' },
        legal:      { es: 'Legal',     en: 'Legal' },
        privacy:    { es: 'Privacidad', en: 'Privacy' },
        terms:      { es: 'Terminos',  en: 'Terms' },
        copyright:  { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
        madeWith:   { es: 'Hecho con ♥ para simplificar tu vida', en: 'Made with ♥ to simplify your life' },
    }
};

let currentLang = 'es';

// ====== DETECT CURRENT PAGE ======
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('apps')) return 'apps';
    if (path.includes('manifiesto')) return 'manifesto';
    if (path.includes('contacto')) return 'contact';
    return 'home';
}

// ====== RENDER NAV ======
function renderNav() {
    const currentPage = getCurrentPage();
    const navEl = document.createElement('nav');
    navEl.id = 'navbar';

    // Check if page wants dark nav
    if (document.body.dataset.navDark === 'true') {
        navEl.classList.add('nav-dark');
    }

    navEl.innerHTML = `
        <a href="index.html" class="nav-logo">Simpli<span class="dot"></span></a>
        <ul class="nav-links" id="navLinks">
            <li><a href="index.html" data-i18n="nav.home" class="${currentPage === 'home' ? 'active' : ''}"></a></li>
            <li><a href="apps.html" data-i18n="nav.apps" class="${currentPage === 'apps' ? 'active' : ''}"></a></li>
            <li><a href="manifiesto.html" data-i18n="nav.manifesto" class="${currentPage === 'manifesto' ? 'active' : ''}"></a></li>
            <li><a href="contacto.html" data-i18n="nav.contact" class="${currentPage === 'contact' ? 'active' : ''}"></a></li>
            <li>
                <div class="lang-toggle">
                    <button class="lang-btn active" data-lang="es" onclick="setLang('es')">ES</button>
                    <button class="lang-btn" data-lang="en" onclick="setLang('en')">EN</button>
                </div>
            </li>
        </ul>
        <button class="mobile-menu-btn" id="mobileMenuBtn" onclick="toggleMobileMenu()">
            <span></span><span></span><span></span>
        </button>
    `;

    document.body.prepend(navEl);
}

// ====== RENDER FOOTER ======
function renderFooter() {
    const footerEl = document.createElement('footer');
    footerEl.innerHTML = `
        <div class="footer-content">
            <div class="footer-brand">
                <a href="index.html" class="nav-logo">Simpli<span class="dot"></span></a>
                <p data-i18n="footer.tagline"></p>
            </div>
            <div class="footer-links">
                <div class="footer-col">
                    <h5>Apps</h5>
                    <a href="apps.html">mySupli</a>
                    <a href="apps.html">myBloom</a>
                    <a href="apps.html">myDose</a>
                    <a href="apps.html">myProject</a>
                </div>
                <div class="footer-col">
                    <h5 data-i18n="footer.pages"></h5>
                    <a href="index.html" data-i18n="nav.home"></a>
                    <a href="manifiesto.html" data-i18n="nav.manifesto"></a>
                    <a href="contacto.html" data-i18n="nav.contact"></a>
                </div>
                <div class="footer-col">
                    <h5 data-i18n="footer.legal"></h5>
                    <a href="#" data-i18n="footer.privacy"></a>
                    <a href="#" data-i18n="footer.terms"></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <span>© 2026 Simpli. <span data-i18n="footer.copyright"></span></span>
            <span data-i18n="footer.madeWith"></span>
        </div>
    `;
    document.body.append(footerEl);
}

// ====== LANGUAGE SYSTEM ======
function setLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Update data-i18n elements (nav & footer)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = i18n;
        for (const k of keys) {
            value = value?.[k];
        }
        if (value && value[lang]) {
            el.textContent = value[lang];
        }
    });

    // Update page-specific data-es / data-en elements
    document.querySelectorAll('[data-es]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            el.innerHTML = text;
        }
    });

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Store preference
    localStorage.setItem('simpli-lang', lang);
}

// ====== NAV SCROLL ======
function initNavScroll() {
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ====== MOBILE MENU ======
function toggleMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const links = document.getElementById('navLinks');
    btn.classList.toggle('open');
    links.classList.toggle('mobile-open');
}

function initMobileMenuClose() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.nav-links a') && !e.target.closest('.lang-toggle')) {
            document.getElementById('mobileMenuBtn')?.classList.remove('open');
            document.getElementById('navLinks')?.classList.remove('mobile-open');
        }
    });
}

// ====== SCROLL REVEAL ======
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ====== SMOOTH SCROLL ======
function initSmoothScroll() {
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
}

// ====== INIT ======
document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderFooter();

    // Restore language preference
    const savedLang = localStorage.getItem('simpli-lang') || 'es';
    setLang(savedLang);

    initNavScroll();
    initMobileMenuClose();
    initScrollReveal();
    initSmoothScroll();
});
