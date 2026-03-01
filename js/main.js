/* ================================================================
   PORTFOLIO — Santhosh V K
   main.js
================================================================ */

'use strict';

// ----------------------------------------------------------------
// 1. NAVBAR — scroll state + active link highlighting
// ----------------------------------------------------------------
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = [...document.querySelectorAll('main section[id]')];

  function onScroll() {
    // Frosted-scrolled state
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link based on scroll position
    const scrollMid = window.scrollY + window.innerHeight * 0.35;

    let current = '';
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollMid) current = sec.id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').slice(1); // strip '#'
      link.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


// ----------------------------------------------------------------
// 2. HAMBURGER MENU
// ----------------------------------------------------------------
(function initHamburger() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.nav-link');

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  });

  // Close on link click
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();


// ----------------------------------------------------------------
// 3. SCROLL-TRIGGERED FADE-UP ANIMATIONS
// ----------------------------------------------------------------
(function initScrollReveal() {
  const targets = document.querySelectorAll('.fade-up');

  if (!window.IntersectionObserver) {
    // Fallback: show all immediately
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger siblings inside the same parent
          const siblings = [...entry.target.parentElement.querySelectorAll('.fade-up')];
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.09}s`;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();


// ----------------------------------------------------------------
// 4. SPOTLIGHT / MOUSE-TRACKING GLOW ON CARDS
// ----------------------------------------------------------------
(function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card');

  // Map accent colors to CSS vars
  const accentGlow = {
    green:  'rgba(110,231,183,.1)',
    purple: 'rgba(129,140,248,.1)',
    yellow: 'rgba(251,191,36,.1)',
  };

  function onMouseMove(e) {
    const card   = e.currentTarget;
    const rect   = card.getBoundingClientRect();
    const x      = ((e.clientX - rect.left) / rect.width  * 100).toFixed(2);
    const y      = ((e.clientY - rect.top)  / rect.height * 100).toFixed(2);
    const accent = card.dataset.accent || 'green';
    card.style.setProperty('--sx', `${x}%`);
    card.style.setProperty('--sy', `${y}%`);
    card.style.setProperty('--glow-color', accentGlow[accent] || accentGlow.green);
  }

  cards.forEach(card => {
    card.addEventListener('mousemove', onMouseMove, { passive: true });
  });
})();


// ----------------------------------------------------------------
// 5. GLOBAL SPOTLIGHT CURSOR EFFECT
// ----------------------------------------------------------------
(function initCursorSpotlight() {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight || window.matchMedia('(pointer: coarse)').matches) return;

  let raf;
  let tx = 0, ty = 0;
  let cx = 0, cy = 0;

  window.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
    spotlight.style.opacity = '1';
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    cx = lerp(cx, tx, 0.1);
    cy = lerp(cy, ty, 0.1);
    spotlight.style.left = `${cx}px`;
    spotlight.style.top  = `${cy}px`;
    raf = requestAnimationFrame(animate);
  }

  animate();
})();


// ----------------------------------------------------------------
// 6. SMOOTH SCROLL for nav links (extra safety for older browsers)
// ----------------------------------------------------------------
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
