const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const year = document.getElementById('year');
const mobileQuery = window.matchMedia('(max-width: 768px)');

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
    toggle.setAttribute('aria-expanded', String(navLinks.classList.contains('open')));
    syncNavigationA11yState();
  });
}

if (navLinks) {
  navAnchors.forEach((link) => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
        syncNavigationA11yState();
      }
    });
  });
}

syncNavigationA11yState();
mobileQuery.addEventListener('change', (event) => {
  if (!event.matches && navLinks) {
    navLinks.classList.remove('open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  syncNavigationA11yState();
});
