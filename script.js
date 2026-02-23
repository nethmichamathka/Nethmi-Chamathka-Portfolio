/* ===========================================================
   NETHMI CHAMATHKA — Modern Portfolio JS
   =========================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- CURSOR GLOW ---- */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  /* ---- MOBILE NAV ---- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(l => l.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }));

  // Close on outside click (mobile)
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  /* ---- HEADER SCROLL ---- */
  const header = document.getElementById('header');
  const totop = document.getElementById('totop');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);
    totop.classList.toggle('visible', y > 500);

    // Active nav link
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
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
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

      pcards.forEach((card, i) => {
        const show = filter === 'all' || card.dataset.cat === filter;
        
        if (!show) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        } else {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50 + i * 50);
        }
      });
    });
  });

  /* ---- SMOOTH ANCHOR SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---- HERO ENTRANCE ---- */
  const heroAnims = document.querySelectorAll('.hero [data-anim]');
  heroAnims.forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 300 + i * 200);
  });

  /* ---- TILT EFFECT ON HERO CARD ---- */
  const heroCard = document.querySelector('.hero__card');
  if (heroCard && window.innerWidth > 768) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      heroCard.style.transition = 'transform 0.5s ease';
    });
    
    heroCard.addEventListener('mouseenter', () => {
      heroCard.style.transition = 'none';
    });
  }

  /* ---- MAGNETIC EFFECT ON SOCIAL ICONS ---- */
  const socialLinks = document.querySelectorAll('.hero__social a');
  if (window.innerWidth > 768) {
    socialLinks.forEach(link => {
      link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translate(0, 0)';
        link.style.transition = 'transform 0.4s ease';
      });
      
      link.addEventListener('mouseenter', () => {
        link.style.transition = 'none';
      });
    });
  }

  /* ---- TYPED EFFECT ON HERO (optional subtle) ---- */
  const badge = document.querySelector('.hero__badge');
  if (badge) {
    badge.style.opacity = '0';
    setTimeout(() => {
      badge.style.transition = 'opacity 0.6s ease';
      badge.style.opacity = '1';
    }, 200);
  }
});
