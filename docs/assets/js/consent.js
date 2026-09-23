/* ============================================================
   Urienix — Consentimiento y analitica
   ------------------------------------------------------------
   Google Analytics NO se carga al abrir la pagina. Se inyecta solo
   despues de que el visitante acepta, y la decision se recuerda.
   Mientras no acepte, el sitio no hace ni una peticion a Google y
   no existe ninguna cookie.

   Por que asi y no pegando el fragmento que da Google:
     · GA4 escribe _ga y _ga_XXXXXXXXXX y manda la IP del visitante
       a Google. Eso es almacenamiento y acceso al equipo del
       usuario, y tratamiento de datos personales: necesita permiso
       ANTES, no despues.
     · El fragmento oficial carga en cuanto se pinta la pagina.
       Para cuando un banner preguntara, la cookie ya esta puesta
       y la peticion ya salio. Preguntar entonces no vale nada.
     · Consent Mode v2 se declara con todo denegado antes de que
       exista el contenedor, que es el orden que pide Google.

   El <noscript> con el iframe de GTM se omite a proposito: sin
   JavaScript no hay forma de recoger consentimiento, asi que
   tampoco puede haber medicion.

   El fragmento oficial de GA4 tampoco esta pegado en el HTML. Ese
   <script async src="...gtag/js?id=..."> dispara en cuanto el
   navegador lo lee, antes de que nadie pueda decir que no.
   ============================================================ */

