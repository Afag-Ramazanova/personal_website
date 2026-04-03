(function () {
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");
  var year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 900px)").matches) {
          menu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  var prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (prefersReduced) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var revObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      revealEls.forEach(function (el) {
        revObs.observe(el);
      });
    }
  }

  var filters = document.getElementById("projects-filters");
  var grid = document.getElementById("projects-grid");
  if (filters && grid) {
    var cards = grid.querySelectorAll(".project-card");
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest(".projects-filter");
      if (!btn) return;
      var f = btn.getAttribute("data-filter");
      filters.querySelectorAll(".projects-filter").forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      cards.forEach(function (card) {
        var cat = card.getAttribute("data-category");
        var show = f === "all" || cat === f;
        card.classList.toggle("is-hidden", !show);
        card.setAttribute("aria-hidden", show ? "false" : "true");
      });
    });
  }

  var navLinks = document.querySelectorAll("#nav-menu a[href^='#']");
  var sections = document.querySelectorAll("main section[id]");

  function updateActiveNav() {
    if (!navLinks.length || !sections.length) return;
    var docEl = document.documentElement;
    var scrollBottom = window.scrollY + window.innerHeight;
    if (scrollBottom >= docEl.scrollHeight - 12) {
      var last = sections[sections.length - 1];
      var lastId = last ? last.id : "home";
      navLinks.forEach(function (l) {
        l.classList.toggle("is-active", l.getAttribute("href") === "#" + lastId);
      });
      return;
    }
    var probe = window.scrollY + window.innerHeight * 0.32;
    var activeId = "home";
    sections.forEach(function (sec) {
      var rect = sec.getBoundingClientRect();
      var top = window.scrollY + rect.top;
      var bottom = top + rect.height;
      if (probe >= top && probe < bottom) {
        activeId = sec.id;
      }
    });
    if (window.scrollY < 80) {
      activeId = "home";
    }
    navLinks.forEach(function (l) {
      var href = l.getAttribute("href");
      l.classList.toggle("is-active", href === "#" + activeId);
    });
  }

  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateActiveNav();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
  updateActiveNav();

  function initHeroTypewriter() {
    var el = document.getElementById("hero-role-text");
    if (!el) return;
    var roles = ["Data Scientist", "AI Engineer"];
    if (prefersReduced) {
      el.textContent = roles[0];
      return;
    }
    var ri = 0;
    var ci = 0;
    var deleting = false;

    function step() {
      var target = roles[ri];
      if (!deleting) {
        if (ci < target.length) {
          ci++;
          el.textContent = target.slice(0, ci);
          setTimeout(step, 48);
        } else {
          setTimeout(function () {
            deleting = true;
            step();
          }, 2200);
        }
      } else if (ci > 0) {
        ci--;
        el.textContent = target.slice(0, ci);
        setTimeout(step, 34);
      } else {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(step, 420);
      }
    }

    step();
  }

  initHeroTypewriter();
})();
