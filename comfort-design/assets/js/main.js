/* =========================================================================
   COMFORT DESIGN — interactions. No dependencies.
   Every motion path checks prefers-reduced-motion and degrades to final state.
   ========================================================================= */
(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => mqReduce.matches;
  let drawerOpen = false;
  let modalOpen = false;

  /* ---------- 1. PRELOADER ---------- */
  const pre = $('#pre');
  const start = () => {
    document.body.classList.add('is-ready');
    if (pre) pre.classList.add('is-done');
  };
  if (!pre || reduced() || sessionStorage.getItem('cd-seen')) {
    if (pre) pre.classList.add('is-done');
    requestAnimationFrame(start);
  } else {
    window.addEventListener('load', () => setTimeout(start, 900), { once: true });
    setTimeout(start, 2600); // never trap the page behind a stalled asset
  }
  try { sessionStorage.setItem('cd-seen', '1'); } catch (e) {}

  /* ---------- 2. YEAR ---------- */
  const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- 3. REVEAL ON SCROLL ---------- */
  const revealTargets = () => $$('[data-reveal], .frame, .rule, .about__portrait, .proc__s');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  if (reduced()) {
    revealTargets().forEach((el) => el.classList.add('is-in'));
  } else {
    revealTargets().forEach((el) => io.observe(el));
  }

  /* ---------- 3b. PAUSE LOOPING DECOR WHEN IT LEAVES THE SCREEN ---------- */
  const looping = $$('[data-anim]');
  if (looping.length) {
    const aio = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle('anim-off', !e.isIntersecting));
    }, { rootMargin: '150px 0px' });
    looping.forEach((el) => aio.observe(el));
  }

  /* ---------- 4. FRAMES: чертёж → фотография ---------- */
  // A frame ships as a line drawing. It upgrades only when a real photo loads.
  $$('.frame, .hero, .light__layer').forEach((f) => {
    const img = f.querySelector('.frame__photo, .hero__img, .light__img');
    if (!img) return;
    const ok  = () => f.classList.add('has-photo');
    const bad = () => f.classList.add('no-photo');
    if (img.complete) (img.naturalWidth > 0 ? ok() : bad());
    else { img.addEventListener('load', ok, { once: true });
           img.addEventListener('error', bad, { once: true }); }
  });

  /* ---------- 5. HEADER ---------- */
  const hdr = $('#hdr');
  const hero = $('#top');
  const prog = $('#hdrProgress');
  const fab = $('#fab');
  let lastY = window.scrollY, ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    const past = y > (hero ? hero.offsetHeight * 0.72 : 400);
    hdr.classList.toggle('is-solid', past);
    lastY = y;
    const tt = $('#totop'); if (tt) tt.classList.toggle('is-on', y > 900);
    if (fab) fab.classList.toggle('is-on', y > 700);
    if (prog) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    }
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  // header colour follows the section behind it (light plaster vs dusk)
  const themed = $$('[data-nav-theme]');
  if (themed.length) {
    const tio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0)
          hdr.classList.toggle('is-dusk', e.target.dataset.navTheme === 'dusk');
      });
    }, { rootMargin: '-64px 0px -92% 0px' });
    themed.forEach((s) => tio.observe(s));
  }

  /* ---------- 6. SCROLLSPY ---------- */
  const spyLinks = $$('.nav__a');
  const spyMap = new Map();
  spyLinks.forEach((a) => {
    const t = $(a.getAttribute('href'));
    if (t) spyMap.set(t, a);
  });
  if (spyMap.size) {
    const active = new Set();
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) active.add(e.target); else active.delete(e.target);
      });
      spyLinks.forEach((l) => l.removeAttribute('aria-current'));
      // the first section still in the band wins; no section in the band means no highlight
      for (const [sec, a] of spyMap) {
        if (active.has(sec)) { a.setAttribute('aria-current', 'true'); break; }
      }
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyMap.forEach((_, sec) => sio.observe(sec));
  }

  /* ---------- 7. MOBILE DRAWER ---------- */
  const burger = $('#burger');
  const drawer = $('#drawer');
  const setDrawer = (open) => {
    drawerOpen = open;
    drawer.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    document.body.classList.toggle('is-locked', open);
    if (open) { drawer.removeAttribute('inert'); }
    else { drawer.setAttribute('inert', ''); }
  };
  if (burger && drawer) {
    burger.addEventListener('click', () => setDrawer(!drawerOpen));
    drawer.addEventListener('click', (e) => { if (e.target.closest('a')) setDrawer(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawerOpen) { setDrawer(false); burger.focus(); } });
  }

  /* ---------- 8. HERO LIGHT POOL ---------- */
  const wash = $('.hero__wash');
  if (wash && hero && !reduced() && matchMedia('(hover:hover)').matches) {
    let raf = 0;
    hero.addEventListener('pointermove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        wash.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
        wash.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
        raf = 0;
      });
    }, { passive: true });
  }

  /* ---------- 9. ACCORDIONS ---------- */
  const wireAccordion = (btnSel, rowSel, single) => {
    const btns = $$(btnSel);
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const row = btn.closest(rowSel);
        const open = btn.getAttribute('aria-expanded') === 'true';
        if (single && !open) {
          btns.forEach((b) => {
            b.setAttribute('aria-expanded', 'false');
            b.closest(rowSel).classList.remove('is-open');
          });
        }
        btn.setAttribute('aria-expanded', String(!open));
        row.classList.toggle('is-open', !open);
      });
    });
  };
  wireAccordion('.svc__btn', '.svc__row', true);
  wireAccordion('.faq__q', '.faq__i', false);

  /* ---------- 10. PROCESS PROGRESS RAIL ---------- */
  const steps = $$('[data-step]');
  const rail = $('#procRail');
  if (steps.length && rail) {
    const pio = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-in'); });
      const done = steps.filter((s) => s.classList.contains('is-in')).length;
      rail.style.setProperty('--p', Math.round((done / steps.length) * 100) + '%');
    }, { rootMargin: '0px 0px -40% 0px' });
    steps.forEach((s) => pio.observe(s));
  }

  /* ---------- 11. COUNTERS ---------- */
  $$('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    if (Number.isNaN(target)) return;
    if (reduced()) { el.textContent = String(target); return; }
    const cio = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const dur = 1100, t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    cio.observe(el);
  });

  /* ---------- 12. TESTIMONIAL CAROUSEL ---------- */
  const track = $('#quotesTrack');
  if (track) {
    const step = () => {
      const card = track.querySelector('.quote');
      return card ? card.getBoundingClientRect().width + 24 : track.clientWidth;
    };
    const go = (dir) => track.scrollBy({ left: dir * step(), behavior: reduced() ? 'auto' : 'smooth' });
    const prev = $('#qPrev'), next = $('#qNext');
    prev && prev.addEventListener('click', () => go(-1));
    next && next.addEventListener('click', () => go(1));
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    };
    track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    addEventListener('resize', sync);
    sync();
  }

  /* ---------- 13. LIGHTBOX ---------- */
  const lb = $('#lb');
  if (lb && typeof lb.showModal === 'function') {
    const stage = $('#lbStage'), cap = $('#lbCap'), idx = $('#lbIdx');
    const items = $$('[data-lb]');
    let cur = 0;
    const render = (i) => {
      cur = (i + items.length) % items.length;
      const src = items[cur];
      const art = src.closest('.work__i');
      const clone = src.cloneNode(true);
      clone.classList.remove('frame-link');
      clone.removeAttribute('href'); clone.removeAttribute('data-lb');
      stage.replaceChildren(clone);
      const img = clone.querySelector('.frame__photo');
      if (img) {
        if (img.complete && img.naturalWidth > 0) clone.classList.add('has-photo');
        else if (img.complete) clone.classList.add('no-photo');
      }
      clone.classList.add('is-in');
      const title = art ? art.querySelector('.work__t') : null;
      const dl = art ? art.querySelector('.work__dl') : null;
      cap.replaceChildren();
      if (title) { const h = document.createElement('p'); h.className = 'lb__t'; h.textContent = title.textContent; cap.append(h); }
      if (dl) {
        const meta = [...dl.querySelectorAll('div')].map((r) => r.querySelector('dd').textContent.trim()).join(' · ');
        const m = document.createElement('p'); m.className = 'micro'; m.textContent = meta; cap.append(m);
      }
      idx.textContent = String(cur + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');
    };
    items.forEach((el, i) => el.addEventListener('click', (e) => { e.preventDefault(); render(i); lb.showModal(); modalOpen = true; }));
    lb.addEventListener('close', () => { modalOpen = false; });
    $('#lbPrev').addEventListener('click', () => render(cur - 1));
    $('#lbNext').addEventListener('click', () => render(cur + 1));
    $('#lbClose').addEventListener('click', () => lb.close());
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') render(cur - 1);
      if (e.key === 'ArrowRight') render(cur + 1);
    });
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  }

  /* ---------- 14. BACK TO TOP ---------- */
  const totop = $('#totop');
  totop && totop.addEventListener('click', () =>
    scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' }));

  /* ---------- 15. CTA POPUP ---------- */
  const pop = $('#ctaPop');
  if (pop && typeof pop.showModal === 'function') {
    let opener = null;
    $$('[data-cta]').forEach((btn) => btn.addEventListener('click', () => {
      opener = btn;
      if (drawerOpen) setDrawer(false);
      pop.showModal();
      modalOpen = true;
    }));
    const close = () => pop.close();
    const x = $('#popClose'); if (x) x.addEventListener('click', close);
    pop.addEventListener('click', (e) => { if (e.target === pop) close(); });
    pop.addEventListener('close', () => {
      modalOpen = false;
      if (opener && document.contains(opener)) opener.focus();
    });
    // a channel was picked — close behind it so returning to the tab is clean
    pop.querySelectorAll('.chan').forEach((a) => a.addEventListener('click', () => setTimeout(close, 120)));
  }

  /* ---------- 16. SMOOTH ANCHORS WITH HEADER OFFSET ---------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = $(id);
      if (!t) return;
      e.preventDefault();
      const top = t.getBoundingClientRect().top + window.scrollY - (id === '#top' ? 0 : 72);
      scrollTo({ top, behavior: reduced() ? 'auto' : 'smooth' });
      history.replaceState(null, '', id === '#top' ? location.pathname : id);
    });
  });
})();

/* =========================================================================
   17. LANGUAGE — RU source markup, EN applied by key from i18n.js
   ========================================================================= */
(() => {
  'use strict';
  const nodes = Array.from(document.querySelectorAll('[data-i18n]'));
  if (!nodes.length) return;

  // snapshot the Russian source so switching back is lossless
  const ru = new Map();
  nodes.forEach((el) => {
    const attr = el.dataset.i18nAttr;
    ru.set(el, attr ? el.getAttribute(attr)
                    : (el.hasAttribute('data-i18n-html') ? el.innerHTML : el.textContent));
  });

  const dict = (window.CD_I18N && window.CD_I18N.en) || {};
  const buttons = Array.from(document.querySelectorAll('.lang__b'));

  // drop a curtain over the swap so the text never changes in plain sight
  const pre = document.getElementById('pre');
  const curtain = (swap) => {
    if (!pre || matchMedia('(prefers-reduced-motion: reduce)').matches) { swap(); return; }
    const bar = pre.querySelector('.pre__bar');
    if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; }
    pre.classList.add('is-curtain');
    pre.classList.remove('is-done');
    // swap once the curtain has actually covered the page, then lift straight away
    setTimeout(() => {
      swap();
      setTimeout(() => pre.classList.add('is-done'), 150);
    }, 360);
  };

  const apply = (lang) => {
    const en = lang === 'en';
    document.documentElement.lang = lang;
    nodes.forEach((el) => {
      const key = el.dataset.i18n;
      const val = en ? dict[key] : ru.get(el);
      if (val == null) return;
      const attr = el.dataset.i18nAttr;
      if (attr) el.setAttribute(attr, val);
      else if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
      else el.textContent = val;
    });
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = canonical.href.split('?')[0] + (en ? '?lang=en' : '');
    try { localStorage.setItem('cd-lang', lang); } catch (e) {}
  };

  let initial = 'ru';
  const q = new URLSearchParams(location.search).get('lang');
  try {
    initial = q === 'en' || q === 'ru' ? q : (localStorage.getItem('cd-lang') || 'ru');
  } catch (e) { initial = q === 'en' ? 'en' : 'ru'; }
  if (initial === 'en') apply('en');

  buttons.forEach((b) => b.addEventListener('click', () => {
    const lang = b.dataset.lang;
    if (document.documentElement.lang === lang) return;
    curtain(() => {
      apply(lang);
      const url = new URL(location.href);
      if (lang === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
      history.replaceState(null, '', url);
    });
  }));
})();

/* =========================================================================
   18. LIGHT BAND — the pointer is the lamp
   ========================================================================= */
(() => {
  'use strict';
  const stage = document.getElementById('lightStage');
  const lit = document.getElementById('lightLit');
  if (!stage || !lit) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  let tx = 50, ty = 46, cx = 50, cy = 46, raf = 0, inView = false, t0 = performance.now();

  const paint = () => {
    lit.style.setProperty('--lx', cx.toFixed(2) + '%');
    lit.style.setProperty('--ly', cy.toFixed(2) + '%');
  };
  const tick = (t) => {
    if (!fine) {
      // no pointer to follow: let the light drift slowly across the room
      const s = (t - t0) / 1000;
      tx = 50 + Math.sin(s * 0.34) * 26;
      ty = 46 + Math.cos(s * 0.23) * 17;
    }
    cx += (tx - cx) * 0.085;
    cy += (ty - cy) * 0.085;
    paint();
    raf = inView ? requestAnimationFrame(tick) : 0;
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      inView = e.isIntersecting;
      if (inView && !raf) raf = requestAnimationFrame(tick);
      if (!inView && raf) { cancelAnimationFrame(raf); raf = 0; }
    });
  }, { rootMargin: '10% 0px 10% 0px' });
  io.observe(stage);

  if (fine) {
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
      stage.closest('.light').classList.add('is-touched');
    }, { passive: true });
  } else {
    stage.closest('.light').classList.add('is-touched');
  }
  paint();
})();
