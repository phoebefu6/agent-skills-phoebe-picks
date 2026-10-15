(function () {
  const picks = window.PICKS || window.REVIEWS || [];
  const publishedPicks = picks.filter((pick) => pick.status === "published" && pick.galleryLink);
  const exploringPicks = picks.filter((pick) => pick.status === "exploring" && pick.galleryLink);
  const filters = window.FILTERS || { scenarios: [], statuses: [] };
  const state = {
    category: "all",
    query: "",
    showAll: false
  };

  const byId = (id) => document.getElementById(id);

  const nodes = {
    search: byId("searchInput"),
    searchStatus: byId("searchStatus"),
    categoryFilters: byId("categoryFilters"),
    grid: byId("skillGrid"),
    count: byId("resultCount"),
    empty: byId("emptyState"),
    drawer: byId("detailDrawer"),
    drawerContent: byId("drawerContent"),
    drawerClose: byId("drawerClose"),
    drawerBackdrop: byId("drawerBackdrop"),
    productRail: byId("productRail"),
    fieldTestRail: byId("fieldTestRail"),
    skillStack: byId("skillStack"),
    publishedCount: byId("publishedCount"),
    fieldTestCount: byId("fieldTestCount")
  };

  const stackRoles = {
    "find-skills": {
      role: "Discover",
      line: "Finds candidates and checks the source before another Skill enters the repo."
    },
    "design-taste-frontend": {
      role: "Taste",
      line: "Keeps the gallery away from generic AI-page patterns."
    },
    "frontend-design": {
      role: "Screens",
      line: "Turns the idea into usable interface states."
    },
    "design-review": {
      role: "Critique",
      line: "Converts visual discomfort into concrete fixes."
    },
    "high-end-visual-design": {
      role: "Polish",
      line: "Raises type, spacing, surface, and hierarchy quality."
    },
    "design-consultation": {
      role: "System",
      line: "Turns repeated design choices into reusable rules."
    },
    "canvas-design": {
      role: "Canvas",
      line: "Gives each build a visual philosophy before the screen."
    },
    "emil-design-eng": {
      role: "Motion",
      line: "Makes the page feel responsive in the hand."
    }
  };

  const stackOrder = [
    "find-skills",
    "design-taste-frontend",
    "frontend-design",
    "design-review",
    "high-end-visual-design",
    "design-consultation",
    "canvas-design",
    "emil-design-eng"
  ];

  const demoTitles = {
    "frontend-design": "Product Screen",
    "canvas-design": "Product Canvas",
    "emil-design-eng": "Motion Lab",
    "design-taste-frontend": "Taste Lab",
    "design-review": "Critique Loop",
    "high-end-visual-design": "Visual Atelier",
    "design-consultation": "System Room",
    "impeccable": "Impeccable Design Flight Deck",
    "pm-skills": "Lantern Product OS",
    "find-skills": "Discovery Desk",
    "dashboard": "Portfolio Command Center",
    "algorithmic-art": "Evidence Tides",
    "data-report": "Evidence Report",
    "dbt-transformation-patterns": "Pipeline Lab · dbt",
    "airflow-dag-patterns": "Pipeline Lab · Airflow",
    "baoyu-infographic": "Skill-to-Artifact Map",
    "sites": "Two-Skill Lab",
    "mindmap": "Skill System Map",
    "hand-drawn-styles": "One Recipe, Five Proof Steps",
    "d3-visualization": "Skill Constellation",
    "customer-research": "KOL Evidence Studio - Signal Desk",
    "product-marketing": "KOL Evidence Studio - Positioning Room",
    "content-strategy": "KOL Content Engine - Strategy Map",
    "social": "KOL Content Engine - Distribution Desk",
    "copywriting": "Proof to Action Lab - Conversion Page",
    "analytics": "Proof to Action Lab - Measurement Lab",
    "lead-magnets": "Skill Evaluation Starter Kit",
    "emails": "Skill Evaluation Starter Kit - Email Journey"
  };

  let entranceMotionPlayed = false;
  let revealObserver = null;
  let lastFocusedElement = null;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function labelForStatus(status) {
    const found = filters.statuses.find((item) => item.id === status);
    return found ? found.label : "Wishlist";
  }

  function labelForScenario(scenario) {
    const found = filters.scenarios.find((item) => item.id === scenario);
    return found ? found.label : scenario;
  }

  function labelForPlatform(platform) {
    const found = (filters.platforms || []).find((item) => item.id === platform);
    return found ? found.label : platform;
  }

  function pickText(pick) {
    return [
      pick.name,
      pick.summary,
      pick.phoebeNote,
      pick.recommendation,
      pick.source,
      pick.sourceRepo,
      pick.sourcePath,
      pick.groundUpBuild,
      pick.conceptCoverage,
      pick.rating,
      pick.ratingSummary,
      pick.demo,
      ...(pick.coreConcepts || []),
      ...(pick.badges || []),
      ...(pick.good || []),
      ...(pick.improve || []),
      ...(pick.useCases || []),
      ...(pick.scenarios || []).map(labelForScenario),
      ...(pick.platforms || []).map(labelForPlatform)
    ].join(" ").toLowerCase();
  }

  function visiblePicks() {
    return publishedPicks
      .filter((pick) => {
        const categoryMatch = state.category === "all" || (pick.scenarios || []).includes(state.category);
        const queryMatch = !state.query || pickText(pick).includes(state.query);
        return categoryMatch && queryMatch;
      })
      .sort((a, b) => {
        const ratingA = typeof a.rating === "number" ? a.rating : Number.NEGATIVE_INFINITY;
        const ratingB = typeof b.rating === "number" ? b.rating : Number.NEGATIVE_INFINITY;
        return ratingB - ratingA || a.name.localeCompare(b.name);
      });
  }

  function renderFilterGroup(container, kind, items) {
    const allLabel = kind === "category" ? "All categories" : "All";
    const options = [{ id: "all", label: allLabel }, ...items];
    const featured = kind === "category" ? options.filter((item) => ["all", "design", "product-design", "data", "research"].includes(item.id)) : options;
    const extra = kind === "category" ? options.filter((item) => !featured.includes(item)) : [];
    const buttonMarkup = (values) => values
      .map((item) => {
        const active = state[kind] === item.id ? " is-active" : "";
        const pressed = state[kind] === item.id ? "true" : "false";
        return `<button class="filter-button${active}" type="button" data-kind="${kind}" data-value="${escapeHtml(item.id)}" aria-pressed="${pressed}">${escapeHtml(item.label)}</button>`;
      })
      .join("");
    container.innerHTML = buttonMarkup(featured) + (extra.length
      ? `<details class="more-filters"${extra.some((item) => item.id === state[kind]) ? " open" : ""}><summary>More filters</summary><div class="more-filter-options">${buttonMarkup(extra)}</div></details>`
      : "");
  }

  function renderFilters() {
    if (nodes.categoryFilters) {
      renderFilterGroup(nodes.categoryFilters, "category", filters.scenarios || []);
    }
  }

  function demoTitle(pick) {
    return demoTitles[pick.id] || pick.name;
  }

  function sourcePointList(pick) {
    const points = [
      `Source: ${pick.sourceRepo || pick.source || "Pending"}`,
      `Reference: ${pick.sourcePath || pick.sourceUrl || "Pending"}`
    ];

    if (pick.dateExplored) {
      points.push(`Explored: ${pick.dateExplored}`);
    }

    return listMarkup(points);
  }

  function ratingLabel(pick) {
    const scale = pick.ratingScale || 10;
    return `${pick.rating}/${scale} overall rating`;
  }

  function fieldTestPointList(pick) {
    const points = [];

    if (pick.groundUpBuild) {
      points.push(`Ground-up build: ${pick.groundUpBuild}`);
    }
    if (typeof pick.rating === "number") {
      points.push(`Overall rating: ${ratingLabel(pick)}${pick.ratingSummary ? ` - ${pick.ratingSummary}` : ""}`);
    }

    return listMarkup(points.length ? points : ["Field test pending"]);
  }

  function platformSubtitle(pick) {
    const values = (pick.platforms || []).map(labelForPlatform).filter(Boolean);
    return values.length ? `For ${values.join(", ")}` : "For AI agents";
  }

  function renderProductRail() {
    if (!nodes.productRail) return;
    const projects = [
      { id: "design-taste-frontend", image: "assets/artifact-design-taste-lab.png", outcome: "A visual study that turns vague taste into design decisions an agent can use." },
      { id: "find-skills", image: "assets/artifact-discovery-desk.png", outcome: "A discovery desk that checks the source before a Skill earns attention." }
    ];
    nodes.productRail.innerHTML = projects.map(({ id, image, outcome }, index) => {
      const pick = publishedPicks.find((item) => item.id === id);
      if (!pick) return "";
      return `<article class="selected-project">
        <a class="selected-preview" href="${escapeHtml(pick.galleryLink)}" aria-label="Open ${escapeHtml(demoTitle(pick))}"><img src="${escapeHtml(image)}" alt="Preview of ${escapeHtml(demoTitle(pick))}" loading="lazy"></a>
        <div class="selected-project-copy">
          <span class="project-index">0${index + 1} / ${escapeHtml(labelForScenario((pick.scenarios || [])[0] || "design"))}</span>
          <h3>${escapeHtml(demoTitle(pick))}</h3>
          <p>${escapeHtml(outcome)}</p>
          <div class="project-bottom"><span>Built with <strong>${escapeHtml(pick.name)}</strong> · ${escapeHtml(pick.rating)}/10</span><a href="${escapeHtml(pick.galleryLink)}">Explore project <span aria-hidden="true">↗</span></a></div>
        </div>
      </article>`;
    }).join("");
  }

  function renderFieldTests() {
    if (!nodes.fieldTestRail) return;

    const artifactImages = { "hand-drawn-styles": "demos/hand-drawn-styles-field-test/skill-trust-bean-infographic.png" };
    const previewPages = { sites: "demos/two-skill-lab/index.html?preview=map", mindmap: "demos/skill-system-studio/index.html" };
    const featuredOrder = ["sites", "mindmap", "hand-drawn-styles"];

    nodes.fieldTestRail.innerHTML = exploringPicks
      .slice()
      .sort((a, b) => {
        const aIndex = featuredOrder.indexOf(a.id);
        const bIndex = featuredOrder.indexOf(b.id);
        if (aIndex !== -1 || bIndex !== -1) return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
        return (b.dateExplored || "").localeCompare(a.dateExplored || "");
      })
      .map((pick, index) => {
        const artifact = artifactImages[pick.id];
        const previewPage = previewPages[pick.id];
        const rating = typeof pick.rating === "number" ? `${pick.rating}/${pick.ratingScale || 10}` : "Rating pending";
        const coverage = (pick.badges || []).find((badge) => badge.includes("concept")) || "Field test complete";

        return `
          <article class="field-test-card${index < 3 ? " has-preview" : " is-compact"}" data-motion-card style="--i:${index}">
            ${index < 3 ? `<div class="field-test-preview" aria-hidden="true">${artifact ? `<img src="${escapeHtml(artifact)}" alt="" loading="lazy">` : `<iframe src="${escapeHtml(previewPage)}" title="Preview of ${escapeHtml(pick.name)} field test" tabindex="-1" loading="lazy"></iframe>`}</div>` : ""}
            <div class="field-test-copy">
              <div class="field-test-meta"><span>Exploring</span><small>Credibility pending</small></div>
              <h3>${escapeHtml(pick.name)}</h3>
              <p>${escapeHtml(pick.summary)}</p>
              <dl><div><dt>Rating</dt><dd>${escapeHtml(rating)}</dd></div><div><dt>Coverage</dt><dd>${escapeHtml(coverage)}</dd></div></dl>
              <div class="field-test-actions">
                <a href="${escapeHtml(pick.galleryLink)}">View field test <span aria-hidden="true">→</span></a>
                <button type="button" data-open-detail="${escapeHtml(pick.id)}">Review notes</button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderSkillStack() {
    if (!nodes.skillStack) return;

    const ordered = stackOrder
      .map((id) => picks.find((pick) => pick.id === id))
      .filter(Boolean);

    nodes.skillStack.innerHTML = ordered
      .map((pick, index) => {
        const role = stackRoles[pick.id] || { role: labelForStatus(pick.status), line: pick.summary };
        const rating = typeof pick.rating === "number" ? `${pick.rating}/${pick.ratingScale || 10}` : labelForStatus(pick.status);
        const href = pick.galleryLink || pick.sourceUrl || "#gallery";
        const status = labelForStatus(pick.status);

        return `
          <a class="stack-card stack-card-${index + 1}" href="${escapeHtml(href)}" data-motion-card>
            <span>${escapeHtml(role.role)}</span>
            <strong>${escapeHtml(pick.name)}</strong>
            <p>${escapeHtml(role.line)}</p>
            <small>${escapeHtml(status)}, ${escapeHtml(rating)}</small>
          </a>
        `;
      })
      .join("");
  }

  function renderCards() {
    const items = visiblePicks();
    const shownItems = state.showAll || state.query || state.category !== "all" ? items : items.slice(0, 8);
    byId("showAllPicks").hidden = shownItems.length === items.length;
    byId("showAllPicks").innerHTML = `Browse all ${publishedPicks.length} Skills <span aria-hidden="true">↗</span>`;
    nodes.count.textContent = `${shownItems.length} ${shownItems.length === 1 ? "Skill" : "Skills"} shown`;
    if (nodes.searchStatus) {
      const resultSummary = state.query
        ? `${items.length} matching ${items.length === 1 ? "Skill" : "Skills"} for "${state.query}"`
        : state.category === "all" && !state.showAll ? `Top-rated 8 of ${publishedPicks.length} published Skills` : `${items.length} matching published Skills`;
      nodes.searchStatus.textContent = resultSummary;
    }
    document.querySelectorAll("[data-clear-search]").forEach((button) => {
      button.hidden = !state.query;
    });
    nodes.empty.hidden = items.length !== 0;

    nodes.grid.innerHTML = shownItems
      .map((pick, index) => {
        const primaryScenario = labelForScenario((pick.scenarios || [])[0] || "design");
        const rating = typeof pick.rating === "number" ? `${pick.rating}/${pick.ratingScale || 10}` : "Pending";
        const sourceLink = pick.sourceUrl
          ? `<a class="index-source" href="${escapeHtml(pick.sourceUrl)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(pick.name)} source">Source ↗</a>`
          : `<span class="index-source">Source pending</span>`;

        return `
          <article class="skill-index-row" data-pick-id="${escapeHtml(pick.id)}">
            <div class="index-number">${String(index + 1).padStart(2, "0")}</div>
            <div class="index-main"><span>${escapeHtml(primaryScenario)} · ${escapeHtml(demoTitle(pick))}</span><h3>${escapeHtml(pick.name)}</h3><p>${escapeHtml(pick.summary)}</p></div>
            <div class="index-rating"><strong>${escapeHtml(rating)}</strong><small>Phoebe's rating</small></div>
            <div class="index-actions"><a href="${escapeHtml(pick.galleryLink)}" aria-label="Open ${escapeHtml(pick.name)} live demo">View build ↗</a><button type="button" data-open-detail="${escapeHtml(pick.id)}" aria-label="Open ${escapeHtml(pick.name)} review details">Review</button>${sourceLink}</div>
          </article>
        `;
      })
      .join("");

  }

  function render() {
    if (nodes.publishedCount) nodes.publishedCount.textContent = publishedPicks.length;
    if (nodes.fieldTestCount) nodes.fieldTestCount.textContent = exploringPicks.length;
    renderProductRail();
    renderFieldTests();
    renderSkillStack();
    renderFilters();
    renderCards();
  }

  function listMarkup(items) {
    const values = Array.isArray(items) ? items : [items];
    const cleaned = values.filter(Boolean);
    const points = cleaned.length ? cleaned : ["Pending"];
    return `<ul class="point-list">${points.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function mindmapNode(title, body, tone) {
    return `
      <article class="mindmap-node ${tone || ""}">
        <span class="node-label">${escapeHtml(title)}</span>
        ${body}
      </article>
    `;
  }

  function openDrawer(pickId) {
    const pick = picks.find((item) => item.id === pickId);
    if (!pick) return;

    const meta = `
      <span class="status-chip ${escapeHtml(pick.status)}">${escapeHtml(labelForStatus(pick.status))}</span>
      ${(pick.scenarios || []).map((scenario) => `<span class="source-chip">${escapeHtml(labelForScenario(scenario))}</span>`).join("")}
      ${(pick.platforms || []).map((platform) => `<span class="source-chip">${escapeHtml(labelForPlatform(platform))}</span>`).join("")}
    `;
    const source = pick.sourceUrl
      ? `<a class="node-link" href="${escapeHtml(pick.sourceUrl)}" target="_blank" rel="noreferrer">Open GitHub source</a>`
      : `<span class="node-link muted">Source pending</span>`;
    const demo = pick.galleryLink
      ? `<a class="node-link" href="${escapeHtml(pick.galleryLink)}">Open demo artifact</a>`
      : "";

    nodes.drawerContent.innerHTML = `
      <section class="skill-map" aria-labelledby="drawerTitle">
        <div class="mindmap-center">
          <div class="detail-meta">${meta}</div>
          <h2 id="drawerTitle">${escapeHtml(pick.name)}</h2>
          <p class="agent-subtitle detail-agent-subtitle">${escapeHtml(platformSubtitle(pick))}</p>
          <p>${escapeHtml(pick.summary)}</p>
        </div>
        <div class="mindmap-branches" aria-label="Skill notes as a mindmap">
          ${mindmapNode("What it helps with", listMarkup(pick.phoebeNote), "tone-help")}
          ${mindmapNode("Field test", fieldTestPointList(pick), "tone-proof")}
          ${mindmapNode("3 good points", listMarkup(pick.good), "tone-good")}
          ${mindmapNode("3 can be better", listMarkup(pick.improve), "tone-improve")}
          ${mindmapNode("Day-to-day use cases", listMarkup(pick.useCases), "tone-use")}
          ${mindmapNode("Demo or proof", `${listMarkup(pick.demo)}${demo}`, "tone-proof")}
          ${mindmapNode("Verdict and source", `${listMarkup(pick.recommendation || labelForStatus(pick.status))}${sourcePointList(pick)}${source}`, "tone-verdict")}
        </div>
      </section>
    `;

    lastFocusedElement = document.activeElement;
    nodes.drawer.inert = false;
    document.querySelector("header")?.setAttribute("inert", "");
    document.querySelector("main")?.setAttribute("inert", "");
    document.querySelector("footer")?.setAttribute("inert", "");
    nodes.drawerBackdrop.hidden = false;
    nodes.drawer.classList.add("is-open");
    nodes.drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
    nodes.drawerClose.focus();
  }

  function closeDrawer() {
    nodes.drawer.classList.remove("is-open");
    nodes.drawer.setAttribute("aria-hidden", "true");
    nodes.drawerBackdrop.hidden = true;
    nodes.drawer.inert = true;
    document.querySelector("header")?.removeAttribute("inert");
    document.querySelector("main")?.removeAttribute("inert");
    document.querySelector("footer")?.removeAttribute("inert");
    document.body.classList.remove("drawer-open");
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  }

  function reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function playEntranceMotion() {
    if (entranceMotionPlayed || reducedMotion()) return;
    entranceMotionPlayed = true;

    const targets = [
      ...document.querySelectorAll(".hero-copy > *"),
      ...document.querySelectorAll(".latest-lab > *")
    ];

    targets.forEach((target, index) => {
      target.animate(
        [
          { opacity: 0, transform: "translateY(22px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        {
          duration: 680,
          delay: index * 58,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both"
        }
      );
    });
  }

  function bindMotionCards() {
    if (reducedMotion()) return;

    document.querySelectorAll("[data-motion-card]").forEach((card) => {
      if (card.dataset.motionBound === "true") return;
      card.dataset.motionBound = "true";

      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translate3d(${(x * 7).toFixed(2)}px, ${(y * 5).toFixed(2)}px, 0) rotateX(${(-y * 2.4).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  function observeRevealTargets() {
    if (reducedMotion()) return;

    const targets = document.querySelectorAll(".gallery-column, .skill-card, .product-proof-copy, .rail-card, .field-test-heading, .field-test-card");
    if (!("IntersectionObserver" in window)) return;

    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target;
          const animation = target.animate(
            [
              { opacity: 0, transform: "translateY(18px)" },
              { opacity: 1, transform: "translateY(0)" }
            ],
            {
              duration: 560,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "both"
            }
          );

          animation.finished
            .then(() => {
              target.style.opacity = "";
              target.style.transform = "";
            })
            .catch(() => {});
          revealObserver.unobserve(target);
        });
      }, { threshold: 0.12 });
    }

    targets.forEach((target) => {
      if (target.dataset.revealBound === "true") return;
      target.dataset.revealBound = "true";
      revealObserver.observe(target);
    });
  }

  function hydrateMotion() {
    bindMotionCards();
    observeRevealTargets();
  }

  function bindEvents() {
    byId("showAllPicks").addEventListener("click", () => {
      state.showAll = true;
      renderCards();
      nodes.grid.querySelectorAll(".index-actions a")[8]?.focus();
    });
    nodes.search.addEventListener("input", (event) => {
      state.query = event.target.value.trim().toLowerCase();
      renderCards();
    });

    document.addEventListener("click", (event) => {
      const filterButton = event.target.closest("[data-kind]");
      if (filterButton) {
        state[filterButton.dataset.kind] = filterButton.dataset.value;
        render();
        return;
      }

      const searchButton = event.target.closest("[data-search-query]");
      if (searchButton) {
        state.query = searchButton.dataset.searchQuery.trim().toLowerCase();
        nodes.search.value = state.query;
        renderCards();
        nodes.search.focus();
        return;
      }

      if (event.target.closest("[data-clear-search]")) {
        state.query = "";
        nodes.search.value = "";
        renderCards();
        nodes.search.focus();
        return;
      }

      const detailButton = event.target.closest("[data-open-detail]");
      if (detailButton) {
        openDrawer(detailButton.dataset.openDetail);
      }
    });

    nodes.drawerClose.addEventListener("click", closeDrawer);
    nodes.drawerBackdrop.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nodes.drawer.classList.contains("is-open")) {
        closeDrawer();
      }
      if (event.key === "Tab" && nodes.drawer.classList.contains("is-open")) {
        const focusable = [...nodes.drawer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')]
          .filter((element) => !element.hasAttribute("hidden"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  render();
  bindEvents();
})();
