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
      id: "preflight",
      number: "10",
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
      image: "https://picsum.photos/seed/gallery-artifact-proof/840/760",
      alt: "Editorial table with interface studies and notes",
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
      image: "https://picsum.photos/seed/generic-purple-product/840/760",
      alt: "Soft abstract desk image used for a generic AI page state",
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
      image: "https://picsum.photos/seed/studio-interface-method/840/760",
      alt: "Studio workspace with interface system sketches",
      critiqueTitle: "What the Skill shows",
      critique: ["The demo lists all key features.", "The interaction proves state and feedback.", "The page style is independent from the gallery shell."],
      className: "studio"
    }
  };

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
    preflightResult: document.getElementById("preflightResult")
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

  nodes.featureButtons.forEach((button) => {
    button.addEventListener("click", () => renderFeature(button.dataset.feature));
  });

  nodes.modeButtons.forEach((button) => {
    button.addEventListener("click", () => renderMode(button.dataset.mode));
  });

  nodes.runPreflight.addEventListener("click", runPreflight);

  renderFeature("read");
  renderMode("taste");
})();
