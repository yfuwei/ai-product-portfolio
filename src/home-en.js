/* English homepage mirrors the locked Chinese source. Shared i18n is not
   loaded here, so historical dictionaries cannot overwrite its translation. */
(() => {
  // Preserve legacy language-query entry links and their section anchors.
  if (new URLSearchParams(window.location.search).get("lang") === "zh") {
    const chinese = new URL("../index.html", window.location.href);
    chinese.hash = window.location.hash;
    window.location.replace(chinese.href);
    return;
  }

  const links = [...document.querySelectorAll('.ed-nav a[href^="#"]')];
  const sections = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
  if (!sections.length) return;

  function updateNavigation() {
    const headerHeight = document.querySelector(".ed-header").getBoundingClientRect().height;
    const marker = headerHeight + 130;
    const active = [...sections].reverse().find(section => section.getBoundingClientRect().top <= marker) || sections[0];
    links.forEach(link => {
      if (link.hash === `#${active.id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  let scheduled = false;
  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      updateNavigation();
      scheduled = false;
    });
  }, { passive: true });
  window.addEventListener("resize", updateNavigation);
  window.addEventListener("pageshow", updateNavigation);
  updateNavigation();
})();

/* Progressively enhance the original five manifestos. All complete bodies
   are readable in the shipped HTML; only working controls collapse them. */
(() => {
  const manifestos = document.querySelector('.ed-judgments');
  if (!manifestos) return;
  const controls = [...manifestos.querySelectorAll('.ed-judgment')].map((article, i) => {
    const heading = article.querySelector('h3');
    const body = article.querySelector('.ed-judgment-body');
    const button = article.querySelector('.ed-judgment-toggle');
    body.id = `judgment-reading-${i + 1}`;
    body.setAttribute('role', 'region');
    body.setAttribute('aria-labelledby', heading.id);
    button.setAttribute('aria-controls', body.id);
    function setOpen(open) {
      body.hidden = !open;
      article.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
      const label = open ? 'Collapse' : 'Read in full';
      button.querySelector('.ed-toggle-label').textContent = label;
      button.setAttribute('aria-label', `${label}: ${heading.textContent}`);
    }
    button.addEventListener('click', () => setOpen(body.hidden));
    setOpen(false);
    button.hidden = false;
    return button;
  });
  manifestos.classList.add('is-enhanced');
  // Standard accordion keyboard convenience, with native Enter/Space activation.
  controls.forEach((button, i) => button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown') next = (i + 1) % controls.length;
    else if (event.key === 'ArrowUp') next = (i - 1 + controls.length) % controls.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = controls.length - 1;
    else return;
    event.preventDefault();
    controls[next].focus();
  }));
})();

/* Reuse P2's native-dialog interaction pattern without importing project CSS
   or changing its frozen component. Links still open originals without JS. */
(() => {
  const dialog = document.getElementById('home-image-preview');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('img');
  const zoom = dialog.querySelector('.ed-image-zoom');
  const close = dialog.querySelector('.ed-image-close');
  let lastTrigger = null;
  function open(trigger) {
    const source = trigger.querySelector('img');
    if (!source) return;
    lastTrigger = trigger;
    image.src = source.currentSrc || source.src;
    image.alt = source.alt;
    dialog.querySelector('h2').textContent = trigger.dataset.imageTitle;
    dialog.querySelector('.ed-image-original').href = image.src;
    dialog.classList.remove('is-native');
    zoom.textContent = 'View original size';
    zoom.setAttribute('aria-pressed', 'false');
    document.body.classList.add('ed-image-open');
    dialog.showModal();
    close.focus();
  }
  document.querySelectorAll('.ed-image-trigger').forEach(trigger => {
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', dialog.id);
    trigger.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      open(trigger);
    });
    trigger.addEventListener('keydown', event => {
      if (event.key !== ' ') return;
      event.preventDefault();
      open(trigger);
    });
  });
  zoom.addEventListener('click', () => {
    const native = dialog.classList.toggle('is-native');
    zoom.setAttribute('aria-pressed', String(native));
    zoom.textContent = native ? 'Fit to window' : 'View original size';
    dialog.querySelector('.ed-lightbox-image-wrap').scrollTo(0, 0);
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  // Native modal dialog traps focus and handles Escape; restore its origin.
  dialog.addEventListener('close', () => {
    document.body.classList.remove('ed-image-open');
    image.removeAttribute('src');
    image.alt = '';
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  });
})();
