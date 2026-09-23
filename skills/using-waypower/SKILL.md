---
name: using-waypower
description: Use when starting any conversation — establishes the mandatory skill-invocation rule for the nine process skills, the priority ladder for conflicting triggers, and the red flags that mean you're rationalizing your way out of a skill. Always active; tool skills are excluded from the rule.
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, ignore this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If there is even a 1% chance that one of the nine process skills applies to what you are doing, you MUST invoke it before any response — including clarifying questions, exploring the codebase, or checking files.

IF A PROCESS SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. You cannot rationalize your way out of this. If it turns out wrong for the situation, you don't have to keep using it — but you invoke it first.
</EXTREMELY-IMPORTANT>

## The Two Kinds of Skills

**Process skills** set the *approach* for work. They auto-trigger under the 1% rule:

| Situation | Process skill |
|---|---|
| Creating or refining an idea, spec, or design | `design-interview` |
| Planning or executing a build | `tracer-plan` |
| Writing or changing implementation code | `seam-driven-tdd` |
| Diagnosing a bug or unexpected behavior | `hypothesis-debugging` |
| About to claim something is done / fixed / working | `completion-gate` |
| Naming things, writing tickets/tests/docs | `domain-glossary` (vocabulary layer) |
| Shaping modules, interfaces, seams | `seam-design` (vocabulary layer) |
| Reviewing a diff, requesting or receiving review | `dual-axis-review` |
| Creating or editing a skill | `authoring-skills` |

**Tool skills** are never auto-invoked. The user calls them by name: `finish-handoff` (suggest it yourself at the end of a finished chain), `waymap`, `deep-research`.

## The Rule

1. Invoke the relevant process skill **BEFORE any response or action**.
2. Announce: "Using [skill] to [purpose]". Follow the skill exactly.
3. If it has a checklist, create a todo per item.

## Conflicting Triggers — the Priority Ladder

When several process skills fire at once:

```
debugging → idea-refinement → plan/execute → tdd → verification
```

- **Diagnosing?** `hypothesis-debugging` before anything else — you can't plan a fix for a cause you haven't found.
- **Creating?** `design-interview` before `tracer-plan`; the design→build gate is hard.
- **Building?** `tracer-plan` drives; `seam-driven-tdd` runs inside each slice.
- **Exiting?** `completion-gate` at every exit, no matter what else ran.
- **A process skill is already in progress:** it wins. Queue the new trigger for the next phase boundary — never switch mid-flight.
- **User instructions override everything, always.** (See below.)

The full route map — main flow, on-ramps, and compatible companions — lives in `references/flow-map.md`. Consult it when you don't know which skill fits the situation.

## Red Flags

These thoughts mean STOP — you are rationalizing your way out of a skill:

| Thought | Reality |
|---|---|
| "This is just a simple question" | Questions are tasks. Check for process skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "I can check git/files quickly" | Files lack conversation context. Check for skills. |
| "This doesn't need a formal skill" | If a process skill exists, use it. |
| "I remember this skill" | Skills evolve. Read the current version. |
| "The skill is overkill for this" | Simple things become complex. Use it. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |
| "This feels productive" | Undisciplined action wastes time. Skills prevent this. |
| "The plan is obvious, skip the interview" | Obvious to whom? `design-interview` settles it with the user, not for them. |
| "I'll write the test after, same thing" | It is not the same thing. `seam-driven-tdd`. |
| "It works, I checked" | Checking is not the gate. `completion-gate` is the sole exit ritual. |
| "Switching skills mid-task is fine" | In-progress skill wins; queue the new trigger for the phase boundary. |

## Enforcement Upgrade (Optional)

This skill is self-sufficient via description-triggering and works in any skills.sh-style harness. If your harness supports session-start hooks, `references/session-start-hook.md` contains a snippet that injects this skill at session start — an enforcement upgrade, never a dependency.

## User Instructions

User instructions (AGENTS.md, CLAUDE.md, direct requests) take precedence over skills, which in turn override default behavior. Only skip skill workflows when your human partner has explicitly told you to. "Skip the skill" from the user is always honored; skipping it on your own initiative is always a red flag.
