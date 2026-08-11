(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const sectionLinks = [...document.querySelectorAll('.section-link')];
  const sections = [...document.querySelectorAll('[data-section]')];

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  const setMenu = (open) => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
    mobileNav.classList.toggle('open', open);
    header?.classList.toggle('menu-open', open);
  };

  menuButton?.addEventListener('click', () => {
    setMenu(!mobileNav?.classList.contains('open'));
  });

  mobileNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  document.addEventListener('click', (event) => {
    if (!mobileNav?.classList.contains('open')) return;
    if (event.target instanceof Element && !event.target.closest('.site-header')) setMenu(false);
  });

  const setActiveSection = (id) => {
    sectionLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActiveSection(visible.target.id);
    }, {
      rootMargin: '-18% 0px -65% 0px',
      threshold: [0, 0.1, 0.3, 0.6]
    });
    sections.forEach((section) => observer.observe(section));
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();
