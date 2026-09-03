document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelectorAll(".nav__link");
  const backToTop = document.getElementById("backToTop");
  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  const handleScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  const toggleMenu = () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  };
  navToggle.addEventListener("click", toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (music && musicToggle) {
    musicToggle.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        musicToggle.textContent = "🔊";
      } else {
        music.pause();
        musicToggle.textContent = "🔇";
      }
    });
  }

  const revealTargets = document.querySelectorAll(
    ".about__card, .service-card, .contact-card, .section__header"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => observer.observe(el));
});
