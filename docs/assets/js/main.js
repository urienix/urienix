/* ============================================================
   Urienix — main.js
   i18n · timeline & projects render · bubbles · glitch ·
   scrollspy · reveal · CRT toggle
   ============================================================ */

(function () {
  'use strict';

  var I18N = window.URIENIX_I18N || {};
  var DATA = window.URIENIX_DATA || { jobs: [], projects: [] };

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

      $$('[data-set-lang]').forEach(function (btn) {
        btn.setAttribute('aria-pressed', String(btn.getAttribute('data-set-lang') === lang));
      });

      renderTimeline();
      renderProjects();
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

  /* ---------- Render: projects ---------- */

  function renderProjects () {
    var grid = $('#projects-grid');
    if (!grid) return;

    grid.innerHTML = '';
    DATA.projects.forEach(function (p, idx) {
      var card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-reveal', '');
      card.style.transitionDelay = (idx * 80) + 'ms';

      var tags = (p.tags || []).map(function (tg) {
        return '<li class="project-tag">' + tg + '</li>';
      }).join('');

      card.innerHTML =
        '<div class="project-media">' +
          '<img src="' + p.img + '" alt="' + p.name + ' preview" />' +
        '</div>' +
        '<div class="project-body">' +
          '<h3 class="project-title">' + p.name + '</h3>' +
          '<p class="project-desc">' + p.desc[currentLang] + '</p>' +
          (tags ? '<ul class="project-tags">' + tags + '</ul>' : '') +
          '<a class="project-cta" href="' + p.href + '" target="_blank" rel="noopener">' +
            p.cta[currentLang] + ' →' +
          '</a>' +
        '</div>';

      grid.appendChild(card);
    });

    observeReveals();
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
    $$('.section .section-head, .about-card, .skill-card, .contact-card').forEach(function (el) {
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
