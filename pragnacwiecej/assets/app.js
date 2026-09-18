/* Pragnąc Więcej — interakcje. Bez zależności; strona działa też bez JS. */
(function () {
  'use strict';

  var html = document.documentElement;
  html.classList.remove('bez-js');

  var mniejRuchu = window.matchMedia('(prefers-reduced-motion: reduce)');
  var naglowek = document.getElementById('naglowek');

  /* =====================================================================
     Płynne przewijanie z bezwładnością (jak lenis w szablonie).
     Przechwytujemy kółko i sami interpolujemy pozycję; klawiatura,
     pasek przewijania i kotwice działają dalej natywnie.
     ===================================================================== */
  var Plynne = (function () {
    var wlaczone = false, cel = 0, biezaca = 0, klatka = null;
    var LERP = 0.11;            // im mniej, tym dłuższy wybieg
    var PROG = 0.4;             // poniżej tej różnicy dociągamy do celu

    function maxScroll() {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }
    function ogranicz(y) { return Math.min(Math.max(y, 0), maxScroll()); }

    function petla() {
      var roznica = cel - biezaca;
      if (Math.abs(roznica) < PROG) {
        biezaca = cel;
        window.scrollTo(0, biezaca);
        klatka = null;
        return;
      }
      biezaca += roznica * LERP;
      window.scrollTo(0, biezaca);
      klatka = window.requestAnimationFrame(petla);
    }

    function start() {
      if (klatka === null) klatka = window.requestAnimationFrame(petla);
    }

    function stop() {
      if (klatka !== null) { window.cancelAnimationFrame(klatka); klatka = null; }
    }

    function naKolko(e) {
      if (e.ctrlKey) return;
      // Elementy z własnym przewijaniem i otwarty modal zostają przy natywnym.
      if (e.target.closest && e.target.closest('dialog[open], [data-wlasne-przewijanie]')) return;
      e.preventDefault();
      cel = ogranicz(cel + e.deltaY);
      start();
    }

    // Cokolwiek przewinie stronę poza nami (klawiatura, pasek, kotwica,
    // przywrócenie pozycji) ma pierwszeństwo — dorównujemy, zamiast walczyć.
    function naPrzewijanie() {
      if (Math.abs(window.scrollY - biezaca) > 2) {
        stop();
        cel = biezaca = window.scrollY;
      }
    }

    return {
      wlacz: function () {
        if (wlaczone) return;
        // Tylko mysz. Na touchpadzie i dotyku natywne przewijanie jest lepsze
        // niż cokolwiek, co tu napiszemy.
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        wlaczone = true;
        cel = biezaca = window.scrollY;
        html.classList.add('lenis', 'lenis-smooth');
        window.addEventListener('wheel', naKolko, { passive: false });
        window.addEventListener('scroll', naPrzewijanie, { passive: true });
        window.addEventListener('resize', function () { cel = ogranicz(cel); });
      },
      aktywne: function () { return wlaczone; },
      zsynchronizuj: function () { stop(); cel = biezaca = window.scrollY; },
      przewinDo: function (y) {
        if (!wlaczone) return false;
        cel = ogranicz(y);
        biezaca = window.scrollY;
        start();
        return true;
      }
    };
  })();

  if (!mniejRuchu.matches) Plynne.wlacz();

  /* Kotwice jadą tym samym silnikiem, więc przewijanie do sekcji ma tę samą
     bezwładność co kółko myszy (a bez JS działa natywny scroll-behavior). */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute('href');
    if (!id || id === '#') return;
    var cel = document.querySelector(id);
    if (!cel) return;

    var odstep = parseFloat(getComputedStyle(html).scrollPaddingTop) || 0;
    var y = window.scrollY + cel.getBoundingClientRect().top - odstep;
    if (Plynne.przewinDo(y)) {
      e.preventDefault();
      if (history.replaceState) history.replaceState(null, '', id);
      // Fokus idzie do sekcji, żeby klawiatura nie zostawała na górze strony.
      cel.setAttribute('tabindex', '-1');
      cel.focus({ preventScroll: true });
    }
  });

  /* =====================================================================
     Nagłówek: cień po odklejeniu, chowanie przy przewijaniu w dół
     ===================================================================== */
  if (naglowek) {
    var ostatniY = window.scrollY;
    var tykanie = false;

    var aktualizuj = function () {
      tykanie = false;
      var y = window.scrollY;
      naglowek.dataset.przypiety = y > 12 ? 'true' : 'false';

      var wDol = y > ostatniY && y > 320;
      var menuOtwarte = przyciskMenu && przyciskMenu.getAttribute('aria-expanded') === 'true';
      if (!menuOtwarte && !naglowek.contains(document.activeElement)) {
        naglowek.dataset.schowany = wDol ? 'true' : 'false';
      }
      ostatniY = y;
    };

    window.addEventListener('scroll', function () {
      if (tykanie) return;
      tykanie = true;
      window.requestAnimationFrame(aktualizuj);
    }, { passive: true });

    naglowek.addEventListener('focusin', function () { naglowek.dataset.schowany = 'false'; });
  }

  /* =====================================================================
     Menu mobilne
     ===================================================================== */
  var przyciskMenu = document.getElementById('menu-przycisk');
  var nawigacja = document.getElementById('nawigacja');

  if (przyciskMenu && nawigacja) {
    var ustawMenu = function (otwarte) {
      przyciskMenu.setAttribute('aria-expanded', String(otwarte));
      przyciskMenu.setAttribute('aria-label', otwarte ? 'Zamknij menu' : 'Otwórz menu');
      nawigacja.dataset.otwarte = String(otwarte);
      if (otwarte && naglowek) naglowek.dataset.schowany = 'false';
    };

    przyciskMenu.addEventListener('click', function () {
      ustawMenu(przyciskMenu.getAttribute('aria-expanded') !== 'true');
    });

    nawigacja.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) ustawMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && przyciskMenu.getAttribute('aria-expanded') === 'true') {
        ustawMenu(false); przyciskMenu.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (przyciskMenu.getAttribute('aria-expanded') !== 'true') return;
      if (!e.target.closest('#nawigacja, #menu-przycisk')) ustawMenu(false);
    });

    var szeroki = window.matchMedia('(min-width: 60rem)');
    var naZmiane = function (e) { if (e.matches) ustawMenu(false); };
    if (szeroki.addEventListener) szeroki.addEventListener('change', naZmiane);
    else if (szeroki.addListener) szeroki.addListener(naZmiane);
  }

  /* =====================================================================
     Okno zapisu
     ===================================================================== */
  var okno = document.getElementById('okno-zapisu');

  if (okno) {
    var ostatnioAktywny = null;
    var natywny = typeof okno.showModal === 'function';

    var fokusowalne = function () {
      return Array.prototype.filter.call(
        okno.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
        function (el) { return el.offsetParent !== null; }
      );
    };

    var otworz = function (wyzwalacz) {
      ostatnioAktywny = wyzwalacz || document.activeElement;
      if (natywny) okno.showModal(); else okno.setAttribute('open', '');
      document.body.classList.add('is-zablokowane');
      var pierwszy = fokusowalne()[0];
      if (pierwszy) pierwszy.focus();
    };

    var zamknij = function () {
      if (natywny && okno.open) okno.close(); else okno.removeAttribute('open');
      document.body.classList.remove('is-zablokowane');
      Plynne.zsynchronizuj();
      if (ostatnioAktywny && ostatnioAktywny.focus) ostatnioAktywny.focus();
      ostatnioAktywny = null;
    };

    document.querySelectorAll('[data-otwiera-okno]').forEach(function (b) {
      b.addEventListener('click', function () { otworz(b); });
    });
    okno.querySelectorAll('[data-zamyka-okno]').forEach(function (b) {
      b.addEventListener('click', zamknij);
    });
    okno.addEventListener('click', function (e) { if (e.target === okno) zamknij(); });
    okno.querySelectorAll('.sciezka').forEach(function (a) {
      a.addEventListener('click', function () { window.setTimeout(zamknij, 120); });
    });
    okno.addEventListener('cancel', function (e) { e.preventDefault(); zamknij(); });
    okno.addEventListener('close', function () {
      document.body.classList.remove('is-zablokowane');
      Plynne.zsynchronizuj();
    });

    okno.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !natywny) { e.preventDefault(); zamknij(); return; }
      if (e.key !== 'Tab') return;
      var pola = fokusowalne();
      if (!pola.length) return;
      var a = pola[0], z = pola[pola.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    });
  }

  /* =====================================================================
     Odsłanianie przy przewijaniu
     ===================================================================== */
  var doOdsloniecia = document.querySelectorAll('[data-odslon]');

  if (!('IntersectionObserver' in window) || mniejRuchu.matches) {
    doOdsloniecia.forEach(function (el) { el.classList.add('widoczne'); });
  } else {
    var obs = new IntersectionObserver(function (wpisy) {
      wpisy.forEach(function (w) {
        if (!w.isIntersecting) return;
        w.target.classList.add('widoczne');
        obs.unobserve(w.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    doOdsloniecia.forEach(function (el) { obs.observe(el); });
  }

  /* =====================================================================
     Wejście hero
     ===================================================================== */
  var hero = document.querySelector('.hero');
  if (hero) {
    var odpal = function () { hero.classList.add('gotowy'); };
    if (document.readyState === 'complete') odpal();
    else window.addEventListener('load', odpal);
    window.setTimeout(odpal, 700); // gdyby jakiś zasób się zaciął
  }

  /* =====================================================================
     Podświetlenie aktywnej sekcji w nawigacji
     ===================================================================== */
  var linki = Array.prototype.slice.call(document.querySelectorAll('.nawigacja__lista a[href^="#"]'));
  var sekcje = linki
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sekcje.length && 'IntersectionObserver' in window) {
    var obsSekcji = new IntersectionObserver(function (wpisy) {
      wpisy.forEach(function (w) {
        if (!w.isIntersecting) return;
        linki.forEach(function (a) {
          var aktywny = a.getAttribute('href') === '#' + w.target.id;
          if (aktywny) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sekcje.forEach(function (s) { obsSekcji.observe(s); });
  }

  /* =====================================================================
     FAQ — tylko jedna odpowiedź otwarta naraz
     ===================================================================== */
  var pytania = Array.prototype.slice.call(document.querySelectorAll('.pytanie'));
  pytania.forEach(function (p) {
    p.addEventListener('toggle', function () {
      if (!p.open) return;
      pytania.forEach(function (inne) { if (inne !== p) inne.open = false; });
    });
  });

  /* =====================================================================
     Rok w stopce
     ===================================================================== */
  var rok = document.querySelector('[data-rok]');
  if (rok) rok.textContent = String(new Date().getFullYear());
})();
