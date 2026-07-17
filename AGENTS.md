# Agent Operating Guide

This repo has two separate layers:

- Public gallery: the audience-facing Skill showcase.
- Internal LLM Wiki: day-to-day workflow memory for agents working in the repo.

Keep those layers separate unless Phoebe explicitly asks to publish wiki concepts on the public site.

## Start Here

Before changing code, read these files in order:

1. `README.md`
2. `docs/wiki/index.md`
3. `docs/wiki/project-overview.md`
4. `docs/wiki/architecture.md`
5. `docs/wiki/skill-review-rubric.md`
6. `docs/wiki/testing-and-release.md`

Use `docs/wiki/llm-wiki.md` when the task involves agent memory, Claude Code, Codex, Hermes, reusable Skills, or repo context.

## Project Shape

- Active public site path: `index.html`, `assets/design-options.css`, `assets/design-options.js`, `data/reviews.js`.
- The old dashboard path `assets/styles.css` and `assets/app.js` was removed during the clean rebuild. Do not recreate it unless Phoebe explicitly asks for a separate legacy dashboard.
- Internal wiki path: `docs/wiki/`. These pages are source-of-truth memory for future agents, not public gallery content.

## Working Rules

- Keep the site static: HTML, CSS, and vanilla JavaScript.
- Keep review data in `data/reviews.js`.
- Keep internal workflow memory in `docs/wiki/`.
- Do not add LLM Wiki sections to the public homepage unless Phoebe explicitly asks for public-facing education content.
- Treat each `demos/` subpage as an independent Skill function showcase. Do not force demo pages to share the same layout, tone, or visual system; choose the page shape that best demonstrates that Skill's features and concepts.
- Prefer small, inspectable changes over framework churn.
- Preserve user edits in the dirty worktree. Do not revert unrelated changes.
- Use `apply_patch` for manual file edits.

## Skill Exploration Protocol

- Learn the Skill source before reviewing it.
- Identify the Skill's key functions, methods, or concepts.
- Use about 80% of those key concepts to build something from the ground up.
- Promote to `Published` only when the Skill source has at least 10k GitHub stars, or verified Skill of the Day, Repo of the Day, top repo, or equivalent ranking proof.
- Do not treat installation, light planning, or a small amendment as enough evidence for a public pick.
- After the build, capture a high-level rating out of 10, exactly 3 things the Skill does really well, exactly 3 things that can be improved, daily use cases, source/stars, and proof of the artifact.
- Publish only useful, safe Skills. Keep weak or risky Skills in `wishlist.md` or reject them quietly.

## Validation

Run these checks after code changes:

```bash
node --check data/reviews.js
node --check assets/design-options.js
node --check demos/skill-demo.js
node --check demos/design-taste-frontend-studio/app.js
node --check demos/find-skills-discovery-desk/app.js
node --check demos/product-design-studio/app.js
```

For visual changes, run a local server:

```bash
python3 -m http.server 8000
```

Then inspect `http://localhost:8000/`.

## Memory Updates

If you learn a reusable project fact, add it to the relevant page in `docs/wiki/`.

Good memory updates include:

- A new review status rule.
- A repeated QA failure and how to catch it.
- A compatibility note for Claude Code, Codex, Cursor, Gemini CLI, or Hermes.
- A reusable repo workflow.

Do not store secrets, tokens, private account details, or one-off scratch notes in the wiki.
