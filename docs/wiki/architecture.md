# Architecture

## Stack

The project is intentionally static:

- `index.html` for structure.
- `assets/design-options.css` for the active visual system.
- `assets/design-options.js` for rendering category filters, score-sorted search results, Skill cards, and the detail drawer.
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

1. `data/reviews.js` defines `window.FILTERS`, `window.PICKS`, `window.WISHLIST_CANDIDATES`, `window.WISHLIST_REPOSITORY_SNAPSHOTS`, and `window.EVALUATION_STEPS`.
2. `assets/design-options.js` reads those globals.
3. The script renders category filters, search results sorted by score from highest to lowest, Skill cards, and the detail drawer.

Skill demo artifacts are plain static pages under `demos/<skill-or-artifact-name>/`. Link them from `galleryLink` when the artifact is public-facing proof.

Shared demo helpers live at `demos/skill-demo.css` and `demos/skill-demo.js`. Use them for simple feature tabs, state switches, before-after toggles, palette buttons, and pre-flight checks when that keeps demo pages lightweight. A demo may still use its own CSS or JS when a Skill needs a more distinct artifact.

Demo subpages are independent Skill function showcases, not a shared detail-page template. They may use different layouts, interaction models, visual styles, diagrams, flows, tools, or storytelling structures when that better demonstrates what the Skill can do. The homepage and gallery should stay coherent, but each demo page should be shaped around the Skill's own features and concepts.

The D3 field test vendors a pinned `d3.min.js` file and its license inside `demos/d3-skill-constellation/`. Keep that dependency local so the static proof does not rely on a CDN and remains inspectable on GitHub Pages.

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

Published picks must pass the source credibility gate: at least 10k GitHub stars, or verified Skill of the Day, Repo of the Day, top repo, or equivalent ranking proof. Public wishlist candidates may appear in `window.WISHLIST_CANDIDATES` before testing when their source and star snapshot have been verified, but they must remain visibly distinct from published recommendations. A completed, safe field test that misses the source gate may appear as `exploring` evidence when the UI and review clearly say it is not a recommendation; rejected or risky Skills remain in `wishlist.md` or internal learning evidence.

Wishlist stars measure repository popularity, not an individual Skill rating. Keep one current, dated entry and repository homepage URL per source in `window.WISHLIST_REPOSITORY_SNAPSHOTS`. Wishlist cards should show the verified star count as `GitHub repo stars`, link that evidence to the repository homepage, link the Skill source separately, and keep the individual Skill rating marked as pending until a hands-on field test. State when multiple wishlist Skills share the same source.

When a Skill appears as an embedded copy in one repository but has a maintained canonical source, use the canonical source for publication evidence. Record leaderboard rank or install count as an additional signal, but keep the dated canonical repository star count as the credibility snapshot.

Render `platforms` as a visible AI agent subtitle on cards and detail views. Do not rely only on small badges for Claude Code, Codex, Hermes AI, or future agent compatibility.

Public picks should eventually include `coreConcepts`, `conceptCoverage`, `groundUpBuild`, `rating`, and `ratingSummary`. These fields support Phoebe's 80% ground-up Skill trial: learn the Skill, use most of its method to build something from zero, then rate it after the build.

## Status Values

- `wishlist`: worth trying, not tested yet.
- `exploring`: currently being used in a real build or evaluation.
- `published`: useful enough to recommend publicly.
- `rejected`: tried, but not worth recommending right now. Rejected Skills should normally stay in `wishlist.md`, not the public gallery.

## Internal Wiki Boundary

The wiki belongs in `AGENTS.md`, `CLAUDE.md`, and `docs/wiki/`. Do not add wiki display data or homepage wiki sections unless Phoebe explicitly asks to make the workflow layer public.
