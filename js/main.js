(function () {
  'use strict';
  var doc = document;
  doc.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };

  var EMAIL = 'Vincentsomido25@gmail.com';
  var FIGMA = 'https://www.figma.com/design/KcfBr5rP8VCogzmRrIuXcB/Untitled?node-id=0-1&t=f7EvUwokFbCWzGDb-1';

  var PROJECTS = [
    { n: '01', cat: 'E-Commerce · Multi-page demo', title: 'Lumière — Luxury Fashion',
      blurb: 'A multi-page luxury fashion website with real product photography, working shop with filters and sorting, brand story, and contact form.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'], demo: 'demos/lumiere/index.html' },
    { n: '02', cat: 'Dashboard · Interactive demo', title: 'DevDash — Analytics UI',
      blurb: 'A responsive analytics console with custom SVG revenue charts, sortable orders, CSV export and a working theme switch.',
      tags: ['HTML', 'CSS', 'JavaScript', 'SVG'], demo: 'demos/devdash/index.html' },
    { n: '03', cat: 'Productivity · Interactive demo', title: 'Taskly — Kanban Board',
      blurb: 'A local-first kanban board with drag-and-drop, inline editing, label filters, JSON export and a keyboard-friendly flow.',
      tags: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'], demo: 'demos/taskly/index.html' },
    { n: '04', cat: 'Inventory · Interactive demo', title: 'ShopManager — Inventory System',
      blurb: 'A studio inventory ledger with search, filters, restocking, a reorder queue, reporting and CSV export.',
      tags: ['HTML', 'CSS', 'JavaScript', 'CRUD UI'], demo: 'demos/shopmanager/index.html' },
    { n: '05', cat: 'Product finder · On-device demo', title: 'Aura — Scent Finder',
      blurb: 'Describe a mood, note or budget in plain language and Aura ranks sixteen fragrances entirely in the browser — no API calls.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Local data'], demo: 'demos/aura/index.html' },
    { n: '06', cat: 'E-Commerce · Copywriting', title: 'Listed — Product Copy Studio',
      blurb: 'A product copy workspace built from real fashion listing work: benefit-led descriptions, fabric and size details, search metadata and a live readiness check.',
      tags: ['Product Listing', 'Copywriting', 'SEO', 'HTML/CSS/JS'], demo: 'demos/listed/index.html',
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
  function setTheme(t) {
    root.dataset.theme = t;
    try { localStorage.setItem('theme', t); } catch (e) {}
  }
  function toggleTheme() { setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'); }
  $$('[data-set-theme]').forEach(function (b) {
    b.addEventListener('click', function () { setTheme(b.getAttribute('data-set-theme')); });
  });

  /* ---- Mobile sidebar ---- */
  var menuBtn = $('#menuBtn'), side = $('#sidebar'), scrim = $('#scrim');
  function sideOpen(open) {
    side.classList.toggle('open', open);
    scrim.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', function () { sideOpen(!side.classList.contains('open')); });
  scrim.addEventListener('click', function () { sideOpen(false); });
  side.addEventListener('click', function (e) { if (e.target.closest('.side-nav a')) sideOpen(false); });

  /* ---- Projects carousel ---- */
  var stage = $('#stage'), modal = $('#projectModal'), body = $('#pmBody'), counter = $('#carCount');
  var cards = [], idx = 0;
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  PROJECTS.forEach(function (p, i) {
    var b = el('div', 'pcard');
    b.setAttribute('role', 'group');
    b.setAttribute('aria-label', p.title);
    b.appendChild(el('span', 'lbl', p.cat));
    b.appendChild(el('h3', null, p.title));
    b.appendChild(el('p', null, p.blurb));
    b.appendChild(tagList(p.tags));
    if (p.demo) {
      var demoTag = el('span', 'more', 'Open demo →');
      b.appendChild(demoTag);
    } else {
      b.appendChild(el('span', 'more', 'View details →'));
    }
    b.addEventListener('click', function () {
      if (i === idx) { openProject(i); } else { idx = i; layout(); }
    });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); b.click(); }
    });
    stage.appendChild(b);
    cards.push(b);
  });
  function layout() {
    var narrow = stage.clientWidth < 520;
    cards.forEach(function (c, i) {
      var d = i - idx, a = Math.abs(d);
      var x = d * (narrow ? 52 : 62), r = d * 6, sc = d === 0 ? 1 : 0.9;
      c.style.transform = 'translateX(' + x + '%) rotate(' + r + 'deg) scale(' + sc + ')';
      c.style.opacity = a > 1 ? 0 : (d === 0 ? 1 : 0.85);
      c.style.zIndex = String(10 - a);
      c.style.pointerEvents = a > 1 ? 'none' : 'auto';
      c.classList.toggle('is-center', d === 0);
      c.setAttribute('aria-hidden', a > 1 ? 'true' : 'false');
      c.tabIndex = d === 0 ? 0 : -1;
    });
    counter.textContent = pad(idx + 1) + ' / ' + pad(PROJECTS.length);
  }
  function step(n) { idx = Math.max(0, Math.min(PROJECTS.length - 1, idx + n)); layout(); }
  $('#prev').addEventListener('click', function () { step(-1); });
  $('#next').addEventListener('click', function () { step(1); });
  stage.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { step(-1); } else if (e.key === 'ArrowRight') { step(1); }
  });
  var tx = null;
  stage.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (tx == null) return;
    var dx = e.changedTouches[0].clientX - tx;
    tx = null;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  });
  window.addEventListener('resize', layout);
  layout();

  function openProject(i) {
    var p = PROJECTS[i];
    body.textContent = '';
    var w = el('div', 'pm');
    w.appendChild(el('span', 'lbl', p.n + ' — ' + p.cat));
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
    var act = el('div', 'actions');
    if (p.demo) {
      var demoLink = el('a', 'btn btn--primary', 'Open live demo ↗');
      demoLink.href = p.demo; demoLink.target = '_blank'; demoLink.rel = 'noopener noreferrer';
      act.appendChild(demoLink);
    }
    if (p.link) {
      var a = el('a', 'btn', p.linkLabel + ' ↗');
      a.href = p.link; a.target = '_blank'; a.rel = 'noopener noreferrer';
      act.appendChild(a);
    }
    if (act.childNodes.length) w.appendChild(act);
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
  function go(h) { var t = $(h); if (t) t.scrollIntoView(); }
  var COMMANDS = [
    { l: 'Go to Projects', k: 'section', f: function () { go('#projects'); } },
    { l: 'Go to Experience', k: 'section', f: function () { go('#experience'); } },
    { l: 'Go to Stack', k: 'section', f: function () { go('#stack'); } },
    { l: 'Go to Skills', k: 'section', f: function () { go('#skills'); } },
    { l: 'Go to About', k: 'section', f: function () { go('#about'); } },
    { l: 'Go to Contact', k: 'section', f: function () { go('#contact'); } },
    { l: 'Copy email address', k: 'action', f: copyMail },
    { l: 'Toggle light / dark theme', k: 'action', f: toggleTheme },
    { l: 'Open Figma design', k: 'link', f: function () { window.open(FIGMA, '_blank', 'noopener'); } }
  ];
  var shown = [], sel = 0;
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
  $('#openPalette').addEventListener('click', function () { sideOpen(false); openPal(); });
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

  /* ---- Active nav link + reveal ---- */
  var navA = $$('.side-nav a');
  var secs = navA.map(function (a) { return $(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) {
          navA.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
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
