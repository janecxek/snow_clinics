/* ==========================================================================
   Snow Clinics — behaviour
   No dependencies. Everything degrades to a working page without JS.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var clamp = function (v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; };
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ----------------------------------------------------------------------
     1. Scrolling
        The wheel is smoothed by lerping the native scroll position. Jumping
        to a section is a separate, timed move: long enough to keep the page
        oriented, short enough that nobody waits for it.
     ---------------------------------------------------------------------- */
  var scroller = (function () {
    var smoothWheel = finePointer && !reduced;
    var target = window.scrollY;
    var current = target;
    var raf = null;
    var smoothing = false;
    var jumping = false;
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

    // Anchor jumps: eased over a distance-scaled duration, capped so that a
    // trip to the footer never feels like a journey.
    function jumpTo(y) {
      y = clamp(y, 0, limit());
      var startY = window.scrollY;
      var dist = y - startY;
      if (reduced || Math.abs(dist) < 2) {
        window.scrollTo(0, y);
        target = current = y;
        return;
      }
      var duration = clamp(Math.abs(dist) * 0.28, 380, 720);
      var t0 = performance.now();
      jumping = true;
      if (raf !== null) { cancelAnimationFrame(raf); raf = null; smoothing = false; }

      (function step(now) {
        var p = Math.min(1, (now - t0) / duration);
        var e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        window.scrollTo(0, startY + dist * e);
        if (p < 1) { requestAnimationFrame(step); }
        else { jumping = false; target = current = window.scrollY; }
      })(performance.now());
    }

    if (smoothWheel) {
      document.documentElement.classList.add('has-smooth-scroll');

      window.addEventListener('wheel', function (e) {
        if (locked || e.ctrlKey || e.defaultPrevented) return;
        e.preventDefault();
        if (jumping) { jumping = false; target = current = window.scrollY; }
        var d = e.deltaY * (e.deltaMode === 1 ? 24 : e.deltaMode === 2 ? window.innerHeight : 1);
        target = clamp(target + d, 0, limit());
        run();
      }, { passive: false });

      window.addEventListener('scroll', function () {
        if (!smoothing && !jumping) { target = current = window.scrollY; }
      }, { passive: true });

      window.addEventListener('resize', function () {
        target = clamp(target, 0, limit());
        current = window.scrollY;
      });
    }

    return {
      to: jumpTo,
      lock: function (v) { locked = v; if (v) { target = current = window.scrollY; } }
    };
  })();

  function sectionTop(el) {
    var nav = $('#nav');
    var offset = (nav ? nav.offsetHeight : 0) + 12;
    return el.getBoundingClientRect().top + window.scrollY - offset;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (!id || id === '#') return;
    var el = document.getElementById(id.slice(1));
    if (!el) return;

    e.preventDefault();
    closeMenu();
    scroller.to(id === '#home' ? 0 : sectionTop(el));
    if (history.replaceState) { history.replaceState(null, '', id); }
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });

  /* ----------------------------------------------------------------------
     2. Reveal
     ---------------------------------------------------------------------- */
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }
  requestAnimationFrame(function () {
    $$('.hero .reveal').forEach(function (el) { el.classList.add('is-in'); });
  });

  /* ----------------------------------------------------------------------
     3. Navigation
     ---------------------------------------------------------------------- */
  var nav = $('#nav');
  var lastY = window.scrollY;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;

    if (nav) {
      var descending = y > lastY && y > window.innerHeight * 0.8;
      nav.classList.toggle('is-hidden', descending && !menuOpen);

      var hero = document.getElementById('home');
      if (hero) {
        var overHero = y < hero.offsetHeight - nav.offsetHeight - 24;
        nav.classList.toggle('nav--light', overHero && !menuOpen);
        nav.classList.toggle('is-stuck', !overHero);
      }
    }

    var top = $('#to-top');
    if (top) {
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var circ = 2 * Math.PI * 25;
      top.style.setProperty('--circ', circ);
      top.style.setProperty('--dash', circ * (1 - clamp(y / max, 0, 1)));
      top.classList.toggle('is-visible', y > window.innerHeight * 0.9);
    }

    if (dock) {
      dock.classList.toggle('is-visible', !atBooking && y > window.innerHeight * 0.55);
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });

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
    ['treatments', 'why', 'physician', 'clinics', 'faq'].forEach(function (id) {
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
    window.setTimeout(function () { if (!menuOpen) menu.hidden = true; }, 640);
  }

  if (burger) burger.addEventListener('click', function () { menuOpen ? closeMenu() : openMenu(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) { closeMenu(); burger.focus(); }
  });

  /* ----------------------------------------------------------------------
     5. Treatment areas
        Four equal cards until one is chosen. The chosen card takes the width
        the others give up — an animated grid, not a jump — and they fall back
        to a spine. Clicking the open one closes it and the row is even again.
     ---------------------------------------------------------------------- */
  var slabWrap = $('#slabs');
  var slabs = $$('.slab');
  var spines = slabs.map(function (s) { return $('.slab__spine', s); });
  var WIDE = window.matchMedia('(min-width: 1180px)');

  // A grid track cannot animate from a flex factor to a pixel length, so both
  // states are expressed in fr. Eleven to one puts the closed spines at about
  // the width of the label they carry, and it scales with the container.
  var OPEN_FR = 11;

  function columnsFor(openIndex) {
    return slabs.map(function (s, i) {
      return 'minmax(0, ' + (i === openIndex ? OPEN_FR : 1) + 'fr)';
    }).join(' ');
  }

  // An opened panel is as tall as its longest area, which is taller than a
  // card at most desktop widths and taller again in German. Rather than hide
  // the overflow behind a scrollbar, the row is told how tall the tallest
  // panel wants to be at the width it will actually occupy. Measuring a copy
  // off-screen keeps the live panels out of it, so nothing flickers.
  var probe = null;
  var probeCache = {};

  function tallestPanel() {
    var wrapWidth = slabWrap.clientWidth;
    var panel = $('.slab__panel', slabs[0]);
    var ps = getComputedStyle(panel);
    var gaps = parseFloat(getComputedStyle(slabWrap).columnGap || 10) * (slabs.length - 1);
    var openTrack = (wrapWidth - gaps) * OPEN_FR / (OPEN_FR + slabs.length - 1);
    var inner = openTrack - parseFloat(ps.left) - parseFloat(ps.right);
    var key = Math.round(inner) + ':' + (window.SnowI18n ? window.SnowI18n.lang : 'en');
    if (probeCache[key]) return probeCache[key];

    if (!probe) {
      probe = document.createElement('div');
      probe.setAttribute('aria-hidden', 'true');
      probe.style.cssText = 'position:absolute;left:-10000px;top:0;visibility:hidden;';
      slabWrap.appendChild(probe);
    }
    probe.style.width = inner + 'px';
    var tallest = 0;
    slabs.forEach(function (s) {
      probe.innerHTML = '';
      probe.appendChild($('.slab__inner', s).cloneNode(true));
      tallest = Math.max(tallest, probe.firstChild.getBoundingClientRect().height);
    });
    probe.innerHTML = '';
    probeCache[key] = Math.ceil(tallest + parseFloat(ps.paddingTop) + parseFloat(ps.paddingBottom));
    return probeCache[key];
  }

  function layoutSlabs() {
    if (!slabWrap) return;
    var openIndex = -1;
    slabs.forEach(function (s, i) { if (s.classList.contains('is-open')) openIndex = i; });
    slabWrap.classList.toggle('has-open', openIndex >= 0);
    if (!WIDE.matches) {
      slabWrap.style.gridTemplateColumns = '';
      slabWrap.style.removeProperty('--slabs-h');
      return;
    }
    slabWrap.style.gridTemplateColumns = columnsFor(openIndex);
    if (openIndex < 0) { slabWrap.style.removeProperty('--slabs-h'); return; }
    // With the variable cleared, min-height reports the closed card height.
    slabWrap.style.removeProperty('--slabs-h');
    var closed = parseFloat(getComputedStyle(slabWrap).minHeight) || 0;
    slabWrap.style.setProperty('--slabs-h', Math.max(closed, tallestPanel()) + 'px');
  }

  function openSlab(index, moveFocus) {
    var wasOpen = index !== null && slabs[index].classList.contains('is-open');

    // The area names turn on their side as a slab collapses, and writing-mode
    // cannot tween. Hide them for the swap and fade them back in underneath
    // the widths still moving.
    if (slabWrap && WIDE.matches) {
      slabWrap.classList.add('is-switching');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { slabWrap.classList.remove('is-switching'); });
      });
    }

    slabs.forEach(function (s, i) {
      var on = !wasOpen && i === index;
      s.classList.toggle('is-open', on);
      spines[i].setAttribute('aria-expanded', String(on));
    });
    layoutSlabs();
    if (moveFocus && index !== null) spines[index].focus();
  }

  spines.forEach(function (spine, i) {
    spine.addEventListener('click', function () { openSlab(i); });
    spine.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % slabs.length;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + slabs.length) % slabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = slabs.length - 1;
      if (next === null) return;
      e.preventDefault();
      spines[next].focus();
    });
  });

  if (slabWrap) {
    WIDE.addEventListener('change', layoutSlabs);
    window.addEventListener('resize', function () { probeCache = {}; layoutSlabs(); });
    document.addEventListener('snow:languagechange', layoutSlabs);
    layoutSlabs();
  }

  /* ----------------------------------------------------------------------
     6. Reviews carousel — manual only, never auto-advancing
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
     7. FAQ — grouped by the kind of worry, every answer closed on arrival
     ---------------------------------------------------------------------- */
  $$('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
  });

  var segments = $$('.segment');
  var faqItems = $$('.faq__item');

  function selectGroup(seg, moveFocus) {
    var group = seg.getAttribute('data-group');
    segments.forEach(function (s) {
      var on = s === seg;
      s.setAttribute('aria-selected', String(on));
      s.tabIndex = on ? 0 : -1;
    });
    faqItems.forEach(function (item) {
      item.classList.toggle('is-filtered', item.getAttribute('data-group') !== group);
      var q = $('.faq__q', item);
      if (q) q.setAttribute('aria-expanded', 'false');
    });
    if (moveFocus) seg.focus();
  }

  segments.forEach(function (seg, i) {
    seg.addEventListener('click', function () { selectGroup(seg); });
    seg.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = segments[(i + 1) % segments.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = segments[(i - 1 + segments.length) % segments.length];
      if (e.key === 'Home') next = segments[0];
      if (e.key === 'End') next = segments[segments.length - 1];
      if (!next) return;
      e.preventDefault();
      selectGroup(next, true);
    });
  });

  /* ----------------------------------------------------------------------
     8. Persistent actions
     ---------------------------------------------------------------------- */
  var dock = $('#dock');
  var atBooking = false;
  if (dock && 'IntersectionObserver' in window) {
    var bookEl = document.getElementById('book');
    if (bookEl) {
      new IntersectionObserver(function (entries) {
        atBooking = entries[0].isIntersecting;
        onScroll();
      }, { rootMargin: '0px 0px -20% 0px' }).observe(bookEl);
    }
  }

  /* ----------------------------------------------------------------------
     9. Booking dialog
        Every "book" control opens it and hands it the subject, so the
        WhatsApp message is already written by the time it opens. With JS off
        the same links fall through to the booking section below.
     ---------------------------------------------------------------------- */
  var modal = $('#book-modal');
  if (modal && typeof modal.showModal === 'function') {
    var waLink = $('#modal-wa');
    var waBase = 'https://wa.me/34637479715?text=';

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest && e.target.closest('[data-book]');
      if (!trigger) return;
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
      if (waLink) {
        var subject = trigger.getAttribute('data-book') || 'a consultation';
        var lead = window.SnowI18n && window.SnowI18n.lang === 'de'
          ? 'Guten Tag Snow Clinics, ich interessiere mich für '
          : 'Hello Snow Clinics, I would like to ask about ';
        waLink.href = waBase + encodeURIComponent(lead + subject + '.');
      }
      modal.showModal();
    }, true);

    var closeBtn = $('#modal-close');
    if (closeBtn) closeBtn.addEventListener('click', function () { modal.close(); });

    // A click on the backdrop lands on the dialog itself, not on its box.
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
  }

  var top = $('#to-top');
  if (top) top.addEventListener('click', function () { scroller.to(0); });

  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  onScroll();
})();
