// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
}

// Subtle parallax on hero blobs
const blobs = document.querySelectorAll('.blob');
if (blobs.length && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    blobs.forEach((b, i) => {
      const f = (i + 1) * 8;
      b.style.transform = `translate(${x * f}px, ${y * f}px)`;
    });
  });
}

// Mobile menu
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Lightbox
(function () {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  const lbImg = lightbox.querySelector('img');
  const lbCounter = lightbox.querySelector('.lightbox-counter');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
  let index = 0;

  const items = triggers.map(el => ({
    src: el.getAttribute('data-lightbox') || el.querySelector('img')?.src,
    alt: el.querySelector('img')?.alt || ''
  }));

  function show(i) {
    if (!items.length) return;
    index = (i + items.length) % items.length;
    lbImg.src = items[index].src;
    lbImg.alt = items[index].alt;
    if (lbCounter) lbCounter.textContent = `${index + 1} / ${items.length}`;
  }

  function open(i) {
    show(i);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  triggers.forEach((el, i) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      open(i);
    });
  });

  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', () => show(index - 1));
  nextBtn?.addEventListener('click', () => show(index + 1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();
