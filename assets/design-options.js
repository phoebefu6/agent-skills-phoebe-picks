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
        const pressed = state[kind] === item.id ? "true" : "false";
        return `<button class="filter-button${active}" type="button" data-kind="${kind}" data-value="${escapeHtml(item.id)}" aria-pressed="${pressed}">${escapeHtml(item.label)}</button>`;
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
    return `${repo}, ${stars}`;
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
      .map((pick, index) => {
        const scenario = labelForScenario((pick.scenarios || [])[0] || "design");
        const stars = typeof pick.githubStars === "number"
          ? `${formatNumber(pick.githubStars)} stars`
          : "Stars pending";
        const rating = typeof pick.rating === "number" ? `${pick.rating}/${pick.ratingScale || 10}` : "Rating pending";

        const artifactImages = {
          "design-taste-frontend": "assets/artifact-design-taste-lab.png",
          "canvas-design": "demos/product-design-studio/vision-canvas.svg"
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
              <small>${escapeHtml(demoTitle(pick))}<br>${escapeHtml(rating)} · ${escapeHtml(stars)}</small>
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
      nodes.searchStatus.textContent = state.query
        ? `Showing ${items.length} of ${picks.length} for "${state.query}"`
        : `Showing ${items.length} of ${picks.length}`;
    }
    document.querySelectorAll("[data-clear-search]").forEach((button) => {
      button.hidden = !state.query;
    });
    nodes.empty.hidden = items.length !== 0;

    nodes.grid.innerHTML = items
      .map((pick) => {
        const primaryScenario = labelForScenario((pick.scenarios || [])[0] || "design");
        const platforms = (pick.platforms || []).slice(0, 2).map(labelForPlatform).join(", ") || "AI agents";
        const source = pick.sourceRepo || pick.source || "Source pending";
        const rating = typeof pick.rating === "number" ? `${pick.rating}/${pick.ratingScale || 10}` : "Pending";

        return `
          <article class="skill-row" data-pick-id="${escapeHtml(pick.id)}">
            <div class="skill-identity">
              <strong>${escapeHtml(pick.name)}</strong>
              <span>${escapeHtml(pick.summary)}</span>
              <span class="mobile-evidence">${escapeHtml(primaryScenario)} · ${escapeHtml(platforms)} · ${escapeHtml(rating)} · ${escapeHtml(source)}</span>
            </div>
            <div class="skill-cell"><strong>Helps with</strong>${escapeHtml(primaryScenario)}</div>
            <div class="skill-cell"><strong>Built for</strong>${escapeHtml(platforms)}</div>
            <div class="proof-strip" aria-label="Evidence summary">
              <span class="proof-chip">Demo</span>
              <span class="proof-chip">${escapeHtml(rating)}</span>
              <span class="proof-chip">Source</span>
            </div>
            <span class="status-chip ${escapeHtml(pick.status)}">${escapeHtml(labelForStatus(pick.status))}</span>
            <button class="open-skill" type="button" data-open-detail="${escapeHtml(pick.id)}" aria-label="Open ${escapeHtml(pick.name)} details">→</button>
            <span class="sr-only">Source: ${escapeHtml(source)}</span>
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

    const targets = document.querySelectorAll(".featured-build, .gallery-column, .product-proof-copy, .rail-card");
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
