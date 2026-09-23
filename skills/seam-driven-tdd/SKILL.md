---
name: seam-driven-tdd
description: Use when implementing any feature, bugfix, or behavior change — before writing implementation code. Test-first development at user-confirmed seams, with the Iron Law, mandatory verify-RED, and tracer-bullet slicing.
---

# Seam-Driven TDD

Write the test first. Watch it fail. Write minimal code to pass. Tests live at **seams**: the public boundaries where you observe behavior without reaching inside.

**Core principle:** If you didn't watch the test fail, you don't know it tests the right thing. If the seam wasn't confirmed, you don't know the test will survive the next refactor.

**Violating the letter of the rules is violating the spirit of the rules.**

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Wrote code before the test? Delete it. Start over. Don't keep it as "reference", don't "adapt" it, don't look at it. Delete means delete.

**Legitimate exceptions (only with the user's explicit permission):** throwaway prototypes, generated code, configuration files. Thinking "skip TDD just this once" is not an exception — it's the rationalization this skill exists to catch.

## Phase 0 — Agree the Seams (before any test)

**No test is written at an unconfirmed seam.** Before the first RED:

1. Read the project's `CONTEXT.md` (if it exists) — test names and interface vocabulary must match the domain language. If terms are missing or contested, invoke `domain-glossary`.
2. Write down the seams under test and confirm them with the user: *"What's the public interface, and which seams should we test?"*
3. If the shape of the interface itself is in question (module depth, where the seam belongs, what it exposes), consult `seam-design` — it is the shared vocabulary for module, interface, depth, seam, adapter, leverage, and locality. A reference to consult, not a session to run.

Agreeing seams up front is how testing effort lands on critical paths and complex logic instead of every edge case.

## The Loop: RED → verify → GREEN → verify → micro-REFACTOR

### RED — one failing test

One behavior, one seam, clear name in domain language, real code (mocks only at system boundaries — see Mocking).

<Good>
```typescript
test('rejects empty email', async () => {
  const result = await submitForm({ email: '' });
  expect(result.error).toBe('Email required');
});
```
Clear name, tests observable behavior through the interface, expected value is an independent literal.
</Good>

<Bad>
```typescript
test('email validation works', async () => {
  const mock = jest.fn().mockReturnValue({ error: 'Email required' });
  await submitForm({ email: '' }, mock);
  expect(mock).toHaveBeenCalled();
});
```
Vague name, tests the mock not the code, coupled to internals.
</Bad>

### Verify RED — MANDATORY, never skip

Run the test. Confirm: it **fails** (not errors), the failure message is the expected one, and it fails because the feature is missing (not a typo).

- **Passes immediately?** You're testing existing behavior. Fix the test.
- **Errors?** Fix the error and re-run until it fails correctly.

### GREEN — minimal code

The simplest code that passes this test. No anticipation of future tests, no speculative features.

### Verify GREEN

All tests pass, output pristine (no errors or warnings).

### Micro-REFACTOR — inside the loop, small only

Rename, extract a function, remove duplication — anything that fits the current cycle and keeps tests green. **Structural refactors (seams, interfaces, module boundaries) do NOT happen here**: they are deferred to `dual-axis-review`, which is equipped to re-verify behavior across them. Then back to RED for the next slice.


## Slicing: tracer bullets, not horizontal passes

Never write all tests first, then all implementation — bulk tests verify *imagined* behavior and go insensitive to real change. Work in vertical slices: one test → one implementation → repeat. Each test is a **tracer bullet** that responds to what the last cycle taught you.

## Anti-patterns (all banned)

- **Implementation-coupled**: mocks internal collaborators, tests private methods, or verifies through a side channel (querying the DB instead of the interface). The tell: the test breaks on refactor though behavior didn't change.
- **Tautological**: the assertion recomputes the expected value the way the code does, so it passes by construction. Expected values come from an independent source of truth: a known-good literal, a worked example, the spec.
- **Horizontal slicing**: see above.

## Mocking

Mock at **system boundaries only**: external APIs, time/randomness, sometimes database and filesystem (prefer a test DB / tmp dir). Never mock your own classes, internal collaborators, or anything you control.

Design boundaries for mockability: inject dependencies rather than constructing them; prefer SDK-style interfaces (one function per external operation) over a generic fetcher that forces conditional logic inside mocks.

## Common Rationalizations

| Excuse | Reality |
|---|---|
| "Skip TDD just this once" | That's the rationalization this skill exists to catch. |
| "I already manually tested it" | Manual testing is ad-hoc and unrepeatable. "Worked when I tried it" ≠ covered. |
| "Deleting X hours is wasteful" | Sunk cost. Keeping code you can't trust is the real waste. |
| "Keep it as reference" | You'll adapt it. That's testing after. Delete means delete. |
| "Need to explore first" | Fine — throw away the exploration, then start with TDD. |
| "Test is hard to write = tests are wrong" | Hard to test = hard to use. Listen to the test; simplify the interface (see `seam-design`). |
| "TDD slows me down" | TDD is the pragmatic path: bugs caught before commit, refactor without fear. Shortcuts mean debugging in production. |
| "Existing code has no tests" | You're improving it — add tests for what you touch. |

## Red Flags — STOP and start over

Code before test · test after implementation · test passes immediately · can't explain why it failed · "tests added later" · "just this once" · "keep as reference" · "spirit not ritual" · "this is different because..." · a test written at a seam the user never confirmed.

**All of these mean: delete the code, return to Phase 0 or RED.**

## When Stuck

| Problem | Solution |
|---|---|
| Don't know how to test | Write the wished-for API; write the assertion first; ask the user. |
| Test too complicated | Design too complicated — simplify the interface. |
| Must mock everything | Code too coupled — inject dependencies. |
| Test setup huge | Extract helpers; still complex? Simplify the design. |
| Seam unclear / interface shape contested | Consult `seam-design`; confirm with the user before writing the test. |

## Bug Fixes

Every bug fix starts as a failing test reproducing the bug — the test proves the fix and prevents regression. If the bug's cause is unknown, invoke `hypothesis-debugging` first; return here once you can write the reproducing test.

## Completion Checklist (then the gate)

- [ ] Seams confirmed with the user before the first test
- [ ] Every new behavior has a test; watched each fail before implementing
- [ ] Each failure was for the expected reason (missing feature, not typo)
- [ ] Minimal code per cycle; vertical slices only
- [ ] All tests pass; output pristine
- [ ] Tests at seams only; mocks at system boundaries only
- [ ] Edge cases and error paths covered
- [ ] Structural refactors deferred to `dual-axis-review`, not done mid-loop

Can't check all boxes? You skipped TDD. Start over.

**All boxes checked ≠ done.** Any completion claim — "fixed", "works", "ready" — goes through the `completion-gate` skill. That gate is the sole exit ritual; this checklist feeds it, never replaces it.
