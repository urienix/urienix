/* ============================================================
   Urienix — main.js
   i18n · timeline & projects render · project details modal ·
   bubbles · glitch · scrollspy · reveal · CRT toggle · coin toss ·
   terminal typing
   ============================================================ */

(function () {
  'use strict';

  var I18N = window.URIENIX_I18N || {};
  var DATA = window.URIENIX_DATA || { jobs: [], projects: {} };
  var PROJECTS = DATA.projects || {};
  var PROJECT_GROUPS = [
    { key: 'work',     grid: '#projects-grid-work'     },
    { key: 'personal', grid: '#projects-grid-personal' },
  ];

  var STORAGE_LANG = 'urienix-lang';
  var STORAGE_CRT  = 'urienix-crt';

  var currentLang = 'en';

  /* ---------- Small helpers ---------- */

  function $ (sel, root) { return (root || document).querySelector(sel); }
  function $$ (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function on (el, ev, fn) { el && el.addEventListener(ev, fn); }
  function readLS (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function writeLS (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }

  function detectLang () {
    var url = new URLSearchParams(window.location.search).get('lang');
    if (url && I18N[url]) return url;
    var stored = readLS(STORAGE_LANG);
    if (stored && I18N[stored]) return stored;
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    return nav.toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  }

  function t (key) {
    var dict = I18N[currentLang] || {};
    return dict[key] != null ? dict[key] : key;
  }

  /* ---------- i18n paint ---------- */

  function applyLang (lang, animate) {
    if (!I18N[lang]) lang = 'en';
    currentLang = lang;
    var dict = I18N[lang];

    function paint () {
      document.documentElement.lang = dict['html.lang'];
      document.documentElement.setAttribute('data-lang', lang);
      document.title = dict['doc.title'];

      $$('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        var val = dict[key];
        if (val === undefined) return;

        if (el.tagName === 'META') {
          el.setAttribute('content', val);
          return;
        }
        // allow inline HTML in translated strings
        el.innerHTML = val;
        if (el.hasAttribute('data-glitch')) el.setAttribute('data-glitch', el.textContent);
      });

      $$('[data-i18n-title]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-title');
        if (dict[key] != null) el.setAttribute('title', dict[key]);
      });

      $$('[data-i18n-aria]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-aria');
        if (dict[key] != null) el.setAttribute('aria-label', dict[key]);
      });

      $$('[data-set-lang]').forEach(function (btn) {
        btn.setAttribute('aria-pressed', String(btn.getAttribute('data-set-lang') === lang));
      });

      renderTimeline();
      renderProjects();
      renderProjectModal();      // no-op unless a project is open
      typeTerminal();
    }

    if (!animate) { paint(); return; }
    document.body.classList.add('lang-swapping');
    window.setTimeout(function () {
      paint();
      document.body.classList.remove('lang-swapping');
    }, 150);
  }

  function initLangSwitch () {
    $$('[data-set-lang]').forEach(function (btn) {
      on(btn, 'click', function () {
        var lang = btn.getAttribute('data-set-lang');
        if (lang === currentLang) return;
        writeLS(STORAGE_LANG, lang);
        applyLang(lang, true);
      });
    });
  }

  /* ---------- Render: timeline ---------- */

  function renderTimeline () {
    var host = $('#timeline');
    if (!host) return;

    host.innerHTML = '';
    DATA.jobs.forEach(function (job, idx) {
      var li = document.createElement('li');
      li.className = 'tl-item' + (job.current ? ' is-current' : '');
      li.setAttribute('data-reveal', '');
      li.style.transitionDelay = (idx * 60) + 'ms';

      var atLabel = currentLang === 'es' ? '@' : '@';
      var loc     = job.location[currentLang];
      var product = job.product[currentLang];
      var role    = job.role[currentLang];
      var dates   = job.dates[currentLang];

      var tagsHtml = '';
      if (job.current) tagsHtml += '<li class="tl-tag tl-tag--current">' + t('career.current') + '</li>';
      if (job.remote)  tagsHtml += '<li class="tl-tag tl-tag--remote">'  + t('career.remote')  + '</li>';
      (job.tags || []).forEach(function (tg) {
        tagsHtml += '<li class="tl-tag">' + tg + '</li>';
      });

      var highlights = (job.highlights[currentLang] || []).map(function (h) {
        return '<li>' + h + '</li>';
      }).join('');

      li.innerHTML =
        '<div class="tl-head">' +
          '<span class="tl-role">' + role + '</span>' +
          '<span class="tl-at">' + atLabel + '</span>' +
          '<span class="tl-company">' + job.company + '</span>' +
          '<span class="tl-dates">' + dates + ' · ' + loc + '</span>' +
        '</div>' +
        '<ul class="tl-tags">' + tagsHtml + '</ul>' +
        '<p class="tl-desc">' + product + '</p>' +
        (highlights ? '<ul class="tl-highlights">' + highlights + '</ul>' : '');

      host.appendChild(li);
    });

    observeReveals();
  }

  /* ---------- Render: projects ----------
     Two grids, one per group in data.js (`work` and `personal`). Work cards
     carry a kicker with the employer and my role there; every card gets a
     Details button that opens the modal, and a link button when the project
     has somewhere public to go. */

  function findProject (id) {
    for (var g = 0; g < PROJECT_GROUPS.length; g++) {
      var list = PROJECTS[PROJECT_GROUPS[g].key] || [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) return { project: list[i], group: PROJECT_GROUPS[g].key };
      }
    }
    return null;
  }

  // Logo when there is one; a pixel monogram of the initials while there is
  // not. Adding `img` to the project in data.js is all it takes to swap.
  function projectMediaHtml (p) {
    if (p.img) {
      return '<img src="' + p.img + '" alt="' + p.name + ' logo" loading="lazy" />';
    }
    var initials = p.mono || p.name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();
    var accent   = p.accent || 'purple';
    return '<span class="project-mono project-mono--' + accent + '" aria-hidden="true">' + initials + '</span>';
  }

  function projectStatusHtml (p) {
    if (!p.status || p.status === 'live') return '';
    return '<p class="project-status">' + t('projects.status.' + p.status) + '</p>';
  }

  function projectLinkHtml (p, cls) {
    if (!p.href) return '';
    var label = (p.cta && p.cta[currentLang]) || t('projects.visit');
    return '<a class="project-btn ' + cls + '" href="' + p.href + '" target="_blank" rel="noopener">' +
             label + ' <span aria-hidden="true">↗</span>' +
           '</a>';
  }

  function tagsHtml (list) {
    return (list || []).map(function (tg) {
      return '<li class="project-tag">' + tg + '</li>';
    }).join('');
  }

  function renderProjectGrid (grid, list, group) {
    grid.innerHTML = '';
    list.forEach(function (p, idx) {
      var card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-reveal', '');
      card.style.transitionDelay = (idx * 80) + 'ms';

      var kicker = '';
      if (group === 'work' && p.client) {
        var role = p.role && p.role[currentLang];
        kicker =
          '<p class="project-kicker">' +
            '<span class="project-client">' + p.client + '</span>' +
            (role ? '<span class="project-role">' + role + '</span>' : '') +
          '</p>';
      }

      var tags = tagsHtml(p.tags);

      card.innerHTML =
        '<div class="project-media' + (p.plate ? ' project-media--plate' : '') + '">' + projectMediaHtml(p) + '</div>' +
        '<div class="project-body">' +
          kicker +
          '<h3 class="project-title">' + p.name + '</h3>' +
          '<p class="project-desc">' + p.desc[currentLang] + '</p>' +
          (tags ? '<ul class="project-tags">' + tags + '</ul>' : '') +
          '<div class="project-actions">' +
            '<button type="button" class="project-btn project-btn--primary" data-project="' + p.id + '">' +
              t('projects.details') +
            '</button>' +
            projectLinkHtml(p, 'project-btn--ghost') +
          '</div>' +
          projectStatusHtml(p) +
        '</div>';

      grid.appendChild(card);
    });
  }

  function renderProjects () {
    PROJECT_GROUPS.forEach(function (g) {
      var grid = $(g.grid);
      if (grid) renderProjectGrid(grid, PROJECTS[g.key] || [], g.key);
    });
    observeReveals();
  }

  /* ---------- Project details modal ----------
     One <dialog> in the page, filled on demand from data.js. Opening and
     closing go through showModal()/close() so Esc, focus trapping and the
     backdrop are the browser's job; we only lock the page scroll, put the
     focus back on the button that opened it, and repaint the contents when
     the language changes while it is open. */

  var modal = { el: null, body: null, foot: null, path: null, id: null, openerId: null };

  function renderProjectModal () {
    if (!modal.el || !modal.id) return;
    var found = findProject(modal.id);
    if (!found) return;

    var p     = found.project;
    var work  = found.group === 'work';
    var d     = p.details || {};
    var lang  = currentLang;
    var role  = p.role && p.role[lang];

    var kicker = work
      ? (role ? role + ' ' + t('modal.at') + ' ' : '') + '<strong>' + p.client + '</strong>'
      : t('modal.personal');

    function paras (items) {
      return items.map(function (x) { return '<p>' + x + '</p>'; }).join('');
    }
    function bullets (items) {
      return '<ul class="pm-list">' +
        items.map(function (x) { return '<li>' + x + '</li>'; }).join('') +
      '</ul>';
    }
    function section (title, html) {
      if (!html) return '';
      return '<section class="pm-section"><h3 class="pm-h">' + title + '</h3>' + html + '</section>';
    }
    function pick (block) {
      var items = block && block[lang];
      return items && items.length ? items : null;
    }

    var about = pick(d.about);
    var resp  = pick(d.responsibilities);
    var wins  = pick(d.achievements);
    var stack = tagsHtml(p.stack || p.tags);

    modal.path.textContent = 'urienix@moe:~/projects/' + p.id + '$';

    modal.body.innerHTML =
      '<header class="pm-hero">' +
        '<div class="pm-logo' + (p.plate ? ' pm-logo--plate' : '') + '">' + projectMediaHtml(p) + '</div>' +
        '<div class="pm-heading">' +
          '<p class="pm-kicker">' + kicker + '</p>' +
          '<h2 class="pm-title" id="pm-title">' + p.name + '</h2>' +
          '<p class="pm-tagline">' + p.desc[lang] + '</p>' +
          projectStatusHtml(p) +
        '</div>' +
      '</header>' +
      section(t('modal.about'), about && paras(about)) +
      section(t(work ? 'modal.resp' : 'modal.built'), resp && bullets(resp)) +
      section(t(work ? 'modal.wins' : 'modal.highlights'), wins && bullets(wins)) +
      section(t('modal.stack'), stack && '<ul class="project-tags">' + stack + '</ul>');

    modal.foot.innerHTML =
      projectLinkHtml(p, 'project-btn--primary') +
      '<button type="button" class="project-btn project-btn--ghost" data-modal-close>' +
        t('modal.close') +
      '</button>';
  }

  function openProject (id) {
    if (!modal.el || !findProject(id)) return;
    modal.id = id;
    modal.openerId = id;
    renderProjectModal();

    document.body.classList.add('modal-open');
    if (typeof modal.el.showModal === 'function') {
      if (!modal.el.open) modal.el.showModal();
    } else {
      modal.el.setAttribute('open', '');    // no top layer, but still usable
    }
    modal.body.scrollTop = 0;
  }

  function afterProjectClose () {
    document.body.classList.remove('modal-open');
    modal.id = null;

    // The cards may have been re-rendered while the modal was open (language
    // switch), so look the button up again instead of trusting an old node.
    var btn = modal.openerId && $('[data-project="' + modal.openerId + '"]');
    modal.openerId = null;
    if (btn && btn.focus) btn.focus();
  }

  function closeProject () {
    if (!modal.el || !modal.el.open) return;
    if (typeof modal.el.close === 'function') {
      modal.el.close();                     // fires 'close' -> afterProjectClose
    } else {
      modal.el.removeAttribute('open');
      afterProjectClose();
    }
  }

  function initProjectModal () {
    var el = $('#project-modal');
    if (!el) return;
    modal.el   = el;
    modal.body = $('#pm-body', el);
    modal.foot = $('#pm-foot', el);
    modal.path = $('#pm-path', el);

    // One listener for every Details / Close button, present or future.
    on(document, 'click', function (e) {
      var target = e.target;
      if (!target || !target.closest) return;

      var opener = target.closest('[data-project]');
      if (opener) { openProject(opener.getAttribute('data-project')); return; }

      if (target.closest('[data-modal-close]')) closeProject();
    });

    // A click on the backdrop lands on the dialog itself, never on .pm-window.
    on(el, 'click', function (e) { if (e.target === el) closeProject(); });

    on(el, 'close', afterProjectClose);
  }

  /* ---------- Bubbles ---------- */

  function initBubbles () {
    var host = $('#bubbles');
    if (!host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var count = window.innerWidth < 640 ? 12 : 22;
    var frag = document.createDocumentFragment();
    var palette = ['#BD93F9', '#80FFEA', '#FF80BF'];

    for (var i = 0; i < count; i++) {
      var b = document.createElement('span');
      var size = 3 + Math.floor(Math.random() * 4) * 2; // 3–9 px
      b.className = 'bubble';
      b.style.left = (Math.random() * 100).toFixed(2) + '%';
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.animationDuration = (11 + Math.random() * 18).toFixed(1) + 's';
      b.style.animationDelay = (-Math.random() * 22).toFixed(1) + 's';
      b.style.background = palette[Math.floor(Math.random() * palette.length)];
      frag.appendChild(b);
    }
    host.appendChild(frag);
  }

  /* ---------- Glitch on hero title ---------- */

  function initGlitch () {
    var el = $('.hero-title');
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function fire () {
      el.classList.add('is-glitching');
      window.setTimeout(function () {
        el.classList.remove('is-glitching');
      }, 120 + Math.random() * 140);
      window.setTimeout(fire, 4500 + Math.random() * 5500);
    }
    window.setTimeout(fire, 2200);
  }

  /* ---------- Scroll-spy for nav links ---------- */

  function initScrollSpy () {
    var links = $$('.nav-links a[href^="#"]');
    if (!links.length) return;

    var byId = {};
    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) byId[id] = { link: a, section: section };
    });

    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        if (!byId[id]) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('is-active'); });
          byId[id].link.classList.add('is-active');
        }
      });
    }, {
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    });

    Object.keys(byId).forEach(function (id) {
      observer.observe(byId[id].section);
    });
  }

  /* ---------- Reveal on scroll ---------- */

  var revealObserver = null;
  function observeReveals () {
    if (!('IntersectionObserver' in window)) {
      // Feature not available: keep everything visible (default state).
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-hidden');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    }
    var vh = window.innerHeight || document.documentElement.clientHeight;
    $$('[data-reveal]').forEach(function (el) {
      if (el.dataset.revealObserved) return;
      el.dataset.revealObserved = '1';

      // If the element is already inside (or above) the initial viewport, leave
      // it visible immediately — no need to wait for the observer callback.
      var top = el.getBoundingClientRect().top;
      if (top < vh * 0.9) return;

      el.classList.add('reveal-hidden');
      revealObserver.observe(el);
    });
  }

  function markStaticSectionsForReveal () {
    // Wrap section-head and content blocks so they animate in as well
    $$('.section .section-head, .projects-group-head, .about-card, .skill-card, .contact-card').forEach(function (el) {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
    });
    observeReveals();
  }

  /* ---------- CRT toggle ---------- */

  function initCRTToggle () {
    var btn = $('#crt-toggle');
    if (!btn) return;

    // CRT is ON by default. Only turn it off if the user has explicitly
    // opted out in a previous visit.
    var stored = readLS(STORAGE_CRT);
    var isOff  = stored === '0';
    document.body.classList.toggle('crt-off', isOff);
    btn.setAttribute('aria-pressed', String(!isOff));

    on(btn, 'click', function () {
      var nowOff = document.body.classList.toggle('crt-off');
      btn.setAttribute('aria-pressed', String(!nowOff));
      writeLS(STORAGE_CRT, nowOff ? '0' : '1');
    });
  }

  /* ---------- Terminal typing ----------
     The hero terminal writes itself out line by line. The text is already in
     the DOM (i18n put it there), so this empties the lines and gives them
     back one character at a time, dragging the caret along.

     Re-running is the normal case, not the exception: every language repaint
     calls this again, so each run takes a ticket and older runs stop as soon
     as they notice a newer one exists. */

  var typeTicket = 0;

  function typeTerminal () {
    var body  = $('.term-body');
    var caret = $('.caret');
    if (!body) return;

    var lines = $$('p', body).map(function (p) {
      return { p: p, span: $('[data-i18n]', p) };
    }).filter(function (l) { return l.span; });
    if (!lines.length) return;

    var ticket = ++typeTicket;
    var last   = lines[lines.length - 1];

    // Split by code point, not by string index: the lines carry emoji, and
    // slicing those down the middle paints half a character.
    lines.forEach(function (l) { l.chars = Array.from(l.span.textContent); });

    // From here on the lines are ours to show; the stylesheet keeps them
    // hidden until this class says the script is driving.
    body.classList.add('is-live');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (caret) last.p.appendChild(caret);
      return;                       // i18n already left the full text in place
    }

    // Freeze each line at the height it has while full. Emptying them would
    // otherwise collapse the block and drag everything below it upwards.
    lines.forEach(function (l) {
      l.p.style.minHeight = l.p.getBoundingClientRect().height + 'px';
      l.span.textContent = '';
    });
    body.setAttribute('aria-busy', 'true');

    var li = 0, ci = 0;

    function step () {
      if (ticket !== typeTicket) return;      // a newer run took over

      var line = lines[li];
      if (caret && caret.parentNode !== line.p) line.p.appendChild(caret);

      if (ci < line.chars.length) {
        line.span.textContent += line.chars[ci++];
        window.setTimeout(step, 8 + Math.random() * 11);
        return;
      }

      li++; ci = 0;
      if (li < lines.length) { window.setTimeout(step, 170); return; }

      lines.forEach(function (l) { l.p.style.minHeight = ''; });
      body.removeAttribute('aria-busy');
    }

    window.setTimeout(step, 300);
  }

  /* ---------- Coin toss ----------
     Hover already flips the coin. A click throws it: it jumps, spins two full
     turns in the air and lands with a squash. The spin rides on
     .hero-coin-inner, the same element hover drives, so the two never fight
     over one property — and .hero-coin keeps floating underneath, which is
     what makes the jump read as a throw rather than a slide.

     Two full turns (not one and a half) means it lands on the face it left
     from, so nothing has to be remembered: when the animation clears, CSS
     takes the wheel again and hover decides which side is up. */

  function initCoinToss () {
    var wrap  = $('.hero-avatar-wrap');
    var coin  = wrap && $('.hero-coin', wrap);
    var inner = wrap && $('.hero-coin-inner', wrap);

    // Without the Web Animations API the coin simply stays a hover-only
    // trick, which is a perfectly good place to land.
    if (!coin || !inner || !inner.animate) return;

    var tossing = false;

    // Listen on the coin, not the wrapper: the wrapper is 200px wide and the
    // coin is 180px, so a click in that 10px margin would throw a coin the
    // cursor never said was clickable.
    on(coin, 'click', function () {
      if (tossing) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Where the coin is right now: mid-hover it already sits at 180deg, so
      // the throw has to start there or it would snap before it jumps.
      var base = wrap.matches(':hover') ? 180 : 0;
      var spin = function (deg) { return 'rotateY(' + (base + deg) + 'deg)'; };

      tossing = true;
      var anim = inner.animate([
        { offset: 0,    transform: 'translateY(0) scale(1, 1) '           + spin(0)   },
        { offset: 0.12, transform: 'translateY(-6px) scale(0.94, 1.08) '  + spin(60)  },
        { offset: 0.44, transform: 'translateY(-54px) scale(1.06, 1.06) ' + spin(430) },
        { offset: 0.78, transform: 'translateY(-6px) scale(1, 1) '        + spin(670) },
        { offset: 0.88, transform: 'translateY(0) scale(1.1, 0.9) '       + spin(710) },
        { offset: 1,    transform: 'translateY(0) scale(1, 1) '           + spin(720) }
      ], {
        duration: 1150,
        easing: 'cubic-bezier(0.33, 0, 0.32, 1)'
      });

      anim.onfinish = anim.oncancel = function () { tossing = false; };
    });
  }

  /* ---------- Year ---------- */

  function initYear () {
    var el = $('#year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Boot ---------- */

  function boot () {
    applyLang(detectLang(), false);
    initLangSwitch();
    initBubbles();
    initGlitch();
    initScrollSpy();
    markStaticSectionsForReveal();
    initCRTToggle();
    initCoinToss();
    initProjectModal();
    initYear();

    // If the URL loaded with a hash, browsers usually scroll for us — but they
    // sometimes race with our async render. Nudge them once everything is in.
    if (window.location.hash) {
      window.requestAnimationFrame(function () {
        var el = document.querySelector(window.location.hash);
        if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
