/* Pragnąc Więcej — interakcje.
   Zależności: brak. Wszystko degraduje się do działającej strony bez JS. */
(function () {
  'use strict';

  var html = document.documentElement;
  html.classList.remove('bez-js');

  var mniejRuchu = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------------------------------------------------------------
     Nagłówek — hairline pojawia się dopiero po odklejeniu od góry
     --------------------------------------------------------------------- */
  var naglowek = document.getElementById('naglowek');
  if (naglowek) {
    var ustawPrzypiety = function () {
      naglowek.dataset.przypiety = window.scrollY > 8 ? 'true' : 'false';
    };
    ustawPrzypiety();
    window.addEventListener('scroll', ustawPrzypiety, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Menu mobilne
     --------------------------------------------------------------------- */
  var przyciskMenu = document.getElementById('menu-przycisk');
  var nawigacja = document.getElementById('nawigacja');

  if (przyciskMenu && nawigacja) {
    var ustawMenu = function (otwarte) {
      przyciskMenu.setAttribute('aria-expanded', String(otwarte));
      przyciskMenu.setAttribute('aria-label', otwarte ? 'Zamknij menu' : 'Otwórz menu');
      nawigacja.dataset.otwarte = String(otwarte);
    };

    przyciskMenu.addEventListener('click', function () {
      ustawMenu(przyciskMenu.getAttribute('aria-expanded') !== 'true');
    });

    nawigacja.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) ustawMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && przyciskMenu.getAttribute('aria-expanded') === 'true') {
        ustawMenu(false);
        przyciskMenu.focus();
      }
    });

    // Powrót do desktopu zamyka menu, żeby nie zostawiać go w dziwnym stanie.
    var szeroki = window.matchMedia('(min-width: 60rem)');
    var naZmianeSzerokosci = function (e) { if (e.matches) ustawMenu(false); };
    if (szeroki.addEventListener) szeroki.addEventListener('change', naZmianeSzerokosci);
    else if (szeroki.addListener) szeroki.addListener(naZmianeSzerokosci);
  }

  /* ---------------------------------------------------------------------
     Okno zapisu (dialog) — pułapka focusu, Esc, przywrócenie focusu
     --------------------------------------------------------------------- */
  var okno = document.getElementById('okno-zapisu');

  if (okno) {
    var ostatnioAktywny = null;
    var maNatywnyDialog = typeof okno.showModal === 'function';

    var elementyDoFocusu = function () {
      return Array.prototype.filter.call(
        okno.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
        function (el) { return el.offsetParent !== null; }
      );
    };

    var otworz = function (wyzwalacz) {
      ostatnioAktywny = wyzwalacz || document.activeElement;
      if (maNatywnyDialog) okno.showModal();
      else okno.setAttribute('open', '');
      document.body.classList.add('is-zablokowane');
      var pierwszy = elementyDoFocusu()[0];
      if (pierwszy) pierwszy.focus();
    };

    var zamknij = function () {
      if (maNatywnyDialog && okno.open) okno.close();
      else okno.removeAttribute('open');
      document.body.classList.remove('is-zablokowane');
      if (ostatnioAktywny && typeof ostatnioAktywny.focus === 'function') ostatnioAktywny.focus();
      ostatnioAktywny = null;
    };

    document.querySelectorAll('[data-otwiera-okno]').forEach(function (btn) {
      btn.addEventListener('click', function () { otworz(btn); });
    });

    okno.querySelectorAll('[data-zamyka-okno]').forEach(function (btn) {
      btn.addEventListener('click', zamknij);
    });

    // Kliknięcie w tło zamyka okno.
    okno.addEventListener('click', function (e) {
      if (e.target === okno) zamknij();
    });

    // Wyjście z okna po wybraniu ścieżki — link i tak otwiera nową kartę.
    okno.querySelectorAll('.sciezka').forEach(function (link) {
      link.addEventListener('click', function () { window.setTimeout(zamknij, 120); });
    });

    okno.addEventListener('cancel', function (e) { e.preventDefault(); zamknij(); });
    okno.addEventListener('close', function () {
      document.body.classList.remove('is-zablokowane');
    });

    okno.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !maNatywnyDialog) { e.preventDefault(); zamknij(); return; }
      if (e.key !== 'Tab') return;

      var pola = elementyDoFocusu();
      if (!pola.length) return;
      var pierwszy = pola[0];
      var ostatni = pola[pola.length - 1];

      if (e.shiftKey && document.activeElement === pierwszy) {
        e.preventDefault(); ostatni.focus();
      } else if (!e.shiftKey && document.activeElement === ostatni) {
        e.preventDefault(); pierwszy.focus();
      }
    });
  }

  /* ---------------------------------------------------------------------
     Odsłanianie przy scrollu
     --------------------------------------------------------------------- */
  var doOdsloniecia = document.querySelectorAll('[data-odslon]');

  if (!('IntersectionObserver' in window) || mniejRuchu.matches) {
    doOdsloniecia.forEach(function (el) { el.classList.add('widoczne'); });
  } else {
    var obserwator = new IntersectionObserver(function (wpisy) {
      wpisy.forEach(function (wpis) {
        if (!wpis.isIntersecting) return;
        wpis.target.classList.add('widoczne');
        obserwator.unobserve(wpis.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    doOdsloniecia.forEach(function (el) { obserwator.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Manifest — "więcej" ustępuje miejsca "mniej".
     Postęp przewijania trafia do CSS jako --p (0 → 1). Tylko transform
     i opacity, więc animacja zostaje na kompozytorze.
     --------------------------------------------------------------------- */
  var manifest = document.getElementById('manifest');
  var tor = manifest && manifest.querySelector('[data-manifest-tor]');

  if (manifest && tor && !mniejRuchu.matches) {
    var oczekujaca = false;

    var przelicz = function () {
      oczekujaca = false;
      var prostokat = tor.getBoundingClientRect();
      var dystans = prostokat.height - window.innerHeight;
      if (dystans <= 0) { manifest.style.setProperty('--p', '1'); return; }

      var p = -prostokat.top / dystans;
      p = p < 0 ? 0 : (p > 1 ? 1 : p);
      // Lekkie wygładzenie końców, żeby zamiana nie startowała natychmiast.
      var wygladzone = p * p * (3 - 2 * p);
      manifest.style.setProperty('--p', wygladzone.toFixed(4));
    };

    var zaplanuj = function () {
      if (oczekujaca) return;
      oczekujaca = true;
      window.requestAnimationFrame(przelicz);
    };

    przelicz();
    window.addEventListener('scroll', zaplanuj, { passive: true });
    window.addEventListener('resize', zaplanuj);
  }

  /* ---------------------------------------------------------------------
     Nagłówek ustępuje na czas manifestu — jasny pasek na ciemnym tle
     wyglądał jak usterka. Wraca, gdy tylko sekcja schodzi z ekranu,
     i nigdy nie chowa się, kiedy ktoś nawiguje po nim klawiaturą.
     --------------------------------------------------------------------- */
  var scena = manifest && manifest.querySelector('.manifest__scena');

  if (naglowek && scena && 'IntersectionObserver' in window) {
    // Obserwujemy przyklejoną scenę (100vh), nie cały tor (200vh) — tor nigdy
    // nie zmieściłby się w kadrze na tyle, żeby przekroczyć próg.
    var obserwatorManifestu = new IntersectionObserver(function (wpisy) {
      wpisy.forEach(function (wpis) {
        var chowaj = wpis.intersectionRatio > 0.85 &&
                     !naglowek.contains(document.activeElement);
        naglowek.dataset.ukryty = String(chowaj);
      });
    }, { threshold: [0, 0.85, 0.99] });

    obserwatorManifestu.observe(scena);

    naglowek.addEventListener('focusin', function () {
      naglowek.dataset.ukryty = 'false';
    });
  }

  /* ---------------------------------------------------------------------
     Rok w stopce
     --------------------------------------------------------------------- */
  var rok = document.querySelector('[data-rok]');
  if (rok) rok.textContent = String(new Date().getFullYear());
})();
