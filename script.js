// ===========================
// SCROLL ANIMATIONS
// ===========================
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
      observer.unobserve(el);
    }
  });
}, observerOptions);

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(el => observer.observe(el));

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));

// ===========================
// NAV MOBILE TOGGLE
// ===========================
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => navObserver.observe(s));

// ===========================
// NAV BACKGROUND ON SCROLL
// ===========================
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.borderBottomColor = 'rgba(0,229,192,0.1)';
  } else {
    nav.style.borderBottomColor = '';
  }
});

// ===========================
// TIMELINE ACTIVE STATE ON SCROLL
// ===========================
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelector('.timeline-dot') &&
        entry.target.classList.contains('active') === false &&
        (entry.target.querySelector('.timeline-dot').style.borderColor = 'rgba(0,229,192,0.6)');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline-item').forEach(el => timelineObserver.observe(el));

// ===========================
// SMOOTH CURSOR GLOW EFFECT
// ===========================
const glow = document.createElement('div');
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

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  glow.style.left = glowX + 'px';
  glow.style.top = glowY + 'px';
  requestAnimationFrame(animateGlow);
}
animateGlow();

// ===========================
// TYPING EFFECT FOR HERO TAG
// ===========================
const heroTag = document.querySelector('.hero-tag .mono');
if (heroTag) {
  const text = heroTag.textContent;
  heroTag.textContent = '';
  let i = 0;
  const typeInterval = setInterval(() => {
    heroTag.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(typeInterval);
  }, 45);
}