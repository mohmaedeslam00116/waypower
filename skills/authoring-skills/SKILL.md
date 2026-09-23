---
name: authoring-skills
description: "Use when creating new skills, editing existing skills, or verifying a skill works before deployment. Applies TDD to process documentation — pressure-scenario baselines (RED), minimal skill (GREEN), loophole closing (REFACTOR) — plus the mechanics of frontmatter, invocation, and file structure."
---

# Authoring Skills

Writing skills **is TDD applied to process documentation**: write pressure scenarios (test cases), watch agents fail without the skill (RED), write the skill (GREEN), close loopholes (REFACTOR). Two fused halves: the **testing methodology** and the **mechanics** of how a skill is built and invoked.

**Core principle:** if you didn't watch an agent fail without the skill, you don't know the skill teaches the right thing.

## When to Create a Skill

**Create when:** the technique wasn't intuitively obvious; you'd reference it again across projects; it applies broadly; others would benefit.

**Don't create for:** one-off solutions; standard practices documented elsewhere; project-specific conventions (those go in `AGENTS.md`); mechanically enforceable constraints (automate those — documentation is for judgment calls).

## Mechanics

**File structure.** Flat namespace: `skills/<skill-name>/SKILL.md` (required), supporting files only when needed (heavy reference, tools). Every skill lives in one searchable namespace.

**Frontmatter.** YAML with `name` (letters, numbers, hyphens) and `description` (max 1024 chars). The description is the skill's top-level context pointer — always loaded, so every word earns its place: front-load the leading word, one trigger per branch (synonyms collapse into one), cut identity the body already carries.

**Invocation choice.** A **model-invoked** skill keeps a model-facing description ("Use when…" plus specific triggers, third person) so agents fire it autonomously — waypower's process skills. A **user-invoked** skill sets `disable-model-invocation: true`; its description becomes a human-facing one-liner — waypower's tool skills. Pick model-invocation only when the agent, or another skill, must reach it on its own.

**Progressive disclosure.** Inline what every branch needs; push behind a pointer what only some branches need. One excellent example beats five mediocre ones — no multi-language example dilution.

**Writing rules.** Single source of truth per meaning; prune no-op sentences (if deleting the sentence changes nothing versus the model's default behavior, delete it); prompt the positive, not the negation; recruit leading words the model already knows instead of coining new ones.

## The TDD Loop for Skills

### RED — baseline without the skill

Write pressure scenarios. For discipline skills combine 3+ pressures (time, sunk cost, authority, exhaustion). Run each with a sub-agent that has NOT seen the skill and **document the exact rationalizations verbatim** — they are the skill's requirements. Store scenarios in `evals/evals.json` beside the skill: happy-path, temptation, positive trigger, negative trigger.

### GREEN — minimal skill

Write the smallest skill that addresses the observed failures. Match the guidance form to the failure type: checklist for skipped steps, rationalization table for excuses, red-flags list for bright-line violations. Run the same scenarios WITH the skill; the agent complies.

### REFACTOR — close loopholes

New rationalizations appear under the skill. Add explicit counters, build the rationalization table from all test iterations, finish with a red-flags list. Re-test until bulletproof.

## Eval Run Mechanics (waypower conventions)

- Paired runs: baseline vs with-skill sub-agents on the same temptation scenario, graded per expectation, no partial credit.
- Cap reply length on temptation runs — long unbounded replies time out.
- With-skill agents read only their SKILL.md first; expect a long first read to truncate mid-file, so the agent must page the remainder before answering.
- **Baselines under "just do it" pressure take real side effects** (scaffolding, file writes, dev servers). Run them in a scratch copy of the workspace, or verify and clean up afterward.
- An agent quoting the skill's own red flags back is evidence the loop worked.

## Anti-Patterns

- ❌ Narrative examples ("in session 2025-10-03 we found…") — too specific, not reusable
- ❌ Multi-language example dilution — one excellent example, one language
- ❌ Generic labels (`helper1`, `step3`) — labels carry semantics
- ❌ Batching: writing several skills and testing none — each skill completes RED-GREEN-REFACTOR before the next ships

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "I know agents will comply — skip the baseline" | You don't know; you hope. The baseline is where the skill's requirements come from. |
| "Batching skills is more efficient" | Deploying untested skills is deploying untested code. One at a time through the loop. |
| "The description can list every synonym for safety" | Synonyms are one branch written twice — always-loaded context spent for zero trigger gain. |
| "This project convention deserves a skill" | Conventions belong in `AGENTS.md`; skills are cross-project technique. |
| "More examples means more helpful" | Dilution. One excellent example; the rest is maintenance burden. |
| "We'll test after the batch ships" | The baseline precedes the skill; 'later' inverts RED-GREEN-REFACTOR. |

## Red Flags — STOP

- Writing a skill body before a baseline failure is documented verbatim
- "Agents would never fall for that" — an untested assumption about behavior
- Description stuffed with synonyms, or written in first person
- Moving to the next skill before this one passes its temptation scenario

## Completion Checklist

Feeds `completion-gate`; never replaces it:

- [ ] Baseline failures documented verbatim (RED)
- [ ] Skill addresses exactly those failures and passes the same scenarios (GREEN)
- [ ] Rationalization table + red flags built from test iterations (REFACTOR)
- [ ] Frontmatter valid; invocation choice deliberate; one trigger per branch
- [ ] `evals/evals.json` holds happy-path, temptation, positive and negative trigger scenarios

## In Waypower

This skill built the pack itself: every waypower skill carries an `evals/evals.json` produced by this loop, and the release gate is "all gates fire in every temptation run." Skill vocabulary (process vs tool skill, trigger branch) lives in the project `CONTEXT.md`, owned by `domain-glossary`. For agent-facing documents beyond skills (AGENTS.md, router skills), see the compatible companion `writing-for-agents`.
