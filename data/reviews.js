const FILTERS = {
  scenarios: [
    { id: "design", label: "Design" },
    { id: "ui-ux", label: "UI/UX" },
    { id: "product-design", label: "Product Design" },
    { id: "product-management", label: "Product Management" },
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
    { id: "pi", label: "Pi" },
    { id: "github-copilot", label: "GitHub Copilot" },
    { id: "windsurf", label: "Windsurf" }
  ],
  statuses: [
    { id: "exploring", label: "Exploring" },
    { id: "wishlist", label: "Wishlist" },
    { id: "published", label: "Published" },
    { id: "rejected", label: "Rejected" }
  ]
};

const WISHLIST_REPOSITORY_SNAPSHOTS = {
  "HolobiomicsLab/asb-skill-collections": { githubStars: 14, checkedAt: "2026-07-27", repoUrl: "https://github.com/HolobiomicsLab/asb-skill-collections" },
  "K-Dense-AI/scientific-agent-skills": { githubStars: 31866, checkedAt: "2026-07-27", repoUrl: "https://github.com/K-Dense-AI/scientific-agent-skills" },
  "YuLab-SMU/TCMDATA": { githubStars: 15, checkedAt: "2026-07-27", repoUrl: "https://github.com/YuLab-SMU/TCMDATA" },
  "alirezarezvani/claude-skills": { githubStars: 23252, checkedAt: "2026-07-27", repoUrl: "https://github.com/alirezarezvani/claude-skills" },
  "anthropics/knowledge-work-plugins": { githubStars: 23069, checkedAt: "2026-07-27", repoUrl: "https://github.com/anthropics/knowledge-work-plugins" },
  "anthropics/skills": { githubStars: 164390, checkedAt: "2026-07-27", repoUrl: "https://github.com/anthropics/skills" },
  "coreyhaines31/marketingskills": { githubStars: 41848, checkedAt: "2026-07-27", repoUrl: "https://github.com/coreyhaines31/marketingskills" },
  "github/awesome-copilot": { githubStars: 37071, checkedAt: "2026-07-27", repoUrl: "https://github.com/github/awesome-copilot" },
  "kepano/obsidian-skills": { githubStars: 43403, checkedAt: "2026-07-27", repoUrl: "https://github.com/kepano/obsidian-skills" },
  "ndpvt-web/arxiv-claude-skills": { githubStars: 6, checkedAt: "2026-07-27", repoUrl: "https://github.com/ndpvt-web/arxiv-claude-skills" },
  "nexu-io/open-design": { githubStars: 81788, checkedAt: "2026-07-27", repoUrl: "https://github.com/nexu-io/open-design" },
  "openai/skills": { githubStars: 24214, checkedAt: "2026-07-27", repoUrl: "https://github.com/openai/skills" },
  "wshobson/agents": { githubStars: 38266, checkedAt: "2026-07-27", repoUrl: "https://github.com/wshobson/agents" },
  "yoqalux-blip/cdutcm-library-search-skill": { githubStars: 0, checkedAt: "2026-07-27", repoUrl: "https://github.com/yoqalux-blip/cdutcm-library-search-skill" }
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
    id: "pm-skills",
    name: "pm-skills",
    source: "Paweł Huryn PM Skills Marketplace",
    sourceUrl: "https://github.com/phuryn/pm-skills",
    sourceRepo: "phuryn/pm-skills",
    sourcePath: "All 65 Skills across pm-product-strategy, pm-product-discovery, pm-market-research, pm-execution, pm-data-analytics, pm-marketing-growth, pm-go-to-market, and pm-toolkit",
    githubStars: 24430,
    starsCheckedAt: "2026-07-25",
    status: "published",
    recommendation: "Published pick: all 65 installed Skills shaped a ground-up product operating system across market research, discovery, strategy, execution, analytics, growth, go-to-market, and supporting PM operations.",
    dateExplored: "2026-07-25",
    scenarios: ["product-management", "research", "data", "reporting", "agent-workflow"],
    platforms: ["claude-code", "codex", "hermes", "cursor", "gemini-cli", "opencode"],
    badges: ["65 of 65 tested", "100% coverage", "Product OS"],
    summary: "A broad product-management Skill marketplace that turns common PM frameworks into a connected, inspectable product operating system.",
    phoebeNote: "Use it when PM work is scattered across research, strategy, discovery, requirements, analytics, growth, and launch—and you need the evidence and trade-offs to remain coherent across all of them.",
    coreConcepts: [
      "Research the market through competitors, journeys, segments, sizing, sentiment, personas, and behavioral clusters.",
      "Run initial and continuous discovery through interviews, assumptions, ideation, request analysis, opportunity trees, experiments, metrics, and prioritization.",
      "Connect vision, value, business models, pricing, strategic canvases, macro forces, competitive forces, growth choices, and defensibility.",
      "Translate strategy into OKRs, requirements, job and user stories, prioritized work, sprint capacity, tests, release notes, meeting decisions, and retrospectives.",
      "Define and calculate product decisions through SQL logic, cohort analysis, and statistically rigorous A/B test interpretation.",
      "Shape product growth through naming, positioning, segment messages, marketing ideas, and a seven-criteria North Star constellation.",
      "Choose a beachhead, ICP, growth loop, motion stack, competitive battlecard, and phased go-to-market decision gates.",
      "Support product operations with synthetic fixtures, targeted copy review, privacy and NDA legal-review maps, and an evidence-first PM hiring rubric."
    ],
    conceptCoverage: "All 65 installed Skills were exercised—100% package coverage across eight product domains. Every Skill has an inspectable artifact, evidence basis, and method trace; legal and privacy artifacts are explicitly informational and require professional review.",
    groundUpBuild: "Built Lantern Product OS from scratch: an interactive product decision workspace with 65 inspectable artifacts, a full-coverage ledger, source/model/calculation labels, an evidence-to-decision product interface, delivery and operational safeguards, and calculated synthetic experiment proof.",
    rating: 8.9,
    ratingScale: 10,
    ratingSummary: "A serious cross-functional PM operating system with excellent framework depth and handoffs; it still needs stronger provenance fields, shorter recommended paths, and explicit stop rules for weak evidence.",
    good: [
      "Connects market learning, product choices, execution, measurement, and launch without losing the reasoning chain.",
      "Turns vague PM judgment into inspectable artifacts, thresholds, trade-offs, and follow-up decisions.",
      "Works across multiple Skill-aware agents because the core methods use portable markdown instructions."
    ],
    improve: [
      "Needs a first-class provenance field that distinguishes sourced facts, modeled data, estimates, assumptions, and AI inference.",
      "Needs shorter recommended paths so users do not apply overlapping canvases merely because they exist.",
      "Needs explicit stop rules when research quality is too weak to complete a framework responsibly."
    ],
    useCases: [
      "Product managers can carry market evidence into a traceable strategy, PRD, roadmap, metric system, and launch plan.",
      "AI builders can pressure-test a product through all 65 connected Skills before investing in production code.",
      "Leaders, product-ops teams, and students can inspect how research and strategy choices flow through delivery, launch, safeguards, and team operations instead of reading disconnected templates."
    ],
    demo: "demos/pm-decision-room/index.html",
    galleryLink: "demos/pm-decision-room/index.html"
  },
  {
    id: "find-skills",
    name: "find-skills",
    source: "Vercel Labs Skills",
    sourceUrl: "https://github.com/vercel-labs/skills/tree/main/skills/find-skills",
    sourceRepo: "vercel-labs/skills",
    sourcePath: "skills/find-skills/SKILL.md",
    githubStars: 27182,
    starsCheckedAt: "2026-07-25",
    status: "published",
    recommendation: "Published pick: the canonical Skill is ranked #1 all-time on Skills.sh with 2.7M installs, and its 27,182-star source clears the gallery credibility gate.",
    dateExplored: "2026-07-17",
    scenarios: ["agent-workflow", "research", "prompting", "automation"],
    platforms: ["codex", "claude-code", "hermes", "cursor", "gemini-cli", "github-copilot", "windsurf"],
    badges: ["#1 on Skills.sh", "2.7M installs", "Skill discovery"],
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
    conceptCoverage: "6/6 concepts were exercised across the Discovery Desk and a 20-Skill research pass: need framing, local inventory, leaderboard review, ecosystem search, source verification, and a publish-or-wishlist decision. Direct third-party CLI execution remained intentionally optional.",
    groundUpBuild: "Built the Skill Discovery Desk from scratch as an interactive source-aware recommendation flow, then used the workflow to verify and rank 20 high-star product, design, data, ML, LLM, and AI-agent Skills.",
    rating: 7.8,
    ratingScale: 10,
    ratingSummary: "A strong, portable discovery workflow backed by the ecosystem’s top-ranked Skill; popularity bias, external package execution, and scoring depth still need care.",
    good: [
      "Stops the agent from recommending a Skill just because a keyword matches.",
      "Turns Skill discovery into a repeatable brief, search, verify, decide workflow.",
      "Makes source quality visible before installation."
    ],
    improve: [
      "Leaderboard popularity can crowd out a lower-install Skill that fits a specialized task better.",
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
  },
  {
    id: "d3-visualization",
    name: "d3-visualization",
    source: "snow-d3 via Open Design",
    sourceUrl: "https://github.com/jiannanya/snow-d3",
    sourceRepo: "jiannanya/snow-d3",
    sourcePath: "SKILL.md; catalog wrapper: nexu-io/open-design/skills/d3-visualization/SKILL.md",
    githubStars: 4,
    starsCheckedAt: "2026-07-26",
    status: "exploring",
    recommendation: "Exploring: the ground-up build is complete, but the canonical Skill source has 4 stars and does not yet clear the gallery credibility gate. Its Open Design catalog wrapper is hosted in an 81,586-star repository.",
    dateExplored: "2026-07-26",
    scenarios: ["data-viz", "data", "reporting", "frontend"],
    platforms: ["codex", "claude-code", "hermes", "cursor", "gemini-cli"],
    badges: ["9/10 concepts", "D3 v7.9", "Credibility pending"],
    summary: "A comprehensive D3 Skill for bespoke interactive charts, layouts, and data-driven SVG experiences.",
    phoebeNote: "Use it when a standard chart cannot explain the structure, relationships, or hierarchy in the data and custom interaction materially improves understanding.",
    coreConcepts: [
      "Bind changing data to SVG elements with D3 selections and enter, update, and exit joins.",
      "Map quantitative and categorical values with linear, logarithmic, ordinal, and color scales.",
      "Construct SVG marks and paths directly instead of hiding the data-to-mark relationship behind a chart wrapper.",
      "Make values readable through axes, ticks, legends, labels, and responsive view boxes.",
      "Use transitions to preserve visual continuity when data, filters, or chart modes change.",
      "Support direct exploration with zoom, pan, drag, hover, and click interactions.",
      "Use brushing to select a bounded region and coordinate the selection with other views.",
      "Model relationships with force simulation, links, collision, and clustered nodes.",
      "Reveal nested structure with hierarchy utilities and space-filling layouts such as treemaps.",
      "Use geographic projections and paths when the analytical question has a spatial dimension."
    ],
    conceptCoverage: "9/10 key concept families were exercised: data joins, scales and color, SVG shapes, axes, transitions, zoom and drag, brushing, force simulation, and hierarchy. Geography was deliberately skipped because the Skill dataset has no meaningful spatial dimension.",
    groundUpBuild: "Built Skill Constellation from scratch: a linked exploration of the source-backed wishlist, now 85 Skills, with a force-cluster map, logarithmic star map and brush, hierarchy treemap, interactive category ring, search, filtering, responsive layout, and an inspectable Skill detail panel.",
    rating: 8.3,
    ratingScale: 10,
    ratingSummary: "Broad and practical coverage of D3's core mental models, layouts, and interactions; the learning path and production guidance could be sharper.",
    good: [
      "The 30 working examples turn advanced D3 layouts and interactions into practical starting points.",
      "The references connect chart choice, scales, joins, axes, layout, and interaction without hiding the underlying SVG model.",
      "Its vanilla, no-build patterns are portable across prototypes, reports, and editorial data products."
    ],
    improve: [
      "The catalog wrapper requires a separate upstream-source step before the full Skill is usable.",
      "The breadth can overwhelm beginners because it lacks a short decision path from question and data type to one recommended pattern.",
      "The examples need stronger production guidance for accessibility, data validation, annotation, and regression testing."
    ],
    useCases: [
      "Data teams can build portfolio, KPI, and source landscapes when a standard dashboard cannot show relationships clearly.",
      "AI builders can map agent, tool, model, or retrieval networks and inspect clusters or outliers.",
      "Product leaders and students can compare force, scatter, and treemap explanations of the same evidence in one interactive artifact."
    ],
    demo: "demos/d3-skill-constellation/index.html",
    galleryLink: "demos/d3-skill-constellation/index.html"
  }
];

