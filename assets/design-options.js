(function () {
  const picks = window.PICKS || window.REVIEWS || [];
  const filters = window.FILTERS || { scenarios: [], statuses: [] };
  const state = {
    scenario: "all",
    status: "all",
    query: ""
  };

  const byId = (id) => document.getElementById(id);

  const nodes = {
    search: byId("searchInput"),
    searchStatus: byId("searchStatus"),
    scenarioFilters: byId("scenarioFilters"),
    statusFilters: byId("statusFilters"),
    grid: byId("skillGrid"),
    count: byId("resultCount"),
    empty: byId("emptyState"),
    drawer: byId("detailDrawer"),
    drawerContent: byId("drawerContent"),
    drawerClose: byId("drawerClose"),
    drawerBackdrop: byId("drawerBackdrop"),
    productRail: byId("productRail"),
    skillStack: byId("skillStack")
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
    "find-skills": "Discovery Desk"
  };

  let entranceMotionPlayed = false;
  let revealObserver = null;

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
      pick.githubStars,
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
    return picks
      .filter((pick) => {
        const scenarioMatch = state.scenario === "all" || (pick.scenarios || []).includes(state.scenario);
        const statusMatch = state.status === "all" || pick.status === state.status;
        const queryMatch = !state.query || pickText(pick).includes(state.query);
        return scenarioMatch && statusMatch && queryMatch;
      })
      .sort((a, b) => {
        const order = { published: 0, exploring: 1, wishlist: 2, rejected: 3 };
        return (order[a.status] ?? 9) - (order[b.status] ?? 9) || a.name.localeCompare(b.name);
      });
  }

  function renderFilterGroup(container, kind, items) {
    const allLabel = kind === "scenario" ? "All Skills" : "All status";
    const options = [{ id: "all", label: allLabel }, ...items];
    container.innerHTML = options
      .map((item) => {
        const active = state[kind] === item.id ? " is-active" : "";
        return `<button class="filter-button${active}" type="button" data-kind="${kind}" data-value="${escapeHtml(item.id)}">${escapeHtml(item.label)}</button>`;
      })
      .join("");
  }

  function renderFilters() {
    if (nodes.scenarioFilters) {
      renderFilterGroup(nodes.scenarioFilters, "scenario", filters.scenarios || []);
    }
    if (nodes.statusFilters) {
      renderFilterGroup(nodes.statusFilters, "status", filters.statuses || []);
    }
  }

  function demoTitle(pick) {
    return demoTitles[pick.id] || pick.name;
  }

  function formatNumber(value) {
    return typeof value === "number" ? value.toLocaleString("en-US") : value;
  }

  function sourceMetaLabel(pick) {
    const repo = pick.sourceRepo || pick.source || "Source pending";
    const stars = typeof pick.githubStars === "number"
      ? `${formatNumber(pick.githubStars)} GitHub stars`
      : "GitHub stars pending";
    return `${repo} · ${stars}`;
  }

  function sourcePointList(pick) {
    const points = [
      `Source: ${pick.sourceRepo || pick.source || "Pending"}`,
      `Reference: ${pick.sourcePath || pick.sourceUrl || "Pending"}`
    ];

    if (typeof pick.githubStars === "number") {
      points.push(`GitHub stars: ${formatNumber(pick.githubStars)}${pick.starsCheckedAt ? ` snapshot ${pick.starsCheckedAt}` : ""}`);
    } else {
      points.push("GitHub stars: pending");
    }
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

    const published = picks
      .filter((pick) => pick.status === "published" && pick.galleryLink)
      .slice(0, 7);

    nodes.productRail.innerHTML = published
      .map((pick) => {
        const scenario = labelForScenario((pick.scenarios || [])[0] || "design");
        const stars = typeof pick.githubStars === "number"
          ? `${formatNumber(pick.githubStars)} stars`
          : "Stars pending";
        const rating = typeof pick.rating === "number" ? `${pick.rating}/${pick.ratingScale || 10}` : "Rating pending";

        return `
          <a class="rail-card" href="${escapeHtml(pick.galleryLink)}" data-motion-card>
            <span>${escapeHtml(scenario)}</span>
            <strong>${escapeHtml(pick.name)}</strong>
            <small>Demo: ${escapeHtml(demoTitle(pick))} | ${escapeHtml(rating)} | ${escapeHtml(stars)}</small>
          </a>
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
            <small>${escapeHtml(status)} | ${escapeHtml(rating)}</small>
          </a>
        `;
      })
      .join("");
  }

  function renderCards() {
    const items = visiblePicks();
    nodes.count.textContent = `${items.length} ${items.length === 1 ? "Skill" : "Skills"}`;
    if (nodes.searchStatus) {
      nodes.searchStatus.textContent = state.query
        ? `Showing ${items.length} of ${picks.length} for "${state.query}"`
        : `Showing ${items.length} of ${picks.length}`;
    }
    document.querySelectorAll("[data-clear-search]").forEach((button) => {
      button.hidden = !state.query;
    });
    nodes.empty.hidden = items.length !== 0;

    nodes.grid.innerHTML = items
      .map((pick, index) => {
        const featured = index < 2 ? " featured" : "";
        const scenarioBadges = (pick.scenarios || []).slice(0, 3).map(labelForScenario);
        const badges = [...scenarioBadges, ...(pick.badges || [])].slice(0, 5);
        const primaryScenario = scenarioBadges[0] || "Skill";

        return `
          <article class="skill-card${featured}" data-pick-id="${escapeHtml(pick.id)}">
            <div class="card-top">
              <span class="status-chip ${escapeHtml(pick.status)}">${escapeHtml(labelForStatus(pick.status))}</span>
              <span class="source-chip">${escapeHtml(primaryScenario)}</span>
            </div>
            <h3>${escapeHtml(pick.name)}</h3>
            <p class="agent-subtitle">${escapeHtml(platformSubtitle(pick))}</p>
            <p>${escapeHtml(pick.summary)}</p>
            ${typeof pick.rating === "number" ? `<p class="rating-line">${escapeHtml(ratingLabel(pick))}</p>` : ""}
            <div class="source-meta" aria-label="Source and GitHub stars">
              <span>${escapeHtml(sourceMetaLabel(pick))}</span>
              ${pick.dateExplored ? `<span>Explored ${escapeHtml(pick.dateExplored)}</span>` : ""}
            </div>
            <span class="field-label">Best use case</span>
            <p class="card-note">${escapeHtml(pick.phoebeNote)}</p>
            <div class="badge-row">
              ${badges.map((badge) => `<span class="badge">${escapeHtml(badge)}</span>`).join("")}
            </div>
            <div class="card-actions">
              <button class="card-button" type="button" data-open-detail="${escapeHtml(pick.id)}">Open Skill</button>
              ${pick.galleryLink ? `<a class="card-button" href="${escapeHtml(pick.galleryLink)}">Demo</a>` : ""}
              ${pick.sourceUrl ? `<a class="card-button" href="${escapeHtml(pick.sourceUrl)}" target="_blank" rel="noreferrer">Source</a>` : ""}
            </div>
          </article>
        `;
      })
      .join("");

    hydrateMotion();
  }

  function render() {
    renderProductRail();
    renderSkillStack();
    renderFilters();
    renderCards();
    playEntranceMotion();
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
          ${mindmapNode("Verdict, source, stars", `${listMarkup(pick.recommendation || labelForStatus(pick.status))}${sourcePointList(pick)}${source}`, "tone-verdict")}
        </div>
      </section>
    `;

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
    document.body.classList.remove("drawer-open");
  }

  function reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function playEntranceMotion() {
    if (entranceMotionPlayed || reducedMotion()) return;
    entranceMotionPlayed = true;

    const targets = [
      ...document.querySelectorAll(".hero-copy > *"),
      ...document.querySelectorAll(".proof-preview, .proof-card")
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

    document.querySelectorAll("[data-motion-card], .skill-card").forEach((card) => {
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

    const targets = document.querySelectorAll(".skill-stack-section, .product-proof-section, .scenario-section, .gallery-section, .stack-card, .skill-card, .rail-card");
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
      target.style.opacity = "0";
      target.style.transform = "translateY(18px)";
      revealObserver.observe(target);
    });
  }

  function hydrateMotion() {
    bindMotionCards();
    observeRevealTargets();
  }

  function bindEvents() {
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
    });
  }

  render();
  bindEvents();
})();
