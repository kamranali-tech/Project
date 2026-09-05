const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(navLinks.classList.contains('open')));
  });
}

navAnchors.forEach((link) => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
