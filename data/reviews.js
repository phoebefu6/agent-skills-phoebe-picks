const FILTERS = {
  scenarios: [
    { id: "design", label: "Design" },
    { id: "ui-ux", label: "UI/UX" },
    { id: "frontend", label: "Frontend" },
    { id: "data", label: "Data" },
    { id: "data-viz", label: "Data Viz" },
    { id: "reporting", label: "Reporting" },
    { id: "automation", label: "Automation" },
    { id: "research", label: "Research" },
    { id: "prompting", label: "Prompting" },
    { id: "agent-workflow", label: "Agent Workflow" }
  ],
  platforms: [
    { id: "claude-code", label: "Claude Code" },
    { id: "codex", label: "Codex" },
    { id: "hermes", label: "Hermes AI" },
    { id: "cursor", label: "Cursor" },
    { id: "gemini-cli", label: "Gemini CLI" },
    { id: "opencode", label: "opencode" },
    { id: "kimi", label: "Kimi" },
    { id: "pi", label: "Pi" }
  ],
  statuses: [
    { id: "exploring", label: "Exploring" },
    { id: "wishlist", label: "Wishlist" },
    { id: "published", label: "Published" },
    { id: "rejected", label: "Rejected" }
  ]
};

const PICKS = [
  {
    id: "frontend-design",
    name: "frontend-design",
    source: "Anthropic Skills",
    sourceUrl: "https://github.com/anthropics/skills/tree/main/skills/frontend-design",
    sourceRepo: "anthropics/skills",
    sourcePath: "skills/frontend-design",
    githubStars: 161533,
    starsCheckedAt: "2026-07-16",
    status: "exploring",
    recommendation: "Testing through this gallery rebuild",
    dateExplored: "2026-07-10",
    scenarios: ["frontend", "ui-ux", "design"],
    platforms: ["claude-code", "codex", "hermes"],
    badges: ["UI build", "Static site", "GitHub Pages"],
    summary: "A frontend Skill for turning a product brief into polished, responsive interface code.",
    phoebeNote: "Use it when you want an agent to turn a rough product idea into a real first screen without repeating every UI rule.",
    good: [
      "Pushes for real interface states instead of a static poster.",
      "Keeps implementation close to the existing repo stack.",
      "Connects design direction with production HTML, CSS, and JS."
    ],
    improve: [
      "Still needs taste checks to avoid generic polish.",
      "Can be broad when the product direction is not sharp yet.",
      "Needs screenshot QA before I would call the output done."
    ],
    useCases: [
      "Vibe coders can turn a rough product idea into a usable first screen.",
      "Students can learn how UI decisions map into actual files.",
      "Leaders can prototype an internal AI tool before asking a team to build it."
    ],
    demo: "This public gallery rebuild.",
    galleryLink: "#gallery"
  },
  {
    id: "design-taste-frontend",
    name: "design-taste-frontend",
    source: "Leonxlnx taste-skill",
    sourceUrl: "https://github.com/Leonxlnx/taste-skill",
    sourceRepo: "Leonxlnx/taste-skill",
    sourcePath: "Open Design wrapper: skills/taste-skill",
    githubStars: 63989,
    starsCheckedAt: "2026-07-16",
    status: "published",
    recommendation: "Published pick: useful for turning generic AI-built pages into more deliberate, credible public pages.",
    dateExplored: "2026-07-16",
    scenarios: ["design", "ui-ux", "frontend"],
    platforms: ["claude-code", "codex", "hermes"],
    badges: ["Visual taste", "Anti-slop", "Editorial UI"],
    summary: "A taste and frontend Skill that forces a design read before code and catches common AI UI tells.",
    phoebeNote: "Use it when an AI-built page works, but still feels generic, noisy, or not credible enough to publish.",
    coreConcepts: [
      "Infer the page kind, audience, vibe, references, assets, and quiet constraints before coding.",
      "Declare a one-line design read before building.",
      "Set design variance, motion intensity, and visual density dials.",
      "Choose an honest design system or aesthetic foundation instead of inventing fake systems.",
      "Avoid AI-default patterns such as purple glow, centered template heroes, and generic equal cards.",
      "Use disciplined typography, one accent color, consistent radius, and readable CTA contrast.",
      "Design real interface states and interactive feedback rather than a static poster.",
      "Use real visual assets or real component previews instead of fake screenshots.",
      "Make mobile collapse, viewport stability, and reduced-motion behavior explicit.",
      "Run a pre-flight audit for copy, layout repetition, motion, accessibility, and AI tells."
    ],
    conceptCoverage: "9/10 in the Taste Pass Studio demo; official design-system package selection was not used because this static gallery artifact is an aesthetic-native CSS page.",
    groundUpBuild: "Built the Taste Pass Studio demo from scratch.",
    rating: 8.5,
    ratingScale: 10,
    ratingSummary: "Excellent anti-slop checklist for public pages, but the full Skill is broad and takes judgment to apply without overfitting.",
    good: [
      "Forces a design read before code, which prevents agents from defaulting to generic SaaS layouts.",
      "Turns subjective taste into concrete pre-flight checks for typography, color, layout, copy, motion, and mobile behavior.",
      "Gives strong language for rejecting common AI UI tells without needing to argue from personal preference."
    ],
    improve: [
      "The instruction set is very large, so it can be heavy for small fixes.",
      "Some bans need human judgment because portfolio, editorial, and landing-page work can legitimately break rules.",
      "It needs a compact scorecard template for faster repeat reviews."
    ],
    useCases: [
      "Builders can run it before publishing an AI-generated landing page or portfolio.",
      "C-level readers can use the checklist to judge whether an AI prototype looks credible enough to share.",
      "Students can learn how design direction, constraints, and pre-flight checks shape real frontend output."
    ],
    demo: "demos/design-taste-frontend-studio/index.html",
    galleryLink: "demos/design-taste-frontend-studio/index.html"
  },
  {
    id: "design-review",
    name: "design-review",
    source: "garrytan gstack",
    sourceUrl: "https://github.com/garrytan/gstack",
    sourceRepo: "garrytan/gstack",
    sourcePath: "Open Design wrapper: skills/design-review",
    githubStars: 122159,
    starsCheckedAt: "2026-07-16",
    status: "wishlist",
    recommendation: "Next Skill to test",
    dateExplored: "",
    scenarios: ["design", "ui-ux"],
    platforms: ["claude-code", "codex", "hermes"],
    badges: ["Critique", "Screenshots", "QA"],
    summary: "A review Skill for judging interface screenshots, hierarchy, spacing, copy, and usability.",
    phoebeNote: "Use it when a screenshot feels wrong but you need concrete fixes, not vague opinions.",
    good: [
      "Likely useful for choosing between multiple design directions.",
      "Can turn visual discomfort into concrete fixes.",
      "Pairs naturally with frontend build Skills."
    ],
    improve: [
      "Needs a real screenshot to be valuable.",
      "May need clear priorities to avoid subjective over-editing.",
      "Should produce fix lists that are small enough to act on."
    ],
    useCases: [
      "Vibe coders can ask for a sharper critique before shipping a page.",
      "Students can learn how to inspect UI beyond personal preference.",
      "AI learners can compare before and after screenshots from a Skill run."
    ],
    demo: "Run after the first hybrid homepage screenshot.",
    galleryLink: ""
  },
  {
    id: "high-end-visual-design",
    name: "high-end-visual-design",
    source: "Leonxlnx taste-skill",
    sourceUrl: "https://github.com/Leonxlnx/taste-skill",
    sourceRepo: "Leonxlnx/taste-skill",
    sourcePath: "Open Design wrapper: skills/soft-skill",
    githubStars: 63989,
    starsCheckedAt: "2026-07-16",
    status: "wishlist",
    recommendation: "Craft pass candidate",
    dateExplored: "",
    scenarios: ["design", "ui-ux", "frontend"],
    platforms: ["claude-code", "codex", "hermes"],
    badges: ["Typography", "Layout polish", "Craft"],
    summary: "A visual craft Skill for refining typography, spacing, proportion, and finished-page confidence.",
    phoebeNote: "Use it when the structure works but the page needs stronger hierarchy, spacing, and visual confidence.",
    good: [
      "Useful for final refinement after the structure is settled.",
      "Can help tune visual hierarchy and spacing.",
      "May improve the site without adding unnecessary features."
    ],
    improve: [
      "Needs concrete before and after evidence.",
      "Could become subjective without a clear product goal.",
      "Should not override readability or simplicity."
    ],
    useCases: [
      "Creators can make public pages feel more trustworthy.",
      "Leaders can improve presentation quality for internal AI demos.",
      "Students can study how small spacing choices change perception."
    ],
    demo: "Run after the hybrid direction is in place.",
    galleryLink: ""
  },
  {
    id: "design-consultation",
    name: "design-consultation",
    source: "garrytan gstack",
    sourceUrl: "https://github.com/garrytan/gstack",
    sourceRepo: "garrytan/gstack",
    sourcePath: "gstack design-consultation skill",
    githubStars: 122159,
    starsCheckedAt: "2026-07-16",
    status: "wishlist",
    recommendation: "Use after direction is locked",
    dateExplored: "",
    scenarios: ["design", "agent-workflow"],
    platforms: ["claude-code", "codex", "hermes"],
    badges: ["Design system", "Tokens", "Guidelines"],
    summary: "A design system Skill for turning product intent into durable visual rules and documentation.",
    phoebeNote: "Use it later when repeated design preferences need to become a short source of truth.",
    good: [
      "Can create a stable design source of truth.",
      "Useful when multiple agents will work on the repo.",
      "Helps reduce repeated design instructions over time."
    ],
    improve: [
      "Too heavy for the earliest exploration phase.",
      "Needs a chosen direction before it can be efficient.",
      "Should result in a short practical guide, not a giant theory document."
    ],
    useCases: [
      "Teams can keep AI-generated UI consistent across sessions.",
      "Builders can stop repeating color, spacing, and typography preferences.",
      "C-suite readers can understand why a prototype has a coherent system."
    ],
    demo: "Create a compact design source of truth after launch v1.",
    galleryLink: ""
  },
  {
    id: "grill-me",
    name: "grill-me",
    source: "mio-openliven codex-grill-me-skill",
    sourceUrl: "https://github.com/mio-openliven/codex-grill-me-skill",
    sourceRepo: "mio-openliven/codex-grill-me-skill",
    sourcePath: "skills/grill-me",
    githubStars: 2,
    starsCheckedAt: "2026-07-16",
    status: "published",
    recommendation: "Published pick: useful as a pre-build pressure test before asking an agent to build.",
    dateExplored: "2026-07-14",
    scenarios: ["agent-workflow", "prompting", "automation"],
    platforms: ["codex", "claude-code", "hermes"],
    badges: ["Decision tree", "Briefing", "Risk check"],
    summary: "A questioning Skill for turning vague or risky plans into clear decisions before execution.",
    phoebeNote: "Use it before asking an agent to build, especially when your request is still too broad or you keep changing direction.",
    coreConcepts: [
      "Ask one concrete question at a time.",
      "Include a recommended answer with each question.",
      "Explain why the answer matters.",
      "Walk the decision tree branch by branch.",
      "Inspect available context before asking the user.",
      "Separate facts from assumptions.",
      "Push back when scope grows or risk is hidden.",
      "Stop grilling once the next execution step is clear."
    ],
    conceptCoverage: "7/8 in the demo UI; source/context inspection was performed before building rather than automated inside the page.",
    groundUpBuild: "Built the Grill-Me Brief Builder demo from scratch.",
    rating: 8,
    ratingScale: 10,
    ratingSummary: "Strong lightweight pre-build discipline, but the Skill source is very small and needs richer examples.",
    good: [
      "Forces one decision at a time, which reduces messy over-briefing.",
      "Pairs every question with a recommended answer, so the user is not left staring at a blank page.",
      "Stops once execution is clear, which keeps the conversation from becoming endless planning."
    ],
    improve: [
      "The installed local Skill is too minimal compared with the upstream source.",
      "It needs example grilling flows for product, design, architecture, and release-risk use cases.",
      "It does not define how to record final decisions unless the project adds its own template."
    ],
    useCases: [
      "Builders can turn a vague app idea into a concrete build brief before using Codex or Claude Code.",
      "Leaders can stress-test a product decision before asking a team to execute.",
      "Students can learn how to separate facts, assumptions, tradeoffs, and next steps."
    ],
    demo: "demos/grill-me-brief-builder/index.html",
    galleryLink: "demos/grill-me-brief-builder/index.html"
  }
];

const EVALUATION_STEPS = [
  {
    title: "Learn the Skill",
    body: "Read the Skill source and identify its key functions, methods, and concepts."
  },
  {
    title: "Map the 80%",
    body: "Decide which core concepts must be used in the test, and note what will be skipped."
  },
  {
    title: "Build from zero",
    body: "Use the Skill to create a new artifact from the ground up, not a small amendment."
  },
  {
    title: "Rate the field test",
    body: "Give a high-level rating out of 10, then capture 3 strengths and 3 improvement points."
  },
  {
    title: "Publish or reject",
    body: "Publish useful Skills with proof. Keep unsafe, weak, or under-tested Skills out of the gallery."
  }
];

window.FILTERS = FILTERS;
window.PICKS = PICKS;
window.EVALUATION_STEPS = EVALUATION_STEPS;
window.REVIEWS = PICKS;
