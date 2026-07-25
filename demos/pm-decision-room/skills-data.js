const LANTERN_DOMAINS = [
  {
    id: "research",
    label: "Market research",
    count: 7,
    question: "Whose problem is urgent enough to solve?",
    decision: "Start with AI product trios in 8–30 person software teams.",
    signal: "7 research artifacts"
  },
  {
    id: "discovery",
    label: "Product discovery",
    count: 13,
    question: "Which opportunity deserves a test?",
    decision: "Prove that a visible evidence trail improves first-decision completion.",
    signal: "13 discovery artifacts"
  },
  {
    id: "strategy",
    label: "Product strategy",
    count: 12,
    question: "How will Lantern compete and win?",
    decision: "Own explainable product decisions—not generic tasks, docs, or roadmaps.",
    signal: "12 strategy artifacts"
  },
  {
    id: "execution",
    label: "Execution",
    count: 15,
    question: "What can the team align on and build?",
    decision: "Ship, test, explain, and improve the smallest trustworthy decision loop.",
    signal: "15 execution artifacts"
  },
  {
    id: "analytics",
    label: "Data analytics",
    count: 3,
    question: "Did behavior change enough to continue?",
    decision: "The modeled guided-trail variant clears the ship threshold; validate with live data.",
    signal: "3 analytical artifacts"
  },
  {
    id: "growth",
    label: "Marketing & growth",
    count: 5,
    question: "What language and loop will spread value?",
    decision: "Position Lantern as the evidence trail behind the roadmap.",
    signal: "5 growth artifacts"
  },
  {
    id: "gtm",
    label: "Go to market",
    count: 6,
    question: "Where does Lantern earn its first references?",
    decision: "Launch into weekly product-bet reviews with product-led team expansion.",
    signal: "6 GTM artifacts"
  },
  {
    id: "toolkit",
    label: "PM toolkit",
    count: 4,
    question: "What supporting safeguards make the product and team credible?",
    decision: "Treat legal, privacy, writing, and hiring outputs as reviewed operational safeguards.",
    signal: "4 toolkit artifacts"
  }
];

