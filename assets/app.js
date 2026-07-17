/* ===========================================================
   U&I MEL Hub — app logic (vanilla JS, no dependencies)
   Renders every region from window.HUB, then hash-routes
   between them. Works from file:// and from static hosting.
   =========================================================== */
(function () {
  "use strict";
  var HUB = window.HUB || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function esc(x){ return String(x == null ? "" : x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function domainById(id){ return (HUB.domains || []).find(function(d){ return d.id === id; }); }

  /* ---------- ticker ---------- */
  function buildTicker() {
    var t = $("#ticker-track"); if (!t) return;
    var items = (HUB.brief && HUB.brief.ticker) || [];
    var html = items.map(function (i) {
      return '<a href="' + esc(i.u) + '" target="_blank" rel="noopener">' + esc(i.t) + '</a><span class="dot">●</span>';
    }).join("");
    t.innerHTML = html + html; /* duplicate for seamless loop */
  }

  /* ---------- MAP: full-pager journey scene ---------- */
  function renderMap() {
    var c = $("#map-body"); if (!c) return;
    var m = HUB.meta || {}, brief = HUB.brief || {};
    var stations = [
      { href:"#/news",    n:"1", t:"What's the latest goss?",   f:"The Brief", d:"This week's signals from the field. Quick, fresh, zero effort.", tag:"Start here", c:"var(--c-brief)", img:"brief" },
      { href:"#/skills",  n:"2", t:"Bestie, where to next?",    f:"The Path",  d:"Your craft, Officer to Lead — where you are, what to learn next.", tag:"Level up", c:"var(--c-path)", img:"path" },
      { href:"#/gateway", n:"3", t:"I wonder what's out there.", f:"The Field", d:"Meet the wider MEL world: orgs, communities, events and jobs.", tag:"Go outward", c:"var(--c-field)", img:"field" }
    ];
    /* each station card: its image is a full-bleed background, with a scrim so text stays readable */
    function stationInner(s) {
      return '<img class="station-bg" src="assets/img/' + s.img + '.jpg" alt="" onerror="this.remove()">' +
        '<span class="st-scrim"></span>' +
        '<div class="st-top"><span class="no">' + s.n + '</span><span class="formal">' + esc(s.f) + '</span></div>' +
        '<h3>' + esc(s.t) + '</h3><p>' + esc(s.d) + '</p>' +
        '<span class="tag">' + esc(s.tag) + '</span>';
    }
    var path = stations.map(function (s) {
      return '<a class="station" href="' + s.href + '" style="--sc:' + s.c + '">' + stationInner(s) + '</a>';
    }).join("");
    path += '<div class="station locked" style="--sc:#cdccc2">' +
      stationInner({ img: "milestones", n: "4", f: "Milestones", t: "My mom had me tested.", d: "Self-assessment & badges. Sealed until the next update.", tag: "Locked" }) +
      '</div>';

    var feat = (brief.sections || []).filter(function (s) { return s.id === "trends"; })[0] || (brief.sections || [])[0];
    var fc = feat && feat.cards && feat.cards[0];
    var MAPBG = '<svg class="map-bg" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<g stroke="rgba(21,19,13,0.08)" stroke-width="1.5" fill="none">' +
        '<path d="M0 90H1200"/><path d="M0 180H1200"/><path d="M0 300H1200"/><path d="M0 430H1200"/><path d="M0 560H1200"/><path d="M0 680H1200"/>' +
        '<path d="M120 0V760"/><path d="M260 0V760"/><path d="M430 0V760"/><path d="M600 0V760"/><path d="M770 0V760"/><path d="M940 0V760"/><path d="M1080 0V760"/>' +
        '<path d="M260 180L600 380"/><path d="M600 380L940 180"/><path d="M430 560L770 380"/>' +
      '</g>' +
      '<g stroke="rgba(21,19,13,0.15)" stroke-width="6" fill="none" stroke-linecap="round">' +
        '<path d="M-20 250 C 300 200, 500 470, 1220 360"/>' +
        '<path d="M180 -20 C 420 260, 700 300, 900 780"/>' +
        '<path d="M0 600 C 350 540, 800 640, 1220 560"/>' +
        '<ellipse cx="600" cy="380" rx="210" ry="150"/>' +
      '</g></svg>';

    c.innerHTML =
      '<div class="mapscene">' + MAPBG +
        '<div class="map-top">' +
          '<p class="map-intro">Pick a stop and explore — this week’s Brief, your skills Path, the Field.</p>' +
          '<div class="map-sticker">★★★★★<b>Field Guide</b>for the MEL team</div>' +
        '</div>' +
        '<div class="map-path">' + path + '</div>' +
      '</div>';
  }

  /* ---------- SKILLS DOJO: matrix + badges ---------- */
  function renderSkills() {
    var levels = HUB.levels || [], domains = HUB.domains || [];

    /* legend */
    var legend = $("#skills-legend");
    if (legend) legend.innerHTML = domains.map(function (d) {
      return '<span><i class="sw" style="background:' + d.color + '"></i>' + esc(d.name) + '</span>';
    }).join("");

    /* matrix */
    var m = $("#skills-matrix"); if (!m) return;
    var head = '<tr><th class="rowhead">Domain &#9660; / Level &#9654;</th>' +
      levels.map(function (l) { return '<th>' + esc(l.name) + '<br><span class="mono" style="font-size:8px">' + esc(l.years) + '</span></th>'; }).join("") + '</tr>';
    var rows = domains.map(function (d) {
      var cells = levels.map(function (l) {
        return '<td class="cell"><button data-dom="' + d.id + '" data-lvl="' + l.id + '">' + esc(d.cells[l.id] || "") + '</button></td>';
      }).join("");
      return '<tr style="--rc:' + d.color + '"><td class="dom">' + d.glyph + ' ' + esc(d.name) +
        '<br><span class="mono" style="font-size:8px;opacity:.85">' + esc(d.spine) + '</span></td>' + cells + '</tr>';
    }).join("");
    m.innerHTML = '<thead>' + head + '</thead><tbody>' + rows + '</tbody>';

    /* cell interaction */
    var buttons = m.querySelectorAll("button[data-dom]");
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        m.querySelectorAll("td.cell").forEach(function (td) { td.classList.remove("on"); });
        b.parentNode.classList.add("on");
        showCell(b.getAttribute("data-dom"), b.getAttribute("data-lvl"));
      });
    });

    /* badges */
    var bg = $("#skills-badges");
    if (bg) bg.innerHTML = (HUB.badges || []).map(function (bd) {
      var d = domainById(bd.domain) || {};
      return '<div class="badge"><span class="coin" style="background:' + (d.color || "#cf9f3c") + '">' + bd.glyph + '</span>' +
        '<div><h4>' + esc(bd.name) + '</h4><p>' + esc(bd.criterion) + '</p></div></div>';
    }).join("");

    /* default selection: first domain, Manager (or first level) */
    var firstLvl = (levels[2] || levels[0] || {}).id;
    var def = m.querySelector('button[data-dom="' + domains[0].id + '"][data-lvl="' + firstLvl + '"]') || m.querySelector("button[data-dom]");
    if (def) def.click();
  }

  function showCell(domId, lvlId) {
    var d = domainById(domId); if (!d) return;
    var lvl = (HUB.levels || []).find(function (l) { return l.id === lvlId; }) || {};
    var box = $("#skills-detail"); if (!box) return;
    box.style.borderLeftColor = d.color;
    var learn = (d.learn || []).map(function (x) {
      var ext = x.href.charAt(0) === "#" ? "" : ' target="_blank" rel="noopener"';
      return '<a href="' + esc(x.href) + '"' + ext + '>' + esc(x.label) + '</a>';
    }).join("");
    box.innerHTML =
      '<div class="cd-k">' + d.glyph + ' ' + esc(d.name) + ' &middot; ' + esc(lvl.name) + ' (' + esc(lvl.years) + ')</div>' +
      '<h4>What good looks like</h4>' +
      '<p>' + esc(d.cells[lvlId] || "") + '</p>' +
      '<div class="cd-k">Learn next</div><div class="learn" style="margin-top:6px">' + learn + '</div>';
  }

  /* ---------- NEWSROOM ---------- */
  function renderNews() {
    var brief = HUB.brief || {}, sections = brief.sections || [];

    var tabs = $("#news-subtabs");
    if (tabs) {
      var btns = '<button class="active" data-sec="all">All</button>' +
        sections.map(function (s) { return '<button data-sec="' + s.id + '">' + esc(s.name) + '</button>'; }).join("");
      tabs.innerHTML = btns;
      tabs.querySelectorAll("button").forEach(function (b) {
        b.addEventListener("click", function () {
          tabs.querySelectorAll("button").forEach(function (x) { x.classList.remove("active"); });
          b.classList.add("active");
          filterNews(b.getAttribute("data-sec"));
        });
      });
    }

    var grid = $("#news-grid");
    if (grid) grid.innerHTML = sections.map(function (s) {
      return s.cards.map(function (card) {
        return '<div class="newscard" data-sec="' + s.id + '" style="border-top-color:' + s.color + '; --cc:' + s.color + '">' +
          '<div class="nk" style="color:' + s.color + '">' + esc(s.name) + (s.region === "india" ? " · India" : "") + '</div>' +
          '<h4>' + esc(card.title) + '</h4><p>' + esc(card.summary) + '</p>' +
          '<a class="src" href="' + esc(card.source.href) + '" target="_blank" rel="noopener">' + esc(card.source.label) + '</a>' +
          '</div>';
      }).join("");
    }).join("");

    var edu = $("#news-edu");
    if (edu) edu.innerHTML = (brief.education || []).map(function (e) {
      var free = /free|covered|stipend/i.test(e.cost);
      return '<div class="educard"><div class="badges">' +
        '<span class="bdg">' + esc(e.format) + '</span>' +
        '<span class="bdg ' + (free ? "free" : "paid") + '">' + esc(e.cost) + '</span></div>' +
        '<h4>' + esc(e.title) + '</h4><p>' + esc(e.note) + '</p>' +
        '<a href="' + esc(e.href) + '" target="_blank" rel="noopener">Open ↗</a></div>';
    }).join("");
  }
  function filterNews(sec) {
    document.querySelectorAll("#news-grid .newscard").forEach(function (c) {
      c.style.display = (sec === "all" || c.getAttribute("data-sec") === sec) ? "" : "none";
    });
  }

  /* ---------- GUILD HALL ---------- */
  function renderGateway() {
    var g = HUB.gateway || {}, c = $("#gateway-body"); if (!c) return;
    function col(title, arr) {
      return '<div class="guildcol"><h3>' + esc(title) + '</h3>' +
        (arr || []).map(function (x) {
          return '<a class="linkrow" href="' + esc(x.href) + '" target="_blank" rel="noopener">' +
            '<span class="go">↗</span><span class="ln">' + esc(x.name) + '</span><br>' +
            '<span class="nt">' + esc(x.note) + '</span></a>';
        }).join("") + '</div>';
    }
    function trendCard(id, title, desc, color) {
      return '<a class="trendcard" href="#/field/' + id + '" style="--tc:' + color + '">' +
        '<span class="tc-tag">Trend report ↗</span>' +
        '<h3>' + title + '</h3><p>' + desc + '</p>' +
        '<span class="tc-go">View the trends →</span></a>';
    }
    c.innerHTML =
      '<div class="trendcards">' +
        trendCard("career", "Career", "Where the work is heading — demand, in-demand skills and salary signals.", "var(--c-field)") +
        trendCard("education", "Social Development &amp; Education", "How the field learns — courses, fellowships and where the funding is moving.", "var(--c-path)") +
      '</div>' +
      '<div class="guildgrid">' +
        col("People & Organisations", g.people_orgs) +
        col("Communities & Events", g.communities_events) +
      '</div>';
  }

  /* ---------- FIELD sub-pages: trend reports ---------- */
  function renderFieldSub(which) {
    var c = $("#fieldsub-body"); if (!c) return;
    var t = (HUB.fieldTrends || {})[which];
    if (!t) { c.innerHTML = '<a class="fs-back" href="#/gateway">← The Field</a><p class="deck">Report not found.</p>'; return; }
    var bars = (t.bars || []).map(function (b) {
      return '<div class="fs-bar"><div class="fs-bl">' + esc(b.label) + '</div>' +
        '<div class="fs-track"><div class="fs-fill" style="width:' + b.v + '%">' + b.v + '%</div></div></div>';
    }).join("");
    var figs = (t.figures || []).map(function (f) {
      return '<div class="fs-fig"><b>' + esc(f.b) + '</b><span>' + esc(f.s) + '</span></div>';
    }).join("");
    var points = (t.points || []).map(function (p) {
      return '<li>' + esc(p.t) + ' <a href="' + esc(p.src.href) + '" target="_blank" rel="noopener">' + esc(p.src.label) + ' ↗</a></li>';
    }).join("");
    c.innerHTML =
      '<a class="fs-back" href="#/gateway">← The Field</a>' +
      '<div class="kicker">' + esc(t.kicker || "Trend report") + '</div>' +
      '<h1 class="title">' + esc(t.title) + '</h1>' +
      '<p class="deck">' + esc(t.summary) + '</p>' +
      (bars ? '<h2 class="sub">By the numbers</h2><div class="fs-bars">' + bars + '</div>' : '') +
      (figs ? '<div class="fs-figs">' + figs + '</div>' : '') +
      '<h2 class="sub">What’s moving</h2><ul class="fs-points">' + points + '</ul>';
  }

  /* ---------- router ---------- */
  var REGIONS = ["map", "skills", "news", "gateway"];
  var SECTIONS = REGIONS.concat(["fieldsub"]);
  function route() {
    var raw = (location.hash || "").replace("#/", "");
    var sub = raw.indexOf("field/") === 0 ? raw.split("/")[1] : null;
    var h = sub ? "gateway" : raw;
    if (REGIONS.indexOf(h) === -1) h = "map";
    document.body.setAttribute("data-region", h);
    if (sub) renderFieldSub(sub);
    var showId = sub ? "fieldsub" : h;
    SECTIONS.forEach(function (r) {
      var sec = document.getElementById("region-" + r);
      if (sec) sec.classList.toggle("show", r === showId);
    });
    document.querySelectorAll("nav.regions a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-region") === h);
    });
    var sc = $(".screen"); if (sc) sc.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function init() {
    buildTicker();
    renderMap();
    renderSkills();
    renderNews();
    renderGateway();
    /* stamp issue/date from data */
    var stamp = $("#brief-stamp");
    if (stamp && HUB.meta) stamp.innerHTML = "Issue #" + HUB.meta.briefIssue + "<br>" + HUB.meta.briefDate + " · refreshes Fridays";
    window.addEventListener("hashchange", route);
    route();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
