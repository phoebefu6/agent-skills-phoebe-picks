# What Is An LLM Wiki?

An LLM Wiki is a structured memory layer for AI agents. Instead of giving an agent one long prompt or relying on ad hoc retrieval, the project keeps durable knowledge in small linked pages that agents can search, read, follow, and update.

For this repo, the LLM Wiki is the `docs/wiki/` folder plus `AGENTS.md` and `CLAUDE.md`. It is an internal day-to-day workflow layer, not the audience-facing gallery.

## Why It Helps

Claude Code, Codex, Cursor, Gemini CLI, and Hermes-style agents all benefit from the same thing: stable context.

The wiki gives them:

- Project purpose.
- Current architecture.
- Review rules.
- Design principles.
- Test commands.
- GitHub workflow.
- Known risks and guardrails.

That reduces repeated onboarding and makes agent output more consistent.

## How It Differs From A README

The public gallery explains Skill picks to the audience. The LLM Wiki explains the project as reusable operational memory for agents.

| Public Gallery | Internal LLM Wiki |
| --- | --- |
| Audience showcase | Working memory |
| Skill discovery | Task-specific pages |
| Public-facing language | Agent-facing operating notes |
| Stable presentation | Evolves as agents learn project facts |

## Agent Operations

An agent should treat the wiki like a small knowledge graph:

1. Search: find relevant pages with `rg`.
2. Read: open the focused page, not the whole repo.
3. Follow: use links or page names to move to related context.
4. Act: change code, docs, or data.
5. Write back: capture durable lessons in the right page.

## What Belongs Here

Add durable knowledge:

- "The active frontend path is `assets/design-options.*`."
- "Published picks need 3 good points, 3 can-be-better points, use cases, and proof artifacts."
- "Run `node --check` on JS files after edits."
- "Do not grant automation agents write access to secrets or deployment tokens."

Avoid low-value memory:

- Temporary notes.
- Private credentials.
- Full chat transcripts.
- Long pasted articles.
- Speculation not tied to project decisions.

## The Practical Payoff

The wiki turns each good Codex or Claude Code session into compounding project memory. The next agent starts with better context, fewer repeated questions, and a clearer path to validation.
