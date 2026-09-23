---
name: deep-research
description: "Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo. Use when the user wants a topic researched, docs or API facts gathered, or reading legwork delegated to a background agent. Manual tool skill — invoked by name."
---

# Deep Research

Spin up a **background agent** to do the research, so you keep working while it reads.

Its job:

1. Investigate the question against **primary sources** (official docs, source code, specs, first-party APIs), not a secondary write-up of them. Follow every claim back to the source that owns it.
2. Write the findings to a single Markdown file, citing each claim's source.
3. Save it where the repo already keeps such notes; match the existing convention, and if there is none, put it somewhere sensible and say where.

## Doing It Well

- Scope before dispatching: one question per agent. A broad topic becomes several parallel background agents, each with its own file.
- The agent's prompt carries: the question, which sources count as primary for it, where to save, and the citation rule — every claim tagged with the URL or file:line that owns it.
- Findings that feed a design decision are durable artifacts: they belong in `docs/` (or the repo's notes convention), not in the issue tracker; tickets and designs reference them by path.
- When the research answers a `design-interview` question, hand the file to that interview as input. Facts an interview needs are gathered by sub-agents — deep-research is how the heavy reading gets done.

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "I know this from training — no need to check" | Training data ages and generalizes; primary sources are current and specific to this version. |
| "A good blog post covers it" | Secondary sources restate primary ones, with drift. Follow the claim to its owner. |
| "Citations are overhead" | An uncited claim can't be re-verified when the answer is challenged. |
| "I'll paste the findings in chat" | Chat scrolls away; the file is the artifact the next session reads. |

## Red Flags — STOP

- Answering from memory when the user asked for research
- Citing a source you didn't actually open
- Findings that exist only in chat

## Completion Checklist

Feeds `completion-gate`; never replaces it:

- [ ] Background agent(s) dispatched, one scoped question each
- [ ] Every claim traced to a primary source and cited
- [ ] Findings saved to a Markdown file in the repo's notes convention
- [ ] Durable findings referenced by path from any ticket or design that uses them

## In Waypower

Manual tool skill; the orchestrator never auto-triggers it. Sibling distinction: `design-interview` gathers *project* facts via sub-agents inside its interview; deep-research is user-invoked, standalone, and writes durable files. Research findings often become inputs to `design-interview`'s shared understanding.
