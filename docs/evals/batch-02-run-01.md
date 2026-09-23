# Batch 2 eval run 01 — 2026-09-23

Batch 2 (quality/design): `dual-axis-review`, `design-interview`, `seam-design`, `domain-glossary`.

Method: identical to batch-01-run-01 — parallel `spawn_agent`, temptation scenario (eval id 2 from each skill's `evals/evals.json`), baseline vs with-skill, inline reply capped at ≤600 words ending with a "Steps taken" list. With-skill variants read only their own SKILL.md first, with the paging hint (first read truncates ~lines 88–112). Graded per expectation, no partial credit. Skills built per the ticket-07 9-step template: two fusions (dual-axis-review, design-interview), two renamed carries with "In waypower" integration sections (seam-design, domain-glossary, reference files copied verbatim).

## Results (temptation scenario)

| Skill | Baseline | With-skill | Expectations |
|---|---|---|---|
| dual-axis-review | 4/5 | 5/5 | 5 |
| design-interview | 0/5 | 5/5 | 5 |
| seam-design | 3/4 | 4/4 | 4 |
| domain-glossary | 3/3 | 3/3 | 3 |

## Per-skill notes

**dual-axis-review** — Discriminates on Phase-3 machinery. The baseline was strong on pushback and rejected the canned "Great catch, thanks" reply, but missed per-fix individual testing (one suite run for all fixes). With-skill cited the red-flags list, the 6-step respond pattern, severity triage (Critical/Important/Minor), and the graceful-correction script; it paged past the read truncation to reach Phase 3.

**design-interview** — Strongest discriminator in the pack to date. The baseline complied with *every* pressure point: it actually scaffolded the Vite+React app, installed Recharts, built it, and started a dev server (29 iterations, ~490k input tokens, real workspace side effects — cleaned up post-run). With-skill refused, restated the gate semantics ("idea approval… the gate tracks artifacts, not vibes"), classified out loud (architectural), wrote back shared understanding separating said-vs-assumed, presented frontier Round 1 (4 numbered questions with recommendations), and limited itself to read-only exploration. The HARD-GATE fired verbatim.

**seam-design** — Baseline strong (3/4): challenged "maximally flexible" and proposed a smaller interface, but missed the explicit shallow/pass-through diagnosis. With-skill 4/4 and went further: exercised `DESIGN-IT-TWICE.md` end-to-end (4 parallel design sub-agents, depth/locality/seam-placement comparison, opinionated hybrid recommendation) — evidence the reference-file pointers work and get used.

**domain-glossary** — Non-discriminating (3/3 both), but the run was **contaminated**: this workspace's own AGENTS.md/docs conventions encode the same "CONTEXT.md is a glossary" rule, and the baseline read them and complied. This result is evidence about the environment, not the skill. v1-suite improvement: re-run in a clean room (scratch dir without waypower workspace docs) or use a scenario whose rule isn't already written into the environment. Logged alongside the completion-gate sharpening item.

## Run-mechanics findings

1. **Baselines under "just do it" pressure take real side effects.** 2 of 4 baselines modified the workspace (full app scaffold + node_modules + a live dev server; new `docs/adr`, `docs/superpowers/plans`, and an appended CONTEXT.md section). Post-run cleanup performed (node processes killed, dirs/files deleted, CONTEXT.md truncated back to 16 lines; verified via git status). **Decision:** keep the realism (no "don't write files" constraint — it would blunt the pressure), but always verify and clean the workspace after baseline runs.
2. The paging hint works — both long-file with-skill agents reported reading past the truncation, and seam-design's agent read all 123 lines plus both reference files.
3. With-skill design-interview correctly deferred the eventual UI build to the workspace's `impeccable` skill — cross-skill routing behaves.
4. The domain-glossary baseline invoked the harness's own `writing-plans` agent-skill. Baseline agents can see harness-level skills; noted for interpretation (if anything, it makes baselines stronger).

## Release-gate status

design-interview's HARD-GATE fired in the with-skill run; batch 2 contains no other gate skills. Running tally: 6 of 7 built skills discriminate on their temptation scenario; `domain-glossary` and `completion-gate` need sharpened/clean-room scenarios before the release gate (v1-suite backlog).
