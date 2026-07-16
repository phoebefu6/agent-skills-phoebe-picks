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
| `frontend-design` | `anthropics/skills`, `skills/frontend-design` | 161,555 on 2026-07-16 | Claude Code, Codex, Hermes AI | Frontend, UI, product gallery | Scenario Console product screen | 6/6 key concepts visible | 8.2/10 | 2026-07-16 | Published | `demos/frontend-design-interface/index.html` |
| `design-taste-frontend` | `Leonxlnx/taste-skill`, Open Design wrapper `skills/taste-skill` | 64,018 on 2026-07-16 | Claude Code, Codex, Hermes AI | Visual taste, anti-slop review | Design Taste Frontend Lab | 10 key concepts visible; official design-system package path shown as a decision branch, with native CSS chosen because this gallery is an aesthetic page | 8.5/10 | 2026-07-16 | Published | `demos/design-taste-frontend-studio/index.html` |
| `design-review` | `garrytan/gstack`, Open Design wrapper `skills/design-review` | 122,177 on 2026-07-16 | Claude Code, Codex, Hermes AI | Design critique, QA | Critique Loop before-after audit board | 5/5 key concepts visible | 8.0/10 | 2026-07-16 | Published | `demos/design-review-critique-loop/index.html` |
| `high-end-visual-design` | `Leonxlnx/taste-skill`, Open Design wrapper `skills/soft-skill` | 64,018 on 2026-07-16 | Claude Code, Codex, Hermes AI | Typography, layout polish, visual craft | High-End Visual Design Atelier | 8/10 key concepts visible; full scroll choreography and full-screen menu sequencing kept lighter for this static gallery | 7.9/10 | 2026-07-16 | Published | `demos/high-end-visual-design-showcase/index.html` |
| `design-consultation` | `garrytan/gstack`, `gstack design-consultation skill` | 122,177 on 2026-07-16 | Claude Code, Codex, Hermes AI | Brand system, tokens, design principles | System Room design-system workshop | 5/5 key concepts visible | 8.1/10 | 2026-07-16 | Published | `demos/design-consultation-system-room/index.html` |
| `grill-me` | `mio-openliven/codex-grill-me-skill` has 2 stars; likely alternate `RobMitt/grill-me-skill` has 123 stars | Below 10k source gate on 2026-07-16 | Codex first; Claude Code and Hermes AI if adapted | Requirement grilling, decision pressure-test | Field test completed, public demo removed | Method was useful, but source credibility gate failed | N/A - not published | 2026-07-14 | Rejected | Removed from public gallery |
| `using-superpowers` | `obra/superpowers`, `skills/using-superpowers` | 255,624 on 2026-07-16 | Claude Code, Codex, Cursor, Gemini CLI, opencode, Kimi; Hermes AI if adapted | Agent workflow, skill discipline | Build a new feature through the Superpowers process from zero | Pending | Pending | 2026-07-14 | Exploring | Pending |
| `brainstorming` | `obra/superpowers`, `skills/brainstorming` | 255,624 on 2026-07-16 | Claude Code, Codex, Cursor, Gemini CLI, opencode, Kimi; Hermes AI if adapted | Requirements, design thinking, spec writing | Produce a ground-up spec and artifact plan for one new gallery feature | Pending | Pending | 2026-07-14 | Exploring | Pending |

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
