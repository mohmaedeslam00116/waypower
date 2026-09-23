---
name: tracer-plan
description: Use when you have an approved spec or requirements for a multi-step task, before touching code — turns the spec into tracer-bullet tickets and executes them with per-task review
---

# Tracer Plan

Spec in, working software out — through vertical tracer-bullet slices, each independently demoable, each carrying its own test cycle and its own review. DRY. YAGNI. TDD. Frequent commits.

**Core principle:** The spec is the binding authority (approved at the `design-interview` gate — the one HARD gate in the lifecycle). The plan is its argument: every spec requirement maps to a task. Execution never pauses to re-ask what the spec already answered.

**Announce at start:** "I'm using the tracer-plan skill to plan and execute this work."

## State Split — where things live

- **The plan** is a durable artifact: `docs/plans/YYYY-MM-DD-<feature>.md`. It ships with the code and survives tracker migration. (User preference for plan location overrides this default.)
- **Process state** (ticket status, blocking edges) lives in the configured tracker: one file per ticket under `.scratch/<slug>/issues/` locally, or native issues with blocking links on a real tracker. Same tickets; only the shape of the edges changes.
- The plan carries concrete code and steps — its executor has zero context and reads it *now*. Tracker tickets stay decision-level: what gets built, acceptance criteria, blocking edges. File paths and code in tickets go stale fast; keep them out (exception: a prototype snippet that encodes a decision — state machine, reducer, schema, type shape — inlined and marked as such, trimmed to the decision-rich parts).

## Scope Check

If the spec covers multiple independent subsystems, it should have been split before approval. If it wasn't, propose separate plans — one per subsystem. Each plan must produce working, testable software on its own.

## Plan Writing

### 1. Map the file structure first

Decide which files will be created or modified and what each one is responsible for — decomposition decisions lock in here. Split by responsibility, not technical layer; files that change together live together; prefer files small enough to hold in context. In existing codebases follow established patterns — but if a file you're touching has grown unwieldy, including its split in the plan is reasonable.

### 2. Slice into tracer-bullet tasks

Each task is a **vertical slice**:

- Cuts a narrow but COMPLETE path through every layer it touches (schema, API, UI, tests) — never a horizontal slice of one layer
- Demoable or verifiable on its own
- Sized to fit a single fresh context window
- Carries its own test cycle and is worth a fresh reviewer's gate
- Folds its setup, config, scaffolding, and docs into itself

Split only where a reviewer could meaningfully reject one task while approving its neighbor. Do prefactoring first — make the change easy, then make the easy change.

Give every task its **blocking edges**: the tasks that must complete before it starts. A task with no blockers can start immediately.

**Wide refactors are the exception.** One mechanical change (rename a column, retype a shared symbol) whose blast radius fans across the codebase can't land green as a vertical slice. Sequence it **expand–contract**: add the new form beside the old so nothing breaks → migrate call sites in blast-radius-sized batches, each a ticket blocked by the expand, green batch to batch → delete the old form once no caller remains, in a ticket blocked by every batch. If even batches can't stay green alone, keep the sequence but let them share an integration branch that all block a final integrate-and-verify ticket.

### 3. Bite-sized steps

Each step is one action (2–5 minutes): write the failing test · run it, watch it fail · write the minimal code to pass · run it, watch it pass · commit. Code steps carry the actual code; command steps the exact command with expected output.

### 4. No placeholders

Plan failures — never write them: "TBD" / "implement later" / "fill in details" · "add appropriate error handling" / "handle edge cases" · "write tests for the above" without the actual test code · "similar to Task N" (repeat the code — executors read tasks out of order) · references to types, functions, or methods no task defines.

### 5. Plan document header

```markdown
# [Feature Name] Implementation Plan

**Goal:** [one sentence describing what this builds]
**Architecture:** [2–3 sentences about approach]
**Tech Stack:** [key technologies/libraries]
**Spec:** [path — the plan argues from the spec; executors read both]
```

Tasks and steps use checkbox (`- [ ]`) syntax for tracking.

### 6. Self-review, then fix inline

1. **Spec coverage** — skim each spec section; can you point to the task that implements it? List gaps and close them.
2. **Placeholder scan** — search for the section-4 patterns; fix any hit.
3. **Type consistency** — signatures and names match across tasks (`clearLayers()` in Task 3 but `clearFullLayers()` in Task 7 is a bug).
4. **Review Focus** — for each input class or failure mode the spec implies, is there a task whose tests exercise it? The five most likely to bite go in a Review Focus section, each with its test added to the owning task. An empty section means you checked and found none, not that you skipped the check.

