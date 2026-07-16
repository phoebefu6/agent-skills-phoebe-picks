# Claude Code Notes

Start with `AGENTS.md`. This file only adds Claude Code-specific habits for the repo.

## Claude Workflow

- Read the wiki before making broad edits.
- Keep task notes short and actionable.
- Prefer direct file edits and local validation over long proposals.
- When a change affects the public site, check responsive layout and text fit.
- When a change affects the agent memory layer, update `docs/wiki/`.
- Keep internal workflow notes out of the public gallery unless Phoebe explicitly asks to teach that workflow to the audience.

## Useful Local Commands

```bash
node --check data/reviews.js
node --check assets/design-options.js
python3 -m http.server 8000
```

## Repo-Specific Judgment

The project is a learning archive, not a heavy app. Avoid adding a build step, package manager, database, or frontend framework unless Phoebe explicitly asks for one.

The best Claude Code contribution here is usually one of these:

- Add or refine Skill reviews.
- Improve the gallery reading experience.
- Convert repeated workflow lessons into wiki pages.
- Add validation notes from real agent experiments.
- Keep the public site and agent memory in sync.

## Skill Exploration Standard

When exploring a Skill, do not review it from a light planning angle. Learn the Skill, identify its key concepts, use about 80% of them to build an original artifact from the ground up, then record a rating out of 5, exactly 3 strengths, exactly 3 improvement points, daily use cases, source/stars, and proof.
