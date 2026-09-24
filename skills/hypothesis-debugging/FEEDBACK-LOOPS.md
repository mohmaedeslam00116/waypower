# Feedback Loops

The ten proven shapes for building the Phase 1 pass/fail signal, with construction recipes and tightening techniques. Assumes [SKILL.md](SKILL.md) Phase 1 — this is the catalog it points to. Shapes are in roughly preference order: pick the first one that can reach your bug.

## 1. Failing test

The default. Reach the bug through whatever test seam already exists (unit, integration, e2e).

**Recipe:** write the assertion that encodes the *symptom* — the exact wrong value or behavior — at the narrowest seam that reaches the bug. Run only that test (filter/watch flags), never the whole suite.

## 2. Curl / HTTP script

For bugs behind a running server.

**Recipe:** capture the failing request once (browser devtools → copy as curl), strip headers to the minimum that still reproduces, then script the assertion: `curl -s localhost:3000/api/x | grep -q '"total":42'`. Exit code is the signal.

## 3. CLI invocation + fixture

For tools, compilers, generators, scripts.

**Recipe:** freeze a bug-triggering input as a fixture file, run the CLI against it, diff stdout against a known-good snapshot: `diff <(tool fixture.in) golden.out`. No golden output yet? The current *wrong* output becomes the snapshot until the fix lands — the diff going green IS the signal.

## 4. Headless browser script

For DOM, console, or network-layer bugs.

**Recipe:** a short Playwright script that loads the page, performs the minimal gesture, and asserts on the symptom (element text, console error, failed request). Pin viewport, disable animations, block third-party requests.

## 5. Replay a captured trace

For bugs that need production-shaped input.

**Recipe:** capture the real payload once (saved request, HAR, queue message, event log), redact secrets, and replay it through the path in isolation — a script that feeds the trace straight to the handler, no live system needed.

## 6. Throwaway harness

For bugs buried deep in a subsystem.

**Recipe:** one new file that imports the suspect unit, stubs its dependencies at the seam, calls it with the bug-triggering arguments, and asserts. Minimal boot, total control. Delete it in Phase 6 cleanup.

## 7. Property / fuzz loop

For bugs across an input space (parsers, serializers, math).

**Recipe:** generate 1000 seeded random inputs, assert the invariant on each, and when one fails, shrink to the minimal failing input. Print the seed on every run so any red run replays exactly.

## 8. Bisection harness

For "this worked last month" regressions.

**Recipe:** script the full check — boot at the checked-out state, trigger, exit 0 or 1 — so `git bisect run ./check.sh` walks history unattended. Slow boot is fine here; unattended beats fast.

## 9. Differential loop

For migration/refactor regressions where an old version still exists.

**Recipe:** run the same input through old and new builds (two worktrees, two containers, two ports) and diff the outputs. Every divergence is a finding — including "improvements" you never intended.

## 10. HITL script

Last resort, when no agent-runnable signal exists.

**Recipe:** write numbered, unambiguous steps for a human — exact inputs, exact where-to-look, and a fixed capture format (screenshot + copied text) that feeds back to you as the next loop input.

## Tightening any loop

- **Faster:** cache expensive setup, narrow the scope to the failing path, skip unrelated boot.
- **Sharper:** assert the specific symptom — the exact wrong value — never "didn't crash".
- **Deterministic:** pin time (fake timers), seed the RNG, isolate the filesystem (fresh tmp dir per run), freeze the network (record/replay or stub).

The bar: a 30-second flaky loop is barely better than none; a 2-second deterministic one is a superpower.

## Non-deterministic bugs

The goal is not a clean repro but a **higher reproduction rate**: loop the trigger 100×, parallelise, add stress/load, inject sleeps at suspected race windows. A 50% flake is debuggable; 1% is not. Log every iteration's seed and inputs so a red run is replayable — an irreproducible red is no signal at all.
