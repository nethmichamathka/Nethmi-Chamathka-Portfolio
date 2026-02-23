/* ===========================================================
   NETHMI CHAMATHKA — Portfolio v2 Interactions
   =========================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- CURSOR GLOW ---------- */
  const glow = document.getElementById('cursorGlow');
  if (glow && window.innerWidth > 768) {
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ---------- MOBILE NAV ---------- */
  const toggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  const navLinks = document.querySelectorAll('.nav__link');

  toggle.addEventListener('click', () => {
    navList.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  navLinks.forEach(link =>
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      toggle.classList.remove('active');
    })
  );

  /* ---------- ACTIVE NAV ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id]');
  const header = document.getElementById('header');
  const toTop = document.getElementById('toTop');

  function onScroll() {
    const y = window.scrollY;

    // header style
    header.classList.toggle('scrolled', y > 60);

    // scroll-to-top visibility
    toTop.classList.toggle('visible', y > 500);

    // active link
    const offset = 150;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav__link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', y + offset >= top && y + offset < top + h);
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- SCROLL TO TOP ---------- */
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- INTERSECTION ANIMATIONS ---------- */
  const animated = document.querySelectorAll('[data-animate]');
  const animObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('animated'); animObs.unobserve(e.target); }
    }),
    { threshold: 0.1 }
  );
  animated.forEach(el => animObs.observe(el));

  /* ---------- SKILL BARS ---------- */
  const bars = document.querySelectorAll('.bar__fill');
  const barObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        barObs.unobserve(e.target);
      }
    }),
    { threshold: 0.25 }
  );
  bars.forEach(b => barObs.observe(b));

  /* ---------- PROJECT FILTER ---------- */
  const pills = document.querySelectorAll('.pill');
  const projs = document.querySelectorAll('.proj');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const f = pill.dataset.filter;

      projs.forEach(card => {
        const match = f === 'all' || card.dataset.cat === f;
        card.classList.toggle('hidden', !match);

        // re-trigger animation for visible cards
        if (match) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity .4s ease, transform .4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        }
      });
    });
  });

  /* ---------- SMOOTH REVEAL ON HERO LOAD ---------- */
  const heroContent = document.querySelector('.hero__content');
  const heroVisual = document.querySelector('.hero__visual');
  if (heroContent) {
    setTimeout(() => heroContent.classList.add('animated'), 200);
  }
  if (heroVisual) {
    setTimeout(() => heroVisual.classList.add('animated'), 500);
  }

});
