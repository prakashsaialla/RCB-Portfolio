/* ============================================================
   RCB PORTFOLIO - script.js
   Play Bold. Analyze Bolder.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  // Theme toggle removed
  initMobileNav();
  initTypewriter();
  initCounters();
  initScrollReveal();
  initScoreboardTicker();
});

/* ---- Loader ---- */
function initLoader() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    screen.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1600);
}

/* ---- Theme ---- */
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const saved = localStorage.getItem('rcb-theme') || 'dark';
  applyTheme(saved);
  btn.addEventListener('click', () => {
    const next = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('rcb-theme', next);
  });
}

function applyTheme(t) {
  const btn = document.getElementById('theme-toggle');
  if (t === 'light') {
    document.body.classList.add('light-mode');
    if (btn) btn.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    document.body.classList.remove('light-mode');
    if (btn) btn.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

/* ---- Mobile nav ---- */
function initMobileNav() {
  const burger = document.getElementById('hamburger');
  const nav    = document.getElementById('mobile-nav');
  if (!burger || !nav) return;
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
  }));
  document.addEventListener('click', e => {
    if (!burger.contains(e.target) && !nav.contains(e.target)) {
      burger.classList.remove('open');
      nav.classList.remove('open');
    }
  });
}

/* ---- Typewriter ---- */
function initTypewriter() {
  const el = document.getElementById('changing-text');
  if (!el) return;
  const words = [
    'Data Analyst',
    'Business Analyst',
    'SQL & Python Dev',
    'ML Engineer',
    'Dashboard Builder'
  ];
  let wi = 0, ci = 0, del = false;
  function tick() {
    const word = words[wi];
    el.textContent = del ? word.slice(0, --ci) : word.slice(0, ++ci);
    if (!del && ci === word.length) setTimeout(() => del = true, 1200);
    else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; }
    setTimeout(tick, del ? 45 : 80);
  }
  tick();
}

/* ---- Stat counters ---- */
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.getAttribute('data-count'));
      const dur = 1800;
      const step = end / (dur / 16);
      let cur = 0;
      const tick = () => {
        cur = Math.min(cur + step, end);
        el.textContent = Math.floor(cur).toLocaleString();
        if (cur < end) requestAnimationFrame(tick);
        else el.textContent = end.toLocaleString();
      };
      tick();
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
}

/* ---- Scroll reveal ---- */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ---- Scoreboard ticker (index page) ---- */
function initScoreboardTicker() {
  const ticker = document.getElementById('score-ticker');
  if (!ticker) return;
  const items = [
    'PSA · ANALYTICS · 14K+ LINES OF CODE',
    'DATASETS ANALYZED · 40+ · SEASON 2024-26',
    'ML MODELS DEPLOYED · 10+ · HIGH ACCURACY',
    'GPA · 4.0 · ISENBERG SCHOOL OF MGMT',
    'UMASS AMHERST · MS BUSINESS ANALYTICS · 2026',
  ];
  ticker.innerHTML = items.map(i =>
    `<span class="ticker-item">${i}</span>`
  ).join('<span class="ticker-sep">◆</span>');
  // Duplicate for seamless loop
  ticker.innerHTML += ticker.innerHTML;
}

/* ============================================================
   ENHANCEMENTS v3
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initEasterEgg();
});

/* ---- Scroll Progress Bar ---- */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}


/* ---- Jersey Number Easter Egg ---- */
function initEasterEgg() {
  let typed = '';
  const flash = document.getElementById('easter-egg-flash');
  if (!flash) return;

  document.addEventListener('keydown', e => {
    typed += e.key;
    if (typed.length > 2) typed = typed.slice(-2);

    if (typed.includes('18') || typed.includes('17')) {
      triggerEasterEgg(typed.includes('18') ? '18' : '17');
    }
  });
}

function triggerEasterEgg(number) {
  const flash = document.getElementById('easter-egg-flash');
  const canvas = document.getElementById('confetti-canvas');
  if (!flash || !canvas) return;

  // Flash
  flash.classList.add('active');
  setTimeout(() => flash.classList.remove('active'), 600);

  // Confetti burst
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#CC0000','#D4A017','#ffffff','#990000','#F0C040'];
  const particles = Array.from({ length: 120 }, () => ({
    x: window.innerWidth  / 2 + (Math.random() - 0.5) * 300,
    y: window.innerHeight / 2 + (Math.random() - 0.5) * 200,
    vx: (Math.random() - 0.5) * 14,
    vy: (Math.random() - 0.5) * 14 - 6,
    life: 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    shape: Math.random() > 0.5 ? 'rect' : 'circle'
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Center text
    if (frame < 80) {
      ctx.globalAlpha = Math.min(1, frame / 20) * Math.max(0, 1 - (frame - 60) / 20);
      ctx.font = `bold ${number === '18' ? '72' : '72'}px 'Bebas Neue', serif`;
      ctx.fillStyle = '#D4A017';
      ctx.textAlign = 'center';
      ctx.fillText(`#${number}`, canvas.width / 2, canvas.height / 2 - 20);
      ctx.font = "24px 'Rajdhani', sans-serif";
      ctx.fillStyle = '#CC0000';
      ctx.fillText(number === '18' ? 'VIRAT KOHLI 🔥' : 'AB DE VILLIERS ⚡', canvas.width / 2, canvas.height / 2 + 20);
      ctx.globalAlpha = 1;
    }

    particles.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.35;
      p.life -= 0.018;
      p.vx  *= 0.99;
      if (p.life <= 0) return;

      ctx.globalAlpha = p.life;
      ctx.fillStyle   = p.color;
      ctx.beginPath();
      if (p.shape === 'circle') {
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
      } else {
        ctx.rect(p.x - p.size / 2, p.y - p.size / 4, p.size, p.size / 2);
      }
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    frame++;

    if (frame < 160 && particles.some(p => p.life > 0)) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
    }
  }

  draw();
}
