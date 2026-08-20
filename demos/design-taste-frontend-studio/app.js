(function () {
  const features = [
    {
      id: "read",
      number: "01",
      name: "Read the room first",
      summary: "Infer page kind, audience, references, assets, and constraints before writing code.",
      points: ["Page kind: public Skill gallery", "Audience: AI-curious builders and operators", "Language: editorial product showcase"],
      label: "Public gallery read",
      title: "Builder audience, editorial product tone.",
      proof: "The page names the audience and design language before showing any interface."
    },
    {
      id: "dials",
      number: "02",
      name: "Set the taste dials",
      summary: "Variance, motion, and density become design constraints instead of decoration.",
      points: ["Variance 8: asymmetric but readable", "Motion 6: stateful, not cinematic", "Density 4: enough air for scanning"],
      label: "Dial lock",
      title: "Variance 8, motion 6, density 4.",
      proof: "The page uses an offset hero, interactive state changes, and airy information density."
    },
    {
      id: "system",
      number: "03",
      name: "Choose the honest foundation",
      summary: "Use an official design system when the brief calls for it, or label the aesthetic honestly.",
      points: ["This brief is editorial, not enterprise", "Native CSS is the honest foundation", "The system stays token based"],
      label: "System choice",
      title: "Native CSS, editorial gallery tokens.",
      proof: "No fake system is claimed. Tokens define type, spacing, color, radius, and motion."
    },
    {
      id: "defaults",
      number: "04",
      name: "Remove AI tells",
      summary: "Actively reject common LLM defaults that make pages feel templated.",
      points: ["No generic centered hero", "No default purple glow as the main style", "No three equal feature cards"],
      label: "Anti-default pass",
      title: "Cliches are shown only in the bad state.",
      proof: "The generic preview isolates weak patterns so the taste pass can visibly replace them."
    },
    {
      id: "type",
      number: "05",
      name: "Lock type and color",
      summary: "Typography, color, contrast, and radius become a consistent system.",
      points: ["System sans instead of default Inter dependency", "One deep green accent", "Buttons and panels keep contrast"],
      label: "Craft lock",
      title: "One accent, one radius rule, readable CTAs.",
      proof: "The visual system avoids random accent drift and keeps button labels legible."
    },
    {
      id: "layout",
      number: "06",
      name: "Shape the layout",
      summary: "Composition uses asymmetry, rhythm, and varied section structures.",
      points: ["Hero, feature lab, compare board, and pre-flight use different layouts", "No repeated zigzag sections", "Mobile collapse is explicit"],
      label: "Layout discipline",
      title: "Four layout families, one page system.",
      proof: "The page moves from hero collage to switchboard to specimen to audit grid."
    },
    {
      id: "visuals",
      number: "07",
      name: "Use real visuals",
      summary: "A design page needs visual evidence, not decorative fake screenshots.",
      points: ["Real image assets support the mood", "Mini preview is a real component", "No fake dashboard rectangles"],
      label: "Visual proof",
      title: "Images and component preview carry the evidence.",
      proof: "The page uses editorial image assets plus a live mini page specimen."
    },
    {
      id: "motion",
      number: "08",
      name: "Motivate motion",
      summary: "Motion should explain state change, hierarchy, or feedback.",
      points: ["Mode switches change the specimen", "Feature selection updates proof", "Reduced motion disables animation"],
      label: "Motion purpose",
      title: "Animation only supports state changes.",
      proof: "No scroll hijack or endless motion is added because the demo does not need it."
    },
    {
      id: "states",
      number: "09",
      name: "Design states and access",
      summary: "Interactive controls need visible states, keyboard focus, and responsive behavior.",
      points: ["Pressed controls are visible", "Focus rings are explicit", "Dark mode and mobile layouts are planned"],
      label: "State design",
      title: "Every control shows where you are.",
      proof: "Buttons expose active, hover, focus, and reduced-motion behavior."
    },
    {
      id: "architecture",
      number: "10",
      name: "Match architecture to scope",
      summary: "Choose the smallest honest foundation and verify dependencies before importing them.",
      points: ["Static gallery stays static", "Native CSS avoids a needless framework", "Interaction code remains isolated and inspectable"],
      label: "Architecture fit",
      title: "The stack serves the artifact.",
      proof: "This demo adds no package or build step because the repository is intentionally static."
    },
    {
      id: "redesign",
      number: "11",
      name: "Audit before redesigning",
      summary: "Preserve working information architecture and content before changing the visual language.",
      points: ["Mode: targeted evolution", "Gallery path and links stay stable", "Typography, assets, states, and proof are refreshed"],
      label: "Redesign mode",
      title: "Targeted evolution, not a reset.",
      proof: "The original demo structure remains recognizable while the v2 rules expand its evidence."
    },
    {
      id: "performance",
      number: "12",
      name: "Protect the experience",
      summary: "Performance, contrast, viewport stability, and reduced motion are shipping criteria.",
      points: ["Local compressed images avoid remote layout shifts", "Motion changes transform and opacity only", "Dark and mobile tokens keep contrast"],
      label: "Guardrails",
      title: "Craft includes speed and access.",
      proof: "Hero media is local and prioritized. Supporting media lazy-loads with reserved dimensions."
    },
    {
      id: "preflight",
      number: "13",
      name: "Run final pre-flight",
      summary: "Before shipping, audit copy, layout, motion, visuals, access, and AI tells.",
      points: ["Copy is short and functional", "No em-dash characters", "The check list is executable"],
      label: "Ship gate",
      title: "The final section turns checks into action.",
      proof: "Run pre-flight marks the exact concepts covered by this build."
    }
  ];

  const modes = {
    taste: {
      brand: "Phoebe Picks",
      label: "Proof before picks",
      title: "Find Skills by real work.",
      body: "Source, rating, and demo proof stay visible before anyone tries a Skill.",
      action: "Browse",
      image: "assets/taste-studio-hero.jpg",
      alt: "Editorial studio table with interface studies and notes",
      critiqueTitle: "What improved",
      critique: ["Follower value appears before method notes.", "The source and proof model is visible.", "The layout has hierarchy without shouting."],
      className: "taste"
    },
    generic: {
      brand: "SkillHub AI",
      label: "Unlock the future",
      title: "Transform your workflow today.",
      body: "A seamless next-generation platform that elevates productivity with powerful features for everyone.",
      action: "Get started",
      image: "assets/taste-preflight-study.jpg",
      alt: "Interface studies used to demonstrate a generic AI page state",
      critiqueTitle: "What fails",
      critique: ["The audience is vague.", "The hero promise could fit any AI tool.", "The visual language leans on generic glow energy."],
      className: "generic"
    },
    studio: {
      brand: "Taste System",
      label: "Feature-led demo",
      title: "Make the method visible.",
      body: "Each control maps to one Skill concept, so the page teaches by being used.",
      action: "Inspect",
      image: "assets/taste-preflight-study.jpg",
      alt: "Studio workspace with interface system sketches",
      critiqueTitle: "What the Skill shows",
      critique: ["The demo lists all key features.", "The interaction proves state and feedback.", "The page style is independent from the gallery shell."],
      className: "studio"
    }
  };

  const states = {
    loading: {
      label: "Loading",
      title: "Preparing the review.",
      body: "The skeleton matches the final content shape, so the page stays stable.",
      action: "Keep working"
    },
    empty: {
      label: "Empty",
      title: "No page selected.",
      body: "Choose a landing page or portfolio to begin a focused taste audit.",
      action: "Choose page"
    },
    error: {
      label: "Error",
      title: "The source did not load.",
      body: "Your notes are safe. Retry the source check or continue with the local copy.",
      action: "Retry"
    },
    ready: {
      label: "Ready",
      title: "Review is ready.",
      body: "Thirteen concept families have inspectable evidence in this field test.",
      action: "Inspect checks"
    }
  };

  let currentState = "ready";

  const nodes = {
    featureButtons: document.querySelectorAll("[data-feature]"),
    featureNumber: document.getElementById("featureNumber"),
    featureName: document.getElementById("featureName"),
    featureSummary: document.getElementById("featureSummary"),
    featurePoints: document.getElementById("featurePoints"),
    preview: document.getElementById("livingPreview"),
    previewLabel: document.getElementById("previewLabel"),
    previewTitle: document.getElementById("previewTitle"),
    previewProof: document.getElementById("previewProof"),
    modeButtons: document.querySelectorAll("[data-mode]"),
    pageSpecimen: document.getElementById("pageSpecimen"),
    miniBrand: document.getElementById("miniBrand"),
    miniAction: document.getElementById("miniAction"),
    miniLabel: document.getElementById("miniLabel"),
    miniTitle: document.getElementById("miniTitle"),
    miniBody: document.getElementById("miniBody"),
    miniImage: document.getElementById("miniImage"),
    critiqueTitle: document.getElementById("critiqueTitle"),
    critiqueList: document.getElementById("critiqueList"),
    runPreflight: document.getElementById("runPreflight"),
    preflightGrid: document.getElementById("preflightGrid"),
    preflightResult: document.getElementById("preflightResult"),
    stateButtons: document.querySelectorAll("[data-state]"),
    stateSpecimen: document.getElementById("stateSpecimen"),
    stateLabel: document.getElementById("stateLabel"),
    stateTitle: document.getElementById("stateTitleText"),
    stateBody: document.getElementById("stateBody"),
    stateAction: document.getElementById("stateAction"),
    themeToggle: document.getElementById("themeToggle")
  };

  function renderFeature(id) {
    const feature = features.find((item) => item.id === id) || features[0];
    nodes.featureNumber.textContent = feature.number;
    nodes.featureName.textContent = feature.name;
    nodes.featureSummary.textContent = feature.summary;
    nodes.featurePoints.innerHTML = feature.points.map((point) => `<li>${point}</li>`).join("");
    nodes.previewLabel.textContent = feature.label;
    nodes.previewTitle.textContent = feature.title;
    nodes.previewProof.textContent = feature.proof;
    nodes.preview.dataset.feature = feature.id;
    nodes.featureButtons.forEach((button) => {
      const active = button.dataset.feature === feature.id;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function renderMode(id) {
    const mode = modes[id] || modes.taste;
    nodes.pageSpecimen.className = `page-specimen ${mode.className}`;
    nodes.miniBrand.textContent = mode.brand;
    nodes.miniLabel.textContent = mode.label;
    nodes.miniTitle.textContent = mode.title;
    nodes.miniBody.textContent = mode.body;
    nodes.miniAction.textContent = mode.action;
    nodes.miniImage.src = mode.image;
    nodes.miniImage.alt = mode.alt;
    nodes.critiqueTitle.textContent = mode.critiqueTitle;
    nodes.critiqueList.innerHTML = mode.critique.map((item) => `<li>${item}</li>`).join("");
    nodes.modeButtons.forEach((button) => {
      const active = button.dataset.mode === id;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function runPreflight() {
    const cards = Array.from(nodes.preflightGrid.querySelectorAll("article"));
    cards.forEach((card, index) => {
      window.setTimeout(() => {
        card.classList.add("is-passed");
        nodes.preflightResult.textContent = `${index + 1} checks passed`;
      }, index * 110);
    });
  }

  function renderState(id) {
    const state = states[id] || states.ready;
    currentState = states[id] ? id : "ready";
    nodes.stateSpecimen.className = `state-specimen ${id}`;
    nodes.stateLabel.textContent = state.label;
    nodes.stateTitle.textContent = state.title;
    nodes.stateBody.textContent = state.body;
    nodes.stateAction.textContent = state.action;
    nodes.stateSpecimen.setAttribute("aria-busy", String(id === "loading"));
    nodes.stateButtons.forEach((button) => {
      const active = button.dataset.state === id;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function toggleTheme() {
    const dark = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    nodes.themeToggle.textContent = dark ? "Light preview" : "Dark preview";
    nodes.themeToggle.setAttribute("aria-pressed", String(dark));
  }

  function setInitialTheme() {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    nodes.themeToggle.textContent = dark ? "Light preview" : "Dark preview";
    nodes.themeToggle.setAttribute("aria-pressed", String(dark));
  }

  function handleStateAction() {
    if (currentState === "ready") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("preflight").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      return;
    }

    if (currentState === "loading") {
      renderState("ready");
      return;
    }

    renderState("loading");
    window.setTimeout(() => renderState("ready"), 520);
  }

  nodes.featureButtons.forEach((button) => {
    button.addEventListener("click", () => renderFeature(button.dataset.feature));
  });

  nodes.modeButtons.forEach((button) => {
    button.addEventListener("click", () => renderMode(button.dataset.mode));
  });

  nodes.stateButtons.forEach((button) => {
    button.addEventListener("click", () => renderState(button.dataset.state));
  });

  nodes.runPreflight.addEventListener("click", runPreflight);
  nodes.stateAction.addEventListener("click", handleStateAction);
  nodes.themeToggle.addEventListener("click", toggleTheme);

  setInitialTheme();
  renderFeature("read");
  renderMode("taste");
  renderState("ready");
})();
