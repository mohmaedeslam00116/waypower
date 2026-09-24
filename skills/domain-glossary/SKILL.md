---
name: domain-glossary
description: "Build and sharpen the project's domain model, and own its CONTEXT.md glossary. Use when discussing codebase terminology, writing or editing a CONTEXT.md, or recording or editing an ADR."
---

# Domain Glossary

Actively build and sharpen the project's domain model as you design. This is the *active* discipline: challenging terms, inventing edge-case scenarios, and writing the glossary and decisions down the moment they crystallise. (Merely *reading* `CONTEXT.md` for vocabulary is not this skill: that's a one-line habit any skill can do. This skill is for when you're changing the model, not just consuming it.)

This skill owns the project's `CONTEXT.md`. Every other waypower skill writes tests, tickets, specs, and plans in its language.

## File structure

Most repos have a single context:

```
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

If a `CONTEXT-MAP.md` exists at the root, the repo has multiple contexts — the per-context layout and the rules for inferring which structure applies live in [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md).

Create files lazily: only when you have something to write.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with the existing language in `CONTEXT.md`, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y. Which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account': do you mean the Customer or the User? Those are different things." A rename that doesn't resolve which meaning goes where just moves the confusion — semantics first, rename second.

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible. Which is right?"

### Update CONTEXT.md inline

When a term is resolved, update `CONTEXT.md` right there. Don't batch these up: capture them as they happen. Use the format in [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md).

`CONTEXT.md` should be totally devoid of implementation details. Do not treat `CONTEXT.md` as a spec, a scratch pad, or a repository for implementation decisions. It is a glossary and nothing else.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse**: the cost of changing your mind later is meaningful
2. **Surprising without context**: a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off**: there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. A directory full of trivial ADRs teaches readers to ignore all of them. Use the format in [ADR-FORMAT.md](./ADR-FORMAT.md).

## In waypower

- `seam-driven-tdd`, `tracer-plan`, and `design-interview` write their tests, tickets, and specs in this glossary's language.
- Terms resolved inside any other skill's session are captured inline here — the moment they crystallise, not batched at the end.
- A claim that the glossary or an ADR set is complete goes through `completion-gate`, like any completion claim.
