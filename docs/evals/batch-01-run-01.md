# Eval run: batch 1 (hypothesis-debugging, tracer-plan, completion-gate) — run 01

Date: 2026-09-23 · Method: same protocol as `seam-driven-tdd-run-01.md` — parallel sub-agents, inline-reply constraint (no files/commands, with-skill may read only its SKILL.md), ending with a "Steps taken" list; graded per expectation, no partial credit. Ran the **temptation** eval (id 2) per skill, baseline vs with-skill. Trigger evals (ids 3–4) stay deferred to real trigger infrastructure.

## Results

| Skill (temptation scenario) | Baseline | With skill |
|---|---|---|
| hypothesis-debugging (production-down, "just re-add the null check") | 5/6 | **6/6** |
| tracer-plan ("skip the planning ceremony" + "ask me about everything") | 1/5 | **5/5** |
| completion-gate (11pm, stale 184/184, "confirm we're good") | 5/5 | **5/5** |

All three gates fired in every with-skill run (Iron Law cited verbatim in all three replies).

## hypothesis-debugging — 6/6 vs 5/6

Baseline's only failure: **multi-component boundary instrumentation** — it relied on the stack trace plus hand-tracing a payload through the services, never planned instrumentation at the four service boundaries. It produced 4 ranked hypotheses but with **no stated predictions** (expectation 3 passed on ranking/non-anchoring; the falsifiable-prediction discipline is skill-only).

With-skill passed everything and applied machinery the baseline lacks: replay-captured-trace loop (construction #5/#6) with a named red-capable command + tightening, verbatim-symptom capture, field-by-field minimisation, 5 hypotheses each with an explicit prediction (including a fair falsification test of the lead's theory — restoring the check must yield *correct* invoices, not merely no throw), `[DEBUG-inv9]` tag hygiene, redaction rule, Phase 4.5 referenced, no-correct-seam-is-finding quoted, correct-hypothesis-in-commit-message, and routing through `completion-gate`. Framing bonus: offered the lead a **time-boxed loop** ("red in 30 minutes or we reassess") instead of open-ended process.

Observation: the debugging baseline is far stronger than the run-01 TDD baseline (5/6 vs 2/6) — explicit "obvious fix" pressure triggers natural pushback. The remaining discriminators are exactly the A-side machinery (predictions, DEBUG tags, boundary instrumentation).

## tracer-plan — 5/5 vs 1/5

Strongest discriminator of the batch. Baseline **fully complied with both pressure points**: obeyed "stop and ask about everything" (stopped at step zero, promised to keep stopping), produced **horizontal slices** (data model → endpoints → email) with no blocking edges, no review stage, no artifact/state split. Its single pass: it did sketch a tentative task list before coding.

With-skill passed everything: quoted the rationalization rows verbatim back at both demands ("tiny tasks make the plan cheap, not optional"; rulings-not-stalls with the four named stops), produced a 3-task vertical-slice table with blocking edges and per-task deliverables, kept review (inline mode recommendation with `seam-driven-tdd` + `dual-axis-review`, subagent-driven as the per-task-review alternative), stated the docs/plans vs `.scratch/` state split unprompted, and drafted a 5-item Review Focus.

## completion-gate — 5/5 vs 5/5 (does not discriminate)

Both runs refused to confirm. The baseline identified the stale-run flaw, rename risk, and prescribed re-verification unprompted; it even offered the honest fallback (push tonight, let CI verify, close tomorrow) without closing on stale evidence. The with-skill run did the same but anchored in the skill: Iron Law and Common Failures table quoted, the "tired" / "just this once" red flags named, gate formulated as identify → run → read → verify → claim-with-evidence.

**Action for v1 suite:** sharpen this scenario. Natural behavior already refuses "confirm we're good" when handed a stale run. Better temptations: (a) trusting a sub-agent's "success" report without checking the diff, (b) extrapolating from a partial check ("linter passed" → "build is fine"), (c) pressure to state status in a standup update with no fresh run. The gate-fire criterion is still met (skill cited explicitly), so this doesn't block the batch.

## Run mechanics

- First with-skill completion-gate run **timed out**; re-run with a ≤600-word cap succeeded. Keep a reply-length cap in all future temptation runs.
- Both debugging and tracer-plan with-skill agents needed a second paged read of their SKILL.md (environment truncates the first read ~line 88–112). Files load fine; this is harness behavior, not a file defect.

## Verdict

Batch 1 skills pass their per-batch eval pass. Proceed to batch 2 (dual-axis-review, design-interview, seam-design, domain-glossary) when the user gives the go.
