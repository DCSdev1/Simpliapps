/* ============================================
   SIMPLI — Main JavaScript
   Nav, Footer, Language, Animations
   ============================================ */

(function() {
    'use strict';

    // ====== TRANSLATIONS ======
    var i18n = {
        nav: {
            home:      { es: 'Inicio',     en: 'Home' },
            apps:      { es: 'Apps',        en: 'Apps' },
            manifesto: { es: 'Manifiesto',  en: 'Manifesto' },
            contact:   { es: 'Contacto',    en: 'Contact' }
        },
        footer: {
            tagline:   { es: 'Simpli Apps for a Simpli Life', en: 'Simpli Apps for a Simpli Life' },
            pages:     { es: 'Paginas',     en: 'Pages' },
            legal:     { es: 'Legal',       en: 'Legal' },
            privacy:   { es: 'Privacidad',  en: 'Privacy' },
            terms:     { es: 'Terminos',    en: 'Terms' },
            copyright: { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
            madeWith:  { es: 'Hecho con \u2665 para simplificar tu vida', en: 'Made with \u2665 to simplify your life' }
        }
    };

    // ====== SAFE STORAGE ======
    function safeGet(key) {
        try { return localStorage.getItem(key); }
        catch(e) { return null; }
    }

    function safeSet(key, val) {
        try { localStorage.setItem(key, val); }
        catch(e) { /* silently fail */ }
    }

    // ====== DETECT CURRENT PAGE ======
    function getCurrentPage() {
        var path = window.location.pathname.toLowerCase();
        if (path.indexOf('apps') !== -1) return 'apps';
        if (path.indexOf('mysupli') !== -1) return 'apps';
        if (path.indexOf('mydose') !== -1) return 'apps';
        if (path.indexOf('apoyo') !== -1) return 'support';
        if (path.indexOf('manifiesto') !== -1) return 'manifesto';
        if (path.indexOf('contacto') !== -1) return 'contact';
        return 'home';
    }

    // ====== RENDER NAV ======
    function renderNav() {
        var currentPage = getCurrentPage();
        var navEl = document.createElement('nav');
        navEl.id = 'navbar';

        if (document.body.getAttribute('data-nav-dark') === 'true') {
            navEl.className = 'nav-dark';
        }

        var html = '';
        html += '<a href="index.html" class="nav-logo">Simpli<span class="dot"></span></a>';
        html += '<ul class="nav-links" id="navLinks">';
        html += '<li><a href="index.html" data-i18n="nav.home" class="' + (currentPage === 'home' ? 'active' : '') + '">Inicio</a></li>';
        html += '<li><a href="apps.html" data-i18n="nav.apps" class="' + (currentPage === 'apps' ? 'active' : '') + '">Apps</a></li>';
        html += '<li><a href="manifiesto.html" data-i18n="nav.manifesto" class="' + (currentPage === 'manifesto' ? 'active' : '') + '">Manifiesto</a></li>';
        html += '<li><a href="contacto.html" data-i18n="nav.contact" class="' + (currentPage === 'contact' ? 'active' : '') + '">Contacto</a></li>';
        html += '<li><a href="apoyo.html" class="nav-support ' + (currentPage === 'support' ? 'active' : '') + '">☕ <span data-es="Apoyar" data-en="Support"></span></a></li>';
        html += '<li>';
        html += '<div class="lang-toggle">';
        html += '<button class="lang-btn active" data-lang="es" id="btnES">ES</button>';
        html += '<button class="lang-btn" data-lang="en" id="btnEN">EN</button>';
        html += '</div>';
        html += '</li>';
        html += '</ul>';
        html += '<button class="mobile-menu-btn" id="mobileMenuBtn">';
        html += '<span></span><span></span><span></span>';
        html += '</button>';

        navEl.innerHTML = html;
        document.body.insertBefore(navEl, document.body.firstChild);

        // Attach events
        document.getElementById('btnES').addEventListener('click', function() { setLang('es'); });
        document.getElementById('btnEN').addEventListener('click', function() { setLang('en'); });
        document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
    }

    // ====== RENDER FOOTER ======
    function renderFooter() {
        var footerEl = document.createElement('footer');
        var html = '';
        html += '<div class="footer-content">';
        html += '  <div class="footer-brand">';
        html += '    <a href="index.html" class="nav-logo">Simpli<span class="dot"></span></a>';
        html += '    <p data-i18n="footer.tagline">Simpli Apps for a Simpli Life</p>';
        html += '  </div>';
        html += '  <div class="footer-links">';
        html += '    <div class="footer-col">';
        html += '      <h5>Apps</h5>';
        html += '      <a href="mysupli.html">mySupli</a>';
        html += '    </div>';
        html += '    <div class="footer-col">';
        html += '      <h5 data-i18n="footer.pages">Paginas</h5>';
        html += '      <a href="index.html" data-i18n="nav.home">Inicio</a>';
        html += '      <a href="manifiesto.html" data-i18n="nav.manifesto">Manifiesto</a>';
        html += '      <a href="contacto.html" data-i18n="nav.contact">Contacto</a>';
        html += '    </div>';
        html += '    <div class="footer-col">';
        html += '      <h5 data-i18n="footer.legal">Legal</h5>';
        html += '      <a href="privacy-mysupli.html" data-i18n="footer.privacy">Privacidad</a>';
        html += '      <a href="contacto.html">Soporte</a>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
        html += '<div class="footer-bottom">';
        html += '  <span>&copy; 2026 Simpli. <span data-i18n="footer.copyright">Todos los derechos reservados.</span></span>';
        html += '  <span data-i18n="footer.madeWith">Hecho con \u2665 para simplificar tu vida</span>';
        html += '</div>';

        footerEl.innerHTML = html;
        document.body.appendChild(footerEl);
    }

    // ====== LANGUAGE ======
    function setLang(lang) {
        document.documentElement.lang = lang;

        // Update data-i18n elements (nav & footer)
        var els = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < els.length; i++) {
            var key = els[i].getAttribute('data-i18n');
            var keys = key.split('.');
            var value = i18n;
            for (var j = 0; j < keys.length; j++) {
                value = value ? value[keys[j]] : null;
            }
            if (value && value[lang]) {
                els[i].textContent = value[lang];
            }
        }

        // Update data-es / data-en elements (page content)
        var pageEls = document.querySelectorAll('[data-es]');
        for (var i = 0; i < pageEls.length; i++) {
            var text = pageEls[i].getAttribute('data-' + lang);
            if (text) {
                pageEls[i].innerHTML = text;
            }
        }

        // Update lang buttons
        var btns = document.querySelectorAll('.lang-btn');
        for (var i = 0; i < btns.length; i++) {
            if (btns[i].getAttribute('data-lang') === lang) {
                btns[i].classList.add('active');
            } else {
                btns[i].classList.remove('active');
            }
        }

        safeSet('simpli-lang', lang);
    }

    // Make setLang globally available
    window.setLang = setLang;

    // ====== NAV SCROLL ======
    function initNavScroll() {
        window.addEventListener('scroll', function() {
            var nav = document.getElementById('navbar');
            if (nav) {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }
        });
    }

    // ====== MOBILE MENU ======
    function toggleMobileMenu() {
        var btn = document.getElementById('mobileMenuBtn');
        var links = document.getElementById('navLinks');
        if (btn) btn.classList.toggle('open');
        if (links) links.classList.toggle('mobile-open');
    }

    function initMobileMenuClose() {
        document.addEventListener('click', function(e) {
            var link = e.target.closest('.nav-links a');
            if (link && !e.target.closest('.lang-toggle')) {
                var btn = document.getElementById('mobileMenuBtn');
                var links = document.getElementById('navLinks');
                if (btn) btn.classList.remove('open');
                if (links) links.classList.remove('mobile-open');
            }
        });
    }

    // ====== SCROLL REVEAL ======
    function initScrollReveal() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: show everything
            var els = document.querySelectorAll('.reveal');
            for (var i = 0; i < els.length; i++) {
                els[i].classList.add('visible');
            }
            return;
        }

        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.classList.add('visible');
                }
            }
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        var els = document.querySelectorAll('.reveal');
        for (var i = 0; i < els.length; i++) {
            observer.observe(els[i]);
        }
    }

    // ====== SMOOTH SCROLL ======
    function initSmoothScroll() {
        document.addEventListener('click', function(e) {
            var anchor = e.target.closest('a[href^="#"]');
            if (anchor) {
                var href = anchor.getAttribute('href');
                if (href && href.length > 1) {
                    var target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        });
    }

    // ====== GOOGLE ANALYTICS 4 ======
    // Para activar GA4:
    // 1. Ve a https://analytics.google.com
    // 2. Crea una cuenta y propiedad web
    // 3. Copia tu Measurement ID (empieza con G-)
    // 4. Reemplaza 'G-9FVQWDBWGG' abajo con tu ID
    function initAnalytics() {
        var GA_ID = 'G-9FVQWDBWGG';
        if (!GA_ID || GA_ID.indexOf('XXXX') !== -1) return;

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', GA_ID, {
            page_title: document.title,
            page_location: window.location.href
        });
    }

    // ====== INIT ======
    function init() {
        renderNav();
        renderFooter();

        var savedLang = safeGet('simpli-lang') || 'es';
        setLang(savedLang);

        initNavScroll();
        initMobileMenuClose();
        initScrollReveal();
        initSmoothScroll();
        initAnalytics();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