const WISHLIST_CANDIDATES = [
  {
    rank: 1,
    id: "algorithmic-art",
    sourceRepo: "anthropics/skills",
    sourcePath: "skills/algorithmic-art/SKILL.md",
    sourceUrl: "https://github.com/anthropics/skills/tree/main/skills/algorithmic-art",
    githubStars: 164075,
    category: "design-art",
    focus: "Design · Generative art",
    buildTarget: "An original, seeded p5.js collection with live parameter exploration."
  },
  {
    rank: 2,
    id: "xlsx",
    sourceRepo: "anthropics/skills",
    sourcePath: "skills/xlsx/SKILL.md",
    sourceUrl: "https://github.com/anthropics/skills/tree/main/skills/xlsx",
    githubStars: 164075,
    category: "data-analytics",
    focus: "Data analysis · Spreadsheets",
    buildTarget: "A formula-safe analytical workbook with charts, formatting, and recalculation QA."
  },
  {
    rank: 3,
    id: "skill-creator",
    sourceRepo: "anthropics/skills",
    sourcePath: "skills/skill-creator/SKILL.md",
    sourceUrl: "https://github.com/anthropics/skills/tree/main/skills/skill-creator",
    githubStars: 164075,
    category: "llm-agents",
    focus: "AI agents · Skill engineering",
    buildTarget: "A new Skill tested with prompt cases, quantitative checks, and iterative evaluation."
  },
  {
    rank: 4,
    id: "mcp-builder",
    sourceRepo: "anthropics/skills",
    sourcePath: "skills/mcp-builder/SKILL.md",
    sourceUrl: "https://github.com/anthropics/skills/tree/main/skills/mcp-builder",
    githubStars: 164075,
    category: "llm-agents",
    focus: "LLM tools · AI agents",
    buildTarget: "A narrowly scoped MCP server judged by real task-completion quality."
  },
  {
    rank: 5,
    id: "artifacts-builder",
    sourceRepo: "nexu-io/open-design",
    sourcePath: "skills/artifacts-builder/SKILL.md",
    sourceUrl: "https://github.com/nexu-io/open-design/tree/main/skills/artifacts-builder",
    githubStars: 81448,
    category: "design-art",
    focus: "Product design · Interactive artifacts",
    buildTarget: "A multi-component product artifact with a real information architecture and interaction model."
  },
  {
    rank: 6,
    id: "dashboard",
    sourceRepo: "nexu-io/open-design",
    sourcePath: "design-templates/dashboard/SKILL.md",
    sourceUrl: "https://github.com/nexu-io/open-design/tree/main/design-templates/dashboard",
    githubStars: 81586,
    category: "data-analytics",
    focus: "Dashboard design · Information hierarchy",
    buildTarget: "A decision dashboard with layered KPI hierarchy, filters, dense data, and clear action paths."
  },
  {
    rank: 7,
    id: "data-report",
    sourceRepo: "nexu-io/open-design",
    sourcePath: "skills/data-report/SKILL.md",
    sourceUrl: "https://github.com/nexu-io/open-design/tree/main/skills/data-report",
    githubStars: 81448,
    category: "data-analytics",
    focus: "Data analytics · Reporting",
    buildTarget: "A bounded dataset turned into a KPI narrative, chart set, and inspectable table."
  },
  {
    rank: 8,
    id: "data-storytelling",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/business-analytics/skills/data-storytelling/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/business-analytics/skills/data-storytelling",
    githubStars: 38211,
    category: "data-analytics",
    focus: "Analytics · Executive communication",
    buildTarget: "An executive decision narrative using setup, conflict, evidence, and resolution."
  },
  {
    rank: 9,
    id: "kpi-dashboard-design",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/business-analytics/skills/kpi-dashboard-design/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/business-analytics/skills/kpi-dashboard-design",
    githubStars: 38211,
    category: "data-analytics",
    focus: "BI · Dashboards · Product analytics",
    buildTarget: "A governed KPI dashboard with consistent definitions, hierarchy, and action thresholds."
  },
  {
    rank: 10,
    id: "llm-evaluation",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/llm-application-dev/skills/llm-evaluation/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/llm-application-dev/skills/llm-evaluation",
    githubStars: 38211,
    category: "llm-agents",
    focus: "LLM evaluation · ML",
    buildTarget: "A model-quality comparison using automated metrics, human review, and regression tests."
  },
  {
    rank: 11,
    id: "rag-implementation",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/llm-application-dev/skills/rag-implementation/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/llm-application-dev/skills/rag-implementation",
    githubStars: 38211,
    category: "llm-agents",
    focus: "RAG · LLM applications",
    buildTarget: "A source-grounded retrieval prototype with separate retrieval and answer-quality measures."
  },
  {
    rank: 12,
    id: "agentic-eval",
    sourceRepo: "github/awesome-copilot",
    sourcePath: "skills/agentic-eval/SKILL.md",
    sourceUrl: "https://github.com/github/awesome-copilot/tree/main/skills/agentic-eval",
    githubStars: 37023,
    category: "llm-agents",
    focus: "AI agents · Evaluation",
    buildTarget: "A generate–evaluate–critique–refine loop with a fixed rubric and stopping rule."
  },
  {
    rank: 13,
    id: "autoresearch",
    sourceRepo: "github/awesome-copilot",
    sourcePath: "skills/autoresearch/SKILL.md",
    sourceUrl: "https://github.com/github/awesome-copilot/tree/main/skills/autoresearch",
    githubStars: 37023,
    category: "llm-agents",
    focus: "AI agents · ML experimentation",
    buildTarget: "A bounded autonomous experiment loop with a baseline, target, and keep-or-discard log."
  },
  {
    rank: 14,
    id: "exploratory-data-analysis",
    sourceRepo: "K-Dense-AI/scientific-agent-skills",
    sourcePath: "skills/exploratory-data-analysis/SKILL.md",
    sourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/tree/main/skills/exploratory-data-analysis",
    githubStars: 31724,
    category: "data-science-ml",
    focus: "Data science · EDA",
    buildTarget: "An authorized dataset audited for missingness, leakage, outliers, and sensitivity."
  },
  {
    rank: 15,
    id: "scientific-visualization",
    sourceRepo: "K-Dense-AI/scientific-agent-skills",
    sourcePath: "skills/scientific-visualization/SKILL.md",
    sourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/tree/main/skills/scientific-visualization",
    githubStars: 31724,
    category: "data-science-ml",
    focus: "Data science · Visual communication",
    buildTarget: "An accessible publication-ready figure that preserves uncertainty and missing data."
  },
  {
    rank: 16,
    id: "statsmodels",
    sourceRepo: "K-Dense-AI/scientific-agent-skills",
    sourcePath: "skills/statsmodels/SKILL.md",
    sourceUrl: "https://github.com/K-Dense-AI/scientific-agent-skills/tree/main/skills/statsmodels",
    githubStars: 31724,
    category: "data-science-ml",
    focus: "Statistics · ML · Econometrics",
    buildTarget: "A reproducible inference study with model selection, diagnostics, and uncertainty."
  },
  {
    rank: 17,
    id: "product-manager",
    sourceRepo: "alirezarezvani/claude-skills",
    sourcePath: ".gemini/skills/product-manager/SKILL.md",
    sourceUrl: "https://github.com/alirezarezvani/claude-skills/tree/main/.gemini/skills/product-manager",
    githubStars: 23170,
    category: "product",
    focus: "Product management · Prioritization",
    buildTarget: "A vague request turned into a short outcome-led spec, trade-off, and success metric."
  },
  {
    rank: 18,
    id: "product-discovery",
    sourceRepo: "alirezarezvani/claude-skills",
    sourcePath: "product-team/skills/product-discovery/SKILL.md",
    sourceUrl: "https://github.com/alirezarezvani/claude-skills/tree/main/product-team/skills/product-discovery",
    githubStars: 23170,
    category: "product",
    focus: "Product discovery · Research",
    buildTarget: "An opportunity map with ranked assumptions, interviews, prototypes, and decision gates."
  },
  {
    rank: 19,
    id: "product-analytics",
    sourceRepo: "alirezarezvani/claude-skills",
    sourcePath: "product-team/skills/product-analytics/SKILL.md",
    sourceUrl: "https://github.com/alirezarezvani/claude-skills/tree/main/product-team/skills/product-analytics",
    githubStars: 23170,
    category: "product",
    focus: "Product analytics · Data",
    buildTarget: "A metric hierarchy with cohorts, retention, adoption, and stage-aware interpretation."
  },
  {
    rank: 20,
    id: "product-strategist",
    sourceRepo: "alirezarezvani/claude-skills",
    sourcePath: "product-team/skills/product-strategist/SKILL.md",
    sourceUrl: "https://github.com/alirezarezvani/claude-skills/tree/main/product-team/skills/product-strategist",
    githubStars: 23170,
    category: "product",
    focus: "Product strategy · OKRs",
    buildTarget: "A strategy test spanning OKR cascades, alignment scoring, competition, and team design."
  },
  {
    rank: 21,
    id: "notion-knowledge-capture",
    sourceRepo: "openai/skills",
    sourcePath: "skills/.curated/notion-knowledge-capture/SKILL.md",
    sourceUrl: "https://github.com/openai/skills/tree/main/skills/.curated/notion-knowledge-capture",
    githubStars: 24179,
    category: "knowledge-base",
    focus: "Knowledge base · Notion capture",
    buildTarget: "A structured knowledge inbox that turns raw notes into linked, reusable Notion pages."
  },
  {
    rank: 22,
    id: "notion-meeting-intelligence",
    sourceRepo: "openai/skills",
    sourcePath: "skills/.curated/notion-meeting-intelligence/SKILL.md",
    sourceUrl: "https://github.com/openai/skills/tree/main/skills/.curated/notion-meeting-intelligence",
    githubStars: 24179,
    category: "knowledge-base",
    focus: "Knowledge base · Meeting memory",
    buildTarget: "A meeting-memory system that connects decisions, owners, actions, and prior context."
  },
  {
    rank: 23,
    id: "notion-research-documentation",
    sourceRepo: "openai/skills",
    sourcePath: "skills/.curated/notion-research-documentation/SKILL.md",
    sourceUrl: "https://github.com/openai/skills/tree/main/skills/.curated/notion-research-documentation",
    githubStars: 24179,
    category: "knowledge-base",
    focus: "Knowledge base · Research",
    buildTarget: "A cited research hub that retrieves Notion sources and publishes a traceable synthesis."
  },
  {
    rank: 24,
    id: "obsidian-markdown",
    sourceRepo: "kepano/obsidian-skills",
    sourcePath: "skills/obsidian-markdown/SKILL.md",
    sourceUrl: "https://github.com/kepano/obsidian-skills/tree/main/skills/obsidian-markdown",
    githubStars: 43309,
    category: "knowledge-base",
    focus: "Knowledge base · Obsidian",
    buildTarget: "A connected Obsidian vault using properties, wikilinks, embeds, callouts, and maps of content."
  },
  {
    rank: 25,
    id: "obsidian-bases",
    sourceRepo: "kepano/obsidian-skills",
    sourcePath: "skills/obsidian-bases/SKILL.md",
    sourceUrl: "https://github.com/kepano/obsidian-skills/tree/main/skills/obsidian-bases",
    githubStars: 43309,
    category: "knowledge-base",
    focus: "Knowledge base · Structured views",
    buildTarget: "A database-like knowledge dashboard with filtered table, card, list, and summary views."
  },
  {
    rank: 26,
    id: "docx",
    sourceRepo: "anthropics/skills",
    sourcePath: "skills/docx/SKILL.md",
    sourceUrl: "https://github.com/anthropics/skills/tree/main/skills/docx",
    githubStars: 164196,
    category: "office",
    focus: "Office · Word documents",
    buildTarget: "A polished Word report with controlled styles, tables, pagination, and rendered QA."
  },
  {
    rank: 27,
    id: "pdf",
    sourceRepo: "anthropics/skills",
    sourcePath: "skills/pdf/SKILL.md",
    sourceUrl: "https://github.com/anthropics/skills/tree/main/skills/pdf",
    githubStars: 164196,
    category: "office",
    focus: "Office · PDF",
    buildTarget: "An accessible, client-ready PDF assembled, inspected, and validated page by page."
  },
  {
    rank: 28,
    id: "pptx",
    sourceRepo: "anthropics/skills",
    sourcePath: "skills/pptx/SKILL.md",
    sourceUrl: "https://github.com/anthropics/skills/tree/main/skills/pptx",
    githubStars: 164196,
    category: "office",
    focus: "Office · Presentations",
    buildTarget: "An executive presentation with a clear narrative, editable visuals, and slide-level QA."
  },
  {
    rank: 29,
    id: "doc-coauthoring",
    sourceRepo: "anthropics/skills",
    sourcePath: "skills/doc-coauthoring/SKILL.md",
    sourceUrl: "https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring",
    githubStars: 164196,
    category: "office",
    focus: "Office · Collaborative writing",
    buildTarget: "A coauthored decision document shaped through context transfer, iteration, and reader testing."
  },
  {
    rank: 30,
    id: "internal-comms",
    sourceRepo: "anthropics/skills",
    sourcePath: "skills/internal-comms/SKILL.md",
    sourceUrl: "https://github.com/anthropics/skills/tree/main/skills/internal-comms",
    githubStars: 164196,
    category: "office",
    focus: "Office · Internal communication",
    buildTarget: "A concise internal update package spanning leadership notes, project status, and FAQs."
  },
  {
    rank: 31,
    id: "explore-data",
    sourceRepo: "anthropics/knowledge-work-plugins",
    sourcePath: "data/skills/explore-data/SKILL.md",
    sourceUrl: "https://github.com/anthropics/knowledge-work-plugins/tree/main/data/skills/explore-data",
    githubStars: 23042,
    category: "data-dashboard",
    focus: "Data to dashboard · Exploration",
    buildTarget: "A decision-led data profile that surfaces quality issues, distributions, patterns, and open questions."
  },
  {
    rank: 32,
    id: "validate-data",
    sourceRepo: "anthropics/knowledge-work-plugins",
    sourcePath: "data/skills/validate-data/SKILL.md",
    sourceUrl: "https://github.com/anthropics/knowledge-work-plugins/tree/main/data/skills/validate-data",
    githubStars: 23042,
    category: "data-dashboard",
    focus: "Data to dashboard · Validation",
    buildTarget: "A dashboard-ready dataset with explicit grain, reconciled metrics, and visible quality checks."
  },
  {
    rank: 33,
    id: "data-visualization",
    sourceRepo: "anthropics/knowledge-work-plugins",
    sourcePath: "data/skills/data-visualization/SKILL.md",
    sourceUrl: "https://github.com/anthropics/knowledge-work-plugins/tree/main/data/skills/data-visualization",
    githubStars: 23042,
    category: "data-dashboard",
    focus: "Data to dashboard · Visual encoding",
    buildTarget: "A chart system that matches questions to visual encodings and preserves uncertainty."
  },
  {
    rank: 34,
    id: "create-viz",
    sourceRepo: "anthropics/knowledge-work-plugins",
    sourcePath: "data/skills/create-viz/SKILL.md",
    sourceUrl: "https://github.com/anthropics/knowledge-work-plugins/tree/main/data/skills/create-viz",
    githubStars: 23042,
    category: "data-dashboard",
    focus: "Data to dashboard · Chart creation",
    buildTarget: "A compact set of production charts with accessible labels, useful tooltips, and narrative context."
  },
  {
    rank: 35,
    id: "build-dashboard",
    sourceRepo: "anthropics/knowledge-work-plugins",
    sourcePath: "data/skills/build-dashboard/SKILL.md",
    sourceUrl: "https://github.com/anthropics/knowledge-work-plugins/tree/main/data/skills/build-dashboard",
    githubStars: 23042,
    category: "data-dashboard",
    focus: "Data to dashboard · Product",
    buildTarget: "An interactive decision dashboard with governed KPIs, filters, drill paths, and action thresholds."
  },
  {
    rank: 36,
    id: "marketing-plan",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/marketing-plan/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/marketing-plan",
    githubStars: 41714,
    category: "marketing",
    focus: "Marketing · Strategy",
    buildTarget: "A focused marketing plan connecting positioning, audience, channels, campaigns, and measurement."
  },
  {
    rank: 37,
    id: "customer-research",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/customer-research/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/customer-research",
    githubStars: 41714,
    category: "marketing",
    focus: "Marketing · Customer insight",
    buildTarget: "A voice-of-customer evidence bank that informs segments, objections, messages, and offers."
  },
  {
    rank: 38,
    id: "content-strategy",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/content-strategy/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/content-strategy",
    githubStars: 41714,
    category: "marketing",
    focus: "Marketing · Content",
    buildTarget: "A content system with audience themes, distribution logic, repurposing, cadence, and success measures."
  },
  {
    rank: 39,
    id: "copywriting",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/copywriting/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/copywriting",
    githubStars: 41714,
    category: "marketing",
    focus: "Marketing · Conversion copy",
    buildTarget: "A conversion page with a sharp promise, evidence, objection handling, and measurable calls to action."
  },
  {
    rank: 40,
    id: "analytics",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/analytics/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/analytics",
    githubStars: 41714,
    category: "marketing",
    focus: "Marketing · Measurement",
    buildTarget: "A privacy-aware measurement plan with event definitions, funnel health, attribution limits, and experiments."
  },
  {
    rank: 41,
    id: "business-pulse",
    sourceRepo: "anthropics/knowledge-work-plugins",
    sourcePath: "small-business/skills/business-pulse/SKILL.md",
    sourceUrl: "https://github.com/anthropics/knowledge-work-plugins/tree/main/small-business/skills/business-pulse",
    githubStars: 23042,
    category: "one-person-company",
    focus: "One-person company · Operating pulse",
    buildTarget: "A weekly founder cockpit covering cash, pipeline, customers, delivery risks, and next decisions."
  },
  {
    rank: 42,
    id: "cash-flow-snapshot",
    sourceRepo: "anthropics/knowledge-work-plugins",
    sourcePath: "small-business/skills/cash-flow-snapshot/SKILL.md",
    sourceUrl: "https://github.com/anthropics/knowledge-work-plugins/tree/main/small-business/skills/cash-flow-snapshot",
    githubStars: 23042,
    category: "one-person-company",
    focus: "One-person company · Cash flow",
    buildTarget: "A simple cash runway view with incoming money, obligations, scenarios, and founder action triggers."
  },
  {
    rank: 43,
    id: "lead-triage",
    sourceRepo: "anthropics/knowledge-work-plugins",
    sourcePath: "small-business/skills/lead-triage/SKILL.md",
    sourceUrl: "https://github.com/anthropics/knowledge-work-plugins/tree/main/small-business/skills/lead-triage",
    githubStars: 23042,
    category: "one-person-company",
    focus: "One-person company · Sales",
    buildTarget: "A founder-friendly lead queue that scores fit, urgency, next action, and follow-up timing."
  },
  {
    rank: 44,
    id: "invoice-chase",
    sourceRepo: "anthropics/knowledge-work-plugins",
    sourcePath: "small-business/skills/invoice-chase/SKILL.md",
    sourceUrl: "https://github.com/anthropics/knowledge-work-plugins/tree/main/small-business/skills/invoice-chase",
    githubStars: 23042,
    category: "one-person-company",
    focus: "One-person company · Receivables",
    buildTarget: "A respectful invoice follow-up workflow with aging, message stages, exceptions, and approval gates."
  },
  {
    rank: 45,
    id: "contract-review",
    sourceRepo: "anthropics/knowledge-work-plugins",
    sourcePath: "small-business/skills/contract-review/SKILL.md",
    sourceUrl: "https://github.com/anthropics/knowledge-work-plugins/tree/main/small-business/skills/contract-review",
    githubStars: 23042,
    category: "one-person-company",
    focus: "One-person company · Contracts",
    buildTarget: "A plain-language contract review that flags obligations, risky terms, questions, and human escalation."
  },
  {
    rank: 46,
    id: "brandkit",
    sourceRepo: "nexu-io/open-design",
    sourcePath: "skills/brandkit/SKILL.md",
    sourceUrl: "https://github.com/nexu-io/open-design/tree/main/skills/brandkit",
    githubStars: 81644,
    category: "design-art",
    focus: "Design · Brand systems",
    buildTarget: "A reusable brand kit with visual principles, tokens, typography, color, imagery, and application examples."
  },
  {
    rank: 47,
    id: "creative-director",
    sourceRepo: "nexu-io/open-design",
    sourcePath: "skills/creative-director/SKILL.md",
    sourceUrl: "https://github.com/nexu-io/open-design/tree/main/skills/creative-director",
    githubStars: 81644,
    category: "design-art",
    focus: "Design · Creative direction",
    buildTarget: "An original campaign system that turns one strategic concept into a coherent visual world across several formats."
  },
  {
    rank: 48,
    id: "apple-hig",
    sourceRepo: "nexu-io/open-design",
    sourcePath: "skills/apple-hig/SKILL.md",
    sourceUrl: "https://github.com/nexu-io/open-design/tree/main/skills/apple-hig",
    githubStars: 81644,
    category: "design-art",
    focus: "Product design · Apple platforms",
    buildTarget: "A native-feeling Apple product flow audited for hierarchy, navigation, controls, accessibility, and platform conventions."
  },
  {
    rank: 49,
    id: "color-expert",
    sourceRepo: "nexu-io/open-design",
    sourcePath: "skills/color-expert/SKILL.md",
    sourceUrl: "https://github.com/nexu-io/open-design/tree/main/skills/color-expert",
    githubStars: 81644,
    category: "design-art",
    focus: "Design · Color systems",
    buildTarget: "A semantic color system tested across light and dark themes, data states, contrast requirements, and brand expression."
  },
  {
    rank: 50,
    id: "design-brief",
    sourceRepo: "nexu-io/open-design",
    sourcePath: "skills/design-brief/SKILL.md",
    sourceUrl: "https://github.com/nexu-io/open-design/tree/main/skills/design-brief",
    githubStars: 81644,
    category: "design-art",
    focus: "Design · Briefing",
    buildTarget: "A decision-ready creative brief connecting audience, problem, promise, constraints, references, deliverables, and success criteria."
  },
  {
    rank: 51,
    id: "embedding-strategies",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/llm-application-dev/skills/embedding-strategies/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/llm-application-dev/skills/embedding-strategies",
    githubStars: 38241,
    category: "llm-agents",
    focus: "LLMs · Embeddings",
    buildTarget: "An embedding benchmark comparing models, chunking choices, similarity behavior, cost, latency, and retrieval quality."
  },
  {
    rank: 52,
    id: "hybrid-search-implementation",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/llm-application-dev/skills/hybrid-search-implementation/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/llm-application-dev/skills/hybrid-search-implementation",
    githubStars: 38241,
    category: "llm-agents",
    focus: "LLMs · Hybrid retrieval",
    buildTarget: "A retrieval system comparing keyword, vector, and fused ranking with traceable relevance judgments."
  },
  {
    rank: 53,
    id: "prompt-engineering-patterns",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/llm-application-dev/skills/prompt-engineering-patterns/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/llm-application-dev/skills/prompt-engineering-patterns",
    githubStars: 38241,
    category: "llm-agents",
    focus: "LLMs · Prompt engineering",
    buildTarget: "A prompt pattern lab with fixed test cases, structured outputs, failure analysis, and regression comparisons."
  },
  {
    rank: 54,
    id: "vector-index-tuning",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/llm-application-dev/skills/vector-index-tuning/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/llm-application-dev/skills/vector-index-tuning",
    githubStars: 38241,
    category: "llm-agents",
    focus: "LLMs · Vector indexes",
    buildTarget: "A vector-index experiment balancing recall, latency, memory, filtering, and update behavior on one bounded corpus."
  },
  {
    rank: 55,
    id: "multi-reviewer-patterns",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/agent-teams/skills/multi-reviewer-patterns/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/agent-teams/skills/multi-reviewer-patterns",
    githubStars: 38241,
    category: "llm-agents",
    focus: "AI agents · Review teams",
    buildTarget: "A multi-reviewer quality gate with distinct roles, severity rules, disagreement handling, and a measurable release decision."
  },
  {
    rank: 56,
    id: "dataset-curation",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/llm-finetuning/skills/dataset-curation/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/llm-finetuning/skills/dataset-curation",
    githubStars: 38241,
    category: "data-science-ml",
    focus: "ML · Training data",
    buildTarget: "A documented training dataset with provenance, deduplication, quality labels, splits, contamination checks, and error analysis."
  },
  {
    rank: 57,
    id: "finetuning-method-selection",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/llm-finetuning/skills/finetuning-method-selection/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/llm-finetuning/skills/finetuning-method-selection",
    githubStars: 38241,
    category: "data-science-ml",
    focus: "ML · Fine-tuning strategy",
    buildTarget: "A method-selection decision comparing prompting, retrieval, adapters, and full fine-tuning against quality, cost, data, and risk."
  },
  {
    rank: 58,
    id: "lora-qlora-recipes",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/llm-finetuning/skills/lora-qlora-recipes/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/llm-finetuning/skills/lora-qlora-recipes",
    githubStars: 38241,
    category: "data-science-ml",
    focus: "ML · LoRA and QLoRA",
    buildTarget: "A reproducible adapter-tuning experiment with baseline evaluation, memory tracking, checkpoint comparison, and failure cases."
  },
  {
    rank: 59,
    id: "ml-pipeline-workflow",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/machine-learning-ops/skills/ml-pipeline-workflow/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/machine-learning-ops/skills/ml-pipeline-workflow",
    githubStars: 38241,
    category: "data-science-ml",
    focus: "ML · MLOps pipelines",
    buildTarget: "An end-to-end ML pipeline with reproducible features, training, evaluation, registry, deployment checks, and drift monitoring."
  },
  {
    rank: 60,
    id: "recsys-pipeline-architect",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/machine-learning-ops/skills/recsys-pipeline-architect/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/machine-learning-ops/skills/recsys-pipeline-architect",
    githubStars: 38241,
    category: "data-science-ml",
    focus: "ML · Recommender systems",
    buildTarget: "A recommendation pipeline with candidate generation, ranking, offline metrics, bias checks, serving constraints, and feedback loops."
  },
  {
    rank: 61,
    id: "data-quality-frameworks",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/data-engineering/skills/data-quality-frameworks/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/data-engineering/skills/data-quality-frameworks",
    githubStars: 38241,
    category: "data-analytics",
    focus: "Data engineering · Quality",
    buildTarget: "A data-quality layer with contracts, freshness, completeness, validity, reconciliation, ownership, and incident thresholds."
  },
  {
    rank: 62,
    id: "dbt-transformation-patterns",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/data-engineering/skills/dbt-transformation-patterns/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/data-engineering/skills/dbt-transformation-patterns",
    githubStars: 38241,
    category: "data-analytics",
    focus: "Data engineering · dbt",
    buildTarget: "A layered dbt project with tested sources, staging and marts, documentation, lineage, incremental logic, and deployment checks."
  },
  {
    rank: 63,
    id: "airflow-dag-patterns",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/data-engineering/skills/airflow-dag-patterns/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/data-engineering/skills/airflow-dag-patterns",
    githubStars: 38241,
    category: "data-analytics",
    focus: "Data engineering · Orchestration",
    buildTarget: "A production-style workflow with idempotent tasks, retries, backfills, observability, data checks, and failure recovery."
  },
  {
    rank: 64,
    id: "competitive-landscape",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/startup-business-analyst/skills/competitive-landscape/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/startup-business-analyst/skills/competitive-landscape",
    githubStars: 38241,
    category: "product",
    focus: "Product · Competitive strategy",
    buildTarget: "An evidence-backed market landscape covering alternatives, segments, positioning, capability gaps, and strategic implications."
  },
  {
    rank: 65,
    id: "startup-metrics-framework",
    sourceRepo: "wshobson/agents",
    sourcePath: "plugins/startup-business-analyst/skills/startup-metrics-framework/SKILL.md",
    sourceUrl: "https://github.com/wshobson/agents/tree/main/plugins/startup-business-analyst/skills/startup-metrics-framework",
    githubStars: 38241,
    category: "product",
    focus: "Product · Startup metrics",
    buildTarget: "A stage-aware metric system linking acquisition, activation, retention, revenue, efficiency, and explicit decision thresholds."
  },
  {
    rank: 66,
    id: "copy-editing",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/copy-editing/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/copy-editing",
    githubStars: 41754,
    category: "content-writing",
    focus: "Content writing · Editing",
    buildTarget: "A before-and-after editorial pass improving clarity, structure, voice, evidence, consistency, and conversion without changing meaning."
  },
  {
    rank: 67,
    id: "cold-email",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/cold-email/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/cold-email",
    githubStars: 41754,
    category: "content-writing",
    focus: "Content writing · Cold outreach",
    buildTarget: "A researched outreach sequence with relevant openings, concise value, credible proof, respectful follow-ups, and measurable replies."
  },
  {
    rank: 68,
    id: "emails",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/emails/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/emails",
    githubStars: 41754,
    category: "content-writing",
    focus: "Content writing · Email sequences",
    buildTarget: "A lifecycle email series with one job per message, coherent sequencing, useful personalization, clear calls to action, and success measures."
  },
  {
    rank: 69,
    id: "lead-magnets",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/lead-magnets/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/lead-magnets",
    githubStars: 41754,
    category: "content-writing",
    focus: "Content writing · Lead magnets",
    buildTarget: "A genuinely useful guide or toolkit connecting one audience problem, actionable content, trust signals, delivery, and follow-up."
  },
  {
    rank: 70,
    id: "public-relations",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/public-relations/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/public-relations",
    githubStars: 41754,
    category: "content-writing",
    focus: "Content writing · Public relations",
    buildTarget: "A media-ready narrative package with a defensible angle, supporting facts, spokesperson notes, outreach copy, and follow-up plan."
  },
  {
    rank: 71,
    id: "social",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/social/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/social",
    githubStars: 41754,
    category: "content-writing",
    focus: "Content writing · Social content",
    buildTarget: "A platform-aware social series with a clear point of view, useful hooks, proof, native formatting, repurposing, and response metrics."
  },
  {
    rank: 72,
    id: "programmatic-seo",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/programmatic-seo/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/programmatic-seo",
    githubStars: 41754,
    category: "content-writing",
    focus: "Content writing · Programmatic SEO",
    buildTarget: "A quality-controlled page system with a useful template, differentiated data, internal links, duplicate-content safeguards, and indexation checks."
  },
  {
    rank: 73,
    id: "ai-seo",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/ai-seo/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/ai-seo",
    githubStars: 41754,
    category: "content-writing",
    focus: "Content writing · AI search",
    buildTarget: "A source-rich answer library designed for human usefulness, clear entities, quotable facts, retrieval visibility, and attribution monitoring."
  },
  {
    rank: 74,
    id: "offers",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/offers/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/offers",
    githubStars: 41754,
    category: "content-writing",
    focus: "Content writing · Offer design",
    buildTarget: "A written offer connecting outcome, audience, scope, evidence, risk reversal, pricing logic, objections, and a clear next step."
  },
  {
    rank: 75,
    id: "product-marketing",
    sourceRepo: "coreyhaines31/marketingskills",
    sourcePath: "skills/product-marketing/SKILL.md",
    sourceUrl: "https://github.com/coreyhaines31/marketingskills/tree/main/skills/product-marketing",
    githubStars: 41754,
    category: "content-writing",
    focus: "Content writing · Product messaging",
    buildTarget: "A messaging system linking audience problems, positioning, differentiated value, proof, launch narratives, sales enablement, and adoption content."
  },
  {
    rank: 76,
    id: "notion-spec-to-implementation",
    sourceRepo: "openai/skills",
    sourcePath: "skills/.curated/notion-spec-to-implementation/SKILL.md",
    sourceUrl: "https://github.com/openai/skills/tree/main/skills/.curated/notion-spec-to-implementation",
    githubStars: 24191,
    category: "knowledge-base",
    focus: "Knowledge base · Specs to delivery",
    buildTarget: "A linked Notion workflow that turns a source specification into implementation tasks, decisions, progress evidence, and durable project memory."
  },
  {
    rank: 77,
    id: "defuddle",
    sourceRepo: "kepano/obsidian-skills",
    sourcePath: "skills/defuddle/SKILL.md",
    sourceUrl: "https://github.com/kepano/obsidian-skills/tree/main/skills/defuddle",
    githubStars: 43329,
    category: "knowledge-base",
    focus: "Knowledge base · Web capture",
    buildTarget: "A clean web-to-knowledge capture flow preserving title, author, source, useful structure, metadata, citations, and readable Markdown."
  },
  {
    rank: 78,
    id: "json-canvas",
    sourceRepo: "kepano/obsidian-skills",
    sourcePath: "skills/json-canvas/SKILL.md",
    sourceUrl: "https://github.com/kepano/obsidian-skills/tree/main/skills/json-canvas",
    githubStars: 43329,
    category: "knowledge-base",
    focus: "Knowledge base · Visual maps",
    buildTarget: "A machine-readable knowledge canvas connecting notes, sources, claims, questions, and decisions through inspectable nodes and edges."
  },
  {
    rank: 79,
    id: "obsidian-cli",
    sourceRepo: "kepano/obsidian-skills",
    sourcePath: "skills/obsidian-cli/SKILL.md",
    sourceUrl: "https://github.com/kepano/obsidian-skills/tree/main/skills/obsidian-cli",
    githubStars: 43329,
    category: "knowledge-base",
    focus: "Knowledge base · Vault automation",
    buildTarget: "A safe vault-maintenance workflow for search, capture, metadata updates, link checks, and batch operations with backups and dry runs."
  },
  {
    rank: 80,
    id: "library-curator",
    sourceRepo: "nexu-io/open-design",
    sourcePath: "skills/library-curator/SKILL.md",
    sourceUrl: "https://github.com/nexu-io/open-design/tree/main/skills/library-curator",
    githubStars: 81644,
    category: "knowledge-base",
    focus: "Knowledge base · Library curation",
    buildTarget: "A curated resource library with explicit inclusion rules, taxonomy, summaries, provenance, duplicate handling, quality signals, and maintenance cadence."
  },
  {
    rank: 81,
    id: "weread-year-in-review-video-template",
    sourceRepo: "nexu-io/open-design",
    sourcePath: "skills/weread-year-in-review-video-template/SKILL.md",
    sourceUrl: "https://github.com/nexu-io/open-design/tree/main/skills/weread-year-in-review-video-template",
    githubStars: 81644,
    category: "knowledge-base",
    focus: "Knowledge base · WeRead reflection",
    buildTarget: "A WeRead year-in-review knowledge story connecting books, highlights, themes, reading patterns, memorable ideas, and an editable visual narrative."
  },
  {
    rank: 82,
    id: "cdutcm-library-search",
    sourceRepo: "yoqalux-blip/cdutcm-library-search-skill",
    sourcePath: "SKILL.md",
    sourceUrl: "https://github.com/yoqalux-blip/cdutcm-library-search-skill",
    githubStars: 0,
    category: "knowledge-base",
    focus: "Chinese medicine KB · Library research",
    buildTarget: "A research-only literature workflow through authorized Chengdu University of Traditional Chinese Medicine library access, with source queues, citations, manual verification, and no diagnosis or treatment advice."
  },
  {
    rank: 83,
    id: "tcm-network-pharmacology",
    sourceRepo: "YuLab-SMU/TCMDATA",
    sourcePath: "inst/skills/tcm-network-pharmacology/SKILL.md",
    sourceUrl: "https://github.com/YuLab-SMU/TCMDATA/tree/master/inst/skills/tcm-network-pharmacology",
    githubStars: 15,
    category: "knowledge-base",
    focus: "Chinese medicine KB · Network pharmacology",
    buildTarget: "A research-only, reproducible TCM evidence map distinguishing computational predictions from PubMed, experimental, and clinical evidence, with exact thresholds and no medical advice."
  },
  {
    rank: 84,
    id: "linglanmidian-systematic-evaluation-tcm",
    sourceRepo: "ndpvt-web/arxiv-claude-skills",
    sourcePath: "skills/linglanmidian-systematic-evaluation-tcm/SKILL.md",
    sourceUrl: "https://github.com/ndpvt-web/arxiv-claude-skills/tree/master/skills/linglanmidian-systematic-evaluation-tcm",
    githubStars: 6,
    category: "knowledge-base",
    focus: "Chinese medicine KB · LLM evaluation",
    buildTarget: "A research-only TCM knowledge benchmark with synonym-tolerant scoring, hard subsets, source provenance, expert review, and no clinical decision support."
  },
  {
    rank: 85,
    id: "domain-ontology-mapping-tcm-and-ethnobotany",
    sourceRepo: "HolobiomicsLab/asb-skill-collections",
    sourcePath: "collections/metabolomics/v2/skills/domain-ontology-mapping-tcm-and-ethnobotany/SKILL.md",
    sourceUrl: "https://github.com/HolobiomicsLab/asb-skill-collections/tree/main/collections/metabolomics/v2/skills/domain-ontology-mapping-tcm-and-ethnobotany",
    githubStars: 14,
    category: "knowledge-base",
    focus: "Chinese medicine KB · Ontology mapping",
    buildTarget: "A research-only terminology map reconciling TCM names, transliterations, organisms, preparations, structures, and references, with expert validation and license review."
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
window.WISHLIST_CANDIDATES = WISHLIST_CANDIDATES;
window.WISHLIST_REPOSITORY_SNAPSHOTS = WISHLIST_REPOSITORY_SNAPSHOTS;
window.EVALUATION_STEPS = EVALUATION_STEPS;
window.REVIEWS = PICKS;
