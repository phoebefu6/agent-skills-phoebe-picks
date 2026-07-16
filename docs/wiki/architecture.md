# Architecture

## Stack

The project is intentionally static:

- `index.html` for structure.
- `assets/design-options.css` for the active visual system.
- `assets/design-options.js` for rendering scenario filters, search, Skill cards, and the detail drawer.
- `data/reviews.js` for the public Skill data model.
- `demos/` for ground-up proof artifacts created during Skill field tests.
- `wishlist.md` for the exploration queue.
- `docs/wiki/` for internal durable agent memory.

No build step is required.

## Active Frontend Path

`index.html` loads:

```html
<link rel="stylesheet" href="assets/design-options.css">
<script src="data/reviews.js"></script>
<script src="assets/design-options.js"></script>
```

The active UI is the audience-facing gallery. It should not expose internal LLM Wiki workflow content.

`previews/` contains the design options created before the hybrid direction was selected. Keep it as design evidence until Phoebe asks to remove it.

## Data Flow

1. `data/reviews.js` defines `window.FILTERS`, `window.PICKS`, and `window.EVALUATION_STEPS`.
2. `assets/design-options.js` reads those globals.
3. The script renders scenario filters, search, Skill cards, and the detail drawer.

Skill demo artifacts are plain static pages under `demos/<skill-or-artifact-name>/`. Link them from `galleryLink` when the artifact is public-facing proof.

Demo subpages are independent Skill function showcases, not a shared detail-page template. They may use different layouts, interaction models, visual styles, diagrams, flows, tools, or storytelling structures when that better demonstrates what the Skill can do. The homepage and gallery should stay coherent, but each demo page should be shaped around the Skill's own features and concepts.

## Pick Object Shape

Each public Skill entry should include:

- `id`
- `name`
- `source`
- `sourceUrl`
- `sourceRepo`
- `sourcePath`
- `githubStars`
- `starsCheckedAt`
- `status`
- `recommendation`
- `dateExplored`
- `scenarios`
- `platforms`
- `badges`
- `summary`
- `phoebeNote`
- `coreConcepts`
- `conceptCoverage`
- `groundUpBuild`
- `rating`
- `ratingSummary`
- `good`
- `improve`
- `useCases`
- `demo`
- `galleryLink`

For GitHub-hosted Skills, `githubStars` is a dated snapshot, not a live counter. Refresh it from GitHub before publishing a new pick or after a meaningful update pass.

Public picks must pass the source credibility gate: at least 10k GitHub stars, or verified Skill of the Day, Repo of the Day, top repo, or equivalent ranking proof. If a Skill is useful but fails the gate, keep it in `wishlist.md` as rejected or internal learning evidence instead of listing it in `data/reviews.js`.

Render `platforms` as a visible AI agent subtitle on cards and detail views. Do not rely only on small badges for Claude Code, Codex, Hermes AI, or future agent compatibility.

Public picks should eventually include `coreConcepts`, `conceptCoverage`, `groundUpBuild`, `rating`, and `ratingSummary`. These fields support Phoebe's 80% ground-up Skill trial: learn the Skill, use most of its method to build something from zero, then rate it after the build.

## Status Values

- `wishlist`: worth trying, not tested yet.
- `exploring`: currently being used in a real build or evaluation.
- `published`: useful enough to recommend publicly.
- `rejected`: tried, but not worth recommending right now. Rejected Skills should normally stay in `wishlist.md`, not the public gallery.

## Internal Wiki Boundary

The wiki belongs in `AGENTS.md`, `CLAUDE.md`, and `docs/wiki/`. Do not add wiki display data or homepage wiki sections unless Phoebe explicitly asks to make the workflow layer public.
