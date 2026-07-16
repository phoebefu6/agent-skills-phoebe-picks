# Project Overview

## Mission

Agent Skills Phoebe Picks is a public gallery for finding AI agent Skills by the situations they help with. Phoebe explores Skills one at a time, builds proof artifacts, and adds useful public notes without exposing the internal SOP.

## Audience

- Phoebe, as the primary learner and curator.
- LinkedIn readers who are AI-curious but may be new to Skills.
- Vibe coders and builders who want practical agent workflows.
- C-level and operator audiences looking for AI leverage.
- Students and learners who want a friendly place to start.
- Future agents working in this repo.

## Product Direction

The approved v1 direction is a hybrid:

- Museum Gallery visual language: quiet, clean, editorial, low-saturation, magazine-like.
- Product Catalog structure: scenario filters, badges, status labels, and practical Skill cards.

The site should feel community-minded, not guru-like. Public copy must lead with follower value and gallery discovery. Internal testing workflow belongs in project instructions, not the homepage.

## Core Outcome

The project should help answer:

- What situation does this Skill help with?
- Which GitHub source, reference path, and star snapshot support the pick?
- Does the source pass the credibility gate: at least 10k GitHub stars, or verified Skill of the Day, Repo of the Day, top repo, or equivalent ranking proof?
- Which agent platforms does it fit first: Claude Code, Codex, Hermes AI, Cursor, Gemini CLI, opencode, Kimi, Pi, or another agent?
- What original artifact did Phoebe build from the ground up with it?
- Did the exploration use about 80% of the Skill's key concepts?
- What high-level rating out of 10 did it earn after the build?
- What are 3 good points?
- What are 3 places it can be better?
- How could builders, data people, leaders, students, or automation learners use it day to day?
- Was it published, still on the wishlist, or rejected quietly?
- Why should a follower care enough to follow or star the repo?

## Current Product Surface

The public site is a static GitHub Pages gallery. Its public skeleton is hero, scenario finder, Skill gallery, and Skill detail drawer. Wishlist, testing queue, and SOP notes stay internal.

The internal LLM Wiki layer remains private working memory for agents:

- `AGENTS.md` for cross-agent operating instructions.
- `CLAUDE.md` for Claude Code-specific habits.
- `docs/wiki/` for durable project memory.

The LLM Wiki should stay internal unless Phoebe explicitly asks to teach the workflow publicly.

## Non-Goals

- No backend.
- No user accounts.
- No database.
- No analytics.
- No automatic scraping of external Skills.
- No public warnings section for risky Skills. If a Skill feels unsafe or not useful, do not recommend it.
- No autonomous writes to GitHub without user approval.
