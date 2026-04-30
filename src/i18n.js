(function () {
  const storageKey = "portfolio.lang";
  const supported = new Set(["zh", "en"]);

  function normalizeLang(value) {
    return supported.has(value) ? value : null;
  }

  function getUrlLang() {
    return normalizeLang(new URLSearchParams(window.location.search).get("lang"));
  }

  function isEnglishEntry() {
    return window.location.pathname.split("/").includes("en");
  }

  function getInitialLang() {
    return getUrlLang() || normalizeLang(localStorage.getItem(storageKey)) || (isEnglishEntry() ? "en" : "zh");
  }

  let currentLang = getInitialLang();
  localStorage.setItem(storageKey, currentLang);

  function t(key) {
    const dict = window.I18N_PAGE || {};
    return dict[currentLang]?.[key] ?? dict.zh?.[key] ?? key;
  }

  function setLang(lang, options = {}) {
    const next = normalizeLang(lang) || "zh";
    currentLang = next;
    localStorage.setItem(storageKey, next);
    document.documentElement.lang = next === "en" ? "en" : "zh-CN";
    applyPage(options);
    window.dispatchEvent(new CustomEvent("portfolio:langchange", { detail: { lang: next } }));
  }

  function addLangToHref(href) {
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
    try {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return href;
      if (/\.(pdf|zip|png|jpe?g|webp|gif|svg)$/i.test(url.pathname)) return href;
      if (currentLang === "en") {
        url.searchParams.set("lang", "en");
      } else {
        url.searchParams.delete("lang");
      }
      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return href;
    }
  }

  function syncLinks() {
    document.querySelectorAll("a[href]").forEach((link) => {
      const original = link.dataset.hrefBase || link.getAttribute("href");
      link.dataset.hrefBase = original;
      link.setAttribute("href", addLangToHref(original));
    });
  }

  function applyPage(options = {}) {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      if (!node.__i18nOriginalText) node.__i18nOriginalText = node.textContent;
      const dict = window.I18N_PAGE || {};
      const key = node.dataset.i18n;
      const value = dict[currentLang]?.[key];
      node.textContent = value ?? node.__i18nOriginalText;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((node) => {
      const dict = window.I18N_PAGE || {};
      const key = node.dataset.i18nHtml;
      if (!node.__i18nOriginalHtml) node.__i18nOriginalHtml = node.innerHTML;
      const value = dict[currentLang]?.[key];
      node.innerHTML = value ?? node.__i18nOriginalHtml;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
      node.dataset.i18nAttr.split(",").forEach((pair) => {
        const [attr, key] = pair.split(":").map((item) => item.trim());
        if (!attr || !key) return;
        node.__i18nOriginalAttrs = node.__i18nOriginalAttrs || {};
        if (!node.__i18nOriginalAttrs[attr]) node.__i18nOriginalAttrs[attr] = node.getAttribute(attr) || "";
        const dict = window.I18N_PAGE || {};
        const value = dict[currentLang]?.[key];
        node.setAttribute(attr, value ?? node.__i18nOriginalAttrs[attr]);
      });
    });

    if (window.I18N_PAGE?.meta) {
      const meta = window.I18N_PAGE.meta[currentLang] || window.I18N_PAGE.meta.zh;
      if (meta?.title) document.title = meta.title;
      const desc = document.querySelector('meta[name="description"]');
      if (desc && meta?.description) desc.setAttribute("content", meta.description);
    }

    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
      const active = button.dataset.langSwitch === currentLang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (!options.skipLinks) syncLinks();
  }

  function createSwitcher(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container || container.querySelector(".language-toggle")) return;
    const wrap = document.createElement("div");
    wrap.className = "language-toggle";
    wrap.setAttribute("aria-label", "Language");
    wrap.innerHTML = `
      <button type="button" data-lang-switch="zh">ZH</button>
      <span>/</span>
      <button type="button" data-lang-switch="en">EN</button>
    `;
    container.appendChild(wrap);
    wrap.querySelectorAll("[data-lang-switch]").forEach((button) => {
      button.addEventListener("click", () => setLang(button.dataset.langSwitch));
    });
  }

  function getData(zhData, enData) {
    return currentLang === "en" && enData ? enData : zhData;
  }

  window.PortfolioI18n = {
    get lang() {
      return currentLang;
    },
    t,
    setLang,
    applyPage,
    createSwitcher,
    getData,
    addLangToHref,
  };

  document.addEventListener("DOMContentLoaded", () => applyPage());
})();
