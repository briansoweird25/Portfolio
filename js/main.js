(function () {
  'use strict';
  var doc = document;
  doc.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };

  var EMAIL = 'Vincentsomido25@gmail.com';
  var FIGMA = 'https://www.figma.com/design/KcfBr5rP8VCogzmRrIuXcB/Untitled?node-id=0-1&t=f7EvUwokFbCWzGDb-1';

  var PROJECTS = [
    { n: '01', cat: 'E-Commerce · Full-Stack', title: 'Lumière — Luxury Store',
      blurb: 'A minimal, Apple-inspired online store with product grid, smooth cart drawer, and Stripe checkout integration.',
      tags: ['Next.js', 'TypeScript', 'Tailwind', 'Stripe'] },
    { n: '02', cat: 'Dashboard · SaaS', title: 'DevDash — Analytics UI',
      blurb: 'A SaaS-style admin dashboard with live charts, user tables, dark mode, and role-based views.',
      tags: ['React', 'Recharts', 'shadcn/ui', 'TypeScript'] },
    { n: '03', cat: 'Full-Stack · Real-Time', title: 'Taskly — Kanban Board',
      blurb: 'Drag-and-drop task manager with real-time sync, user auth, and team collaboration features.',
      tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Supabase'] },
    { n: '04', cat: 'PHP · MySQL', title: 'ShopManager — CRUD System',
      blurb: 'A product management system with inventory tracking, user roles, and reporting built with PHP and MySQL.',
      tags: ['PHP', 'MySQL', 'HTML/CSS', 'Bootstrap'] },
    { n: '05', cat: 'AI Feature · Modern', title: 'Aura — AI Recommender',
      blurb: 'An AI-powered product recommendation engine where users describe what they want in plain text and get curated results.',
      tags: ['Next.js', 'OpenAI API', 'TypeScript', 'Vercel'] },
    { n: '06', cat: 'E-Commerce · Real Work', title: 'Product Lister — E-Commerce',
      blurb: 'Real work experience listing fashion products on e-commerce platforms. Wrote compelling product descriptions, size charts, and sales copy that drove conversions.',
      tags: ['Product Listing', 'Copywriting', 'E-Commerce', 'SEO'],
      samples: [
        { h: 'Lina – Summer jacket in linen', p: 'Pair effortlessly with summer pants or dresses for a stylish look. Timeless color options that shine.',
          l: ['Looks great with any outfit', 'Colors that shine', 'Complements your style'] },
        { h: 'Karyl – Lace Blouse with Puff Sleeves', p: 'A perfect blend of elegance and modern design. Delicate lace details and stylish puff sleeves.',
          l: ['Intricate lace details', 'Elegant puff sleeves', 'Flattering silhouette'] }
      ] },
    { n: '07', cat: 'Figma · UI/UX Design', title: 'Figma UI/UX Design',
      blurb: 'A UI/UX design project created in Figma. Covers layout, component design, user flow, and interactive prototyping for a web interface.',
      tags: ['Figma', 'UI Design', 'Prototyping', 'Components'], link: FIGMA, linkLabel: 'Open in Figma' }
  ];

  function el(tag, cls, text) {
    var e = doc.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function tagList(tags) {
    var ul = el('ul', 'tags');
    tags.forEach(function (t) { ul.appendChild(el('li', null, t)); });
    return ul;
  }

  /* ---- Theme ---- */
  var root = doc.documentElement;
  $('#themeToggle').addEventListener('click', toggleTheme);
  function toggleTheme() {
    var next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  }

  /* ---- Mobile nav ---- */
  var menuBtn = $('#menuBtn'), links = $('#navLinks');
  menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  /* ---- Projects ---- */
  var grid = $('#projectGrid'), modal = $('#projectModal'), body = $('#pmBody');
  PROJECTS.forEach(function (p, i) {
    var b = el('button', 'pcard reveal');
    b.type = 'button';
    var top = el('div', 'pcard__top');
    top.appendChild(el('b', null, p.n));
    top.appendChild(el('span', null, p.cat));
    b.appendChild(top);
    b.appendChild(el('h3', null, p.title));
    b.appendChild(el('p', null, p.blurb));
    b.appendChild(tagList(p.tags));
    b.appendChild(el('span', 'more', 'View details →'));
    b.addEventListener('click', function () { openProject(i); });
    grid.appendChild(b);
  });
  function openProject(i) {
    var p = PROJECTS[i];
    body.textContent = '';
    var w = el('div', 'pm');
    w.appendChild(el('span', 'pcard__top', p.n + ' — ' + p.cat));
    var h = el('h3', null, p.title); h.id = 'pmTitle';
    w.appendChild(h);
    w.appendChild(el('p', 'lead', p.blurb));
    w.appendChild(tagList(p.tags));
    (p.samples || []).forEach(function (s) {
      var d = el('div', 'sample');
      d.appendChild(el('h4', null, s.h));
      d.appendChild(el('p', null, s.p));
      d.appendChild(el('p', 'muted', 'Three reasons to buy:'));
      var ul = el('ul');
      s.l.forEach(function (x) { ul.appendChild(el('li', null, x)); });
      d.appendChild(ul);
      w.appendChild(d);
    });
    if (p.link) {
      var act = el('div', 'actions');
      var a = el('a', 'btn btn--primary', p.linkLabel + ' ↗');
      a.href = p.link; a.target = '_blank'; a.rel = 'noopener noreferrer';
      act.appendChild(a); w.appendChild(act);
    }
    body.appendChild(w);
    modal.showModal();
  }
  modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });

  /* ---- Toast + copy ---- */
  var toast = $('#toast'), tt;
  function say(msg) {
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }
  function copyMail() {
    var done = function () { say('Email copied'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done, function () { say(EMAIL); });
    } else { say(EMAIL); }
  }
  $('#copyMail').addEventListener('click', copyMail);

  /* ---- Command palette ---- */
  var pal = $('#palette'), palIn = $('#palInput'), palList = $('#palList');
  var COMMANDS = [
    { l: 'Go to Projects', k: 'section', f: function () { go('#projects'); } },
    { l: 'Go to Experience', k: 'section', f: function () { go('#experience'); } },
    { l: 'Go to Skills', k: 'section', f: function () { go('#skills'); } },
    { l: 'Go to About', k: 'section', f: function () { go('#about'); } },
    { l: 'Go to Contact', k: 'section', f: function () { go('#contact'); } },
    { l: 'Copy email address', k: 'action', f: copyMail },
    { l: 'Toggle light / dark theme', k: 'action', f: toggleTheme },
    { l: 'Open Figma design', k: 'link', f: function () { window.open(FIGMA, '_blank', 'noopener'); } }
  ];
  var shown = [], sel = 0;
  function go(h) { var t = $(h); if (t) t.scrollIntoView(); }
  function renderPal() {
    var q = palIn.value.trim().toLowerCase();
    shown = COMMANDS.filter(function (c) { return c.l.toLowerCase().indexOf(q) !== -1; });
    sel = Math.min(sel, Math.max(shown.length - 1, 0));
    palList.textContent = '';
    shown.forEach(function (c, i) {
      var li = el('li', null, c.l);
      li.appendChild(el('small', null, c.k));
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(i === sel));
      li.addEventListener('click', function () { run(i); });
      palList.appendChild(li);
    });
    if (!shown.length) palList.appendChild(el('li', 'muted', 'No matches'));
  }
  function run(i) { var c = shown[i]; if (!c) return; pal.close(); c.f(); }
  function openPal() { palIn.value = ''; sel = 0; renderPal(); if (!pal.open) pal.showModal(); palIn.focus(); }
  $('#openPalette').addEventListener('click', openPal);
  palIn.addEventListener('input', function () { sel = 0; renderPal(); });
  palIn.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, shown.length - 1); renderPal(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); renderPal(); }
    else if (e.key === 'Enter') { e.preventDefault(); run(sel); }
  });
  pal.addEventListener('click', function (e) { if (e.target === pal) pal.close(); });
  doc.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.open ? pal.close() : openPal(); }
  });

  /* ---- Active nav link ---- */
  var navA = $$('.nav__links a');
  var secs = navA.map(function (a) { return $(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) {
          navA.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { if (s) so.observe(s); });

    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); } });
    }, { threshold: 0.08 });
    $$('.reveal').forEach(function (r) { ro.observe(r); });
  } else {
    $$('.reveal').forEach(function (r) { r.classList.add('in'); });
  }

  /* ---- Contact form ---- */
  var form = $('#contactForm'), msg = $('#msg'), count = $('#msgCount'), status = $('#formStatus');
  msg.addEventListener('input', function () { count.textContent = msg.value.length + ' / 800'; });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = false;
    $$('[required]', form).forEach(function (f) {
      var invalid = !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
      f.setAttribute('aria-invalid', String(invalid));
      if (invalid) bad = true;
    });
    status.className = 'form-status';
    if (bad) { status.textContent = 'Please fill in all required fields correctly.'; status.classList.add('err'); return; }
    status.textContent = 'Sending…';
    var data = new URLSearchParams(new FormData(form)).toString();
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset(); count.textContent = '0 / 800';
        status.textContent = "Message sent! I'll get back to you soon."; status.classList.add('ok');
      })
      .catch(function () {
        status.textContent = 'Could not send. Please email ' + EMAIL + ' instead.'; status.classList.add('err');
      });
  });

  $('#year').textContent = new Date().getFullYear();
})();
