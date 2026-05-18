function initNavActiveState() {
  const navLinks = Array.from(document.querySelectorAll(".top-nav a[href^='#']"));
  if (!navLinks.length || !("IntersectionObserver" in window)) return;

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    {
      rootMargin: "-18% 0px -68% 0px",
      threshold: [0.05, 0.2, 0.5],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

window.PortfolioI18n?.createSwitcher(".site-header");
window.PortfolioI18n?.applyPage();
initNavActiveState();
