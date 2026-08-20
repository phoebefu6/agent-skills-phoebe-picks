(function () {
  const picks = window.PICKS || window.REVIEWS || [];
  const publishedPicks = picks.filter((pick) => pick.status === "published" && pick.galleryLink);
  const filters = window.FILTERS || { scenarios: [], statuses: [] };
  const state = {
    category: "all",
    query: ""
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
    "impeccable": "Impeccable Design Flight Deck",
    "pm-skills": "Lantern Product OS",
    "find-skills": "Discovery Desk",
    "dashboard": "Portfolio Command Center",
    "algorithmic-art": "Evidence Tides",
    "data-report": "Evidence Report",
    "dbt-transformation-patterns": "Pipeline Lab · dbt",
    "airflow-dag-patterns": "Pipeline Lab · Airflow",
    "baoyu-infographic": "Skill-to-Artifact Map",
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
    container.innerHTML = options
      .map((item) => {
        const active = state[kind] === item.id ? " is-active" : "";
        const pressed = state[kind] === item.id ? "true" : "false";
        return `<button class="filter-button${active}" type="button" data-kind="${kind}" data-value="${escapeHtml(item.id)}" aria-pressed="${pressed}">${escapeHtml(item.label)}</button>`;
      })
      .join("");
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

    const recentProducts = publishedPicks
      .slice()
      .sort((a, b) => (b.dateExplored || "").localeCompare(a.dateExplored || "") || (b.rating || 0) - (a.rating || 0))
      .filter((pick, index, items) => {
        const demoPage = pick.galleryLink.split("#")[0];
        return items.findIndex((item) => item.galleryLink.split("#")[0] === demoPage) === index;
      })
      .slice(0, 6);

    nodes.productRail.innerHTML = recentProducts
      .map((pick, index) => {
        const scenario = labelForScenario((pick.scenarios || [])[0] || "design");
        const source = pick.sourceRepo || pick.source || "Source pending";
        const rating = typeof pick.rating === "number" ? `${pick.rating}/${pick.ratingScale || 10}` : "Rating pending";

        const artifactImages = {
          "design-taste-frontend": "assets/artifact-design-taste-lab.png",
          "canvas-design": "demos/product-design-studio/vision-canvas.svg",
          "baoyu-infographic": "demos/baoyu-infographic-publishing-map/infographic.png"
        };
        const artifact = artifactImages[pick.id];
        const artifactMarkup = artifact
          ? `<span class="artifact-tile" aria-hidden="true"><img src="${escapeHtml(artifact)}" alt=""></span>`
          : "";

        return `
          <a class="rail-card${artifact ? " has-artifact" : ""}" href="${escapeHtml(pick.galleryLink)}" data-motion-card style="--i:${index}">
            ${artifactMarkup}
            <span class="rail-copy">
              <span>${escapeHtml(scenario)}</span>
              <strong>${escapeHtml(pick.name)}</strong>
              <small>${escapeHtml(demoTitle(pick))}<br>${escapeHtml(rating)} · ${escapeHtml(source)}</small>
            </span>
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
            <small>${escapeHtml(status)}, ${escapeHtml(rating)}</small>
          </a>
        `;
      })
      .join("");
  }

  function renderCards() {
    const items = visiblePicks();
    nodes.count.textContent = `${items.length} ${items.length === 1 ? "Skill" : "Skills"}`;
    if (nodes.searchStatus) {
      const resultSummary = state.query
        ? `Showing ${items.length} of ${publishedPicks.length} for "${state.query}"`
        : `Showing ${items.length} of ${publishedPicks.length}`;
      nodes.searchStatus.textContent = `${resultSummary} · Score high to low`;
    }
    document.querySelectorAll("[data-clear-search]").forEach((button) => {
      button.hidden = !state.query;
    });
    nodes.empty.hidden = items.length !== 0;

    nodes.grid.innerHTML = items
      .map((pick) => {
        const primaryScenario = labelForScenario((pick.scenarios || [])[0] || "design");
        const platforms = (pick.platforms || []).map(labelForPlatform).join(", ") || "AI agents";
        const source = pick.sourceRepo || pick.source || "Source pending";
        const rating = typeof pick.rating === "number" ? `${pick.rating}/${pick.ratingScale || 10}` : "Pending";
        const sourceLink = pick.sourceUrl
          ? `<a class="skill-card-source" href="${escapeHtml(pick.sourceUrl)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(pick.name)} source at ${escapeHtml(pick.sourcePath || source)}"><span>${escapeHtml(source)}</span><small>${escapeHtml(pick.sourcePath || "Exact Skill source")} ↗</small></a>`
          : `<span class="skill-card-source"><span>${escapeHtml(source)}</span><small>Source path pending</small></span>`;

        return `
          <article class="skill-card" data-pick-id="${escapeHtml(pick.id)}" data-motion-card>
            <header class="skill-card-header">
              <span class="skill-card-focus">${escapeHtml(primaryScenario)}</span>
              <span class="demo-ready-chip">Demo built</span>
            </header>
            <div class="skill-card-body">
              <h3>${escapeHtml(pick.name)}</h3>
              <p class="skill-card-platforms">For ${escapeHtml(platforms)}</p>
              <p class="skill-card-summary">${escapeHtml(pick.summary)}</p>
            </div>
            <dl class="skill-card-proof">
              <div><dt>Rating</dt><dd>${escapeHtml(rating)}</dd></div>
              <div><dt>Built</dt><dd>${escapeHtml(demoTitle(pick))}</dd></div>
            </dl>
            ${sourceLink}
            <footer class="skill-card-actions">
              <a class="skill-demo-link" href="${escapeHtml(pick.galleryLink)}" aria-label="Open ${escapeHtml(pick.name)} live demo">View demo <span aria-hidden="true">→</span></a>
              <button class="skill-detail-link" type="button" data-open-detail="${escapeHtml(pick.id)}" aria-label="Open ${escapeHtml(pick.name)} review details">Review notes</button>
            </footer>
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
      ...document.querySelectorAll(".route-node, .proof-stamp, .survival-checklist")
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

    const targets = document.querySelectorAll(".gallery-column, .skill-card, .product-proof-copy, .rail-card");
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
