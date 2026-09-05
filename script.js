document.documentElement.classList.add('js');

const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const year = document.getElementById('year');
const mobileQuery = window.matchMedia('(max-width: 768px)');
const revealItems = document.querySelectorAll('[data-reveal]');

const syncToggleA11yState = () => {
  if (!toggle || !navLinks) {
    return;
  }

  const isOpen = navLinks.classList.contains('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
};

const syncNavigationA11yState = () => {
  if (!navLinks) {
    return;
  }

  const isOpen = navLinks.classList.contains('open');
  navLinks.setAttribute('aria-hidden', String(mobileQuery.matches && !isOpen));
};

if (year) {
  year.textContent = new Date().getFullYear();
}

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    syncToggleA11yState();
    syncNavigationA11yState();
  });
}

if (navLinks) {
  navAnchors.forEach((link) => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        syncToggleA11yState();
        syncNavigationA11yState();
      }
    });
  });
}

syncToggleA11yState();
syncNavigationA11yState();
mobileQuery.addEventListener('change', (event) => {
  if (!event.matches && navLinks) {
    navLinks.classList.remove('open');
  }

  syncToggleA11yState();
  syncNavigationA11yState();
});

if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 60, 220)}ms`;
    revealObserver.observe(item);
  });
}
