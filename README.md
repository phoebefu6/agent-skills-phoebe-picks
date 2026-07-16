# Agent Skills Phoebe Picks

A public gallery of AI agent Skills organized by the situations they help with.

Use this repo when you want to discover Skills for design, UI/UX, frontend, data, reporting, automation, research, prompting, or agent workflow. Each serious pick is tested by learning the Skill, using most of its method to build something from scratch, then rating the result.

## Latest Field Test

| Skill | Ground-up artifact | Source snapshot | Concept coverage | Rating | Status |
| --- | --- | --- | --- | --- | --- |
| `grill-me` | [Grill-Me Brief Builder](demos/grill-me-brief-builder/) | [mio-openliven/codex-grill-me-skill](https://github.com/mio-openliven/codex-grill-me-skill), 2 stars checked 2026-07-16 | 7/8 core concepts used | 4/5 | Exploring |

`grill-me` turns vague plans into sharper decisions by asking one hard question at a time, giving a recommended answer, explaining why it matters, and stopping once the next build step is clear.

## Browse By Scenario

| Scenario | What followers can find |
| --- | --- |
| Design and UI/UX | Skills for taste, critique, visual polish, and better agent-built pages. |
| Frontend | Skills that turn rough product ideas into usable screens. |
| Data and Data Viz | Skills for analysis, charts, and visual explanation. |
| Reporting | Skills for smart reports, executive summaries, and recurring updates. |
| Automation | Skills that reduce repeated manual work. |
| Research and Prompting | Skills that improve discovery, framing, and reusable instructions. |
| Agent Workflow | Skills that make Codex, Claude Code, and other agents easier to steer. |

## What Each Skill Card Shows

| Field | Purpose |
| --- | --- |
| Skill name | What to search or install. |
| Scenario | The situation where the Skill helps. |
| Platform subtitle | The applicable AI agents, such as Claude Code, Codex, Hermes AI, or other fit. |
| Source and stars | GitHub source repo, reference path, current star snapshot, and date checked. |
| Ground-up test | What was built from scratch with the Skill. |
| Concept coverage | Whether the test used about 80% of the Skill's key concepts. |
| Rating | A high-level rating out of 5 after the build. |
| Best use case | The fastest way to understand why it matters. |
| Notes | 3 good points, 3 can-be-better points, use cases, demo/proof, source, and verdict. |

## Review Method

Before a Skill becomes a public pick:

1. Learn the Skill source.
2. Identify the key concepts.
3. Use about 80% of those concepts to build a ground-up artifact.
4. Record source, stars, applicable AI agents, demo proof, and rating out of 5.
5. Capture exactly 3 strengths and 3 improvement points.

## First Collection

The gallery starts with design, UI/UX, and frontend Skills:

| Skill | Why it belongs first |
| --- | --- |
| `grill-me` | Helps pressure-test vague ideas before asking an agent to build. |
| `frontend-design` | Helps turn a rough product idea into a usable first screen. |
| `design-taste-frontend` | Helps avoid generic AI-looking UI. |
| `design-review` | Turns screenshots into concrete critique and fixes. |
| `high-end-visual-design` | Refines typography, spacing, hierarchy, and craft. |
| `design-consultation` | Helps repeated design preferences become reusable guidance. |

## Local Preview

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000/
```

Run checks:

```bash
node --check data/reviews.js
node --check assets/design-options.js
node --check demos/grill-me-brief-builder/app.js
```
