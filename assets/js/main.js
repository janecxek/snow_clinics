/* ==========================================================================
   Snow Clinics — behaviour
   No dependencies. Everything degrades to a working page without JS.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var clamp = function (v, min, max) { return v < min ? min : v > max ? max : v; };
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ----------------------------------------------------------------------
     1. Smooth scroll — a lerped virtual position over the native scroller.
        Native scrolling stays authoritative for touch, keyboard and
        assistive technology; only the wheel is smoothed.
     ---------------------------------------------------------------------- */
  var scroller = (function () {
    var enabled = finePointer && !reduced;
    var target = window.scrollY;
    var current = target;
    var raf = null;
    var smoothing = false;
    var locked = false;

    function limit() {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    function frame() {
      var diff = target - current;
      if (Math.abs(diff) < 0.4) {
        current = target;
        window.scrollTo(0, current);
        smoothing = false;
        raf = null;
        return;
      }
      current += diff * 0.105;
      window.scrollTo(0, current);
      raf = requestAnimationFrame(frame);
    }

    function run() {
      if (raf === null) { smoothing = true; raf = requestAnimationFrame(frame); }
    }

    function to(y, instant) {
      y = clamp(y, 0, limit());
      if (!enabled || instant) {
        window.scrollTo({ top: y, behavior: instant || reduced ? 'auto' : 'smooth' });
        target = current = y;
        return;
      }
      target = y;
      run();
    }

    if (enabled) {
      document.documentElement.classList.add('has-smooth-scroll');

      window.addEventListener('wheel', function (e) {
        if (locked || e.ctrlKey || e.defaultPrevented) return;
        e.preventDefault();
        var d = e.deltaY * (e.deltaMode === 1 ? 24 : e.deltaMode === 2 ? window.innerHeight : 1);
        target = clamp(target + d, 0, limit());
        run();
      }, { passive: false });

      window.addEventListener('scroll', function () {
        if (!smoothing) { target = current = window.scrollY; }
      }, { passive: true });

      window.addEventListener('resize', function () {
        target = clamp(target, 0, limit());
        current = window.scrollY;
      });
    }

    return {
      to: to,
      lock: function (v) {
        locked = v;
        if (v) { target = current = window.scrollY; }
      }
    };
  })();

  /* Anchor links route through the scroller so every jump feels the same. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (!id || id === '#') return;
    var el = document.getElementById(id.slice(1));
    if (!el) return;

    e.preventDefault();
    closeMenu();

    var nav = $('#nav');
    var offset = id === '#home' ? 0 : (nav ? nav.offsetHeight : 0) + 8;
    scroller.to(el.getBoundingClientRect().top + window.scrollY - offset);

    if (history.replaceState) { history.replaceState(null, '', id); }
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });

  /* ----------------------------------------------------------------------
     2. Frost reveal
     ---------------------------------------------------------------------- */
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Hero headline plays on load, not on scroll. */
  requestAnimationFrame(function () {
    $$('[data-lines] .line').forEach(function (l) { l.classList.add('is-in'); });
    $$('.hero .reveal').forEach(function (l) { l.classList.add('is-in'); });
  });

  /* ----------------------------------------------------------------------
     3. Navigation — stuck state, hide on descent, active section
     ---------------------------------------------------------------------- */
  var nav = $('#nav');
  var lastY = window.scrollY;
  var navTicking = false;

  function onScroll() {
    var y = window.scrollY;

    if (nav) {
      nav.classList.toggle('is-stuck', y > 40);
      var descending = y > lastY && y > window.innerHeight * 0.8;
      nav.classList.toggle('is-hidden', descending && !menuOpen);
    }

    var top = $('#to-top');
    if (top) {
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var circ = 2 * Math.PI * 25;
      top.style.setProperty('--circ', circ);
      top.style.setProperty('--dash', circ * (1 - clamp(y / max, 0, 1)));
      top.classList.toggle('is-visible', y > window.innerHeight * 0.9);
    }

    var hero = $('[data-parallax]');
    if (hero && !reduced) {
      var rate = parseFloat(hero.getAttribute('data-parallax')) || 0.15;
      hero.style.transform = 'translate3d(0,' + (y * rate).toFixed(2) + 'px,0)';
    }

    lastY = y;
    navTicking = false;
  }

  window.addEventListener('scroll', function () {
    if (navTicking) return;
    navTicking = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    var links = $$('.nav__link');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle('is-active', l.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['approach', 'treatments', 'results', 'physician', 'locations'].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  /* ----------------------------------------------------------------------
     4. Mobile menu
     ---------------------------------------------------------------------- */
  var burger = $('#burger');
  var menu = $('#menu');
  var menuOpen = false;

  function openMenu() {
    if (!menu || !burger) return;
    menuOpen = true;
    menu.hidden = false;
    requestAnimationFrame(function () { menu.classList.add('is-open'); });
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    scroller.lock(true);
    var first = $('.menu__link', menu);
    if (first) first.focus();
  }

  function closeMenu() {
    if (!menuOpen || !menu || !burger) return;
    menuOpen = false;
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    scroller.lock(false);
    window.setTimeout(function () { if (!menuOpen) menu.hidden = true; }, 700);
  }

  if (burger) {
    burger.addEventListener('click', function () { menuOpen ? closeMenu() : openMenu(); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) { closeMenu(); burger.focus(); }
  });

  /* ----------------------------------------------------------------------
     5. Treatment areas — a tablist, so one area is open at a time and the
        panel morphs to its height instead of jumping to it.
     ---------------------------------------------------------------------- */
  var tabs = $$('.category');
  var panels = $$('.panel');
  var panelWrap = $('#panels');

  function sizePanels() {
    if (!panelWrap) return;
    var active = panelWrap.querySelector('.panel.is-active');
    if (active) panelWrap.style.height = active.offsetHeight + 'px';
  }

  function selectArea(tab, moveFocus) {
    var id = tab.getAttribute('aria-controls');
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(function (panel) {
      panel.classList.toggle('is-active', panel.id === id);
    });
    sizePanels();
    if (moveFocus) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectArea(tab); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (!next) return;
      e.preventDefault();
      selectArea(next, true);
    });
  });

  if (panelWrap) {
    // The opening measurement must not animate from zero.
    panelWrap.style.transition = 'none';
    sizePanels();
    requestAnimationFrame(function () { panelWrap.style.transition = ''; });

    var resizeTimer;
    window.addEventListener('resize', function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(sizePanels, 120);
    });
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(sizePanels); }
    window.addEventListener('load', sizePanels);
  }

  /* ----------------------------------------------------------------------
     6. Before / after comparison
     ---------------------------------------------------------------------- */
  var compare = $('#compare');
  if (compare) {
    var grip = $('#compare-grip');
    var pos = 50;

    function setPos(next) {
      pos = clamp(next, 0, 100);
      compare.style.setProperty('--pos', pos + '%');
      if (grip) grip.setAttribute('aria-valuenow', Math.round(pos));
    }

    function fromEvent(e) {
      var rect = compare.getBoundingClientRect();
      setPos(((e.clientX - rect.left) / rect.width) * 100);
    }

    compare.addEventListener('pointerdown', function (e) {
      compare.setPointerCapture(e.pointerId);
      compare.classList.add('is-dragging');
      fromEvent(e);
    });
    compare.addEventListener('pointermove', function (e) {
      if (!compare.classList.contains('is-dragging')) return;
      fromEvent(e);
    });
    ['pointerup', 'pointercancel'].forEach(function (type) {
      compare.addEventListener(type, function () { compare.classList.remove('is-dragging'); });
    });

    if (grip) {
      grip.addEventListener('keydown', function (e) {
        var step = e.shiftKey ? 10 : 2;
        if (e.key === 'ArrowLeft')  { e.preventDefault(); setPos(pos - step); }
        if (e.key === 'ArrowRight') { e.preventDefault(); setPos(pos + step); }
        if (e.key === 'Home')       { e.preventDefault(); setPos(0); }
        if (e.key === 'End')        { e.preventDefault(); setPos(100); }
      });
    }
    setPos(50);
  }

  /* ----------------------------------------------------------------------
     7. Reviews carousel — manual only, never auto-advancing
     ---------------------------------------------------------------------- */
  var quotes = $('#quotes');
  if (quotes) {
    var prev = $('#quotes-prev');
    var next = $('#quotes-next');

    function step() {
      var card = $('.quote', quotes);
      if (!card) return quotes.clientWidth;
      var gap = parseFloat(getComputedStyle(quotes).columnGap || '0') || 0;
      return card.getBoundingClientRect().width + gap;
    }
    function sync() {
      var end = quotes.scrollWidth - quotes.clientWidth - 2;
      if (prev) prev.disabled = quotes.scrollLeft <= 2;
      if (next) next.disabled = quotes.scrollLeft >= end;
    }
    if (prev) prev.addEventListener('click', function () { quotes.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' }); });
    if (next) next.addEventListener('click', function () { quotes.scrollBy({ left: step(),  behavior: reduced ? 'auto' : 'smooth' }); });
    quotes.addEventListener('scroll', function () { requestAnimationFrame(sync); }, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  /* ----------------------------------------------------------------------
     8. FAQ
     ---------------------------------------------------------------------- */
  $$('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
  });

  /* ----------------------------------------------------------------------
     9. Booking form
     ---------------------------------------------------------------------- */
  var form = $('#booking-form');
  if (form) {
    var validated = false;

    function messageFor(input) {
      var t = window.SnowI18n ? window.SnowI18n.t.bind(window.SnowI18n) : function (k, f) { return f; };
      if (input.type === 'checkbox') return t('form.errConsent', 'Please tick the box so we can reply.');
      if (!input.value.trim()) return t('form.errRequired', 'This field is required.');
      if (input.type === 'email') return t('form.errEmail', 'Enter an email address we can reach you at.');
      return t('form.errRequired', 'This field is required.');
    }

    function check(input) {
      var wrap = input.closest('.field');
      var slot = form.querySelector('[data-error-for="' + input.id + '"]');
      var ok = input.checkValidity();
      if (wrap) wrap.classList.toggle('is-invalid', !ok);
      if (slot) slot.textContent = ok ? '' : messageFor(input);
      return ok;
    }

    $$('input, select, textarea', form).forEach(function (input) {
      input.addEventListener('blur', function () { if (validated) check(input); });
      input.addEventListener('input', function () { if (validated) check(input); });
      input.addEventListener('change', function () { if (validated) check(input); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      validated = true;

      var invalid = null;
      $$('input, select, textarea', form).forEach(function (input) {
        if (!check(input) && !invalid) invalid = input;
      });

      var status = $('#form-status');
      if (invalid) {
        if (status) {
          status.textContent = window.SnowI18n
            ? window.SnowI18n.t('form.errSummary', 'Check the highlighted fields.')
            : 'Check the highlighted fields.';
        }
        invalid.focus();
        return;
      }

      if (status) status.textContent = '';
      form.classList.add('is-sent');
      var sent = $('#form-sent');
      if (sent) { sent.setAttribute('tabindex', '-1'); sent.focus({ preventScroll: true }); }
    });
  }

  /* ----------------------------------------------------------------------
     10. Mobile action dock — present once the hero is past, absent once the
         booking form is on screen and the offer is already in front of you.
     ---------------------------------------------------------------------- */
  var dock = $('#dock');
  if (dock) {
    var atContact = false;
    if ('IntersectionObserver' in window) {
      var contactWatch = new IntersectionObserver(function (entries) {
        atContact = entries[0].isIntersecting;
        dock.classList.toggle('is-visible', !atContact && window.scrollY > window.innerHeight * 0.6);
      }, { rootMargin: '0px 0px -25% 0px' });
      var contactEl = document.getElementById('contact');
      if (contactEl) contactWatch.observe(contactEl);
    }
    window.addEventListener('scroll', function () {
      dock.classList.toggle('is-visible', !atContact && window.scrollY > window.innerHeight * 0.6);
    }, { passive: true });
  }

  document.addEventListener('snow:languagechange', sizePanels);

  /* ---------------------------------------------------------------------- */
  var top = $('#to-top');
  if (top) top.addEventListener('click', function () { scroller.to(0); });

  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
