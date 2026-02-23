/* ===================================================
   NETHMI CHAMATHKA PORTFOLIO — Interactions
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- MOBILE NAV ---------- */
  const toggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  const navLinks = document.querySelectorAll('.nav__link');

  toggle.addEventListener('click', () => {
    navList.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id]');

  function setActiveLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav__link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  /* ---------- HEADER SCROLL STYLE ---------- */
  const header = document.getElementById('header');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 50);
    setActiveLink();
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- SCROLL TO TOP ---------- */
  const scrollTopBtn = document.getElementById('scrollTop');
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- SCROLL ANIMATIONS ---------- */
  const animateElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animateElements.forEach(el => observer.observe(el));

  /* ---------- SKILL BAR ANIMATION ---------- */
  const skillBars = document.querySelectorAll('.skill-bar__fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => barObserver.observe(bar));

  /* ---------- STAT COUNTER ANIMATION ---------- */
  const statNumbers = document.querySelectorAll('.stat__number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-count');
        let current = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = current;
        }, 40);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  /* ---------- PROJECT FILTER ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

});
