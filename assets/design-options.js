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
    drawerBackdrop: byId("drawerBackdrop")
  };

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
  }

  function render() {
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
