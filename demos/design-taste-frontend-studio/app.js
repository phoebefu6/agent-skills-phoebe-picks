(function () {
  const states = {
    before: {
      system: "Unclear stack, generic landing defaults",
      accent: "Purple glow appears without brand reason",
      hero: "Centered hero, long copy, repeated CTA intent",
      label: "Generic AI page",
      title: "Unlock the future of AI skills.",
      body: "A seamless next-generation platform that elevates your workflow with powerful features and beautiful experiences for everyone.",
      cta: "Get started now",
      image: "https://picsum.photos/seed/generic-ai-page/920/760",
      alt: "Soft abstract gradient-like studio surface"
    },
    after: {
      system: "Native CSS, editorial gallery tokens",
      accent: "Deep green throughout",
      hero: "Split layout, short copy, visible CTA",
      label: "Taste pass",
      title: "Find Skills by real work.",
      body: "A gallery that shows source, proof, rating, and daily use cases before you try a Skill.",
      cta: "Browse picks",
      image: "https://picsum.photos/seed/skill-gallery-proof/920/760",
      alt: "Neutral editorial table with design notes"
    }
  };

  const nodes = {
    mode: document.getElementById("modeSelect"),
    run: document.getElementById("runAuditButton"),
    reset: document.getElementById("resetButton"),
    frame: document.getElementById("previewFrame"),
    system: document.getElementById("systemReadout"),
    accent: document.getElementById("accentReadout"),
    hero: document.getElementById("heroReadout"),
    label: document.getElementById("previewLabel"),
    title: document.getElementById("previewTitle"),
    body: document.getElementById("previewBody"),
    cta: document.getElementById("previewCta"),
    image: document.getElementById("previewImage"),
    checklist: document.getElementById("checklist")
  };

  function render(mode) {
    const data = states[mode];
    nodes.frame.classList.toggle("before-mode", mode === "before");
    nodes.frame.classList.toggle("taste-mode", mode === "after");
    nodes.system.textContent = data.system;
    nodes.accent.textContent = data.accent;
    nodes.hero.textContent = data.hero;
    nodes.label.textContent = data.label;
    nodes.title.textContent = data.title;
    nodes.body.textContent = data.body;
    nodes.cta.textContent = data.cta;
    nodes.image.src = data.image;
    nodes.image.alt = data.alt;
  }

  function setChecks(active) {
    nodes.checklist.querySelectorAll("article").forEach((item, index) => {
      window.setTimeout(() => {
        item.classList.toggle("is-checked", active);
      }, active ? index * 90 : 0);
    });
  }

  nodes.mode.addEventListener("change", (event) => {
    render(event.target.value);
    setChecks(event.target.value === "after");
  });

  nodes.run.addEventListener("click", () => {
    nodes.mode.value = "after";
    render("after");
    setChecks(true);
  });

  nodes.reset.addEventListener("click", () => {
    nodes.mode.value = "before";
    render("before");
    setChecks(false);
  });

  render("after");
  setChecks(true);
})();
