---
name: design-interview
description: "You MUST use this before any creative work — creating features, building components, adding functionality, or modifying behavior. Classifies the request (spike / bounded / architectural), interviews the user in frontier rounds until the design is fully formed, and ends at the written-spec approval gate before any implementation."
---

# Design Interview

Turn ideas into fully formed, validated designs before implementation. Two fused engines: the **three-path classification** (spike / bounded / architectural) scales the process to the request, and the **interview mechanics** (design tree, frontier, rounds) drive the questioning itself. The lifecycle contains exactly one hard gate — written-spec approval; everything else is a light checkpoint.

## Establish Shared Understanding

The outcome of the interview is an understanding your human partner can recognize and correct, grounded in what they want to accomplish.

1. **Discover intent.** Use the request and available context to identify the intended outcome, who it is for, and what success looks like. When that is missing, ask one focused question about purpose or intended use before proposing features or an approach. Knowing the app genre does not tell you why your partner wants it. Gathering missing requirements does not ask them to authorize the task again.
2. **Write back your understanding.** Summarize the intended outcome, relevant constraints, and success criteria in a short note your partner can assess. Separate what they said from assumptions. Invite correction and incorporate their answer before treating this as the design brief.
3. **Carry intent into the design.** Preserve the agreed understanding in the selected path's design artifact: the written spec for architectural work, or the in-chat design/probe for bounded work and spikes. Check proposed features and technical choices against that understanding.

When the request already supplies the purpose and constraints, reflect that understanding instead of asking the same questions again. Keep the note concise; its accuracy and the opportunity to correct it matter.

<HARD-GATE>
Before taking any implementation action, including invoking an implementation skill, writing product code, scaffolding, installing product dependencies, or creating an external project, complete the selected path's prerequisites:

- Spike: the human partner approves the question and probe.
- Bounded: the human partner approves the short in-chat design.
- Architectural: the human partner reviews and approves the written spec, then reviews the written implementation plan and selects its execution method in `tracer-plan`. Conversational design approval only permits writing the spec; written-spec approval only permits invoking `tracer-plan`.

A reply approves the stage actually presented. Approval of an idea or feature scope does not approve artifacts that do not exist yet. Resume at the earliest incomplete stage; do not turn one approval into permission to skip the rest of the selected path. Read-only project exploration is allowed while those prerequisites remain incomplete.
</HARD-GATE>

## Three Paths

Before your first question, classify the request and say the classification out loud — "this looks bounded, so I'll present a short design here rather than write a spec" — so your human partner can override it:

- **Spike** — a feasibility question ("can we...", "is it possible...", "quick and dirty is fine") whose output is an answer, not code you keep. Present the question and what you'll try in 2-3 sentences, get a nod, then find out as cheaply as correctness allows. No design doc, no spec file. Report findings as a recommendation; anything you built stays labeled throwaway and is deleted or rewritten afterward. If the spike reveals real requirements, reclassify.
- **Bounded** — a well-scoped change with a clear approach and few integration points. The design fits in chat; no spec file.
- **Architectural** — a system change, unclear requirements, or many integration points. Interview in rounds, write a spec, get written approval, then plan with `tracer-plan`.

## Bounded Path

Present a short, concrete design in chat, then ask about anything unresolved. One question per message: ask the question with your recommendation and its reasoning, and present multiple-choice options where you can — answerable without much typing. Close unresolved questions until the design is complete, then get your partner's approval before implementing. When you implement, use the `seam-driven-tdd` skill.

Keep this path lightweight; if multiple interdependent questions pile up, that's the signal to reclassify as architectural.

## Architectural Path

### The interview (rounds and frontier)

Map the design space as a **design tree**: every decision branches into the decisions that hang off it. Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled — the questions you can ask _now_ without guessing at answers you haven't heard.

Ask the whole frontier in one round: number each question, give your recommended answer, then wait:

```
❓ **Q1** - **<question title>**: <question body, possibly multiple paragraphs, including multiple choices>

➡️ <your recommended answer>

---

❓ **Q2** - **<question title>**: <question body>

➡️ <your recommended answer>
```

Each round the user answers reshapes the tree: settled decisions push the frontier outward and unblock what depended on them. Recompute the frontier and ask the next round. A question whose answer depends on a question still open in this round belongs to a **later** round, not this one.

**Finding facts is your job, never the user's.** When a frontier question needs a fact from the environment (filesystem, tools, docs), dispatch a sub-agent to find it — don't ask the user anything you could look up yourself. Don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait; ask the rest of the frontier now. The **decisions** are the user's: put each to them and wait.

The interview is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed.

### Present the design

Present the design in sections scaled to their intellectual merit — a tricky decision with real tradeoffs might get 200-300 words and its own message; a straightforward one a few sentences among others. Ask your partner to review the full design before moving on. If they ask for changes, make them and re-present. In this mode, "approved" means your partner explicitly signed off on the design you presented — no remaining open questions; it is their call what still needs attention.

Only this sign-off permits writing the spec.

### The spec

Write, self-review, and gate the spec per [SPEC-GATE.md](SPEC-GATE.md): the `docs/specs/` file convention, the 4-point self-review (placeholders, consistency, scope, ambiguity), the exact user-gate wording, and the domain-language rule.

**Next step:** invoke `tracer-plan`. Do NOT invoke any other skill. Conversational approval of the design did not approve the spec; spec approval does not approve skipping the plan.

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "I could just start building and see how it goes" | Unvalidated designs lead to wasted work and unforced errors. The interview takes minutes; rebuilding takes hours or days. |
| "This is just a small question/change" | Small changes still benefit from intent-checking and can hide design decisions that affect the broader system. |
| "I need to explore the codebase first to understand the problem" | Understanding context and proposing solutions are different activities. Do read-only exploration freely, but validate intent before proposing architecture. |
| "The requirements are clear enough" | "Clear enough" often means "I made assumptions." Validate them through the interview before building. |
| "I'll just present one option and save time" | The frontier format exists to present decisions with recommendations — your partner can't make informed choices without seeing them. |
| "One approval covers everything" | Approval of an idea, a design, and a written spec are separate stages with different artifacts. The gate tracks stage, not vibes. |
| "The design is approved, I can start coding" | Conversational design approval only permits writing the spec; spec approval only permits `tracer-plan`. |
| "One question at a time is safer than a big round" | Serial questions stall on decisions the user could answer in parallel. Ask the whole frontier in one round; only dependent questions wait for later rounds. |
| "I should ask the user where X lives / what version Y is" | Facts are your job. Dispatch a sub-agent; ask the user only for decisions. |

## Red Flags — STOP

- About to write product code, scaffold, or install dependencies before the path's gate is passed
- Frontier not empty but you're treating the design as done
- Asking the user for a fact you could look up
- Asking a question whose prerequisite is still open in this round
- Treating idea approval as spec approval
- Skipping the spec self-review because "the user will catch it"

## Completion Checklist

Before claiming the design phase is done — via the `completion-gate` skill, which this checklist feeds and never replaces:

- [ ] Classification spoken out loud; partner had the chance to override
- [ ] Shared understanding written back, assumptions separated, corrections incorporated
- [ ] Interview ran in frontier rounds; every question numbered with a recommended answer; frontier empty at the end
- [ ] Facts gathered by sub-agents, not asked of the user
- [ ] (Architectural) design presented in merit-scaled sections and explicitly approved
- [ ] (Architectural) spec written to `docs/specs/`, self-reviewed (4 checks), committed, and explicitly approved by the user
- [ ] Next step is `tracer-plan` — nothing else
