/* ===========================================================
   NETHMI CHAMATHKA — Corporate Portfolio JS
   =========================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- MOBILE NAV ---- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  navLinks.forEach(l => l.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
  }));

  /* ---- HEADER SCROLL ---- */
  const header = document.getElementById('header');
  const totop = document.getElementById('totop');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);
    totop.classList.toggle('visible', y > 500);

    // active nav link
    sections.forEach(sec => {
      const top = sec.offsetTop - 160;
      const bot = top + sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav__link[href="#${id}"]`);
      if (link) link.classList.toggle('active', y >= top && y < bot);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- SCROLL TO TOP ---- */
  totop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- SCROLL REVEAL ---- */
  const els = document.querySelectorAll('[data-anim]');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => revealObs.observe(el));

  /* ---- SKILL BARS ---- */
  const fills = document.querySelectorAll('.sbar__fill');
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.pct + '%';
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  fills.forEach(f => barObs.observe(f));

  /* ---- PROJECT FILTER ---- */
  const fbtns = document.querySelectorAll('.fbtn');
  const pcards = document.querySelectorAll('.pcard');

  fbtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fbtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      pcards.forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !show);

        if (show) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
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

  /* ---- HERO ENTRANCE ---- */
  const heroAnims = document.querySelectorAll('.hero [data-anim]');
  heroAnims.forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 200 + i * 150);
  });

});