## Publish the Tickets

Present the breakdown as a numbered list — per task: **title**, **blocked by**, **what it delivers** (end-to-end behavior, from the user's perspective). Ask: does the granularity feel right? Are the blocking edges correct — does each task depend only on tasks that genuinely gate it? Should any be merged or split? Iterate until the user approves. (Light checkpoint — the HARD gate was spec approval.)

Publish the approved tickets in dependency order (blockers first), numbered from `01`, each declaring its blocking edges and acceptance criteria (`What to build` / `Blocked by` / `Status` / `- [ ]` criteria). Apply the `ready-for-agent` triage label unless instructed otherwise.

## Execution

If the user hasn't already picked an execution method, offer the choice with a one-sentence recommendation drawn from the plan (how coupled the tasks' interfaces are, how many tasks, what a shipped mistake costs):

- **Subagent-driven** — fresh implementer subagent per task, fresh reviewer per task, whole-branch review at the end. Most thorough; costs a fresh context per task and per review.
- **Inline** — you implement every task in this session; one fresh reviewer at the end. Cheapest and fastest; no independent review until the end.

Either way, **work the frontier**: any task whose blockers are all done.

### Subagent-driven mode

Keep a running ledger (todo list or notes) — the record that survives context loss. Per task:

1. **Dispatch a fresh implementer subagent** with constructed context: the task, its spec sections, the relevant files — never your session history.
2. **Two-stage task review** by a fresh reviewer: (a) spec compliance — all requirements met, nothing extra; (b) code quality. Both must pass.
3. **Fix rounds:** resume the same implementer with the findings (its context holds the details), then a scoped re-review of only those findings. Cap fix rounds (default 5); at the cap, adjudicate — accept-with-debt, re-plan the task, or escalate to the user.
4. Record in the ledger: `Task N: complete (commits …, review clean)`.
5. After all tasks: **whole-branch final review** on the most capable model available; triage deferred minors.

### Inline mode

Implement each task yourself, driving `seam-driven-tdd` at the seams the spec agreed. Run typechecking and the task's test file regularly, the full suite once at the end, then `dual-axis-review` on the whole branch.

### Rulings, not stalls

A running plan does not wait on a human. Conflicts, ambiguities, plan defects — decide them. The spec is the binding authority, the plan is its argument, your judgment settles what neither answers. Record every decision in the ledger: `Ruling: <what you decided> — <why> — <cost if wrong>`, and keep going.

**Four things stop you, and only these:** an irreversible or destructive operation · a security-sensitive action · a side effect outside this workspace that norms say you ask about first (a merge, a push to a shared branch, a publish) · a plan so broken every path forward is a guess. For those, stop and ask.

## Red Flags — STOP

Tasks that are horizontal slices · "TBD" steps · code steps without code · "Should I continue?" between tasks · pausing to ask what the spec already answers · skipping task review because the diff is small · an implementer fixing findings without a scoped re-review · marking a ticket unblocked by editing its edges instead of finishing its blockers · claiming done while acceptance criteria are unchecked.

## Common Rationalizations

| Excuse | Reality |
|---|---|
| "The task is tiny, skip the plan" | Tiny tasks make the plan cheap, not optional. |
| "Horizontal slice first, wire it later" | Unwired layers are unverifiable. Vertical or it isn't a task. |
| "File paths in tickets keep it unambiguous" | They go stale mid-build. Decisions in tickets; code in the plan. |
| "Reviews slow the loop" | The loop without reviews is unverified churn; reviews are its brakes and steering. |
| "One more fix round will converge" | Past the cap, rounds don't converge — the failure is structural. Adjudicate and route. |
| "Ask the user about every ambiguity" | A parked session costs their day. Rule, record, keep going (four stops excepted). |
| "The implementer can self-review" | The context that wrote the diff can't judge it. Fresh eyes or it isn't review. |

## Completion Checklist (then the gate)

- [ ] Plan saved to `docs/plans/` and self-reviewed (coverage, placeholders, type consistency, review focus)
- [ ] Breakdown approved by the user; tickets published with blocking edges, numbered in dependency order
- [ ] Every task passed two-stage review (or, inline: `seam-driven-tdd` loop + `dual-axis-review` at the end)
- [ ] Every ticket's acceptance criteria verified against the built software
- [ ] Full test suite green on a fresh run; ledger and ticket statuses current

**All boxes checked ≠ done.** Any completion claim goes through the `completion-gate` skill — the sole exit ritual. This checklist feeds it, never replaces it.
