# GitHub Workflow

## Branches

Use a focused branch for meaningful changes. In Codex contexts, prefer the `codex/` prefix unless Phoebe requests another branch name.

## Commits

Commit messages should state the user-visible change, for example:

```text
Separate internal LLM Wiki from public gallery
```

## Pull Request Checklist

Before opening a PR, confirm:

- The active static site still loads.
- JS syntax checks pass.
- README architecture is accurate.
- Internal wiki pages do not leak into the public gallery unless intended.
- No secrets or private credentials were added.

## Issue Ideas

Good future issues:

- Add hands-on proof artifacts for each published Skill.
- Add compatibility fields for Claude Code, Codex, Cursor, and Gemini CLI.
- Add a tested-with changelog for each Skill.
