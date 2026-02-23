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
      glowX += (mouseX - glowX) * 0.07;
      glowY += (mouseY - glowY) * 0.07;
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

  if (hamburger && navMenu) {
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

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') &&
          !navMenu.contains(e.target) &&
          !hamburger.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- HEADER SCROLL ---- */
  const header = document.getElementById('header');
  const totop = document.getElementById('totop');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 60);
    if (totop) totop.classList.toggle('visible', y > 500);

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
  if (totop) {
    totop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

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

  /* ---- HERO ENTRANCE ---- */
  const heroAnims = document.querySelectorAll('.hero [data-anim]');
  heroAnims.forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 300 + i * 200);
  });

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
          }, 50 + i * 60);
        }
      });
    });
  });

  /* ---- COUNTER ANIMATION ---- */
  const statNums = document.querySelectorAll('.about-stat__num[data-count]');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 2000;
        const start = performance.now();

        function updateCounter(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased);
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target;
          }
        }
        requestAnimationFrame(updateCounter);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  statNums.forEach(n => counterObs.observe(n));

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

  /* ---- TOAST NOTIFICATIONS ---- */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    toast.innerHTML = `
      <i class="fa-solid ${iconClass} toast__icon"></i>
      <span>${message}</span>
      <button class="toast__close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    `;

    toastContainer.appendChild(toast);

    const closeBtn = toast.querySelector('.toast__close');
    closeBtn.addEventListener('click', () => removeToast(toast));

    setTimeout(() => removeToast(toast), 5000);
  }

  function removeToast(toast) {
    if (toast.classList.contains('removing')) return;
    toast.classList.add('removing');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }

  /* ---- CONTACT FORM VALIDATION ---- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const subjectInput = document.getElementById('formSubject');
    const messageInput = document.getElementById('formMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    function validateField(input, errorEl, rules) {
      const value = input.value.trim();
      let errorMsg = '';

      if (rules.required && !value) {
        errorMsg = rules.requiredMsg || 'This field is required';
      } else if (rules.minLength && value.length < rules.minLength) {
        errorMsg = `Must be at least ${rules.minLength} characters`;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        errorMsg = rules.patternMsg || 'Invalid format';
      }

      if (errorMsg) {
        input.classList.add('error');
        errorEl.textContent = errorMsg;
        return false;
      } else {
        input.classList.remove('error');
        errorEl.textContent = '';
        return true;
      }
    }

    // Real-time validation on blur
    nameInput.addEventListener('blur', () => {
      validateField(nameInput, nameError, { required: true, minLength: 2, requiredMsg: 'Please enter your name' });
    });
    emailInput.addEventListener('blur', () => {
      validateField(emailInput, emailError, {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        requiredMsg: 'Please enter your email',
        patternMsg: 'Please enter a valid email address'
      });
    });
    subjectInput.addEventListener('blur', () => {
      validateField(subjectInput, subjectError, { required: true, minLength: 3, requiredMsg: 'Please enter a subject' });
    });
    messageInput.addEventListener('blur', () => {
      validateField(messageInput, messageError, { required: true, minLength: 10, requiredMsg: 'Please enter your message' });
    });

    // Clear error on focus
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      input.addEventListener('focus', () => {
        input.classList.remove('error');
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameError, { required: true, minLength: 2, requiredMsg: 'Please enter your name' });
      const isEmailValid = validateField(emailInput, emailError, {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        requiredMsg: 'Please enter your email',
        patternMsg: 'Please enter a valid email address'
      });
      const isSubjectValid = validateField(subjectInput, subjectError, { required: true, minLength: 3, requiredMsg: 'Please enter a subject' });
      const isMessageValid = validateField(messageInput, messageError, { required: true, minLength: 10, requiredMsg: 'Please enter your message' });

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
          showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
          contactForm.reset();
          submitBtn.innerHTML = btnText;
          submitBtn.disabled = false;
        }, 1500);
      } else {
        showToast('Please fix the errors in the form before submitting.', 'error');
      }
    });
  }

  /* ---- HERO BADGE ENTRANCE ---- */
  const badge = document.querySelector('.hero__badge');
  if (badge) {
    badge.style.opacity = '0';
    setTimeout(() => {
      badge.style.transition = 'opacity 0.6s ease';
      badge.style.opacity = '1';
    }, 200);
  }

});
