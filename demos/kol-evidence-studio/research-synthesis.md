# Directional Customer Research Synthesis

*Compiled 2026-08-13 for the Agent Skills Phoebe Picks field test.*

## Scope and limits

This is Mode 2 digital-watering-hole research using eight recent public discussions from Reddit and GitHub. It is directional evidence about the Agent Skills ecosystem, not a representative customer study. Reddit skews technical and skeptical; GitHub issues skew toward defects, security, and workflow gaps. No persona or market-size claim should be treated as validated until at least five direct interviews or equivalent first-party data points exist per segment.

## Ranked themes

### 1. Trust and provenance before installation

**Frequency:** 3 of 8 sources
**Intensity:** High
**Confidence:** High within this technical sample

People want to distinguish official, verified, and community Skills, understand permissions, and confirm that the selected source is authentic. Security reports show that a familiar Skill name is not enough evidence.

**Implication:** Lead every public card with exact source and status. Keep source credibility separate from field quality. Never make installation the primary call to action.

### 2. Outcome proof beats self-description

**Frequency:** 2 of 8 sources
**Intensity:** High
**Confidence:** Medium

Practitioners question whether frequently invoked Skills actually change downstream outcomes. They prefer traces, ablation, validation, or at minimum inspectable artifacts over the agent's own assessment.

**Implication:** Keep "the artifact is the review" as the central position. Add clearer evidence labels explaining what was directly observed and what remains inferred.

### 3. Discovery still breaks the working flow

**Frequency:** 2 of 8 sources
**Intensity:** Medium
**Confidence:** Medium

Users describe discovery as fragmented across registries, repositories, and manual installation steps. A recommendation alone does not remove the interruption or help rank options safely.

**Implication:** Organize by real jobs, present a short recommendation set, and explain the next safe action without pretending the gallery is an autonomous installer.

### 4. Portability and drift create maintenance cost

**Frequency:** 3 of 8 sources
**Intensity:** Medium
**Confidence:** High for multi-agent practitioners

Users want declarative manifests, reproducible setup across machines, clear versioning, and validation when a Skill's behavior or output contract changes.

**Implication:** Surface exploration date, source snapshot, agent compatibility, and known portability constraints. Future reviews should include a lightweight version-drift check.

### 5. Lean operational instructions matter

**Frequency:** 1 of 8 sources
**Intensity:** Medium
**Confidence:** Low

One detailed critique argues that verbose educational Skill files consume context and weaken execution. The source is specific and useful, but it is a single Skill critique rather than a market-wide pattern.

**Implication:** Add instruction economy to the review lens, but keep it as a hypothesis until more evidence appears.

## Voice-of-customer quote bank

- "There's no quality signal for skill files at all." - Reddit, AgentSkills, 2026
- "We keep adding skills ... and have no idea which ones actually work." - Reddit, AI Agents, 2026
- "The biggest pain point I've hit is skill drift." - Reddit, AI Agents, 2026
- "Users need to distinguish between official, verified, and community skills." - GitHub issue, vercel-labs/skills, 2026
- "There's currently no command that says install everything from this lock file." - GitHub issue, vercel-labs/skills, 2026
- "The verbose, educational tone significantly undermines token efficiency." - GitHub issue, anthropics/skills, 2026
- "The selected skill can be malicious while still being installed under the expected directory name." - GitHub issue, vercel-labs/skills, 2026
- "The skill should be found and installed. It used to work." - GitHub issue, vercel-labs/skills, 2026

## Research gaps

1. Interview at least five gallery readers in each priority segment: practical builders, data/AI practitioners, and leaders.
2. Measure which evidence fields affect click-through to demos: source, rating, concept coverage, strengths, or limitations.
3. Test whether scenario search reduces time-to-shortlist compared with repository or leaderboard browsing.
4. Ask non-technical readers whether terms such as Skill, concept coverage, and credibility gate are clear.
5. Track whether readers return to a tested Skill after seeing its artifact, not merely whether they viewed the card.

## Public sources

- https://www.reddit.com/r/AgentSkills/comments/1sfpkm9/does_anyone_else_find_it_weird_that_ai_agents/
- https://www.reddit.com/r/AI_Agents/comments/1uasix6/we_keep_adding_skills_to_our_agents_and_have_no/
- https://www.reddit.com/r/AI_Agents/comments/1tw0aw5/how_do_you_manage_skills_across_agents/
- https://github.com/vercel-labs/skills/issues/617
- https://github.com/vercel-labs/skills/issues/283
- https://github.com/anthropics/skills/issues/202
- https://github.com/vercel-labs/skills/issues/353
- https://github.com/vercel-labs/skills/issues/452
