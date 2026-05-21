/* ═══════════════════════════════════════════════
   SHAHBOZ PORTFOLIO — script.js
   ═══════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────
   PORTFOLIO DATA
   Edit this array to add / update your projects.
   - pdf: path inside /portfolio/ folder
   - thumb: path inside /thumbnails/ folder
   - category: all | branding | posters | social | ui | illustration | other
   ───────────────────────────────────────────────── */
const portfolioData = [
  {
    id: 1,
    title: "Brandbook — Bentemo",
    desc: "Complete brand identity system including logo, color palette, typography, and brand guidelines.",
    category: "branding", 
    pdf: "portfolio/project1.pdf",
    thumb: "thumbnails/project1.png"
  },
  {
     id: 2,
    title: "Mobile App UI — Limer App",
    desc: "Clean, modern UI design for a fitness mobile application.",
    category: "ui",
    pdf: "portfolio/project2.pdf",
    thumb: "thumbnails/project2.jpg"
  },
];

/* ─────────────────────────────────────────────────
   THEME TOGGLE
   ───────────────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ─────────────────────────────────────────────────
   NAV SCROLL EFFECT
   ───────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─────────────────────────────────────────────────
   MOBILE MENU
   ───────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ─────────────────────────────────────────────────
   CUSTOM CURSOR
   ───────────────────────────────────────────────── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
}, { passive: true });

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, .filter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

/* ─────────────────────────────────────────────────
   SCROLL REVEAL (IntersectionObserver)
   ───────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => revealObserver.observe(el));

/* Trigger hero reveals on load */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-fade').forEach(el => {
    el.classList.add('visible');
  });
});

/* ─────────────────────────────────────────────────
   SKILL BARS ANIMATION
   ───────────────────────────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const w = bar.getAttribute('data-w');
        bar.style.width = w + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) skillObserver.observe(skillsGrid);

/* ─────────────────────────────────────────────────
   PORTFOLIO: RENDER CARDS
   ───────────────────────────────────────────────── */
const grid = document.getElementById('portfolioGrid');

function categoryLabel(cat) {
  const map = { branding: 'Branding', posters: 'Posters', social: 'Social Media', ui: 'UI Design', illustration: 'Illustration', other: 'Other' };
  return map[cat] || cat;
}

function buildCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card reveal-up';
  card.setAttribute('data-category', project.category);
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View project: ${project.title}`);
  card.tabIndex = 0;

  card.innerHTML = `
    <div class="project-thumb">
      <img 
        src="${project.thumb}" 
        alt="${project.title}"
        loading="lazy"
        onerror="this.style.display='none'; this.parentElement.querySelector('.thumb-placeholder').style.display='flex';"
      />
      <div class="thumb-placeholder" style="display:none">
        <div class="thumb-letter">${project.title.charAt(0)}</div>
        <div class="thumb-label">Add thumbnail</div>
      </div>
      <div class="project-hover-overlay">
        <span class="view-pdf-btn">View PDF ↗</span>
      </div>
    </div>
    <div class="project-info">
      <p class="project-category">${categoryLabel(project.category)}</p>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-desc">${project.desc}</p>
    </div>
  `;

  const openPDF = () => {
    if (project.pdf) {
      window.open(project.pdf, '_blank', 'noopener');
    } else {
      alert('PDF not found. Add the file to /portfolio/ and update portfolioData in script.js');
    }
  };

  card.addEventListener('click', openPDF);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openPDF(); });

  return card;
}

function renderPortfolio(filter = 'all') {
  grid.innerHTML = '';
  const filtered = filter === 'all' ? portfolioData : portfolioData.filter(p => p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color: var(--text-ter); font-size:0.9rem; padding:2rem 0;">No projects in this category yet.</p>';
    return;
  }

  filtered.forEach((project, i) => {
    const card = buildCard(project);
    card.style.transitionDelay = `${i * 0.05}s`;
    grid.appendChild(card);
  });

  /* Re-observe newly rendered cards */
  grid.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
  grid.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });
}

renderPortfolio();

/* ─────────────────────────────────────────────────
   PORTFOLIO: FILTER
   ───────────────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    renderPortfolio(filter);
  });
});

/* ─────────────────────────────────────────────────
   THUMBNAIL FALLBACK — show placeholder if no thumb
   ───────────────────────────────────────────────── */
function initThumbs() {
  document.querySelectorAll('.project-thumb img').forEach(img => {
    if (!img.complete || img.naturalWidth === 0) {
      img.style.display = 'none';
      const ph = img.parentElement.querySelector('.thumb-placeholder');
      if (ph) ph.style.display = 'flex';
    }
  });
}
setTimeout(initThumbs, 500);

/* ─────────────────────────────────────────────────
   SMOOTH ANCHOR SCROLL
   ───────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─────────────────────────────────────────────────
   ACTIVE NAV LINK on scroll
   ───────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ─────────────────────────────────────────────────
   LAZY LOAD IMAGES (native + fallback)
   ───────────────────────────────────────────────── */
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported — already set loading="lazy"
} else {
  // Fallback with IntersectionObserver
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imgObserver.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[loading="lazy"]').forEach(img => imgObserver.observe(img));
}

console.log('%c Shahboz Portfolio ', 'background: #C4A882; color: #fff; font-size: 14px; padding: 4px 10px; border-radius: 4px;');
console.log('%c Add your projects in portfolioData inside script.js ', 'color: #8B7355; font-size: 12px;');
