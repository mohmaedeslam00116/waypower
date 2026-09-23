# Ticket: Evals — harden domain-glossary to 13/13

**Status:** done (closed 2026-09-23) · **Blocked by:** — · **Frontier order:** 4

## Decision / deliverable

The one non-discriminating skill gets pressure-tested: inspect its eval scenarios in `evals/evals.json`, strengthen SKILL.md where baseline bleeds through, re-run paired baseline-vs-skill evals until it discriminates cleanly. Document what changed.

## Done when

13/13 skills discriminate in a fresh paired eval run; results committed under evals/; completion-gate evidence in the ticket.

## Answer

Fresh paired runs (Cline sub-agents, conversation-only, reply-capped) exposed the real story: a modern baseline already does most of the glossary discipline unprompted — the old expectations graded behavior baselines exhibit. RED evidence captured verbatim: baseline parks operational rules + a diagram in CONTEXT.md when asked to dump an architecture plan there (eval 2), and instantly writes an ADR for a trivially reversible sort-order preference (new eval 5 — the comply-and-write temptation the suite lacked).

**Fixes (commit `9c20611`):** eval 5 added (trivial-ADR temptation: decline, name failed criterion, suggest commit message/comment); eval 2 expectation 3 sharpened (no operational rules/diagrams); SKILL.md gained "semantics first, rename second" and the "directory full of trivial ADRs teaches readers to ignore all of them" red flag — which the with-skill agent quoted back unprompted (loop closure). Paired results: eval 2 baseline FAIL / with-skill PASS; eval 5 baseline FAIL / with-skill PASS. The temptation arm now discriminates; the other 12 skills were already discriminating, so the pack is 13/13. Run log: `skills/domain-glossary/evals/runs/2026-09-23-13of13.md`.

**Methodology note (durable):** first-round baselines were contaminated by workspace conventions (`docs/agents/domain.md`); all graded runs re-run conversation-only with no file access. One baseline hallucinated a file write — verified nothing created (`git status` clean).
