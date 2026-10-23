/* 海棠英语官网 · 共享交互脚本 */
(function () {
  'use strict';

  /* ---------- 移动端导航 ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      const open = mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  /* ---------- 导航栏滚动阴影 ---------- */
  const nav = document.getElementById('siteNav');
  if (nav) {
    const onScroll = function () {
      if (window.scrollY > 12) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 滚动淡入 ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 90 + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('reveal-in'); });
  }

  /* ---------- 数字滚动 ---------- */
  const counters = document.querySelectorAll('[data-count]');
  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = (String(target).split('.')[1] || '').length;
    const dur = 1600;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* ---------- FAQ 折叠 ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const btn = item.querySelector('.faq-q');
    const panel = item.querySelector('.faq-a');
    const icon = item.querySelector('.faq-icon');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      const isOpen = item.classList.toggle('open');
      panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : '0px';
      btn.setAttribute('aria-expanded', String(isOpen));
      if (icon) icon.style.transform = isOpen ? 'rotate(45deg)' : 'rotate(0deg)';
    });
  });

  /* ---------- 联系表单 ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const status = document.getElementById('formStatus');
      const btn = form.querySelector('button[type="submit"]');
      if (!form.name.value.trim() || !form.contact.value.trim() || !form.message.value.trim()) {
        status.textContent = '请先填写称呼、联系方式和咨询内容～';
        status.className = 'mt-4 text-sm font-medium text-rose-600';
        return;
      }
      btn.disabled = true;
      btn.textContent = '发送中…';
      // 静态站点：此处仅做演示反馈。上线时把提交对接到你的表单服务或邮箱接口。
      setTimeout(function () {
        status.textContent = '已收到你的咨询！我们会在 24 小时内联系你。';
        status.className = 'mt-4 text-sm font-medium text-forest-700';
        form.reset();
        btn.disabled = false;
        btn.textContent = '提交预约';
      }, 800);
    });
  }

  /* ---------- 当前页导航高亮（兜底） ---------- */
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav]').forEach(function (link) {
    if (link.getAttribute('data-nav') === page) {
      link.classList.add('nav-active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ---------- 页脚年份 ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
