# Agent Skills Phoebe Picks

[![Live Gallery](https://img.shields.io/badge/live-gallery-111111?style=for-the-badge)](https://phoebefu6.github.io/agent-skills-phoebe-picks/)
[![Star This Repo](https://img.shields.io/github/stars/phoebefu6/agent-skills-phoebe-picks?style=for-the-badge&label=star%20this%20repo)](https://github.com/phoebefu6/agent-skills-phoebe-picks/stargazers)
[![Latest Pick](https://img.shields.io/badge/latest%20pick-design--taste--frontend-6f7cff?style=for-the-badge)](demos/design-taste-frontend-studio/)
[![Stack](https://img.shields.io/badge/stack-static%20HTML%20CSS%20JS-f2efe8?style=for-the-badge)](#repo-map)

A hands-on gallery of AI agent Skills I test by building real things from scratch.

Instead of another long list of tools, this repo answers one practical question:

> Which Skills are actually useful when you build with Codex, Claude Code, Hermes AI, and other AI agents?

## Why Star This Repo

Star this repo if you want a growing shortlist of Skills that can help you:

- Build cleaner AI-assisted apps, pages, workflows, diagrams, reports, and automations.
- Reduce repeated prompting by turning useful methods into reusable agent habits.
- See what each Skill is good at, where it struggles, and when it is worth trying.
- Follow my public learning journey as I test one Skill at a time with real artifacts.

## Start Here

| Link | What you get |
| --- | --- |
| [Live gallery](https://phoebefu6.github.io/agent-skills-phoebe-picks/) | Browse Skills by scenario, platform, source, stars, rating, and proof. |
| [Latest pick](demos/design-taste-frontend-studio/) | See `design-taste-frontend` turned into a working taste pass studio. |
| [Wishlist](wishlist.md) | See what I plan to explore next. |

## Latest Pick

| Skill | Built from scratch | Source snapshot | Result |
| --- | --- | --- | --- |
| `design-taste-frontend` | [Taste Pass Studio](demos/design-taste-frontend-studio/) | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), 63,989 stars, explored 2026-07-16 | Published pick, 8.5/10 overall rating |

`design-taste-frontend` helps turn generic AI-built pages into more deliberate, credible public pages by forcing a design read, setting taste dials, and running an anti-slop pre-flight.

## What You Will Find

| Scenario | Skills I am looking for |
| --- | --- |
| Design and UI/UX | Taste, critique, visual polish, layout, design systems, and better agent-built pages. |
| Frontend | Skills that turn rough product ideas into usable screens and demos. |
| Data and Data Viz | Analysis, charts, dashboards, and visual explanation. |
| Reporting | Executive summaries, smart reports, recurring updates, and narrative structure. |
| Automation | Skills that remove boring repeated work. |
| Research and Prompting | Better discovery, framing, briefing, and reusable instructions. |
| Agent Workflow | Skills that make Codex, Claude Code, Hermes AI, Cursor, and similar agents easier to steer. |

## How A Skill Becomes A Pick

Every serious Skill gets tested through a small field project:

1. Read the Skill source.
2. Identify the key concepts.
3. Use about 80% of those concepts to build something new from zero.
4. Record the source, GitHub stars, applicable AI agents, demo proof, and rating out of 10.
5. Capture exactly 3 things it does well and 3 things that could be better.

Weak, risky, or not-useful Skills do not become recommendations.

## Current Collection

| Skill | Status | Why it matters |
| --- | --- | --- |
| `grill-me` | Published | Pressure-test vague ideas before asking an agent to build. |
| `design-taste-frontend` | Published | Avoid generic AI-looking UI. |
| `frontend-design` | Exploring | Turn rough product ideas into usable first screens. |
| `design-review` | Wishlist | Turn screenshots into concrete critique and fixes. |
| `high-end-visual-design` | Wishlist | Improve typography, spacing, hierarchy, and craft. |
| `design-consultation` | Wishlist | Turn repeated design preferences into reusable guidance. |

## Repo Map

```text
agent-skills-phoebe-picks/
  index.html                         # Public gallery homepage
  data/reviews.js                    # Skill reviews, sources, stars, ratings, notes
  assets/design-options.css          # Active visual system
  assets/design-options.js           # Search, filters, cards, detail drawer
  demos/design-taste-frontend-studio/ # Latest ground-up Skill demo
  demos/grill-me-brief-builder/       # Published grill-me demo
  wishlist.md                        # Exploration queue
  docs/wiki/                         # Internal agent memory for future work
```

## Local Preview

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000/
```

Checks:

```bash
node --check data/reviews.js
node --check assets/design-options.js
node --check demos/grill-me-brief-builder/app.js
node --check demos/design-taste-frontend-studio/app.js
```
