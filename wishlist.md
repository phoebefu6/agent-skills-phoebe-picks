# Agent Skills Phoebe Picks Wishlist

This is the working queue for Skills Phoebe wants to explore, test with a real artifact, and either publish to the gallery or reject quietly.

The public gallery should only show Skills that feel useful enough to recommend. Rejected Skills can stay here as learning notes without becoming public recommendations.

## Status Key

| Status | Meaning |
| --- | --- |
| Wishlist | Worth trying, not tested yet. |
| Exploring | Currently being used in a real build or evaluation. |
| Published | Useful enough to add to the public gallery. |
| Rejected | Tried, but not worth recommending right now. |

## Evaluation Queue

| Skill | Source / reference | Stars snapshot | Platform fit | Scenario | Ground-up build target | 80% concept coverage | Rating /10 | Date explored | Status | Gallery link |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `frontend-design` | `anthropics/skills`, `skills/frontend-design` | 161,869 on 2026-07-17 | Claude Code, Codex, Hermes AI, Cursor, Gemini CLI | Product design, frontend, UI | Signal Desk product screen | 6/6 key concepts visible | 8.6/10 | 2026-07-17 | Published | `demos/product-design-studio/index.html#frontend-design` |
| `canvas-design` | `anthropics/skills`, `skills/canvas-design` | 161,869 on 2026-07-17 | Claude Code, Codex, Hermes AI, Cursor, Gemini CLI | Product design, visual philosophy | Quiet Leverage philosophy and SVG canvas | 6/7 key concepts visible; SVG/HTML used instead of binary PDF/PNG for GitHub Pages | 7.8/10 | 2026-07-17 | Published | `demos/product-design-studio/index.html#canvas-design` |
| `emil-design-eng` | `emilkowalski/skills`, `skills/emil-design-eng` | 15,002 on 2026-07-17 | Claude Code, Codex, Hermes AI, Cursor, Gemini CLI | Product design, micro-interactions | Product interaction polish lab | 8/9 key concepts visible; drag gesture physics skipped | 8.4/10 | 2026-07-17 | Published | `demos/product-design-studio/index.html#emil-design-eng` |
| `design-taste-frontend` | `Leonxlnx/taste-skill`, Open Design wrapper `skills/taste-skill` | 64,018 on 2026-07-16 | Claude Code, Codex, Hermes AI | Visual taste, anti-slop review | Design Taste Frontend Lab | 10 key concepts visible; official design-system package path shown as a decision branch, with native CSS chosen because this gallery is an aesthetic page | 8.5/10 | 2026-07-16 | Published | `demos/design-taste-frontend-studio/index.html` |
| `design-review` | `garrytan/gstack`, Open Design wrapper `skills/design-review` | 122,177 on 2026-07-16 | Claude Code, Codex, Hermes AI | Design critique, QA | Critique Loop before-after audit board | 5/5 key concepts visible | 8.0/10 | 2026-07-16 | Published | `demos/design-review-critique-loop/index.html` |
| `high-end-visual-design` | `Leonxlnx/taste-skill`, Open Design wrapper `skills/soft-skill` | 64,018 on 2026-07-16 | Claude Code, Codex, Hermes AI | Typography, layout polish, visual craft | High-End Visual Design Atelier | 8/10 key concepts visible; full scroll choreography and full-screen menu sequencing kept lighter for this static gallery | 7.9/10 | 2026-07-16 | Published | `demos/high-end-visual-design-showcase/index.html` |
| `design-consultation` | `garrytan/gstack`, `gstack design-consultation skill` | 122,177 on 2026-07-16 | Claude Code, Codex, Hermes AI | Brand system, tokens, design principles | System Room design-system workshop | 5/5 key concepts visible | 8.1/10 | 2026-07-16 | Published | `demos/design-consultation-system-room/index.html` |
| `impeccable` | `pbakaus/impeccable`, `.agents/skills/impeccable/SKILL.md` | 47,939 on 2026-07-19 | Codex, Claude Code, Cursor, Gemini CLI, opencode | Design direction, frontend craft, critique, audit | Coastal Circuit × Soft Radical homepage redesign | 11/12 concept clusters exercised; live asset slicing skipped because semantic HTML/CSS and existing artifact screenshots covered the approved mock | 9.0/10 | 2026-07-19 | Published | `index.html#top` |
| `pm-skills` | `phuryn/pm-skills`, 65 Skills across 8 product domains | 24,430 on 2026-07-25 | Claude Code, Codex, Hermes AI, Cursor, Gemini CLI, opencode | Product management, research, discovery, strategy, execution, analytics, growth, GTM, toolkit | Lantern Product OS | 65/65 installed Skills exercised, 100% package coverage | 8.9/10 | 2026-07-25 | Published | `demos/pm-decision-room/index.html` |
| `find-skills` | `vercel-labs/skills`, `skills/find-skills/SKILL.md`; #1 all-time on Skills.sh with 2.7M installs | 27,182 on 2026-07-25 | Codex, Claude Code, Hermes AI, Cursor, Gemini CLI, GitHub Copilot, Windsurf | Agent workflow, research, Skill discovery | Skill Discovery Desk + 20-Skill research pass | 6/6 concepts exercised; direct CLI execution remains optional pending explicit trust | 7.8/10 | 2026-07-25 | Published | `demos/find-skills-discovery-desk/index.html` |
| `d3-visualization` | `jiannanya/snow-d3`, `SKILL.md`; catalog wrapper in `nexu-io/open-design`, `skills/d3-visualization/SKILL.md` | Canonical source 4 stars; wrapper repo 81,586 on 2026-07-26 | Codex, Claude Code, Hermes AI, Cursor, Gemini CLI | Data visualization, data, reporting, frontend | Skill Constellation | 9/10 concept families; geography skipped because the dataset has no spatial dimension | 8.3/10 | 2026-07-26 | Exploring; canonical source below credibility gate | `demos/d3-skill-constellation/index.html` |
| `grill-me` | `mio-openliven/codex-grill-me-skill` has 2 stars; likely alternate `RobMitt/grill-me-skill` has 123 stars | Below 10k source gate on 2026-07-16 | Codex first; Claude Code and Hermes AI if adapted | Requirement grilling, decision pressure-test | Field test completed, public demo removed | Method was useful, but source credibility gate failed | N/A - not published | 2026-07-14 | Rejected | Removed from public gallery |
| `using-superpowers` | `obra/superpowers`, `skills/using-superpowers` | 255,624 on 2026-07-16 | Claude Code, Codex, Cursor, Gemini CLI, opencode, Kimi; Hermes AI if adapted | Agent workflow, skill discipline | Build a new feature through the Superpowers process from zero | Pending | Pending | 2026-07-14 | Exploring | Pending |
| `brainstorming` | `obra/superpowers`, `skills/brainstorming` | 255,624 on 2026-07-16 | Claude Code, Codex, Cursor, Gemini CLI, opencode, Kimi; Hermes AI if adapted | Requirements, design thinking, spec writing | Produce a ground-up spec and artifact plan for one new gallery feature | Pending | Pending | 2026-07-14 | Exploring | Pending |

