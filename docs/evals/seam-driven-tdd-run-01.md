# Eval run 01: seam-driven-tdd prototype

Date: 2026-09-23 · Suite: `skills/seam-driven-tdd/evals/evals.json` · Method: skill-creator engine (baseline vs with-skill A/B) + obra-style temptation scenario. Executors: fresh sub-agents, inline-reply constraint (no file/command execution — see Limitations).

## Grading

### Eval 1 — happy path (`formatPrice`)

| Expectation | Baseline | With skill | Evidence (with-skill run) |
|---|---|---|---|
| Seam stated/confirmed before tests | ❌ | ✅ | "Phase 0 — Seam. Your spec *is* the seam confirmation: `formatPrice(cents, currency): string` … tested through its public signature only (no mocks needed)" |
| Test before implementation | ❌ (impl first, tests last — step 5 of 5) | ✅ | RED cycle 1 test precedes all implementation |
| Verify-RED before implementing | ❌ | ✅ | "fails with `TypeError: formatPrice is not a function` — feature missing, not a typo. ✓" per cycle |
| Minimal implementation | ❌ (speculative: JPY zero-decimal, currency union type, non-integer guard) | ✅ | "no speculative validation was added — add it via its own RED cycle if you want it" |
| Domain-language test names | ✅ | ✅ | "formats cents as a USD dollar amount" |
| No mocks of internals | ✅ | ✅ | No mocks in either run |
| **Score** | **2/6** | **6/6** | |

Bonus behavior observed (with-skill): the zero-cents test passed immediately, and the agent correctly classified it as a characterization test rather than a RED cycle — a direct application of the "Passes immediately?" rule.

### Eval 2 — temptation (production-down pressure)

| Expectation | Baseline | With skill | Evidence (with-skill run) |
|---|---|---|---|
| Regression test before fix | ❌ ("Test to run once the fires are out") | ✅ | RED test first; "watch the first test **fail** … Do not skip this" |
| Test discriminates buggy vs fixed | ✅ | ✅ | Token `'cmVzZXQ6dXNlcjQy+/8='` fails buggy regex, passes fixed |
| Addresses the time-pressure rationalization | ❌ (capitulated) | ✅ | "even a hotfix starts with a failing test … Skipping the reproducing test is how 'quick fixes' become second outages" |
| Fix delivered, minimal, correct | ✅ | ✅ | One-line regex widening; deferred length-check to follow-up |
| **Score** | **2/4** | **4/4** | |

Note: the baseline produced an equally *correct fix* — this scenario discriminates process, not competence. Exactly what it was designed to measure.

### Evals 3–4 (trigger checks)

Not runnable in this environment (no trigger infrastructure). Pending the real harness phase; prompts and expectations are recorded in evals.json.

## Verdict

**Pattern VALIDATED.** Release-gate criterion from ticket 08 met for the prototype: the gate fired in the temptation run (4/4), and the happy-path run showed full compliance (6/6) against a 2/6 baseline. The fused skill changes behavior in the intended direction on both axes (trigger content + process compliance).

## Eval critique (per grader protocol)

- Eval 1's verify-RED expectation is weakened by the inline/no-execution constraint — the agent could only *state* expected failures. In the real harness (executed runs), require observed failure output.
- Gap: no expectation covers the completion-checklist → `completion-gate` handoff (policy 4). Add one when the completion-gate skill exists.
- Baseline eval-2 run hallucinated invoking a "systematic-debugging skill" — irrelevant to scoring, but worth noting that model prior knowledge partially mimics process language; the discriminating expectations are the *ordering* ones (test-before-fix), which it failed.

## Limitations

- Executors replied inline without running tests; RED verification was reasoned, not executed.
- Single run per cell (no variance analysis) — acceptable per ticket 08 Q3 for the prototype gate; batches get repeated runs.
