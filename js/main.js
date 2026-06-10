(function () {
  'use strict';

  /* ── Eject Demo ── */
  function initEject() {
    var btn = document.getElementById('eject-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var fig = document.getElementById('stick-figure-svg-wrap');
      var splash = document.getElementById('splash-el');

      if (fig) {
        fig.classList.remove('ejecting');
        void fig.offsetWidth;
        fig.classList.add('ejecting');
        fig.addEventListener('animationend', function onEnd() {
          fig.removeEventListener('animationend', onEnd);
          fig.classList.remove('ejecting');
        });
      }

      if (splash) {
        splash.classList.remove('active');
        void splash.offsetWidth;
        setTimeout(function () { splash.classList.add('active'); }, 800);
        splash.addEventListener('animationend', function onSplashEnd() {
          splash.removeEventListener('animationend', onSplashEnd);
          splash.classList.remove('active');
        });
      }

      incrementEjectCounter();
      playSound('splash');
      btn.classList.add('shake');
      btn.addEventListener('animationend', function onShake() {
        btn.removeEventListener('animationend', onShake);
        btn.classList.remove('shake');
      });
    });
  }

  /* ── Eject Counter (localStorage, resets daily) ── */
  function initEjectCounter() {
    var KEY  = 'bmf_eject_count';
    var DATE = 'bmf_eject_date';
    var today = new Date().toDateString();

    if (localStorage.getItem(DATE) !== today) {
      localStorage.setItem(KEY, '0');
      localStorage.setItem(DATE, today);
    }
    updateCounterDisplay();
  }

  function incrementEjectCounter() {
    var KEY = 'bmf_eject_count';
    var n = parseInt(localStorage.getItem(KEY) || '0', 10);
    localStorage.setItem(KEY, String(n + 1));
    updateCounterDisplay();
  }

  function updateCounterDisplay() {
    var el = document.getElementById('eject-count');
    if (!el) return;
    el.textContent = localStorage.getItem('bmf_eject_count') || '0';
  }

  /* ── Sound System ── */
  function initSoundToggle() {
    var toggle = document.getElementById('sound-toggle');
    if (!toggle) return;
    toggle.checked = localStorage.getItem('bmf_sound') === 'true';
    toggle.addEventListener('change', function () {
      localStorage.setItem('bmf_sound', String(toggle.checked));
    });
  }

  function playSound(name) {
    if (localStorage.getItem('bmf_sound') !== 'true') return;
    var a = new Audio('../assets/sounds/' + name + '.mp3');
    a.play().catch(function () {});
  }

  /* ── FAQ Accordion ── */
  function initFAQ() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;
    items.forEach(function (item) {
      var q = item.querySelector('.faq-question');
      if (!q) return;
      q.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        items.forEach(function (i) { i.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      });
      q.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); q.click(); }
      });
    });
  }

  /* ── Map Interactions ── */
  function initMap() {
    var map = document.getElementById('ne-map');
    if (!map) return;

    var tooltip = document.getElementById('map-tooltip');
    var paths = map.querySelectorAll('path[data-state]');

    paths.forEach(function (path) {
      path.addEventListener('mouseenter', function (e) {
        if (!tooltip) return;
        tooltip.querySelector('.tt-state').textContent = path.getAttribute('data-label') || '';
        tooltip.querySelector('.tt-shark').textContent = 'Shark Risk: ' + path.getAttribute('data-shark-level');
        tooltip.querySelector('.tt-line').textContent = path.getAttribute('data-quip') || '';
        tooltip.classList.add('visible');
        positionTooltip(e);
      });
      path.addEventListener('mousemove', positionTooltip);
      path.addEventListener('mouseleave', function () {
        if (tooltip) tooltip.classList.remove('visible');
      });
      path.addEventListener('click', function () {
        path.classList.toggle('selected');
      });
    });

    function positionTooltip(e) {
      if (!tooltip) return;
      tooltip.style.left = (e.clientX + 14) + 'px';
      tooltip.style.top  = (e.clientY - 10) + 'px';
    }
  }

  /* ── Buy Now Modal ── */
  function initBuyModal() {
    var btns = document.querySelectorAll('.buy-now-btn');
    var overlay = document.getElementById('buy-modal');
    var closes = document.querySelectorAll('.modal-close');
    if (!btns.length || !overlay) return;

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    closes.forEach(function (c) {
      c.addEventListener('click', closeModal);
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ── Mobile Nav ── */
  function initMobileNav() {
    var btn = document.querySelector('.nav-menu-btn');
    var links = document.querySelector('.nav-links');
    if (!btn || !links) return;
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  /* ── Easter Egg: Konami Code ── */
  function initKonami() {
    var code = [38,38,40,40,37,39,37,39,66,65];
    var pos = 0;
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === code[pos]) {
        pos++;
        if (pos === code.length) {
          pos = 0;
          activateEasterEgg();
        }
      } else {
        pos = 0;
      }
    });
  }

  function activateEasterEgg() {
    document.body.style.transition = 'filter 0.5s';
    document.body.style.filter = 'hue-rotate(180deg)';
    setTimeout(function () {
      document.body.style.filter = '';
      alert('🦈 You found the shark mode. Unfortunately, the sharks also found you. See the map.');
    }, 600);
  }

  /* ── Title easter egg ── */
  function initTitleEgg() {
    var clicks = 0;
    var logo = document.querySelector('.nav-logo');
    if (!logo) return;
    logo.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      clicks++;
      if (clicks === 5) {
        clicks = 0;
        document.title = '🦈 shark.exe has started running';
        setTimeout(function () { document.title = document.querySelector('title') ? document.querySelector('title').textContent : 'Boaty McBoatface Ventures'; }, 3000);
      }
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    initEject();
    initEjectCounter();
    initSoundToggle();
    initFAQ();
    initMap();
    initBuyModal();
    initMobileNav();
    initKonami();
    initTitleEgg();
  });

})();
