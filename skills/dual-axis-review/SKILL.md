---
name: dual-axis-review
description: "Use when a task, ticket, or feature is complete and before merging — dispatch two parallel review sub-agents (Standards + Spec) over the diff — and when review feedback arrives, to verify it before implementing. Triggers on finishing implementation work, pre-merge/PR checks, 'review since X' requests, or received review comments."
---

# Dual-Axis Review

The complete review lifecycle in three phases: **Request** (pin down exactly what gets reviewed), **Review** (two parallel sub-agents: Standards and Spec), **Respond** (verify feedback before implementing it). Review early, review often. The two axes are reported separately so one can never mask the other: standards-perfect code can still implement the wrong thing, and spec-faithful code can still break every convention.

## Phase 1 — Request

### When to request

**Mandatory:** after each ticket in subagent-driven execution (see `tracer-plan`); after completing a major feature; before merge to main.

**Optional but valuable:** when stuck (fresh perspective); before a structural refactor (baseline check); after fixing a complex bug.

### Pin the fixed point

The fixed point is whatever the user supplies (SHA, branch, tag, `main`, `HEAD~5`). If they didn't specify one, ask.

- Capture the diff command once: `git diff <fixed-point>...HEAD` (three-dot, so the comparison is against the merge-base), plus the commit list: `git log <fixed-point>..HEAD --oneline`.
- Verify **before** dispatching: `git rev-parse <fixed-point>` resolves and the diff is non-empty. A bad ref or empty diff fails here, not inside two parallel sub-agents.

### Pre-review checklist

- The work is committed — reviewing uncommitted changes reviews a moving target.
- Tests were green before review; if unsure, run them first.
- **Never review your own diff inline.** You're the coordinator: dispatching keeps the diff and its evaluation in the sub-agents' context, and only findings come back to yours.

## Phase 2 — Review (the two-axis engine)

### Identify the spec source

In this order:

1. Ticket references in commit messages, fetched via the tracker (`.scratch/` files now, `gh` later).
2. A path the user passed as an argument.
3. A spec file under `docs/specs/`, `docs/`, or `.scratch/` matching the branch name or feature.
4. Ask the user. If there is no spec, skip the Spec sub-agent and note "no spec available" in the final report — that absence is itself a finding.

### Identify the standards sources

Anything in the repo documenting how code should be written (`CODING_STANDARDS.md`, `CONTRIBUTING.md`, hand-written lint rules). On top of that, the Standards axis always carries the **smell baseline** (Fowler, _Refactoring_, ch.3). Two rules bind it:

- **The repo overrides.** A documented repo standard always wins; where it endorses something the baseline would flag, suppress the smell.
- **Always a judgement call.** Each smell is a labelled heuristic ("possible Feature Envy"), never a hard violation. Skip anything tooling already enforces.

The smell baseline (12 Fowler smells, what it is → how to fix) lives in [REVIEW-DISPATCH.md](REVIEW-DISPATCH.md) — paste it **in full** into the Standards sub-agent's prompt at dispatch time; a sub-agent never sees the file, only what you hand it.

### Spawn both sub-agents in parallel

**Standards sub-agent prompt** includes: the diff command and commit list; the standards-source files found; the smell baseline **pasted in full** (the sub-agent has no other access to it). Brief: "Report, per file/hunk where relevant, (a) every place the diff violates a documented standard: cite the standard (file + the rule); and (b) any baseline smell you spot: name it and quote the hunk. Documented-standard breaches can be hard violations, but baseline smells are always judgement calls, and a documented repo standard overrides the baseline. Skip anything tooling enforces. Under 400 words."

**Spec sub-agent prompt** includes: the diff command and commit list; the path or fetched contents of the spec. Brief: "Report: (a) requirements the spec asked for that are missing or partial; (b) behaviour in the diff that wasn't asked for (scope creep); (c) requirements that look implemented but where the implementation looks wrong. Quote the spec line for each finding. Under 400 words."

### Aggregate

Present the two reports under `## Standards` and `## Spec` headings, verbatim or lightly cleaned. **Do not merge or rerank findings across axes.** End with a one-line summary: total findings per axis, and the worst issue within each axis. Never pick a single winner across axes — that reranking is exactly what the separation exists to prevent.

