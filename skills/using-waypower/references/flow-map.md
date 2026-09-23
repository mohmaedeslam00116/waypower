# Flow Map — which waypower skill fits your situation

You don't remember every skill, so consult this map. A **flow** is a path through the skills. Most work travels the **main flow**; **on-ramps** merge onto it; vocabulary layers run underneath everything.

## The main flow: idea → ship

1. **`design-interview`** sharpens the idea by interview. It classifies the work (question / design / build) and holds the HARD GATE between design and build: no building until the design is settled with the user.
2. **Branch: can every question be settled in conversation?** If a question needs a runnable answer (state, business logic, a UI you have to see), detour through a throwaway prototype, bridged by **`finish-handoff`** in both directions: hand off out to the prototype session, hand what you learned back, and reference it from the original thread.
3. **Branch: is this a multi-session build?**
   - **Yes** → **`tracer-plan`**: turn the thread into a spec, split it into tracer-bullet tickets with blocking edges, then execute ticket by ticket, blockers first. If the effort is bigger than a map-less plan can hold — the way to the destination isn't visible yet — escalate to **`waymap`** instead.
   - **No** → build right here, in the same context window, under **`tracer-plan`**'s single-slice path.
4. Either way, every slice is built under **`seam-driven-tdd`** (one red-green cycle at a time, at user-confirmed seams), and the diff closes out through **`dual-axis-review`** (Standards + Spec) before committing.
5. **Exit:** any claim of "done", "fixed", or "works" passes through **`completion-gate`** — the sole exit ritual. Then **`finish-handoff`** integrates the branch and compacts the session for the next agent. Suggest it; the user invokes it.

### Context hygiene

Keep steps 1–3 in one unbroken context window so the interview, spec, and tickets build on the same thinking. Each ticket execution starts fresh, working from the ticket. If the session approaches the smart zone mid-flow, hand off at the nearest phase boundary rather than pushing on degraded.

## On-ramps

A starting situation that generates work, then merges onto the main flow.

- **Something's broken** → **`hypothesis-debugging`**. Ranked hypotheses, one experiment at a time, no fixes before the cause is found. Once you can write a failing test that reproduces the bug, you are on the main flow inside `seam-driven-tdd`.
- **A loose idea too big for one session, wrapped in fog** → **`waymap`**: chart a shared map of decision tickets on the issue tracker and resolve them one at a time until the way is clear. The map's resolutions feed the main flow at step 1.
- **Bugs and requests arriving raw from elsewhere** → triage them first, producing agent-ready issues that step 3 picks up.

## Vocabulary layers (run underneath everything)

- **`domain-glossary`** owns the project's `CONTEXT.md` and ADRs. Test names, ticket titles, specs, and reviews are written in its language.
- **`seam-design`** is the shared vocabulary for module, interface, depth, seam, adapter, leverage, locality. Consult it whenever an interface shape is contested — a reference to read, not a session to run.

## Tools (manual only)

- **`deep-research`** — delegate reading legwork to a background agent against primary sources; it leaves a cited Markdown file in the repo. Its output is something to take *into* step 1.
- **`waymap`** — see on-ramps.
- **`finish-handoff`** — see step 5.
