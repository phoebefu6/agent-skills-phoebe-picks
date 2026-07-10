# Agent Skills Lit Review

[![Live Site](https://img.shields.io/badge/live-GitHub%20Pages-111114?style=for-the-badge)](https://phoebefu6.github.io/agent-skills-lit-review/)
[![Source Corpus](https://img.shields.io/badge/source-awesome--claude--skills-ff5a52?style=for-the-badge)](https://github.com/ComposioHQ/awesome-claude-skills)
[![Review Matrix](https://img.shields.io/badge/reviews-scored%20agent%20Skills-7a5cff?style=for-the-badge)](data/reviews.js)
[![Static](https://img.shields.io/badge/stack-static%20HTML%20CSS%20JS-64d69e?style=for-the-badge)](#architecture)

> A literature-review style repository for evaluating **agent-usable Skills** across Claude Code, Codex, Cursor, Gemini CLI, and other coding agents.

This project is not a human learning directory. It reviews Skills as **agent workflow packages**: reusable instructions, guardrails, scripts, references, and validation routines that help an AI coding agent produce real artifacts.

The first source corpus is [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills), which frames Claude Skills as reusable instruction packages built around `SKILL.md`, optional scripts, references, and assets.

## What This Repo Does

| Layer | Purpose |
| --- | --- |
| Review board | Modern searchable interface for reading scored Skill notes. |
| Scoring rubric | Five-part evaluation model for agent usefulness. |
| Evidence notes | Short source-backed notes from the upstream corpus. |
| Test-next plans | Concrete experiments to run before promoting a Skill. |
| Maturity tracking | `candidate`, `reviewed`, and `priority` states for ongoing exploration. |

## Review Rubric

Each Skill is scored out of 100 using five 20-point dimensions:

| Dimension | Question |
| --- | --- |
| Agent Fit | Does the Skill clearly teach an AI coding agent what to do? |
| Actionability | Can it produce concrete code, files, tests, actions, or deployable artifacts? |
| Portability | Can it transfer across Codex, Claude Code, Cursor, Gemini CLI, and similar agents? |
| Validation | Does it support tests, screenshots, logs, review checks, or other verification? |
| Risk Control | Does it avoid destructive actions, credential leakage, hallucination, and scope creep? |

## Seed Reviews

The first pass includes 16 review entries, including:

| Skill | Cluster | Score | Why it matters |
| --- | --- | ---: | --- |
| `artifacts-builder` | Frontend Artifacts | 92 | High-leverage Skill for polished generated artifacts. |
| `webapp-testing` | Validation | 91 | Essential QA layer for any visual/code output. |
| `skill-creator` | Skill Authoring | 90 | Meta-Skill for turning workflows into reusable Skills. |
| `mcp-builder` | Integration | 88 | Helps agents create durable connectors instead of one-off API scripts. |
| `connect-apps` | Automation | 86 | Turns agents into app operators, with approval and auth risks to manage. |

## Architecture

```text
agent-skills-lit-review/
  index.html                  # Modern review board
  data/
    reviews.js                # Source-of-truth review matrix
  assets/
    app.js                    # Filtering, scoring, selected evidence pane
    styles.css                # Responsive editorial/dashboard design
  .github/
    workflows/pages.yml       # GitHub Pages deployment
```

The app is intentionally static for now:

| Choice | Reason |
| --- | --- |
| Vanilla JS | Fast to publish, no build step, easy to inspect. |
| Data file | Reviews stay readable and versioned in Git. |
| GitHub Pages | Simple public publishing for a review corpus. |
| GitHub Actions | Push-to-publish flow. |

## Add A Review

Edit `data/reviews.js` and append a new entry to `REVIEWS`:

```js
{
  id: "skill-id",
  name: "Skill Name",
  category: "Validation",
  status: "candidate",
  score: 78,
  sourceUrl: "https://github.com/...",
  summary: "One-sentence literature review abstract.",
  evidence: "Short source-backed evidence note.",
  agentUse: "When Codex or Claude Code should use it.",
  rubric: {
    agentFit: 16,
    actionability: 16,
    portability: 16,
    validation: 15,
    riskControl: 15
  },
  strengths: ["Strength one", "Strength two"],
  gaps: ["Gap one", "Gap two"],
  testNext: "Concrete experiment to run next.",
  tags: ["agent-skill", "validation"]
}
```

## Local Preview

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Smoke checks:

```bash
node --check data/reviews.js
node --check assets/app.js
```

## Roadmap

| Track | Next move |
| --- | --- |
| Corpus expansion | Add more entries from `awesome-claude-skills`. |
| True lit-review notes | Add source excerpts, repo path, install notes, and observed behavior. |
| Skill maturity | Add `seeded`, `read`, `tested`, `recommended`, and `rejected` states. |
| Codex/Claude compatibility | Record whether each Skill works in Claude Code, Codex, Cursor, or Gemini CLI. |
| Evidence artifacts | Attach screenshots, generated output, test logs, and review diffs. |

## Credits

- Source corpus: <https://github.com/ComposioHQ/awesome-claude-skills>
- Review direction: Phoebe's agent Skill exploration workflow for Codex and Claude Code.