## Phase 3 — Respond (feedback etiquette)

Applies to any review feedback: from these sub-agents, a human reviewer, or PR comments.

### The response pattern

1. **READ** the complete feedback without reacting.
2. **UNDERSTAND** — restate each item in your own words, or ask.
3. **VERIFY** against codebase reality.
4. **EVALUATE** — technically sound for THIS codebase?
5. **RESPOND** — technical acknowledgment or reasoned pushback.
6. **IMPLEMENT** — one item at a time, test each.

### Rules

- **Clarify all unclear items before implementing any.** Items may be related; partial understanding means wrong implementation. ("I understand items 1,2,3,6. Need clarification on 4 and 5 before proceeding.")
- **No performative responses.** Forbidden: "You're absolutely right!", "Great point!", any gratitude, "Let me implement that now" before verifying. Instead: restate the technical requirement, ask, push back with reasoning, or just start working. Correct feedback gets "Fixed. [what changed]" — the code shows you heard it.
- **Source-specific handling.** From your human partner: trusted — implement after understanding, still ask if scope is unclear. From external reviewers: skeptical but check carefully — technically correct for this codebase? breaks existing functionality? reason for the current implementation? works on all platforms/versions? does the reviewer have full context? If it conflicts with your partner's prior decisions, stop and discuss first.
- **YAGNI check.** If a reviewer suggests "implementing it properly," grep for actual usage first. Unused → propose removal instead ("This endpoint isn't called. Remove it (YAGNI)?"). Used → implement properly.
- **Severity triage.** Fix Critical immediately; fix Important before proceeding; note Minor for later.
- **Implementation order.** Blocking issues (breaks, security) → simple fixes → complex fixes. Test each fix individually; verify no regressions.
- **Push back when** the suggestion breaks existing functionality, the reviewer lacks full context, it's technically incorrect for this stack, legacy/compatibility reasons exist, or it conflicts with your partner's architectural decisions — with technical reasoning, not defensiveness. If your pushback was wrong: "You were right — I checked [X] and it does [Y]. Implementing now." State the correction factually and move on; no apology tour.

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "I'll just review the diff myself instead of dispatching" | You're the coordinator — inline review burns the context window you need to keep driving the work. Dispatch; only the findings come back. |
| "The reviewer needs my whole session history" | Hand it precisely crafted context, never your session's history. The reviewer judges the work product, not your thought process. |
| "It's simple — skip review" | "Simple" diffs are where the embarrassing bugs live. Review is mandatory after each ticket, after major features, and before merge. |
| "The reviewer said it, so implement it" | Verify before implementing. Feedback can be wrong, outdated, or missing context — even from your human partner. |
| "Merge both axes into one ranked list" | That reranking is exactly what the separation prevents. A Standards-pass can still be the wrong change; a Spec-pass can still be unmergeable code. |
| "No spec found, so skip that axis silently" | Skip it, but say so in the report. "No spec available" is itself a finding. |

## Red Flags — STOP

- Skipping review because "it's simple"
- Ignoring Critical issues, or proceeding with unfixed Important issues
- Arguing with valid technical feedback
- Implementing feedback you haven't verified — or implementing any item while others remain unclear
- Any gratitude or performative agreement in a review response
- Merging or reranking the two axes into one list

## Completion Checklist

Before claiming review work is done — via the `completion-gate` skill, which this checklist feeds and never replaces:

- [ ] Fixed point pinned; ref verified; diff confirmed non-empty
- [ ] Spec source identified, or "no spec available" noted in the report
- [ ] Both sub-agents dispatched in parallel with complete prompts (smell baseline pasted, not referenced)
- [ ] Report keeps `## Standards` and `## Spec` separate; worst-per-axis summary; no cross-axis winner
- [ ] Every feedback item clarified before any implementation began
- [ ] Critical fixed immediately, Important fixed before proceeding, Minor noted
- [ ] Each implemented fix tested individually; no regressions
- [ ] Pushbacks made with technical reasoning; wrong pushbacks corrected factually

