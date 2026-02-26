document.addEventListener("DOMContentLoaded", () => {
  // ===========================
  // SCROLL REVEAL ANIMATIONS
  // ===========================
  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : 0;

      setTimeout(() => {
        el.classList.add("visible");
      }, delay);

      observer.unobserve(el);
    });
  }, observerOptions);

  // Observe all reveal candidates
  document.querySelectorAll(`
    .skill-card,
    .timeline-item,
    .project-card,
    .edu-card,
    .cert-item,
    .contact-wrapper
  `).forEach(el => revealObserver.observe(el));


  // ===========================
  // MOBILE NAV TOGGLE
  // ===========================
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const nav = document.querySelector(".nav");

  function setNavOpen(isOpen) {
    if (!navLinks || !navToggle) return;
    navLinks.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.contains("open");
      setNavOpen(!isOpen);
    });

    // Close menu when a nav link is clicked (mobile)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => setNavOpen(false));
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      const clickedInsideNav = nav.contains(e.target);
      if (!clickedInsideNav && navLinks.classList.contains("open")) {
        setNavOpen(false);
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setNavOpen(false);
    });
  }


  // ===========================
  // ACTIVE NAV LINK ON SCROLL
  // ===========================
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a[href^='#']");

  if (sections.length && navItems.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");
        navItems.forEach(a => {
          a.style.color = "";
          if (a.getAttribute("href") === `#${id}`) {
            a.style.color = "var(--accent)";
          }
        });
      });
    }, { threshold: 0.45 });

    sections.forEach(section => navObserver.observe(section));
  }


  // ===========================
  // NAV BORDER / BG ON SCROLL
  // ===========================
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.style.borderBottomColor = "rgba(0,229,192,0.18)";
      } else {
        nav.style.borderBottomColor = "";
      }
    });
  }


  // ===========================
  // TIMELINE ACTIVE STATE ON SCROLL
  // ===========================
  const timelineItems = document.querySelectorAll(".timeline-item");

  if (timelineItems.length) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const item = entry.target;
        const dot = item.querySelector(".timeline-dot");
        if (!dot) return;

        if (entry.isIntersecting) {
          item.classList.add("active");
          dot.style.borderColor = "rgba(0,229,192,0.6)";
          dot.style.boxShadow = "0 0 0 6px rgba(0,229,192,0.08)";
        }
      });
    }, { threshold: 0.3 });

    timelineItems.forEach(el => timelineObserver.observe(el));
  }


  // ===========================
  // SMOOTH CURSOR GLOW EFFECT (desktop only)
  // ===========================
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (!prefersReducedMotion && !isCoarsePointer) {
    const glow = document.createElement("div");
    glow.setAttribute("aria-hidden", "true");
    glow.style.cssText = `
      position: fixed;
      width: 300px; height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,229,192,0.04) 0%, transparent 70%);
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 0;
      transition: opacity 0.3s;
      will-change: transform;
    `;
    document.body.appendChild(glow);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }


  // ===========================
  // TYPING EFFECT FOR HERO TAG
  // ===========================
  const heroTag = document.querySelector(".hero-tag .mono");
  if (heroTag) {
    const originalText = heroTag.textContent;
    heroTag.textContent = "";

    let idx = 0;
    const typeInterval = setInterval(() => {
      heroTag.textContent += originalText[idx];
      idx++;
      if (idx >= originalText.length) clearInterval(typeInterval);
    }, 35);
  }


  // ===========================
  // FOOTER YEAR AUTO-UPDATE
  // ===========================
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});