(function (window, document) {
  'use strict';

  /* ---------- Configuracion ---------- */

  var ANALYTICS = {
    /* Interruptor general. En false no se pinta el banner, no se
       carga nada y el sitio queda sin un solo tercero. */
    enabled: true,

    /* Como se mide. Un modo, nunca los dos.
         'gtag' · GA4 directo. Menos piezas, menos superficie.
         'gtm'  · Contenedor de Tag Manager. Elegirlo solo si se van
                  a gestionar varias etiquetas desde su interfaz; en
                  ese caso la etiqueta de GA4 se configura DENTRO del
                  contenedor, con el mismo measurementId de abajo.
         'off'  · Ni banner ni peticiones.

       ATENCION: poner gtag.js y GTM a la vez, cada uno con GA4,
       hace que cada visita se cuente dos veces. Google entrega los
       dos fragmentos porque no sabe cual vas a usar, no para que
       pegues ambos. */
    mode: 'gtag',

    /* GA4 directo. El ID del flujo de datos de urienix.moe. */
    measurementId: 'G-SHY7QFSKDR',

    /* Contenedor de Google Tag Manager. Solo se usa con mode 'gtm'.
       Se conserva por si algun dia hace falta: cambiar de modo es
       cambiar la linea de arriba, nada mas. */
    gtmId: 'GTM-NSLZ4J2V',

    /* Publicidad. En false, aceptar habilita solo medicion: las
       senales de anuncios siguen denegadas aunque la medicion
       ya este cargada.
       Ponerlo en true exige rehacer el texto del banner y de la
       politica de cookies: el permiso que se pide tiene que
       cubrir lo que de verdad se activa. */
    ads: false
  };

  /* Version del consentimiento. Subirla invalida las decisiones
     guardadas y vuelve a preguntar. Se sube cuando cambia QUE se
     activa, no cuando cambia la redaccion. */
  var CONSENT_VERSION = 1;
  var STORAGE_KEY = 'urienix-consent';

  /* ---------- Almacenamiento ---------- */

  function readDecision() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var saved = JSON.parse(raw);
      if (saved.v !== CONSENT_VERSION) return null;
      return saved.state === 'granted' ? 'granted' : 'denied';
    } catch (e) {
      return null;
    }
  }

  function writeDecision(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        v: CONSENT_VERSION,
        state: state,
        at: new Date().toISOString()
      }));
    } catch (e) { /* modo privado: la decision dura lo que la pestana */ }
  }

  /* ---------- Consent Mode v2 ---------- */

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function setDefaults() {
    /* Mientras la publicidad siga denegada, Google quita los
       identificadores de clic de anuncio de las peticiones en vez
       de mandarlos y prometer no usarlos. */
    gtag('set', 'ads_data_redaction', true);

    /* Todo denegado de salida, incluidas las dos senales que
       Consent Mode v2 anadio para publicidad. */
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500
    });
  }

  function grantConsent() {
    var update = { analytics_storage: 'granted' };
    if (ANALYTICS.ads) {
      update.ad_storage = 'granted';
      update.ad_user_data = 'granted';
      update.ad_personalization = 'granted';
    }
    gtag('consent', 'update', update);
  }

  /* ---------- Carga de la medicion ----------
     Se inyecta el <script> a mano en vez de dejarlo en el HTML: es
     la unica forma de que no salga ni una peticion antes del
     permiso. El fragmento en linea que da Google tampoco haria
     falta aqui, porque la cola de dataLayer y la funcion gtag ya
     estan declaradas arriba; de paso, la politica de seguridad de
     contenido puede quedarse sin 'unsafe-inline'. */

  var loaded = false;

  function addScript(src) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
  }

  function loadAnalytics() {
    if (loaded || !ANALYTICS.enabled) return;

    if (ANALYTICS.mode === 'gtag' && ANALYTICS.measurementId) {
      loaded = true;
      addScript('https://www.googletagmanager.com/gtag/js?id=' +
                encodeURIComponent(ANALYTICS.measurementId));
      gtag('js', new Date());
      gtag('config', ANALYTICS.measurementId);
      return;
    }

    if (ANALYTICS.mode === 'gtm' && ANALYTICS.gtmId) {
      loaded = true;
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      addScript('https://www.googletagmanager.com/gtm.js?id=' +
                encodeURIComponent(ANALYTICS.gtmId));
    }
  }

  /* ---------- Borrado de cookies al revocar ----------
     Revocar tiene que retirar lo que ya se escribio, si no la
     retirada es de boquilla. GA4 escribe en el dominio y en el
     dominio con punto delante, asi que hay que tachar ambos. */

  function clearAnalyticsCookies() {
    var names = document.cookie.split(';').map(function (c) {
      return c.split('=')[0].trim();
    }).filter(function (n) {
      return n.indexOf('_ga') === 0 || n.indexOf('_gid') === 0 || n.indexOf('_gcl') === 0;
    });

    var host = window.location.hostname;
    var domains = [host, '.' + host];
    var parts = host.split('.');
    if (parts.length > 2) domains.push('.' + parts.slice(-2).join('.'));

    names.forEach(function (name) {
      domains.forEach(function (d) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + d;
      });
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    });
  }

  /* ---------- Banner ----------
     No es modal a proposito: no atrapa el foco ni tapa el
     contenido, y no hace falta que lo haga, porque nada se carga
     hasta que hay respuesta. Los dos botones pesan lo mismo, y
     rechazar se hace en un clic, igual que aceptar. */

  var banner = null;
  var lastFocus = null;

  function buildBanner() {
    var el = document.getElementById('consent-banner');
    if (!el) return null;

    el.querySelector('[data-consent="accept"]')
      .addEventListener('click', function () { decide('granted'); });

    el.querySelector('[data-consent="reject"]')
      .addEventListener('click', function () { decide('denied'); });

    /* Escape equivale a rechazar: la salida rapida nunca puede
       ser la opcion que mas datos entrega. */
    el.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') {
        ev.stopPropagation();
        decide('denied');
      }
    });

    return el;
  }

  function showBanner() {
    if (!banner) banner = buildBanner();
    if (!banner) return;
    lastFocus = document.activeElement;
    banner.hidden = false;
    /* El foco va al dialogo para que un lector de pantalla lo
       anuncie: es lo primero que hay que resolver al entrar. */
    window.setTimeout(function () { banner.focus(); }, 60);
  }

  function hideBanner() {
    if (!banner) return;
    banner.hidden = true;
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
    lastFocus = null;
  }

  function decide(state) {
    writeDecision(state);
    if (state === 'granted') {
      grantConsent();
      loadAnalytics();
    } else {
      gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied'
      });
      clearAnalyticsCookies();
    }
    hideBanner();
    reflectState(state);
  }

  /* ---------- Estado visible ----------
     Este sitio no tiene pagina de cookies: el enlace del pie vuelve
     a abrir el banner, que es donde se cambia la decision. Retirar
     el permiso cuesta lo mismo que darlo: un clic, siempre a mano.
     Los huecos [data-consent="state"] son opcionales; si algun dia
     hay una pagina de cookies, se pintan solos. */

  function reflectState(state) {
    var slot = document.querySelector('[data-consent="state"]');
    if (slot) {
      slot.setAttribute('data-state', state || 'unset');
      var lang = document.documentElement.getAttribute('data-lang') === 'es' ? 'es' : 'en';
      var WORDS = {
        en: { granted: 'Accepted', denied: 'Rejected', unset: 'Not chosen yet' },
        es: { granted: 'Aceptada', denied: 'Rechazada', unset: 'Sin elegir' }
      };
      slot.textContent = WORDS[lang][state || 'unset'];
    }

    document.querySelectorAll('[data-consent="revoke"]').forEach(function (btn) {
      btn.hidden = state !== 'granted';
    });
    document.querySelectorAll('[data-consent="reopen"]').forEach(function (btn) {
      btn.hidden = false;
    });
  }

  function initControls() {
    document.querySelectorAll('[data-consent="revoke"]').forEach(function (btn) {
      btn.addEventListener('click', function () { decide('denied'); });
    });
    document.querySelectorAll('[data-consent="reopen"]').forEach(function (btn) {
      btn.addEventListener('click', function () { showBanner(); });
    });
  }

  /* ---------- Arranque ---------- */

  function start() {
    initControls();

    if (!ANALYTICS.enabled) {
      var b = document.getElementById('consent-banner');
      if (b) b.remove();
      reflectState('denied');
      return;
    }

    setDefaults();

    var decision = readDecision();
    reflectState(decision);

    if (decision === 'granted') {
      grantConsent();
      loadAnalytics();
    } else if (decision === null) {
      showBanner();
    }
    /* decision === 'denied': ni banner ni peticiones. Se puede
       cambiar desde la politica de cookies. */
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  window.URIENIX_CONSENT = {
    state: readDecision,
    open: showBanner,
    config: ANALYTICS
  };

})(window, document);
