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

| Skill | Source / reference | Stars checked | Platform fit | Scenario | Ground-up build target | 80% concept coverage | Rating /5 | Date explored | Status | Gallery link |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `frontend-design` | `anthropics/skills`, `skills/frontend-design` | 160,923 on 2026-07-14 | Claude Code, Codex, Hermes AI | Frontend, UI, product gallery | Public gallery rebuild from scratch | Needs retro review against 80% protocol | Pending | 2026-07-10 | Exploring | Pending |
| `design-taste-frontend` | `Leonxlnx/taste-skill`, Open Design wrapper `skills/taste-skill` | 63,047 on 2026-07-14 | Claude Code, Codex, Hermes AI | Visual taste, anti-slop review | Anti-slop redesign pass from scratch or new page variant | Pending | Pending | 2026-07-10 | Exploring | Pending |
| `design-review` | `garrytan/gstack`, Open Design wrapper `skills/design-review` | 121,718 on 2026-07-14 | Claude Code, Codex, Hermes AI | Design critique, QA | Full critique-to-redesign loop for one fresh page | Pending | Pending |  | Wishlist | Pending |
| `high-end-visual-design` | `Leonxlnx/taste-skill`, Open Design wrapper `skills/soft-skill` | 63,047 on 2026-07-14 | Claude Code, Codex, Hermes AI | Typography, layout polish, visual craft | New premium visual page or gallery detail view from zero | Pending | Pending |  | Wishlist | Pending |
| `design-consultation` | `garrytan/gstack`, `gstack design-consultation skill` | 121,718 on 2026-07-14 | Claude Code, Codex, Hermes AI | Brand system, tokens, design principles | Design system source-of-truth built from zero | Pending | Pending |  | Wishlist | Pending |
| `grill-me` | `mio-openliven/codex-grill-me-skill`, `skills/grill-me` | 2 on 2026-07-14 | Codex first; Claude Code and Hermes AI if adapted | Requirement grilling, decision pressure-test | Grill-Me Brief Builder demo | 7/8; source/context inspection was done by the agent before building, not automated inside the demo | 4/5 | 2026-07-14 | Exploring | `demos/grill-me-brief-builder/index.html` |
| `using-superpowers` | `obra/superpowers`, `skills/using-superpowers` | 254,040 on 2026-07-14 | Claude Code, Codex, Cursor, Gemini CLI, opencode, Kimi; Hermes AI if adapted | Agent workflow, skill discipline | Build a new feature through the Superpowers process from zero | Pending | Pending | 2026-07-14 | Exploring | Pending |
| `brainstorming` | `obra/superpowers`, `skills/brainstorming` | 254,040 on 2026-07-14 | Claude Code, Codex, Cursor, Gemini CLI, opencode, Kimi; Hermes AI if adapted | Requirements, design thinking, spec writing | Produce a ground-up spec and artifact plan for one new gallery feature | Pending | Pending | 2026-07-14 | Exploring | Pending |

## Promotion Checklist

Before a Skill becomes a public recommendation, capture:

| Field | Required note |
| --- | --- |
| Core concepts | The key Skill functions, methods, or concepts learned from the source. |
| 80% concept coverage | How the test used about 80% of those key concepts, and what was skipped. |
| Ground-up artifact | What was built from scratch using the Skill. |
| Rating out of 5 | High-level field rating after the build. |
| 3 good points | What made the Skill genuinely useful in practice. |
| 3 can-be-better points | Honest improvement notes, without recommending risky Skills. |
| Daily use cases | How a data person, AI builder, C-suite reader, student, or automation learner could use it. |
| Demo evidence | Product, flowchart, mindmap, screenshot, writeup, or other artifact made while testing. |
| Source and stars | GitHub repo, reference path, current star snapshot, and date checked. |
| Recommendation decision | Published or rejected. |
