# Testing And Release

## JavaScript Checks

Run:

```bash
node --check data/reviews.js
node --check assets/design-options.js
node --check demos/grill-me-brief-builder/app.js
```

These catch syntax errors in the static data and renderer.

## Local Preview

Run:

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000/
```

## Manual QA

Check:

- Category filters update counts and cards.
- Search examples narrow results. Do not use example terms that match almost every Skill.
- Each public Skill shows an AI agent subtitle for all applicable platforms, such as Claude Code, Codex, Hermes AI, Cursor, Gemini CLI, opencode, Kimi, or Pi.
- Each public Skill shows a source repo/reference and a dated GitHub star snapshot when the source is on GitHub.
- Each public Skill promoted from exploring has a ground-up artifact, about 80% concept coverage, a rating out of 5, 3 strengths, and 3 improvement points.
- Demo artifact pages under `demos/` load from the local server and have their JavaScript checked.
- The public page does not expose internal LLM Wiki workflow content.
- Mobile layout stays readable at narrow widths.
- Long Skill names do not overflow cards.
- The page does not rely on a build step.

## GitHub Pages

The site is static and should publish through GitHub Pages from the repository contents. Avoid changes that require server-side routing.
