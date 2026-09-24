---
name: hypothesis-debugging
description: Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes — root cause through a tight feedback loop and ranked falsifiable hypotheses, never guess-and-check
---

# Hypothesis Debugging

Root cause, or it isn't fixed. The loop finds the cause; ranked hypotheses pick what to test; one variable at a time confirms it.

**Core principle:** A tight pass/fail signal that goes red on *this* bug is the whole game — instrumentation, bisection, and hypothesis-testing all just consume it. Guess-and-check is failure, especially under pressure.

**Violating the letter of this process is violating the spirit of debugging.**

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

If you haven't completed Phases 1–3, you cannot propose fixes. Phases may be compressed with explicit justification — the exit gate (`completion-gate`) never is.

**Use this ESPECIALLY when:** under time pressure, "just one quick fix" seems obvious, you've already tried multiple fixes, a previous fix didn't work, or you don't fully understand the issue. Simple bugs have root causes too.

## Before You Start

- Read `CONTEXT.md` (if it exists) and ADRs near the bug — you need a correct mental model before you can rank hypotheses.
- **Redact every secret** from shown commands, outputs, and captured artifacts (`<REDACTED>`). If redaction starves the diagnosis, say so and ask.

## Phase 1: Build a Feedback Loop

**This is the skill.** Spend disproportionate effort here. Be aggressive, be creative, refuse to give up.

Construct one from the ten proven shapes — failing test, curl/HTTP script, CLI + fixture, headless browser, trace replay, throwaway harness, property/fuzz, bisection harness, differential, HITL script (last resort) — with per-shape construction recipes and tightening techniques in [FEEDBACK-LOOPS.md](FEEDBACK-LOOPS.md).

Then **tighten** until the loop is fast, sharp, and deterministic: a 30-second flaky loop is barely better than none; a 2-second deterministic one is a superpower. **Non-deterministic bug?** The goal is a higher reproduction rate, not a clean repro — 50% is debuggable, 1% is not.

**Genuinely cannot build a loop?** Stop and say so. List what you tried. Ask the user for (a) access to the reproducing environment, (b) a redacted captured artifact (HAR, log dump, screen recording), or (c) permission to add temporary instrumentation.

**Done when:** one named, already-run, red-capable, deterministic, fast, agent-runnable command exists. No loop, no Phase 2.

## Phase 2: Reproduce + Minimise

Run the loop and confirm it fails the way the *user* described — wrong bug, wrong fix. Capture the exact symptom verbatim (error message, wrong output, slow timing) so later phases can verify the fix addresses it.

Then shrink to the **smallest scenario that still goes red**: cut inputs, callers, config, data, and steps one at a time, re-running the loop after each cut. Done when **every remaining element is load-bearing** — removing any one makes the loop go green. The minimal repro shrinks the hypothesis space and becomes the regression test in Phase 5.

**Do not proceed until you have reproduced AND minimised.**

## Phase 3: Hypothesise — ranked, falsifiable, shown to the user

Generate **3–5 ranked hypotheses before testing any of them**. Single-hypothesis generation anchors on the first plausible idea.

Seed the list by **pattern comparison**: how does the working sibling, reference example, or last-known-good version do it? What changed recently (commits, new dependencies, config, environment)? The diff between working and broken is where hypotheses live.

Each hypothesis must be **falsifiable** — state its prediction:

> "If <X> is the cause, then <changing Y> will make the bug disappear / <changing Z> will make it worse."

Can't state the prediction? It's a vibe — discard or sharpen it.

**Show the ranked list to the user before testing.** Domain knowledge re-ranks instantly ("we just deployed a change to #3"). Cheap checkpoint, big time saver. Don't block — proceed with your ranking if the user is away.

## Phase 4: Instrument — one variable at a time

Each probe maps to a specific Phase-3 prediction. Tool preference:

1. **Debugger / REPL** — one breakpoint beats ten logs.
2. **Targeted logs** at the boundaries that distinguish hypotheses.
3. Never "log everything and grep".

**Tag every debug log** with a unique prefix (`[DEBUG-a4f2]`). Cleanup becomes a single grep; untagged logs survive, tagged logs die.

- **Multi-component systems:** before proposing fixes, log what enters and exits each component boundary and run once — the evidence shows *which layer* breaks; investigate that one.
- **Error deep in the call stack:** trace the bad value backward — where does it originate, who called with it — until you find the source. Fix at the source, never at the symptom.
- **Waiting on async behavior:** poll a condition (`waitFor`-style), never sleep-and-hope.
- **Performance regressions:** logs are usually wrong. Baseline measurement first (timing harness, profiler, query plan), then bisect. Measure first, fix second.

