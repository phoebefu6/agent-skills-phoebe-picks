(function () {
  const domains = window.LANTERN_DOMAINS || [];
  const skills = window.LANTERN_SKILLS || [];
  const excluded = window.LANTERN_EXCLUDED || [];
  const state = {
    domain: "all",
    query: ""
  };

  const byId = (id) => document.getElementById(id);
  const nodes = {
    domainNav: byId("domainNav"),
    domainCount: byId("domainCount"),
    domainEyebrow: byId("domainEyebrow"),
    domainTitle: byId("domainTitle"),
    domainQuestion: byId("domainQuestion"),
    decisionBanner: byId("decisionBanner"),
    search: byId("skillSearch"),
    grid: byId("artifactGrid"),
    empty: byId("emptyState"),
    dialog: byId("artifactDialog"),
    dialogContent: byId("dialogContent"),
    dialogClose: byId("dialogClose"),
    coverageDialog: byId("coverageDialog"),
    coverageSummary: byId("coverageSummary"),
    excludedList: byId("excludedList"),
    coverageClose: byId("coverageClose"),
    openCoverage: byId("openCoverage"),
    excludedButton: byId("excludedButton")
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function domainFor(id) {
    return domains.find((domain) => domain.id === id);
  }

  function visibleSkills() {
    return skills.filter((skill) => {
      const domainMatch = state.domain === "all" || skill.domain === state.domain;
      const haystack = [
        skill.id,
        skill.title,
        skill.artifact,
        skill.basis,
        skill.result,
        ...(skill.evidence || []),
        ...(skill.method || [])
      ].join(" ").toLowerCase();
      return domainMatch && (!state.query || haystack.includes(state.query));
    });
  }

  function renderDomains() {
    const options = [
      {
        id: "all",
        label: "All domains",
        count: skills.length,
        question: "How does evidence move from market signal to product action?"
      },
      ...domains
    ];

    nodes.domainNav.innerHTML = options.map((domain) => {
      const active = state.domain === domain.id;
      return `
        <button type="button" data-domain="${escapeHtml(domain.id)}" class="${active ? "is-active" : ""}" aria-pressed="${active}">
          <span>${escapeHtml(domain.label)}</span>
          <strong>${escapeHtml(domain.count)}</strong>
        </button>
      `;
    }).join("");
  }

  function renderDomainHeader() {
    const domain = domainFor(state.domain);
    if (!domain) {
      nodes.domainEyebrow.textContent = "All domains";
      nodes.domainTitle.textContent = "The full decision system";
      nodes.domainQuestion.textContent = "How does evidence move from market signal to product action?";
      nodes.decisionBanner.innerHTML = "<span>Current decision</span><strong>Build the smallest trustworthy evidence-to-decision loop.</strong>";
      return;
    }

    nodes.domainEyebrow.textContent = domain.signal;
    nodes.domainTitle.textContent = domain.label;
    nodes.domainQuestion.textContent = domain.question;
    nodes.decisionBanner.innerHTML = `<span>Domain decision</span><strong>${escapeHtml(domain.decision)}</strong>`;
  }

  function cardMarkup(skill, index) {
    const domain = domainFor(skill.domain);
    return `
      <button class="artifact-card" type="button" data-skill="${escapeHtml(skill.id)}" style="--i:${index}">
        <span class="artifact-domain">${escapeHtml(domain ? domain.label : skill.domain)}</span>
        <span class="artifact-index">${String(index + 1).padStart(2, "0")}</span>
        <strong>${escapeHtml(skill.id)}</strong>
        <em>${escapeHtml(skill.artifact)}</em>
        <p>${escapeHtml(skill.result)}</p>
        <small>${escapeHtml(skill.basis)}</small>
        <i aria-hidden="true">Open evidence →</i>
      </button>
    `;
  }

  function renderArtifacts() {
    const visible = visibleSkills();
    nodes.grid.innerHTML = visible.map(cardMarkup).join("");
    nodes.empty.hidden = visible.length > 0;
    nodes.domainCount.textContent = `${visible.length} artifact${visible.length === 1 ? "" : "s"}`;
  }

  function renderAll() {
    renderDomains();
    renderDomainHeader();
    renderArtifacts();
  }

  function listMarkup(items) {
    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function openArtifact(skill) {
    const domain = domainFor(skill.domain);
    nodes.dialogContent.innerHTML = `
      <p class="eyebrow">${escapeHtml(domain ? domain.label : skill.domain)} · ${escapeHtml(skill.artifact)}</p>
      <h2>${escapeHtml(skill.id)}</h2>
      <p class="dialog-result">${escapeHtml(skill.result)}</p>
      <div class="basis-label"><span>Evidence basis</span><strong>${escapeHtml(skill.basis)}</strong></div>
      <section>
        <h3>Product evidence</h3>
        ${listMarkup(skill.evidence || [])}
      </section>
      <section>
        <h3>Key Skill features used</h3>
        ${listMarkup(skill.method || [])}
      </section>
    `;
    nodes.dialog.showModal();
  }

  function renderCoverage() {
    nodes.coverageSummary.innerHTML = domains.map((domain) => `
      <div>
        <span>${escapeHtml(domain.label)}</span>
        <strong>${domain.count}</strong>
      </div>
    `).join("");

    nodes.excludedList.innerHTML = excluded.length
      ? excluded.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")
      : "<span>None — all 65 Skills are represented.</span>";
  }

  function openCoverage() {
    renderCoverage();
    nodes.coverageDialog.showModal();
  }

  nodes.domainNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-domain]");
    if (!button) return;
    state.domain = button.dataset.domain;
    renderAll();
  });

  nodes.search.addEventListener("input", () => {
    state.query = nodes.search.value.trim().toLowerCase();
    renderArtifacts();
  });

  nodes.grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-skill]");
    if (!card) return;
    const skill = skills.find((item) => item.id === card.dataset.skill);
    if (skill) openArtifact(skill);
  });

  nodes.dialogClose.addEventListener("click", () => nodes.dialog.close());
  nodes.coverageClose.addEventListener("click", () => nodes.coverageDialog.close());
  nodes.openCoverage.addEventListener("click", openCoverage);
  nodes.excludedButton.addEventListener("click", openCoverage);

  [nodes.dialog, nodes.coverageDialog].forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  renderAll();
})();
