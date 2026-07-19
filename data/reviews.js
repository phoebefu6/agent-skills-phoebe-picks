const FILTERS = {
  scenarios: [
    { id: "design", label: "Design" },
    { id: "ui-ux", label: "UI/UX" },
    { id: "product-design", label: "Product Design" },
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
    githubStars: 161869,
    starsCheckedAt: "2026-07-17",
    status: "published",
    recommendation: "Published pick: useful when a rough product idea needs to become a real frontend screen with states and responsive behavior.",
    dateExplored: "2026-07-17",
    scenarios: ["product-design", "frontend", "ui-ux", "design"],
    platforms: ["claude-code", "codex", "hermes", "cursor", "gemini-cli"],
    badges: ["Product screen", "States", "Responsive"],
    summary: "A frontend Skill for turning a product brief into distinctive, working interface screens.",
    phoebeNote: "Use it when a product idea needs a real screen with honest content, states, and a visual point of view.",
    coreConcepts: [
      "Understand the audience, job, domain, tone, and technical constraints before choosing the look.",
      "Commit to one specific aesthetic direction instead of generic AI defaults.",
      "Design the real interface with controls, empty, loading, error, and responsive states.",
      "Build production-grade semantic frontend code using repo conventions where possible.",
      "Refine typography, color, layout, motion, and component details.",
      "Self-review mobile, desktop, focus states, overlap, AI visual tropes, and memorability before delivery."
    ],
    conceptCoverage: "6/6 key concepts are visible in the Product Design Studio product screen.",
    groundUpBuild: "Built the Signal Desk product screen inside Product Design Studio from scratch.",
    rating: 8.6,
    ratingScale: 10,
    ratingSummary: "Very strong for turning a product idea into a credible screen, especially when paired with a motion or critique Skill.",
    good: [
      "Forces the product subject, audience, job, tone, and constraints before visual choices.",
      "Pushes for real interface states instead of a static poster.",
      "Connects design direction with production HTML, CSS, and JS."
    ],
    improve: [
      "Still benefits from a second Skill for final interaction polish.",
      "Can become broad when the product direction is not sharp yet.",
      "Needs screenshot QA because distinctive layouts can break at small widths."
    ],
    useCases: [
      "Vibe coders can turn a rough product idea into a usable first screen.",
      "Students can learn how UI decisions map into actual files.",
      "Leaders can prototype an internal AI tool before asking a team to build it."
    ],
    demo: "demos/product-design-studio/index.html#frontend-design",
    galleryLink: "demos/product-design-studio/index.html#frontend-design"
  },
  {
    id: "canvas-design",
    name: "canvas-design",
    source: "Anthropic Skills",
    sourceUrl: "https://github.com/anthropics/skills/tree/main/skills/canvas-design",
    sourceRepo: "anthropics/skills",
    sourcePath: "skills/canvas-design",
    githubStars: 161869,
    starsCheckedAt: "2026-07-17",
    status: "published",
    recommendation: "Published pick: useful when a product needs a visual philosophy or campaign-like concept before screens are built.",
    dateExplored: "2026-07-17",
    scenarios: ["product-design", "design", "ui-ux"],
    platforms: ["claude-code", "codex", "hermes", "cursor", "gemini-cli"],
    badges: ["Visual philosophy", "Moodboard", "Canvas"],
    summary: "A visual-design Skill for creating a philosophy, art direction, and canvas artifact around a product idea.",
    phoebeNote: "Use it before UI work when the product needs a memorable visual world, not just another set of cards.",
    coreConcepts: [
      "Create a named visual philosophy before making the visual artifact.",
      "Express ideas through space, form, color, composition, and minimal text.",
      "Keep the design 90% visual and 10% essential labels.",
      "Embed a subtle reference that people familiar with the subject can sense.",
      "Push expert-level craft through alignment, typography, color, and containment.",
      "Refine the existing composition rather than adding more decoration.",
      "Output a durable philosophy and visual artifact."
    ],
    conceptCoverage: "6/7 key concepts are visible in Product Design Studio; the artifact is published as philosophy.md plus an SVG canvas instead of a binary PDF/PNG so it stays inspectable on GitHub Pages.",
    groundUpBuild: "Built the Quiet Leverage visual philosophy and product-design canvas from scratch.",
    rating: 7.8,
    ratingScale: 10,
    ratingSummary: "Excellent for visual direction and product storytelling, but it needs another Skill to turn the idea into working UI.",
    good: [
      "Forces a product to have a visual worldview before screens are assembled.",
      "Makes mood, hierarchy, and concept visible through composition instead of prose.",
      "Useful for followers who need a brand-like direction before asking an agent to code."
    ],
    improve: [
      "It is less directly useful for functional app screens.",
      "The full upstream flow expects PNG/PDF output, which is heavier than a static gallery needs.",
      "It can become too abstract if the product job is not clearly named first."
    ],
    useCases: [
      "Builders can create a visual north star before coding a product page.",
      "Leaders can use it to brief teams on product mood without writing a long brand document.",
      "Students can learn how visual direction influences later UI decisions."
    ],
    demo: "demos/product-design-studio/index.html#canvas-design",
    galleryLink: "demos/product-design-studio/index.html#canvas-design"
  },
  {
    id: "emil-design-eng",
    name: "emil-design-eng",
    source: "Emil Kowalski Skills",
    sourceUrl: "https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng",
    sourceRepo: "emilkowalski/skills",
    sourcePath: "skills/emil-design-eng",
    githubStars: 15002,
    starsCheckedAt: "2026-07-17",
    status: "published",
    recommendation: "Published pick: useful when a product screen already works but needs interaction polish, motion judgment, and component craft.",
    dateExplored: "2026-07-17",
    scenarios: ["product-design", "ui-ux", "frontend"],
    platforms: ["claude-code", "codex", "hermes", "cursor", "gemini-cli"],
    badges: ["Motion", "Micro-interactions", "Craft"],
    summary: "A design-engineering Skill for making UI interactions feel fast, intentional, and carefully handled.",
    phoebeNote: "Use it when the page is functional but still feels flat, sluggish, or not quite premium in the hands.",
    coreConcepts: [
      "Treat taste as trained judgment, not personal preference.",
      "Decide whether an interaction should animate based on frequency and purpose.",
      "Use custom easing, short durations, and avoid ease-in for responsive UI.",
      "Make buttons feel responsive with subtle active scale.",
      "Avoid scale(0) entry motion; start with a visible shape and opacity.",
      "Make popovers origin-aware instead of scaling from the wrong place.",
      "Prefer transitions, transform, and opacity for performant, interruptible UI.",
      "Respect reduced motion and touch-device hover constraints.",
      "Review UI changes with Before, After, Why reasoning."
    ],
    conceptCoverage: "8/9 key concepts are visible in Product Design Studio; gesture physics were not used because the static gallery demo does not include drag dismissal.",
    groundUpBuild: "Built the interaction polish lab inside Product Design Studio from scratch.",
    rating: 8.4,
    ratingScale: 10,
    ratingSummary: "Excellent for final product feel and motion judgment, but it is a polish Skill rather than a complete product-design generator.",
    good: [
      "Turns vague polish into specific interaction rules that can be tested.",
      "Improves perceived speed through press feedback, easing, and animation restraint.",
      "Gives a clear Before, After, Why review format for product UI fixes."
    ],
    improve: [
      "It needs an existing screen or component to be most useful.",
      "Some guidance assumes modern frontend animation APIs that may not fit every static site.",
      "It can over-focus on motion unless the product goal stays visible."
    ],
    useCases: [
      "Vibe coders can make buttons, popovers, and toasts feel more professional.",
      "Product leaders can judge whether a prototype feels credible in use, not only in screenshots.",
      "Students can learn practical motion rules without studying a full animation course first."
    ],
    demo: "demos/product-design-studio/index.html#emil-design-eng",
    galleryLink: "demos/product-design-studio/index.html#emil-design-eng"
  },
  {
    id: "design-taste-frontend",
    name: "design-taste-frontend",
    source: "Leonxlnx taste-skill",
    sourceUrl: "https://github.com/Leonxlnx/taste-skill",
    sourceRepo: "Leonxlnx/taste-skill",
    sourcePath: "Open Design wrapper: skills/taste-skill",
    githubStars: 64018,
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
    conceptCoverage: "10 key concepts are visible in the Design Taste Frontend Lab; the official package path is shown as a decision branch, with native CSS chosen because this gallery is an aesthetic page.",
    groundUpBuild: "Built the Design Taste Frontend Lab demo from scratch.",
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
    githubStars: 122177,
    starsCheckedAt: "2026-07-16",
    status: "published",
    recommendation: "Published pick: useful for turning subjective UI discomfort into a concrete critique-to-fix loop.",
    dateExplored: "2026-07-16",
    scenarios: ["design", "ui-ux"],
    platforms: ["claude-code", "codex", "hermes"],
    badges: ["Critique", "Before-after", "QA"],
    summary: "A review Skill for judging interface screenshots, hierarchy, spacing, copy, and usability.",
    phoebeNote: "Use it when a screenshot feels wrong but you need concrete fixes, not vague opinions.",
    coreConcepts: [
      "Run a visual audit before changing the design.",
      "Translate visual discomfort into specific findings.",
      "Rank critique by severity so launch-blocking issues come first.",
      "Apply atomic fixes instead of broad redesign churn.",
      "Keep before-after proof so the review is visible and accountable."
    ],
    conceptCoverage: "5/5 key concepts are visible in the Critique Loop demo.",
    groundUpBuild: "Built the Critique Loop before-after audit board from scratch.",
    rating: 8.0,
    ratingScale: 10,
    ratingSummary: "Very practical for pre-launch UI QA, though the local wrapper is sparse and needs judgment from the agent.",
    good: [
      "Turns vague feedback into concrete findings and small fixes.",
      "Keeps visual proof visible through a before-after comparison.",
      "Pairs naturally with frontend build Skills before publishing."
    ],
    improve: [
      "The local Skill wrapper is thin compared with a full review playbook.",
      "Needs a screenshot or built page to be valuable.",
      "Can become subjective if severity and launch criteria are not set."
    ],
    useCases: [
      "Vibe coders can ask for a sharper critique before shipping a page.",
      "Students can learn how to inspect UI beyond personal preference.",
      "AI learners can compare before and after screenshots from a Skill run."
    ],
    demo: "demos/design-review-critique-loop/index.html",
    galleryLink: "demos/design-review-critique-loop/index.html"
  },
  {
    id: "high-end-visual-design",
    name: "high-end-visual-design",
    source: "Leonxlnx taste-skill",
    sourceUrl: "https://github.com/Leonxlnx/taste-skill",
    sourceRepo: "Leonxlnx/taste-skill",
    sourcePath: "Open Design wrapper: skills/soft-skill",
    githubStars: 64018,
    starsCheckedAt: "2026-07-16",
    status: "published",
    recommendation: "Published pick: useful for a deliberate craft pass when a page already works but still lacks premium visual confidence.",
    dateExplored: "2026-07-16",
    scenarios: ["design", "ui-ux", "frontend"],
    platforms: ["claude-code", "codex", "hermes"],
    badges: ["Typography", "Layout polish", "Craft"],
    summary: "A visual craft Skill for refining typography, spacing, proportion, and finished-page confidence.",
    phoebeNote: "Use it when the structure works but the page needs stronger hierarchy, spacing, and visual confidence.",
    coreConcepts: [
      "Choose a premium vibe and layout archetype before generating the page.",
      "Block common low-quality AI design defaults.",
      "Use double-bezel nested surfaces for premium cards and containers.",
      "Use nested CTA architecture with an inner icon button.",
      "Use generous macro-whitespace and high-confidence typography.",
      "Apply custom motion curves and entry motion without layout-triggering animation.",
      "Respect performance guardrails for blur, z-index, and GPU-safe transforms.",
      "Collapse asymmetric layouts carefully on mobile."
    ],
    conceptCoverage: "8/10 key concepts are visible in the High-End Visual Design Atelier demo; full scroll choreography and full-screen menu sequencing were kept lighter for this static gallery.",
    groundUpBuild: "Built the High-End Visual Design Atelier page from scratch.",
    rating: 7.9,
    ratingScale: 10,
    ratingSummary: "Excellent for visual elevation, but some rules are very opinionated and can conflict with simpler brand needs.",
    good: [
      "Pushes the agent away from cheap-looking AI defaults.",
      "Gives concrete craft patterns like double-bezel surfaces and nested CTAs.",
      "Makes motion and mobile collapse part of the quality bar."
    ],
    improve: [
      "Some absolute bans are too rigid for practical product work.",
      "The premium style can overpower follower value if used too early.",
      "Needs a clear brand goal so high-end polish does not become decoration."
    ],
    useCases: [
      "Creators can make public pages feel more trustworthy.",
      "Leaders can improve presentation quality for internal AI demos.",
      "Students can study how small spacing choices change perception."
    ],
    demo: "demos/high-end-visual-design-showcase/index.html",
    galleryLink: "demos/high-end-visual-design-showcase/index.html"
  },
  {
    id: "design-consultation",
    name: "design-consultation",
    source: "garrytan gstack",
    sourceUrl: "https://github.com/garrytan/gstack",
    sourceRepo: "garrytan/gstack",
    sourcePath: "gstack design-consultation skill",
    githubStars: 122177,
    starsCheckedAt: "2026-07-16",
    status: "published",
    recommendation: "Published pick: useful when a product needs reusable visual rules before more pages are built.",
    dateExplored: "2026-07-16",
    scenarios: ["design", "agent-workflow"],
    platforms: ["claude-code", "codex", "hermes"],
    badges: ["Design system", "Tokens", "Guidelines"],
    summary: "A design system Skill for turning product intent into durable visual rules and documentation.",
    phoebeNote: "Use it later when repeated design preferences need to become a short source of truth.",
    coreConcepts: [
      "Start with a design workshop brief and product truth.",
      "Create a complete design system from scratch.",
      "Take creative risks while keeping them explicit.",
      "Show realistic product mockups instead of abstract rules only.",
      "Produce handoff rules that future agents can reuse."
    ],
    conceptCoverage: "5/5 key concepts are visible in the System Room demo.",
    groundUpBuild: "Built the System Room design-system workshop from scratch.",
    rating: 8.1,
    ratingScale: 10,
    ratingSummary: "Useful for making design direction reusable, though the wrapper needs more operational detail for larger systems.",
    good: [
      "Turns repeated taste preferences into reusable tokens and rules.",
      "Forces design choices to connect back to audience and product purpose.",
      "Makes future agent work easier by showing mockups plus handoff rules."
    ],
    improve: [
      "The local Skill wrapper is broad and does not provide a detailed worksheet.",
      "Can become too heavy if used before the product direction is clear.",
      "Needs discipline to stay practical instead of becoming a long brand document."
    ],
    useCases: [
      "Teams can keep AI-generated UI consistent across sessions.",
      "Builders can stop repeating color, spacing, and typography preferences.",
      "C-suite readers can understand why a prototype has a coherent system."
    ],
    demo: "demos/design-consultation-system-room/index.html",
    galleryLink: "demos/design-consultation-system-room/index.html"
  },
  {
    id: "impeccable",
    name: "impeccable",
    source: "Paul Bakaus Impeccable",
    sourceUrl: "https://github.com/pbakaus/impeccable",
    sourceRepo: "pbakaus/impeccable",
    sourcePath: ".agents/skills/impeccable/SKILL.md",
    githubStars: 47939,
    starsCheckedAt: "2026-07-19",
    status: "published",
    recommendation: "Published pick: useful when a frontend needs a deliberate direction, shared design vocabulary, and a rigorous mock-to-production quality loop.",
    dateExplored: "2026-07-19",
    scenarios: ["design", "ui-ux", "product-design", "frontend", "agent-workflow"],
    platforms: ["codex", "claude-code", "cursor", "gemini-cli", "opencode"],
    badges: ["Design direction", "23 commands", "UI detector"],
    summary: "A frontend design system for shaping, critiquing, auditing, refining, and shipping interfaces with explicit visual judgment.",
    phoebeNote: "Use it when a page needs more than polish: choose a direction, compare real mockups, build the winner, and inspect the result before shipping.",
    coreConcepts: [
      "Capture product context and choose the correct brand or product register before designing.",
      "Shape the interface purpose, content, scope, and visual direction before writing code.",
      "Confirm a palette and typography contract before generating full-page mockups.",
      "Compare structurally different directions instead of producing recolored variants.",
      "Treat the approved mock as a contract for hierarchy, composition, density, and motifs.",
      "Use systematic spacing, hierarchy, typography, and OKLCH color roles.",
      "Keep copy specific, concise, and action-oriented.",
      "Adapt composition for desktop and mobile rather than simply shrinking it.",
      "Use purposeful motion with visible defaults and reduced-motion support.",
      "Preserve semantic HTML, accessibility, real controls, and realistic interface states.",
      "Run visual critique and mechanical detector checks as separate sources of evidence.",
      "Polish against the approved direction after browser inspection."
    ],
    conceptCoverage: "11/12 concept clusters were exercised in the homepage rebuild; live-mode asset slicing was skipped because the approved ingredients could be built semantically or used existing artifact screenshots.",
    groundUpBuild: "Redesigned and rebuilt the Agent Skills Phoebe Picks homepage from zero through palette exploration, five mock directions, a user-selected hybrid, production implementation, and responsive QA.",
    rating: 9.0,
    ratingScale: 10,
    ratingSummary: "The strongest end-to-end design Skill tested so far: excellent at converting subjective taste into an inspectable workflow, but deliberately heavier than a quick visual tweak.",
    good: [
      "Turns vague visual preferences into named decisions, approval gates, and a concrete mock contract.",
      "Combines creative direction with practical checks for layout, copy, responsiveness, accessibility, motion, and AI design tells.",
      "Its separate visual assessment and deterministic detector catch different classes of defects before release."
    ],
    improve: [
      "The multi-gate craft flow is too heavy for small, already-scoped interface changes.",
      "The broad command and reference library takes time to navigate and can overwhelm a first-time user.",
      "Some absolute aesthetic bans still require human judgment so a distinctive brand voice is not flattened into compliance."
    ],
    useCases: [
      "Builders can take a homepage from rough intent through mock selection, implementation, and responsive release checks.",
      "Design and product teams can share precise commands for critique, layout, typography, color, motion, and polish.",
      "Students can compare multiple directions and see how a chosen visual idea survives contact with real code."
    ],
    demo: "Impeccable Design Flight Deck",
    galleryLink: "demos/impeccable-design-flight-deck/index.html"
  },
  {
    id: "find-skills",
    name: "find-skills",
    source: "joe-bell cva",
    sourceUrl: "https://github.com/joe-bell/cva/tree/main/.agents/skills/find-skills",
    sourceRepo: "joe-bell/cva",
    sourcePath: ".agents/skills/find-skills",
    githubStars: 6861,
    starsCheckedAt: "2026-07-17",
    status: "exploring",
    recommendation: "Explored artifact: useful discovery workflow, but held back from published-pick status because the installed source is below the 10k-star credibility gate.",
    dateExplored: "2026-07-17",
    scenarios: ["agent-workflow", "research", "prompting", "automation"],
    platforms: ["codex", "claude-code", "hermes", "cursor", "gemini-cli"],
    badges: ["Skill discovery", "Source gate", "Install decision"],
    summary: "A meta Skill for finding, vetting, and installing other agent Skills without recommending weak sources too quickly.",
    phoebeNote: "Use it as an internal discovery desk before adding new Skills, especially when a follower asks whether a useful Skill already exists.",
    coreConcepts: [
      "Clarify the user's domain, task, inputs, outputs, and constraints before searching.",
      "Check existing local Skills before adding another external Skill.",
      "Check trusted public sources or leaderboards before broad search.",
      "Search with specific keywords and alternate terms when the first query is weak.",
      "Verify install count, source reputation, GitHub stars, and source fit before recommending.",
      "Present a clear install, hold, reject, or direct-help decision."
    ],
    conceptCoverage: "5/6 concepts were exercised directly in the Discovery Desk build; the npx CLI search step was modeled but not executed because it would run third-party package code without explicit trust.",
    groundUpBuild: "Built the Skill Discovery Desk from scratch as an interactive source-aware recommendation flow.",
    rating: 7.1,
    ratingScale: 10,
    ratingSummary: "Useful as a thinking workflow for Skill discovery, but not a full Phoebe Pick until source credibility and safer search tooling improve.",
    good: [
      "Stops the agent from recommending a Skill just because a keyword matches.",
      "Turns Skill discovery into a repeatable brief, search, verify, decide workflow.",
      "Makes source quality visible before installation."
    ],
    improve: [
      "The installed source does not pass the 10k-star gate yet.",
      "The recommended CLI path depends on external package execution, so it needs explicit trust.",
      "It needs a richer scoring template for installs, source reputation, and artifact proof."
    ],
    useCases: [
      "Builders can compare Skills before adding more agent instructions.",
      "Students can learn how to judge AI tooling sources instead of chasing lists.",
      "Leaders can ask for evidence before adopting a new workflow Skill."
    ],
    demo: "demos/find-skills-discovery-desk/index.html",
    galleryLink: "demos/find-skills-discovery-desk/index.html"
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