const LANTERN_SKILLS = [
  {
    id: "competitor-analysis",
    domain: "research",
    title: "Competitive landscape",
    artifact: "Five-position market map",
    basis: "Current official product positioning",
    result: "Lantern sits between customer intelligence, prioritization, and delivery tools by making the reasoning chain itself the product.",
    evidence: [
      "Dovetail emphasizes customer intelligence and unified signals.",
      "Productboard, Jira Product Discovery, and airfocus connect insights to priorities and roadmaps.",
      "Notion is the flexible substitute; Lantern differentiates through opinionated evidence-to-decision provenance."
    ],
    method: ["Scoped the market", "Compared five alternatives", "Mapped strengths, gaps, and differentiation"]
  },
  {
    id: "customer-journey-map",
    domain: "research",
    title: "Customer journey",
    artifact: "Awareness-to-advocacy journey",
    basis: "Modeled from the field-test research set",
    result: "The critical moment is not signup; it is the first time a teammate can explain a bet without another meeting.",
    evidence: [
      "Awareness: sees an evidence-trail teardown in a PM community.",
      "Onboarding: imports one messy decision and links two sources.",
      "Aha moment: a stakeholder reads the trail and asks a better question instead of requesting context."
    ],
    method: ["Mapped seven journey stages", "Captured emotions and pain", "Marked aha, truth, and churn moments"]
  },
  {
    id: "market-segments",
    domain: "research",
    title: "Market segments",
    artifact: "Four needs-based segments",
    basis: "Modeled strategic segmentation",
    result: "AI product trios are the first segment; product-ops leaders, founder-led teams, and regulated product groups follow.",
    evidence: [
      "AI product trios: high decision frequency and fragmented evidence.",
      "Product operations: need cross-team consistency and portfolio visibility.",
      "Founder-led teams: move fast but lack research and decision discipline."
    ],
    method: ["Defined distinct segments", "Used JTBD and pain", "Assessed fit, growth, and competition"]
  },
  {
    id: "market-sizing",
    domain: "research",
    title: "Market sizing",
    artifact: "Assumption-led TAM / SAM / SOM model",
    basis: "Modeled estimates—not external market facts",
    result: "The model prioritizes validation of reachable teams and willingness to pay rather than presenting a false-precision market number.",
    evidence: [
      "TAM model: product teams × plausible annual team spend.",
      "SAM narrows to English-speaking software teams with weekly product reviews.",
      "SOM is capacity-constrained by a 12-partner design program and product-led referrals."
    ],
    method: ["Used top-down and bottom-up logic", "Separated TAM, SAM, and SOM", "Labeled assumptions and validation needs"]
  },
  {
    id: "sentiment-analysis",
    domain: "research",
    title: "Feedback sentiment",
    artifact: "Synthetic feedback theme analysis",
    basis: "Modeled 24-response research set",
    result: "Clarity is positive; setup effort and fear of AI-generated certainty are the strongest detractors.",
    evidence: [
      "Product trios: +0.42 modeled sentiment; value the visible chain.",
      "Product ops: +0.18; want governance and portfolio views.",
      "Founders: +0.06; like speed but resist another system to maintain."
    ],
    method: ["Segmented feedback", "Scored sentiment from −1 to +1", "Ranked themes by frequency and impact"]
  },
  {
    id: "user-personas",
    domain: "research",
    title: "Research personas",
    artifact: "Three evidence-backed proto-personas",
    basis: "Proto-personas pending live interviews",
    result: "Maya the PM, Leon the product-ops lead, and Inez the founder represent distinct jobs—not demographic costumes.",
    evidence: [
      "Maya: needs one defensible weekly bet without spending Friday assembling context.",
      "Leon: needs comparable decision quality across teams.",
      "Inez: needs speed without outsourcing judgment to an AI summary."
    ],
    method: ["Used JTBD", "Captured three pains and gains", "Flagged unexpected insight and data gaps"]
  },
  {
    id: "user-segmentation",
    domain: "research",
    title: "Behavioral segmentation",
    artifact: "Three usage-mode clusters",
    basis: "Modeled behavior clusters",
    result: "The useful segments are Investigators, Aligners, and Operators, distinguished by behavior and desired progress.",
    evidence: [
      "Investigators collect and connect evidence before proposing solutions.",
      "Aligners translate product reasoning for stakeholders.",
      "Operators standardize decision quality across multiple teams."
    ],
    method: ["Clustered by behavior and needs", "Mapped product fit and churn risk", "Assigned invest, maintain, or defer"]
  },

  {
    id: "analyze-feature-requests",
    domain: "discovery",
    title: "Request triage",
    artifact: "Problem-theme inbox",
    basis: "Modeled request set",
    result: "Twenty-four requests collapse into three opportunities: provenance, faster review preparation, and safer AI synthesis.",
    evidence: [
      "Top theme: “show why this decision changed,” not “add a changelog.”",
      "Alternative solutions remain visible before selecting features.",
      "Requests for a full sprint board are rejected as strategically misaligned."
    ],
    method: ["Grouped requests into themes", "Scored alignment, impact, effort, and risk", "Proposed assumptions and cheap tests"]
  },
  {
    id: "brainstorm-experiments-existing",
    domain: "discovery",
    title: "Existing-product experiments",
    artifact: "Three behavior tests",
    basis: "Experiments for the working Lantern prototype",
    result: "The first test is a clickable guided trail, not a production integration.",
    evidence: [
      "Prototype task test: 4 of 5 trios explain the decision unaided.",
      "Fake-door weekly brief: at least 25% request setup.",
      "Wizard-of-Oz contradiction flag: users correct fewer than 15% of AI summaries."
    ],
    method: ["Mapped assumption to experiment", "Measured behavior", "Set metric and success threshold"]
  },
  {
    id: "brainstorm-experiments-new",
    domain: "discovery",
    title: "New-product pretotypes",
    artifact: "XYZ hypothesis and skin-in-game tests",
    basis: "Initial product validation plan",
    result: "At least 30% of invited AI product trios will submit a real messy decision for a concierge evidence-trail session.",
    evidence: [
      "Landing page: 12% qualified conversion threshold.",
      "Concierge clinic: 6 of 10 teams return with a second decision.",
      "Paid pilot: 3 of 12 partners commit budget or a signed purchase intent."
    ],
    method: ["Created XYZ hypothesis", "Used YODA over analogy", "Required time, data, or money commitment"]
  },
  {
    id: "brainstorm-ideas-existing",
    domain: "discovery",
    title: "Continuous ideation",
    artifact: "Product-trio solution set",
    basis: "Working-prototype ideation",
    result: "The product trio generated fifteen options and advanced five, led by contradiction flags and a weekly change brief.",
    evidence: [
      "PM lens: decision expiry and outcome alignment.",
      "Design lens: progressive disclosure and explain-back mode.",
      "Engineering lens: evidence graph, source diff, and structured provenance."
    ],
    method: ["Generated five ideas per trio role", "Ranked the top five", "Recorded reasoning and assumptions"]
  },
  {
    id: "brainstorm-ideas-new",
    domain: "discovery",
    title: "Initial ideation",
    artifact: "Fifteen-concept starting field",
    basis: "New-product ideation",
    result: "Initial discovery favored core value and testability over platform breadth.",
    evidence: [
      "PM: shared decision trail and explicit trade-off log.",
      "Designer: guided first bet and confidence labels.",
      "Engineer: source-linked graph and exportable audit record."
    ],
    method: ["Used PM, design, and engineering perspectives", "Weighted speed to validate", "Selected five differentiated core ideas"]
  },
  {
    id: "identify-assumptions-existing",
    domain: "discovery",
    title: "Feature assumptions",
    artifact: "Four-risk stress test",
    basis: "Guided-trail feature analysis",
    result: "The highest existing-product risk is usability: teams may understand the trail but avoid maintaining it.",
    evidence: [
      "Value: visible provenance changes a real decision.",
      "Usability: a first trail can be completed in under 20 minutes.",
      "Viability and feasibility: summaries stay reviewable and source links remain intact."
    ],
    method: ["Used trio devil’s-advocate views", "Covered value, usability, viability, feasibility", "Added confidence and tests"]
  },
  {
    id: "identify-assumptions-new",
    domain: "discovery",
    title: "Venture assumptions",
    artifact: "Eight-risk assumption map",
    basis: "New-product risk analysis",
    result: "Ethics and GTM risks rank beside value and feasibility because a decision tool can amplify false certainty.",
    evidence: [
      "Ethics: summaries may erase dissent or minority evidence.",
      "GTM: teams may like the idea but refuse another workflow.",
      "Team: provenance infrastructure may exceed the initial team’s capability."
    ],
    method: ["Covered eight risk categories", "Used PM, design, and engineering lenses", "Rated confidence and named tests"]
  },
  {
    id: "interview-script",
    domain: "discovery",
    title: "Interview guide",
    artifact: "30-minute Mom Test script",
    basis: "Planned live research",
    result: "The guide asks about the last product decision and never pitches Lantern.",
    evidence: [
      "Warm-up: role, weekly decision rhythm, and people involved.",
      "Core: reconstruct the last decision, tools, evidence, conflict, and outcome.",
      "Wrap: current spend, attempted fixes, referrals, and note-taking template."
    ],
    method: ["Used past-behavior questions", "Applied 80/20 listening", "Included JTBD probes and recording consent"]
  },
  {
    id: "metrics-dashboard",
    domain: "discovery",
    title: "Product metrics system",
    artifact: "Four-layer dashboard specification",
    basis: "Metric definitions and modeled targets",
    result: "Weekly evidence-backed decisions is the North Star; correction rate is the critical trust guardrail.",
    evidence: [
      "Inputs: first-decision rate, evidence connection, experiment attachment.",
      "Health: AI correction rate, unexplained reversals, response latency.",
      "Business: team expansion, paid conversion, gross margin."
    ],
    method: ["Defined calculations and sources", "Set targets and alerts", "Assigned daily, weekly, monthly, and quarterly cadence"]
  },
  {
    id: "opportunity-solution-tree",
    domain: "discovery",
    title: "Opportunity Solution Tree",
    artifact: "Outcome → opportunity → solution → experiment",
    basis: "Modeled research synthesis",
    result: "The primary branch is “I cannot tell which evidence changed the decision.”",
    evidence: [
      "Single outcome: 50% of teams reach a testable bet in 14 days.",
      "Three solutions per prioritized opportunity prevent first-idea lock-in.",
      "Every selected solution ends in a thresholded behavior experiment."
    ],
    method: ["Used all four OST levels", "Applied Opportunity Score", "Kept discovery continuous and non-linear"]
  },
  {
    id: "prioritize-assumptions",
    domain: "discovery",
    title: "Assumption priority",
    artifact: "Impact × risk matrix",
    basis: "Modeled confidence and effort",
    result: "The high-impact, high-risk assumption is that teams will maintain evidence links after the first week.",
    evidence: [
      "Proceed: teams can understand a trail when shown one.",
      "Test: repeated maintenance and willingness to pay.",
      "Reject: automatic roadmap generation creates low strategic value and high trust risk."
    ],
    method: ["Scored impact and risk", "Used four matrix actions", "Designed minimal behavior tests"]
  },
  {
    id: "prioritize-features",
    domain: "discovery",
    title: "Feature priority",
    artifact: "Top-five evidence backlog",
    basis: "Modeled impact, effort, risk, and fit",
    result: "Guided decision trail ranks first; integrations marketplace is explicitly later.",
    evidence: [
      "1: guided trail; 2: evidence inbox; 3: experiment card.",
      "4: weekly change brief; 5: decision history.",
      "Deprioritized: integrations and AI roadmap generation."
    ],
    method: ["Confirmed objective and metric", "Used four evaluation lenses", "Made trade-offs and deprioritization visible"]
  },
  {
    id: "summarize-interview",
    domain: "discovery",
    title: "Interview synthesis",
    artifact: "Modeled interview summary",
    basis: "Synthetic transcript for method testing",
    result: "Maya’s job is to defend one weekly product bet without rebuilding context across six tools.",
    evidence: [
      "Current solution: calls, Dovetail clips, Notion notes, spreadsheet score, slide deck.",
      "What works: flexible tools; biggest pain: reasoning disappears between them.",
      "Action: test explain-back prototype and validate maintenance effort."
    ],
    method: ["Captured background and current solution", "Separated likes, problems, and insights", "Assigned dated actions"]
  },

  {
    id: "ansoff-matrix",
    domain: "strategy",
    title: "Growth choices",
    artifact: "Four-quadrant Ansoff map",
    basis: "Modeled strategic options",
    result: "Lantern should penetrate the AI product-trio niche before expanding to portfolio operations.",
    evidence: [
      "Penetration: weekly bet templates and team referrals.",
      "Market development: regulated product groups after trust controls mature.",
      "Diversification: autonomous portfolio planning is high risk and deliberately rejected."
    ],
    method: ["Mapped all four quadrants", "Compared risk and timeline", "Prioritized fit, feasibility, and defensibility"]
  },
  {
    id: "business-model",
    domain: "strategy",
    title: "Business Model Canvas",
    artifact: "Nine-block operating model",
    basis: "Modeled business design",
    result: "A self-serve team subscription expands through shared decision views, supported by design-partner services early.",
    evidence: [
      "Partners and resources: analytics connectors, secure AI infrastructure, product-research expertise.",
      "Channels and relationships: templates, PM communities, concierge onboarding, then self-service.",
      "Economics: software gross margin target with LTV greater than three times CAC."
    ],
    method: ["Completed all nine blocks", "Checked alignment", "Surfaced economic assumptions and risks"]
  },
  {
    id: "lean-canvas",
    domain: "strategy",
    title: "Lean Canvas",
    artifact: "Nine-part hypothesis snapshot",
    basis: "Modeled rapid hypothesis canvas",
    result: "The sharpest hypothesis is that teams will pay to preserve decision reasoning—not merely collect more feedback.",
    evidence: [
      "Problems: scattered evidence, solution jumping, repetitive alignment.",
      "UVP: the evidence trail behind every product bet.",
      "Metrics and economics: activation, repeat decisions, team expansion, and paid conversion."
    ],
    method: ["Linked problems to three solution approaches", "Defined UVP and advantage", "Named validation experiments"]
  },
  {
    id: "monetization-strategy",
    domain: "strategy",
    title: "Monetization options",
    artifact: "Four-model revenue test",
    basis: "Modeled unit-economics hypotheses",
    result: "Test a team subscription first, with paid concierge pilots as the willingness-to-pay bridge.",
    evidence: [
      "Team subscription: best recurring-value fit.",
      "Usage pricing: rejected initially because it creates evidence-hoarding anxiety.",
      "Enterprise governance: later, after audit controls and portfolio value are proven."
    ],
    method: ["Compared four distinct models", "Assessed audience, economics, risks, and competition", "Attached a low-cost test to each"]
  },
  {
    id: "pestle-analysis",
    domain: "strategy",
    title: "Macro environment",
    artifact: "Six-factor PESTLE watchlist",
    basis: "Strategic assumptions requiring regional validation",
    result: "Privacy, AI accountability, software-budget pressure, and rapid model change are the highest-impact external factors.",
    evidence: [
      "Political/legal: AI governance and data residency can shape market entry.",
      "Economic/social: tool consolidation and distrust of opaque AI move in opposite directions.",
      "Technology/environment: model volatility and inference cost require efficient, reviewable workflows."
    ],
    method: ["Covered all six factors", "Rated impact and likelihood", "Named indicators, responses, and unknowns"]
  },
  {
    id: "porters-five-forces",
    domain: "strategy",
    title: "Industry forces",
    artifact: "Five-forces pressure map",
    basis: "Modeled category assessment",
    result: "Rivalry and substitutes are high; differentiation must come from trusted provenance and an opinionated workflow.",
    evidence: [
      "Rivalry: established PM platforms are broad and increasingly AI-enabled.",
      "Buyer power: teams can assemble a substitute from flexible tools.",
      "Entry threat: building features is easy; building trusted history and workflow adoption is harder."
    ],
    method: ["Rated five forces", "Identified the three critical pressures", "Converted forces into strategic responses"]
  },
  {
    id: "pricing-strategy",
    domain: "strategy",
    title: "Pricing design",
    artifact: "Three-tier team model",
    basis: "Price hypotheses pending live willingness-to-pay data",
    result: "Charge by active product team, not evidence volume, to align price with collaborative value.",
    evidence: [
      "Pilot: paid concierge setup with a fixed outcome.",
      "Team: core trails, experiments, history, and shared views.",
      "Portfolio: governance, cross-team metrics, access controls, and service."
    ],
    method: ["Connected price to value and alternatives", "Compared pricing models", "Defined tiers, value metric, and experiments"]
  },
  {
    id: "product-strategy",
    domain: "strategy",
    title: "Product Strategy Canvas",
    artifact: "Nine-part strategic system",
    basis: "Integrated product strategy",
    result: "Lantern competes on premium decision clarity at lower coordination cost, with explicit refusal to become a project suite.",
    evidence: [
      "Vision, segment, value, trade-offs, metrics, growth, capabilities, and defensibility reinforce one another.",
      "North Star: weekly evidence-backed decisions; OMTM: 14-day first-decision rate.",
      "Critical hypothesis: visible contradictions change real roadmap decisions."
    ],
    method: ["Completed nine sections", "Checked coherence and defensibility", "Added hypotheses and low-effort experiments"]
  },
  {
    id: "product-vision",
    domain: "strategy",
    title: "Product vision",
    artifact: "Five options and one selected line",
    basis: "Vision workshop",
    result: "Selected vision: Make every product decision easier to see, challenge, and improve.",
    evidence: [
      "Inspiring: turns healthy challenge into a product norm.",
      "Achievable: focuses on decision trails, not autonomous management.",
      "Emotional: replaces circular meetings with confidence and shared understanding."
    ],
    method: ["Drafted five variations", "Selected with rationale", "Checked customer, team, investor, and value alignment"]
  },
  {
    id: "startup-canvas",
    domain: "strategy",
    title: "Startup Canvas",
    artifact: "Eleven-part strategy and business model",
    basis: "New-product operating hypothesis",
    result: "The integrated choices—narrow segment, trust-first workflow, team pricing, and evidence history—form the defensibility.",
    evidence: [
      "Strategy: nine linked choices from vision through can’t/won’t.",
      "Cost structure: product trio, secure inference, connectors, and design-partner support.",
      "Revenue: team subscription first; portfolio governance later."
    ],
    method: ["Separated strategy from business model", "Completed eleven sections", "Checked coherence and experiments"]
  },
  {
    id: "swot-analysis",
    domain: "strategy",
    title: "SWOT",
    artifact: "Build / defend / pivot matrix",
    basis: "Modeled internal and external assessment",
    result: "Build on the evidence graph; defend against setup burden and platform bundling.",
    evidence: [
      "Strength: clear, source-linked decision history.",
      "Weakness: workflow adoption and integration dependence.",
      "Opportunity/threat: rising AI output increases provenance need while incumbents bundle similar features."
    ],
    method: ["Covered four quadrants", "Cross-referenced internal and external factors", "Assigned strategic actions and metrics"]
  },
  {
    id: "value-proposition",
    domain: "strategy",
    title: "JTBD value proposition",
    artifact: "Six-part customer value map",
    basis: "First-segment value hypothesis",
    result: "For AI product trios, Lantern turns scattered evidence into a testable bet teammates can understand without another meeting.",
    evidence: [
      "Before: rebuild context across calls, notes, dashboards, and slides.",
      "How: connect evidence, opportunity, alternatives, assumption, and experiment.",
      "After: challenge the reasoning, update it when evidence changes, and share it."
    ],
    method: ["Defined who, why, before, how, after, and alternatives", "Created concise value statement", "Compared substitutes"]
  },

  {
    id: "brainstorm-okrs",
    domain: "execution",
    title: "Quarterly OKRs",
    artifact: "Three credible OKR options",
    basis: "Modeled quarter-one planning",
    result: "Selected objective: Turn first-time teams into confident, repeat decision-makers this quarter.",
    evidence: [
      "KR1: raise 14-day first-decision completion from 31% to 50%.",
      "KR2: reach 35% four-week retained team usage.",
      "KR3: keep material AI summary correction at or below 15%."
    ],
    method: ["Generated three equal-weight options", "Used exactly three measurable KRs", "Linked outcomes to strategy and NSM"]
  },
  {
    id: "create-prd",
    domain: "execution",
    title: "Guided Trail PRD",
    artifact: "Eight-section product requirement",
    basis: "Authoritative first-release specification",
    result: "V1 guides a team from two evidence items to one opportunity, three solutions, one assumption, and a measurable experiment.",
    evidence: [
      "Objective: reach 50% first-decision completion without more meeting time.",
      "Solution: manual evidence links, comparison, confidence labels, and experiment threshold.",
      "Release: core trail first; history and integrations follow only after trust metrics hold."
    ],
    method: ["Completed eight PRD sections", "Used accessible language", "Flagged assumptions and relative release windows"]
  },
  {
    id: "outcome-roadmap",
    domain: "execution",
    title: "Outcome roadmap",
    artifact: "Now / next / later behavior change",
    basis: "Flexible strategic sequencing",
    result: "Now proves clarity, next builds a review habit, later spreads trust across stakeholders.",
    evidence: [
      "Now: enable trios to explain one bet; target 50% activation.",
      "Next: revisit changed evidence; target 30% fewer stale bets.",
      "Later: share decisions asynchronously; target 25% less review-meeting time."
    ],
    method: ["Translated outputs into outcomes", "Attached customer and business measures", "Added dependencies and assumptions"]
  },
  {
    id: "pre-mortem",
    domain: "execution",
    title: "Launch pre-mortem",
    artifact: "Tigers, paper tigers, and elephants",
    basis: "Cross-functional risk workshop",
    result: "Launch blocks on source-loss, unreviewable AI summaries, and inability to delete imported evidence.",
    evidence: [
      "Tiger: summaries detach from evidence; owner Engineering; block launch.",
      "Paper tiger: users demand every integration on day one.",
      "Elephant: dissenting evidence may be socially suppressed in shared views."
    ],
    method: ["Assumed launch failure", "Classified three risk types", "Assigned urgency, mitigation, owner, and due point"]
  },
  {
    id: "stakeholder-map",
    domain: "execution",
    title: "Stakeholder map",
    artifact: "Power × interest communication plan",
    basis: "Modeled launch organization",
    result: "The product trio and design partners are managed closely; security and finance stay satisfied with decision gates.",
    evidence: [
      "Manage closely: product trio, research lead, design partners—weekly decision review.",
      "Keep satisfied: executive sponsor, security, finance—biweekly risk and outcome brief.",
      "Keep informed: support, marketing, sales—demo and evidence digest."
    ],
    method: ["Mapped four quadrants", "Set frequency, channel, and message", "Flagged conflicts and alignment approach"]
  },
  {
    id: "user-stories",
    domain: "execution",
    title: "Build-ready stories",
    artifact: "Five INVEST-sized stories",
    basis: "Guided-trail backlog",
    result: "The first story lets a PM link evidence to a decision and see whether every claim retains a source.",
    evidence: [
      "Card: Link evidence to a decision.",
      "Conversation: preserve context while allowing a source to be challenged or removed.",
      "Confirmation: source state, empty state, access, keyboard use, and deletion behavior are testable."
    ],
    method: ["Used Card, Conversation, Confirmation", "Checked INVEST", "Included design reference and 4–6 acceptance criteria"]
  },
  {
    id: "dummy-dataset",
    domain: "execution",
    title: "Synthetic evidence dataset",
    artifact: "24-row decision-signal fixture",
    basis: "Generated test data; entirely synthetic",
    result: "A constrained fixture lets the team test provenance, contradictory evidence, sentiment, access states, and deletion without using customer data.",
    evidence: [
      "Schema includes signal ID, source type, confidence, sentiment, contradiction flag, access state, and observed date.",
      "Constraints preserve realistic relationships: restricted sources cannot expose raw text and contradictory signals require a linked claim.",
      "The fixture supports CSV and JSON exports plus repeatable validation checks."
    ],
    method: ["Defined fields, types, and row count", "Applied realistic business constraints", "Specified output formats and validation"]
  },
  {
    id: "job-stories",
    domain: "execution",
    title: "Situation-led backlog",
    artifact: "Three Guided Trail job stories",
    basis: "Derived from modeled discovery situations",
    result: "The core job begins when a PM must defend a changed priority, not when a generic user opens a dashboard.",
    evidence: [
      "When evidence conflicts before a review, I want to see what supports and challenges the bet, so I can explain the trade-off.",
      "When a source changes, I want affected decisions identified, so I can revisit them before they become stale.",
      "Each story has observable acceptance criteria for recognition, progress, outcome, edge cases, and notifications."
    ],
    method: ["Used When / motivation / outcome format", "Focused on situations instead of roles", "Added measurable acceptance criteria"]
  },
  {
    id: "prioritization-frameworks",
    domain: "execution",
    title: "Prioritization method selector",
    artifact: "Opportunity Score → RICE decision path",
    basis: "Modeled backlog and disclosed scoring assumptions",
    result: "Prioritize the provenance problem with Opportunity Score, then compare solution bets with RICE; do not use Kano as a ranking formula.",
    evidence: [
      "Problem priority uses importance × (1 − satisfaction), keeping attention on unmet customer needs.",
      "Solution comparison adds reach, impact, confidence, and effort only after the opportunity is selected.",
      "MoSCoW remains a scope conversation; the weighted matrix is reserved for stakeholder-visible trade-offs."
    ],
    method: ["Selected frameworks by decision type", "Prioritized problems before features", "Used formulas with explicit confidence and effort"]
  },
  {
    id: "release-notes",
    domain: "execution",
    title: "Guided Trail release",
    artifact: "User-facing v0.1 release notes",
    basis: "Derived from the field-test product increment",
    result: "The release explains the customer benefit—traceable product decisions—without internal tickets, codenames, or implementation jargon.",
    evidence: [
      "New: connect evidence, alternatives, assumptions, and an experiment in one guided trail.",
      "Improved: every modeled or calculated claim now exposes its evidence basis.",
      "Known limitation: imported evidence and automated integrations remain outside this field-test release."
    ],
    method: ["Gathered and categorized changes", "Led with user benefit", "Separated features, improvements, and limitations"]
  },
  {
    id: "retro",
    domain: "execution",
    title: "Field-test retrospective",
    artifact: "Start / Stop / Continue review",
    basis: "Observed build and QA process",
    result: "Keep artifact-level evidence; stop treating framework completion as proof; start tracking whether each artifact changes a decision.",
    evidence: [
      "Continue: explicit sourced, modeled, and calculated labels.",
      "Stop: adding overlapping canvases without a decision owner or next gate.",
      "Start: owner Review Lead, due next field test, success = every new artifact records a decision changed."
    ],
    method: ["Used a structured retro format", "Grouped lessons into themes", "Limited actions to specific owners and measures"]
  },
  {
    id: "sprint-plan",
    domain: "execution",
    title: "Two-week delivery plan",
    artifact: "Capacity, sequence, and risk plan",
    basis: "Modeled four-person product trio plus engineer",
    result: "Commit 27 of 34 available points after a 20% buffer, with provenance before sharing on the critical path.",
    evidence: [
      "Capacity reflects availability, recent velocity, and an explicit seven-point uncertainty buffer.",
      "Ready stories cover source linking, contradiction flags, experiment thresholds, and accessible review mode.",
      "External dependency: identity permissions; mitigation is a local role fixture for the field test."
    ],
    method: ["Estimated capacity and buffer", "Checked Definition of Ready", "Mapped dependencies, critical path, and mitigations"]
  },
  {
    id: "summarize-meeting",
    domain: "execution",
    title: "Decision-review minutes",
    artifact: "Structured launch-gate summary",
    basis: "Modeled cross-functional review transcript",
    result: "The meeting record separates what was discussed from what was decided, who owns each action, and which questions remain open.",
    evidence: [
      "Decision: keep the launch behind correction-rate and deletion guardrails.",
      "Action: Research Lead validates five abandoned trails by the next review.",
      "Open question: can restricted sources remain useful when raw evidence is hidden?"
    ],
    method: ["Captured participants, topic, and key points", "Separated decisions and open questions", "Assigned actions with owners and due points"]
  },
  {
    id: "test-scenarios",
    domain: "execution",
    title: "Guided Trail QA plan",
    artifact: "Six executable test scenarios",
    basis: "Derived from Guided Trail acceptance criteria",
    result: "The plan covers the happy path plus missing access, deleted sources, contradictory evidence, threshold boundaries, and keyboard-only review.",
    evidence: [
      "Every scenario specifies objective, starting state, user role, numbered actions, and observable outcomes.",
      "Boundary case: a conversion rate exactly at the threshold must not be described as exceeding it.",
      "Security case: a viewer without source access sees the claim state but never the restricted content."
    ],
    method: ["Mapped scenarios to acceptance criteria", "Defined starting conditions and roles", "Covered edge, error, accessibility, and permission states"]
  },
  {
    id: "wwas",
    domain: "execution",
    title: "Why–What–Acceptance increment",
    artifact: "Independent provenance work item",
    basis: "Grounded in Lantern’s trust objective",
    result: "The item preserves strategic intent while leaving implementation details negotiable with the delivery team.",
    evidence: [
      "Why: teams cannot trust a decision trail when claims lose their source state.",
      "What: show a compact provenance label and affected-decision warning; detailed behavior emerges with the team.",
      "Acceptance: source state is visible, changes propagate, restricted content stays protected, and deletion is testable."
    ],
    method: ["Connected work to a strategic why", "Kept the what concise and negotiable", "Made the item independent, valuable, and testable"]
  },

  {
    id: "ab-test-analysis",
    domain: "analytics",
    title: "Guided-trail experiment",
    artifact: "Modeled A/B decision",
    basis: "Calculated synthetic experiment—not live users",
    result: "Variant activation is 41.0% versus 31.0% control, a 32.3% relative lift; the modeled result clears the ship threshold.",
    evidence: [
      "Sample: 1,200 control / 1,180 variant over two business cycles.",
      "Two-tailed proportion test: p < 0.001; 95% difference interval 6.2–13.9 points.",
      "Decision: ship only if correction-rate and meeting-time guardrails remain healthy."
    ],
    method: ["Validated setup and duration", "Calculated lift, significance, and confidence interval", "Included guardrails and ship decision"]
  },
  {
    id: "cohort-analysis",
    domain: "analytics",
    title: "Retention explorer",
    artifact: "Modeled four-cohort heatmap",
    basis: "Synthetic cohort data",
    result: "Cohorts that complete an experiment card in week one retain 18 points better by week four.",
    evidence: [
      "Baseline cohorts: 100%, 56%, 41%, 32%, 27% through week four.",
      "Guided cohorts: 100%, 68%, 56%, 49%, 45%.",
      "Follow-up: interview guided-trail abandoners and compare source-link behavior."
    ],
    method: ["Validated cohort structure", "Compared retention and adoption curves", "Identified pattern and follow-up research"]
  },
  {
    id: "sql-queries",
    domain: "analytics",
    title: "Activation query",
    artifact: "PostgreSQL metric definition",
    basis: "Executable query against the modeled schema",
    result: "The query measures 14-day first-decision completion by signup cohort without counting draft-only activity.",
    evidence: [
      "Tables: teams, decisions, evidence_links, experiments.",
      "Logic: first completed decision with at least two sources and one thresholded experiment.",
      "Validation: reconcile ten sampled teams and test late-arriving event handling."
    ],
    method: ["Specified schema and dialect", "Generated commented query logic", "Added performance and result-validation notes"]
  },

  {
    id: "marketing-ideas",
    domain: "growth",
    title: "Low-cost campaigns",
    artifact: "Five channel-message ideas",
    basis: "Modeled launch campaigns",
    result: "Lead with decision teardowns and clinics, not generic AI productivity claims.",
    evidence: [
      "Decision Autopsy: anonymized before/after trail on LinkedIn and PM communities.",
      "Bring One Messy Bet: live concierge clinic with a real work artifact.",
      "Contradiction Friday: weekly prompt that makes healthy product dissent shareable."
    ],
    method: ["Generated five ideas", "Specified channel and message", "Explained engagement and cost efficiency"]
  },
  {
    id: "north-star-metric",
    domain: "growth",
    title: "North Star constellation",
    artifact: "Productivity-game metric system",
    basis: "Strategic metric design",
    result: "Weekly evidence-backed decisions is the single customer-centric leading indicator.",
    evidence: [
      "Business game: Productivity—complete a defensible decision efficiently.",
      "Inputs: activation, evidence connection, experiment attachment, weekly return.",
      "Passes seven criteria: clear, customer-centric, durable, aligned, numeric, actionable, leading."
    ],
    method: ["Classified the business game", "Validated seven NSM criteria", "Defined four input metrics"]
  },
  {
    id: "positioning-ideas",
    domain: "growth",
    title: "Positioning field",
    artifact: "Five differentiated territories",
    basis: "Competitive positioning hypotheses",
    result: "Selected territory: “the evidence trail behind the roadmap.”",
    evidence: [
      "Against research repositories: the decision, not just the insight.",
      "Against roadmap tools: the reasoning, not just the priority.",
      "Against flexible docs: the opinionated test loop, not another blank page."
    ],
    method: ["Reviewed five competitor positions", "Generated five territories", "Added rationale, support, and advantage"]
  },
  {
    id: "product-name",
    domain: "growth",
    title: "Naming decision",
    artifact: "Five-name brand shortlist",
    basis: "Naming exploration; legal checks pending",
    result: "Lantern wins because it suggests illumination and guidance without claiming autonomous judgment.",
    evidence: [
      "Alternatives: Trace, Proofline, Betbook, and Signalpath.",
      "Brand fit: warm, memorable, human, and compatible with “decision room.”",
      "Risk: domain and trademark availability still require professional clearance."
    ],
    method: ["Generated five distinct names", "Assessed rationale, fit, and memorability", "Flagged domain and trademark checks"]
  },
  {
    id: "value-prop-statements",
    domain: "growth",
    title: "Segment messaging",
    artifact: "Marketing, sales, and onboarding copy",
    basis: "Derived from the six-part value proposition",
    result: "Each channel names a segment, outcome, and capability rather than promising vague intelligence.",
    evidence: [
      "Marketing: Turn scattered evidence into one testable product bet.",
      "Sales: Show leaders why priorities changed without rebuilding the deck.",
      "Onboarding: Bring one messy decision; leave with its evidence trail."
    ],
    method: ["Addressed specific segments", "Connected benefits to capabilities", "Adapted language across three contexts"]
  },

  {
    id: "beachhead-segment",
    domain: "gtm",
    title: "Beachhead market",
    artifact: "Four-criterion segment score",
    basis: "Modeled market-entry choice",
    result: "AI product trios in 8–30 person software companies offer the best pain, access, and referral path.",
    evidence: [
      "Burning pain: weekly bets assembled from fragmented tools.",
      "Willingness to pay: existing spend on PM, research, and meeting time.",
      "Winnability/referral: concentrated communities and cross-company peer influence."
    ],
    method: ["Scored pain, willingness, winnability, referral", "Selected a narrow first segment", "Mapped 90-day acquisition and adjacency"]
  },
  {
    id: "competitive-battlecard",
    domain: "gtm",
    title: "Jira Product Discovery battlecard",
    artifact: "Sales-ready comparison",
    basis: "Official positioning, no unsupported pricing claims",
    result: "Do not compete on roadmaps or delivery integration; win when buyers need source-linked reasoning across tools.",
    evidence: [
      "Where JPD wins: Jira-native discovery, prioritization, roadmaps, and delivery connection.",
      "Where Lantern aims to win: evidence provenance, contradiction handling, and explain-back review.",
      "Landmine: “Can every AI-generated claim show the source and what would change the decision?”"
    ],
    method: ["Compared company and capabilities", "Named where both sides win", "Prepared objections, landmines, and win/loss pattern"]
  },
  {
    id: "growth-loops",
    domain: "gtm",
    title: "Growth loops",
    artifact: "Five-loop evaluation",
    basis: "Modeled product-led mechanics",
    result: "The collaboration loop leads: a PM shares a decision trail, teammates consume it, then create the next trail.",
    evidence: [
      "Primary: collaboration loop through review invitations.",
      "Secondary: usage loop through shareable anonymized decision templates.",
      "Loop health: invites per decision × viewer activation × repeat-decision rate."
    ],
    method: ["Evaluated all five loop types", "Designed trigger, incentive, and conversion", "Defined coefficient and 30–60–90 sequence"]
  },
  {
    id: "gtm-motions",
    domain: "gtm",
    title: "Motion stack",
    artifact: "Seven-motion scorecard",
    basis: "Modeled channel fit",
    result: "Start with product-led clinics, community, and targeted founder outreach; delay paid acquisition.",
    evidence: [
      "PLG 9/10: one real decision demonstrates value.",
      "Community 8/10: PM peer groups support referral and learning.",
      "Outbound 6/10: useful for design partners; paid 3/10 until conversion is proven."
    ],
    method: ["Scored seven GTM motions", "Selected a three-motion stack", "Assigned 90-day resources and metrics"]
  },
  {
    id: "gtm-strategy",
    domain: "gtm",
    title: "Launch strategy",
    artifact: "Research-to-90-day GTM plan",
    basis: "Integrated launch plan",
    result: "Launch around the weekly product-bet review with a hard day-90 activation and trust gate.",
    evidence: [
      "Pre-launch: 12 design partners and five anonymized decision teardowns.",
      "Launch: live messy-bet clinic plus self-serve trail template.",
      "Go/no-go: activation ≥50%, four-week retention ≥35%, correction rate ≤15%."
    ],
    method: ["Used research, channels, and segment messaging", "Defined awareness through revenue metrics", "Built phased plan and decision points"]
  },
  {
    id: "ideal-customer-profile",
    domain: "gtm",
    title: "Ideal Customer Profile",
    artifact: "Firmographic, behavioral, and JTBD profile",
    basis: "Proto-ICP pending live customer data",
    result: "The ideal early customer is a technically fluent PM in a small AI product trio with weekly decisions and executive visibility.",
    evidence: [
      "Behavior: already synthesizes interviews, analytics, and stakeholder input manually.",
      "JTBD: defend and update a product bet without slowing the team.",
      "Disqualifier: wants a replacement for project delivery or fully autonomous prioritization."
    ],
    method: ["Covered demographics and behavior", "Mapped functional, emotional, and social jobs", "Added journey, stakeholders, and disqualification"]
  },

  {
    id: "draft-nda",
    domain: "toolkit",
    title: "Design-partner confidentiality brief",
    artifact: "Mutual NDA requirements and review map",
    basis: "Informational draft outline—not legal advice",
    result: "The design-partner program has a plain-language mutual confidentiality outline, with jurisdiction, remedies, duration, and dispute clauses explicitly blocked on attorney review.",
    evidence: [
      "Scope covers product strategy, customer evidence, technical prototypes, pricing tests, and source material.",
      "The outline distinguishes confidential information, exclusions, permitted disclosures, return or destruction, and survival.",
      "No agreement is presented as executable; every jurisdiction-sensitive clause is marked for licensed legal review."
    ],
    method: ["Clarified parties, scope, direction, and duration", "Covered the standard NDA structure", "Marked legal-review clauses and next steps"]
  },
  {
    id: "grammar-check",
    domain: "toolkit",
    title: "Launch-copy quality pass",
    artifact: "Prioritized grammar, logic, and flow review",
    basis: "Review of Lantern’s field-test copy",
    result: "The copy pass preserves the product voice while flagging vague causation, unsupported performance language, inconsistent terminology, and dense transitions.",
    evidence: [
      "Critical logic fix: synthetic conversion evidence cannot be phrased as proven live performance.",
      "Important flow fix: define “evidence-backed decision” before using it as the North Star.",
      "Minor grammar and tone fixes remain suggestions by location rather than a silent full rewrite."
    ],
    method: ["Reviewed against objective, audience, and tone", "Categorized grammar, logic, and flow issues", "Prioritized targeted fixes with rationale"]
  },
  {
    id: "privacy-policy",
    domain: "toolkit",
    title: "Privacy practice map",
    artifact: "Data inventory and legal-review policy outline",
    basis: "Informational compliance starting point—not legal advice",
    result: "Lantern maps account, usage, imported evidence, device, and support data to purpose, retention, processors, user rights, and deletion behavior before drafting publishable policy text.",
    evidence: [
      "Imported evidence is treated as potentially sensitive and excluded from model training by default in the product hypothesis.",
      "The map covers direct, automatic, and third-party collection plus international transfer and cookie questions.",
      "GDPR, CCPA/CPRA, retention, children, and legal-basis language remain blocked on privacy counsel and implementation verification."
    ],
    method: ["Mapped data collection and purposes", "Covered rights, sharing, retention, security, and transfers", "Added legal-review flags and pre-publication checks"]
  },
  {
    id: "review-resume",
    domain: "toolkit",
    title: "Founding PM hiring review",
    artifact: "Ten-point evidence-first resume rubric",
    basis: "Modeled hiring exercise; no candidate personal data",
    result: "The hiring rubric looks for quantified product outcomes, research-to-roadmap evidence, business impact, role fit, and clear structure rather than generic “data-driven” claims.",
    evidence: [
      "Impact bullets are checked for achievement, metric, action, and specific context using the XYZ+S pattern.",
      "A target-role keyword gap is evaluated alongside product, business, and cross-functional evidence.",
      "The artifact uses a fictional candidate and never stores direct contact details or real application data."
    ],
    method: ["Applied all ten PM resume checks", "Prioritized role-specific, actionable feedback", "Protected personal data with a fictional review fixture"]
  }
];

const LANTERN_EXCLUDED = [];

window.LANTERN_DOMAINS = LANTERN_DOMAINS;
window.LANTERN_SKILLS = LANTERN_SKILLS;
window.LANTERN_EXCLUDED = LANTERN_EXCLUDED;
