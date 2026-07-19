/* =====================================================================
   KarigarBook — explainer site
   Tiny, dependency-free interactions:
   1. Sticky nav shadow on scroll
   2. Smooth-scroll for in-page anchor links (with reduced-motion respect)
   3. Signature touch: the hero payout slip tallies itself line by line,
      the way KarigarBook computes a karigar's weekly net.
   4. Mock CTA buttons show a friendly "trial" acknowledgement.
   ===================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. Sticky nav elevation ---------------------------------- */
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 8) nav.classList.add("is-stuck");
      else nav.classList.remove("is-stuck");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- 2. Smooth scroll for anchor links ------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
      // move keyboard focus for accessibility
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* ---- helper: format rupees with Indian grouping --------------- */
  function formatINR(n) {
    var neg = n < 0;
    var s = Math.round(Math.abs(n)).toString();
    // Indian numbering: last 3 digits, then groups of 2
    var last3 = s.slice(-3);
    var rest = s.slice(0, -3);
    if (rest) {
      rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
      last3 = "," + last3;
    }
    return (neg ? "−Rs " : "Rs ") + rest + last3;
  }

  /* ---- 3. Hero payout slip: tally line by line ------------------ */
  var slip = document.getElementById("slipLines");
  var grandEl = document.getElementById("slipGrand");

  function setAmountEls(finalState) {
    // finalState=true renders the finished totals immediately (reduced motion)
    var rows = slip ? slip.querySelectorAll("[data-amount]") : [];
    var grand = 0;
    rows.forEach(function (el) {
      var val = parseInt(el.getAttribute("data-amount"), 10) || 0;
      grand += val;
      if (finalState) el.textContent = formatINR(val);
    });
    if (finalState && grandEl) grandEl.textContent = formatINR(grand);
    return grand;
  }

  function animateValue(el, to, duration, done) {
    var from = 0;
    var start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      // ease-out
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatINR(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
      else { el.textContent = formatINR(to); if (done) done(); }
    }
    requestAnimationFrame(tick);
  }

  function runSlip() {
    if (!slip) return;
    var rows = Array.prototype.slice.call(slip.querySelectorAll("[data-amount]"));
    if (reduceMotion) { setAmountEls(true); return; }

    var runningTotal = 0;
    var i = 0;
    function next() {
      if (i >= rows.length) {
        if (grandEl) animateValue(grandEl, runningTotal, 700);
        return;
      }
      var el = rows[i];
      var val = parseInt(el.getAttribute("data-amount"), 10) || 0;
      runningTotal += val;
      el.closest("[data-line]").classList.add("is-live");
      animateValue(el, val, 520, function () {
        i++;
        setTimeout(next, 130);
      });
    }
    next();
  }

  // Trigger the tally when the slip scrolls into view (once).
  if (slip) {
    if ("IntersectionObserver" in window && !reduceMotion) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runSlip();
            obs.disconnect();
          }
        });
      }, { threshold: 0.4 });
      io.observe(slip);
    } else {
      // no observer support or reduced motion: show final numbers
      setAmountEls(true);
    }
  }

  /* ---- 4. Mock CTA acknowledgement ------------------------------ */
  document.querySelectorAll("[data-mock]").forEach(function (btn) {
    var original = btn.textContent;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (btn.dataset.busy === "1") return;
      btn.dataset.busy = "1";
      btn.classList.add("is-pressed");
      btn.textContent = "Aa gaye — demo only ✓";
      setTimeout(function () { btn.classList.remove("is-pressed"); }, 160);
      setTimeout(function () {
        btn.textContent = original;
        btn.dataset.busy = "0";
      }, 2200);
    });
  });
})();