## Source-Backed Discovery Queue

These 45 candidates were verified as real Skill files. The original 20 were checked on 2026-07-25; the five knowledge-base, Office, data-to-dashboard, marketing, and one-person-company collections were checked on 2026-07-26. Repository popularity and Skills.sh adoption are discovery signals, not recommendations: every candidate remains `Wishlist` until its source is read fully and a ground-up build exercises about 80% of the method.

| Rank | Skill | Verified source path | Repo stars | Focus | Why it is on the wishlist | Status |
| --- | --- | --- | ---: | --- | --- | --- |
| 1 | `algorithmic-art` | `anthropics/skills`, `skills/algorithmic-art/SKILL.md` | 164,075 | Design, generative art | Test seeded, parametric p5.js art through an original interactive collection. | Wishlist |
| 2 | `xlsx` | `anthropics/skills`, `skills/xlsx/SKILL.md` | 164,075 | Data analysis, spreadsheets | Test formula-safe spreadsheet analysis, formatting, charts, and recalculation QA. | Wishlist |
| 3 | `skill-creator` | `anthropics/skills`, `skills/skill-creator/SKILL.md` | 164,075 | AI agents, Skill engineering | Build and evaluate a new Skill with prompt tests, quantitative checks, and iteration. | Wishlist |
| 4 | `mcp-builder` | `anthropics/skills`, `skills/mcp-builder/SKILL.md` | 164,075 | LLM tools, AI agents | Build a narrowly scoped MCP server and judge tool design by task completion quality. | Wishlist |
| 5 | `artifacts-builder` | `nexu-io/open-design`, `skills/artifacts-builder/SKILL.md` | 81,448 | Product design, interactive artifacts | Test a multi-component product artifact with a real information architecture and interaction model. | Wishlist |
| 6 | `dashboard` | `nexu-io/open-design`, `design-templates/dashboard/SKILL.md` | 81,586 | Dashboard design, information hierarchy | Build a decision dashboard with layered KPI hierarchy, filters, dense data, and clear action paths. | Wishlist |
| 7 | `data-report` | `nexu-io/open-design`, `skills/data-report/SKILL.md` | 81,448 | Data analytics, reporting | Turn a bounded dataset into a polished KPI narrative, chart set, and inspectable table. | Wishlist |
| 8 | `data-storytelling` | `wshobson/agents`, `plugins/business-analytics/skills/data-storytelling/SKILL.md` | 38,211 | Data analytics, executive communication | Test whether a setup–conflict–resolution structure improves an executive decision. | Wishlist |
| 9 | `kpi-dashboard-design` | `wshobson/agents`, `plugins/business-analytics/skills/kpi-dashboard-design/SKILL.md` | 38,211 | BI, dashboards, product analytics | Build a governed KPI dashboard with consistent definitions, hierarchy, and action thresholds. | Wishlist |
| 10 | `llm-evaluation` | `wshobson/agents`, `plugins/llm-application-dev/skills/llm-evaluation/SKILL.md` | 38,211 | LLM evaluation, ML | Compare automated metrics, human review, regression tests, and A/B evidence on one LLM task. | Wishlist |
| 11 | `rag-implementation` | `wshobson/agents`, `plugins/llm-application-dev/skills/rag-implementation/SKILL.md` | 38,211 | RAG, LLM applications | Build a source-grounded retrieval prototype and measure retrieval and answer quality separately. | Wishlist |
| 12 | `agentic-eval` | `github/awesome-copilot`, `skills/agentic-eval/SKILL.md` | 37,023 | AI agents, evaluation | Test generate–evaluate–critique–refine loops against a fixed rubric and stopping rule. | Wishlist |
| 13 | `autoresearch` | `github/awesome-copilot`, `skills/autoresearch/SKILL.md` | 37,023 | AI agents, ML experimentation | Run a bounded autonomous experiment loop with a baseline, measurable target, and keep/discard log. | Wishlist |
| 14 | `exploratory-data-analysis` | `K-Dense-AI/scientific-agent-skills`, `skills/exploratory-data-analysis/SKILL.md` | 31,724 | Data science, EDA | Audit missingness, leakage, outliers, and transformation sensitivity on an authorized dataset. | Wishlist |
| 15 | `scientific-visualization` | `K-Dense-AI/scientific-agent-skills`, `skills/scientific-visualization/SKILL.md` | 31,724 | Data science, visual communication | Produce an accessible publication-ready figure without hiding uncertainty or missing data. | Wishlist |
| 16 | `statsmodels` | `K-Dense-AI/scientific-agent-skills`, `skills/statsmodels/SKILL.md` | 31,724 | Statistics, ML, econometrics | Test model selection, diagnostics, residual checks, uncertainty, and reproducible inference. | Wishlist |
| 17 | `Product Manager` | `alirezarezvani/claude-skills`, `.gemini/skills/product-manager/SKILL.md` | 23,170 | Product management | Turn a vague stakeholder request into a short outcome-led spec, explicit trade-off, and success metric. | Wishlist |
| 18 | `product-discovery` | `alirezarezvani/claude-skills`, `product-team/skills/product-discovery/SKILL.md` | 23,170 | Product discovery | Test opportunity mapping, assumption ranking, interviews, prototypes, and evidence-based decision gates. | Wishlist |
| 19 | `product-analytics` | `alirezarezvani/claude-skills`, `product-team/skills/product-analytics/SKILL.md` | 23,170 | Product analytics, data | Build a metric hierarchy with cohorts, retention, adoption, and interpretation across product stages. | Wishlist |
| 20 | `product-strategist` | `alirezarezvani/claude-skills`, `product-team/skills/product-strategist/SKILL.md` | 23,170 | Product strategy | Test OKR cascades, strategic templates, alignment scoring, competitive analysis, and team design. | Wishlist |
| 21 | `notion-knowledge-capture` | `openai/skills`, `skills/.curated/notion-knowledge-capture/SKILL.md` | 24,179 | Knowledge base, Notion capture | Turn raw notes into structured, linked, reusable Notion pages. | Wishlist |
| 22 | `notion-meeting-intelligence` | `openai/skills`, `skills/.curated/notion-meeting-intelligence/SKILL.md` | 24,179 | Knowledge base, meeting memory | Connect meeting decisions, owners, actions, and prior context. | Wishlist |
| 23 | `notion-research-documentation` | `openai/skills`, `skills/.curated/notion-research-documentation/SKILL.md` | 24,179 | Knowledge base, research | Retrieve Notion sources and publish a cited, traceable synthesis. | Wishlist |
| 24 | `obsidian-markdown` | `kepano/obsidian-skills`, `skills/obsidian-markdown/SKILL.md` | 43,309 | Knowledge base, Obsidian | Build a connected vault with properties, wikilinks, embeds, callouts, and maps of content. | Wishlist |
| 25 | `obsidian-bases` | `kepano/obsidian-skills`, `skills/obsidian-bases/SKILL.md` | 43,309 | Knowledge base, structured views | Create database-like knowledge views with filters, formulas, layouts, and summaries. | Wishlist |
| 26 | `docx` | `anthropics/skills`, `skills/docx/SKILL.md` | 164,196 | Office, Word documents | Produce a styled Word report with tables, pagination, and rendered QA. | Wishlist |
| 27 | `pdf` | `anthropics/skills`, `skills/pdf/SKILL.md` | 164,196 | Office, PDF | Assemble and validate an accessible, client-ready PDF page by page. | Wishlist |
| 28 | `pptx` | `anthropics/skills`, `skills/pptx/SKILL.md` | 164,196 | Office, presentations | Build an editable executive presentation with narrative and slide-level QA. | Wishlist |
| 29 | `doc-coauthoring` | `anthropics/skills`, `skills/doc-coauthoring/SKILL.md` | 164,196 | Office, collaborative writing | Coauthor a decision document through context transfer, iteration, and reader testing. | Wishlist |
| 30 | `internal-comms` | `anthropics/skills`, `skills/internal-comms/SKILL.md` | 164,196 | Office, internal communication | Create a concise internal package spanning leadership notes, status, and FAQs. | Wishlist |
| 31 | `explore-data` | `anthropics/knowledge-work-plugins`, `data/skills/explore-data/SKILL.md` | 23,042 | Data to dashboard, exploration | Profile data around a decision and surface quality issues, patterns, and open questions. | Wishlist |
| 32 | `validate-data` | `anthropics/knowledge-work-plugins`, `data/skills/validate-data/SKILL.md` | 23,042 | Data to dashboard, validation | Establish grain, reconcile metrics, and expose quality checks before visualization. | Wishlist |
| 33 | `data-visualization` | `anthropics/knowledge-work-plugins`, `data/skills/data-visualization/SKILL.md` | 23,042 | Data to dashboard, encoding | Match analytical questions to visual encodings while preserving uncertainty. | Wishlist |
| 34 | `create-viz` | `anthropics/knowledge-work-plugins`, `data/skills/create-viz/SKILL.md` | 23,042 | Data to dashboard, chart creation | Produce accessible production charts with labels, tooltips, and narrative context. | Wishlist |
| 35 | `build-dashboard` | `anthropics/knowledge-work-plugins`, `data/skills/build-dashboard/SKILL.md` | 23,042 | Data to dashboard, product | Build an interactive decision dashboard with governed KPIs, filters, and action thresholds. | Wishlist |
| 36 | `marketing-plan` | `coreyhaines31/marketingskills`, `skills/marketing-plan/SKILL.md` | 41,714 | Marketing, strategy | Connect positioning, audience, channels, campaigns, and measurement in one plan. | Wishlist |
| 37 | `customer-research` | `coreyhaines31/marketingskills`, `skills/customer-research/SKILL.md` | 41,714 | Marketing, customer insight | Build a voice-of-customer evidence bank for segments, objections, messages, and offers. | Wishlist |
| 38 | `content-strategy` | `coreyhaines31/marketingskills`, `skills/content-strategy/SKILL.md` | 41,714 | Marketing, content | Define audience themes, distribution, repurposing, cadence, and success measures. | Wishlist |
| 39 | `copywriting` | `coreyhaines31/marketingskills`, `skills/copywriting/SKILL.md` | 41,714 | Marketing, conversion copy | Build a conversion page with a promise, evidence, objections, and measurable calls to action. | Wishlist |
| 40 | `analytics` | `coreyhaines31/marketingskills`, `skills/analytics/SKILL.md` | 41,714 | Marketing, measurement | Define events, funnel health, attribution limits, privacy constraints, and experiments. | Wishlist |
| 41 | `business-pulse` | `anthropics/knowledge-work-plugins`, `small-business/skills/business-pulse/SKILL.md` | 23,042 | One-person company, operations | Build a weekly founder cockpit for cash, pipeline, customers, delivery, and decisions. | Wishlist |
| 42 | `cash-flow-snapshot` | `anthropics/knowledge-work-plugins`, `small-business/skills/cash-flow-snapshot/SKILL.md` | 23,042 | One-person company, cash flow | Make runway, obligations, scenarios, and action triggers visible. | Wishlist |
| 43 | `lead-triage` | `anthropics/knowledge-work-plugins`, `small-business/skills/lead-triage/SKILL.md` | 23,042 | One-person company, sales | Score lead fit, urgency, next action, and follow-up timing. | Wishlist |
| 44 | `invoice-chase` | `anthropics/knowledge-work-plugins`, `small-business/skills/invoice-chase/SKILL.md` | 23,042 | One-person company, receivables | Create respectful follow-up stages with aging, exceptions, and approval gates. | Wishlist |
| 45 | `contract-review` | `anthropics/knowledge-work-plugins`, `small-business/skills/contract-review/SKILL.md` | 23,042 | One-person company, contracts | Flag obligations, risky terms, questions, and points for human escalation. | Wishlist |

## Promotion Checklist

Before a Skill becomes a public recommendation, capture:

| Field | Required note |
| --- | --- |
| Core concepts | The key Skill functions, methods, or concepts learned from the source. |
| 80% concept coverage | How the test used about 80% of those key concepts, and what was skipped. |
| Ground-up artifact | What was built from scratch using the Skill. |
| Rating out of 10 | High-level field rating after the build. |
| 3 good points | What made the Skill genuinely useful in practice. |
| 3 can-be-better points | Honest improvement notes, without recommending risky Skills. |
| Daily use cases | How a data person, AI builder, C-suite reader, student, or automation learner could use it. |
| Demo evidence | Product, flowchart, mindmap, screenshot, writeup, or other artifact made while testing. |
| Source and stars | GitHub repo, reference path, current star snapshot, and snapshot date. |
| Recommendation decision | Published or rejected. |