## Phase 4.5: Question the architecture

**After 3 failed hypothesis tests** — or when each fix reveals a new problem elsewhere — STOP fixing. The pattern is the problem:

- Is this "sticking with it through sheer inertia"?
- Refactor the architecture vs. keep fixing symptoms?

Discuss with the user before attempting more fixes — this is a wrong architecture, not a failed hypothesis. `seam-design` is the shared vocabulary for that conversation.

## Phase 5: Fix + regression test

Write the regression test **before the fix**, but only at a **correct seam** — one where the test exercises the real bug pattern as it occurs at the call site. A too-shallow seam (single-caller test for a multi-caller bug) gives false confidence.

**If no correct seam exists, that itself is the finding:** the architecture prevents locking this bug down. Note it — it feeds Phase 4.5 and the next `seam-design` pass.

If a correct seam exists:

1. Turn the minimised repro into a failing test at that seam.
2. Watch it fail — for the expected reason (the `seam-driven-tdd` verify-RED rule applies).
3. Apply the fix.
4. Watch it pass.
5. Re-run the Phase 1 loop against the original, un-minimised scenario.

Then **harden**: add validation at the layers that let the bug through — input validation, invariant checks, assertions at boundaries — so this bug class becomes structurally impossible.

## Phase 6: Cleanup

Required before declaring done:

- [ ] Original repro no longer reproduces (re-run the Phase 1 loop)
- [ ] Regression test passes (or absent seam documented as a finding)
- [ ] All `[DEBUG-...]` instrumentation removed (grep the prefix)
- [ ] Throwaway harnesses deleted (or moved to a clearly-marked debug location)
- [ ] The hypothesis that proved correct is stated in the commit / PR message — the next debugger learns

## Red Flags — STOP, return to Phase 1

"Quick fix for now, investigate later" · "Just try changing X and see" · "Add multiple changes, run tests" · "Skip the test, I'll manually verify" · "It's probably X, let me fix that" · "I don't fully understand but this might work" · Listing fixes before tracing data flow · "One more fix attempt" (after 2+) · Each fix reveals a new problem elsewhere · "Log everything and grep" · "The repro is small enough, skip minimising" · Testing the first hypothesis without ranking alternatives.

**3+ fixes failed? Question the architecture (Phase 4.5), don't fix again.**

**User signals you're doing it wrong:** "Is that not happening?" (you assumed without verifying) · "Stop guessing" (fixes without understanding) · "Ultra-think this" (question fundamentals) · "We're stuck?" (the approach isn't working). See them → return to Phase 1.

## Common Rationalizations

| Excuse | Reality |
|---|---|
| "Issue is simple, don't need process" | Simple bugs have root causes too; the process is fast for them. |
| "Emergency, no time for process" | Systematic is FASTER than guess-and-check thrashing. |
| "Just try this first, then investigate" | First fix sets the pattern. Do it right from the start. |
| "I'll test after confirming the fix works" | Untested fixes don't stick. Test first proves it. |
| "Multiple fixes at once saves time" | Can't isolate what worked; causes new bugs. |
| "I see the problem, let me fix it" | Seeing symptoms ≠ understanding root cause. |
| "One hypothesis is enough here" | First plausible ≠ most likely. Rank 3–5 or anchor on a guess. |
| "Minimising is busywork" | Every un-minimised element is a suspect you didn't eliminate. |
| "One more fix attempt" (after 2+) | 3+ failures = architectural problem. Phase 4.5, not another fix. |

## When the Process Reveals "No Root Cause"

If investigation shows the issue is truly environmental, timing-dependent, or external: document what you investigated, implement appropriate handling (retry, timeout, error message), and add monitoring for future investigation. But 95% of "no root cause" cases are incomplete investigation.

## Completion Checklist (then the gate)

- [ ] Feedback loop built, tightened, and still runnable
- [ ] Bug reproduced AND minimised; symptom captured verbatim
- [ ] 3–5 ranked falsifiable hypotheses shown to the user before testing
- [ ] Each probe mapped to a prediction; one variable at a time
- [ ] Regression test written before the fix at a correct seam (or absent seam documented)
- [ ] Original scenario green via the Phase 1 loop; Phase 6 cleanup complete
- [ ] Correct hypothesis stated in the commit / PR message

**All boxes checked ≠ done.** Any completion claim — "fixed", "resolved", "root cause found" — goes through the `completion-gate` skill. That gate is the sole exit ritual; this checklist feeds it, never replaces it.
