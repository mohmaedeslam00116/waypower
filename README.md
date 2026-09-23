# waypower

> Your agent already knows how to code. **waypower teaches it how to work.**

[![skills.sh](https://skills.sh/b/mohmaedeslam00116/waypower)](https://skills.sh/mohmaedeslam00116/waypower)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Skills: 13](https://img.shields.io/badge/skills-13-green.svg)](skills/)

**13 pressure-tested agent skills** fusing the best of [mattpocock/skills](https://github.com/mattpocock/skills) and [obra/superpowers](https://github.com/obra/superpowers) into one coherent workflow — from first idea to shipped branch.

## Install

```bash
npx skills add mohmaedeslam00116/waypower
```

Works with Claude Code, Cursor, Codex, GitHub Copilot, Windsurf, Gemini CLI, Cline, and every agent the [skills CLI](https://skills.sh) supports.

## Why waypower?

Left alone, agents improvise their process: they skip design, guess instead of debug, and declare "done" without evidence. waypower gives your agent a **discipline**, not just instructions:

- **An orchestrator that routes every task.** `using-waypower` checks on *every* request whether a process skill applies — even a 1% chance fires it — then announces it: *"Using design-interview to…"*
- **A full idea→ship pipeline.** Interview → vertical-slice plan → seam design → TDD → two-axis review → evidence-based completion → clean branch finish & handoff.
- **Manual power tools** for the big stuff: chart foggy epics into decision maps, run primary-source research, write new skills of your own.

## What's inside

**Process skills — auto-invoked by the orchestrator:**

| Skill | Your agent now… |
|---|---|
| `using-waypower` | Routes every task to the right discipline before doing anything |
| `design-interview` | Refines vague ideas into designs through Socratic questions (hard gate before planning) |
| `tracer-plan` | Plans the thinnest end-to-end slice first, then layers |
| `seam-design` | Designs module seams and contracts before implementation |
| `seam-driven-tdd` | Writes the failing test first — at user-confirmed seams |
| `hypothesis-debugging` | Debugs by falsifiable hypothesis, not guess-and-check |
| `dual-axis-review` | Reviews code on two axes: correctness *and* design fitness |
| `completion-gate` | Treats "done" as a claim that needs evidence |
| `domain-glossary` | Keeps domain language consistent across code and docs |

**Tool skills — invoked when you ask:**

| Skill | Your agent now… |
|---|---|
| `waymap` | Charts big, foggy efforts into a decision map: destination, tickets, blocking edges |
| `finish-handoff` | Finishes branches cleanly and compacts session handoffs |
| `authoring-skills` | Writes new skills with a RED-GREEN-REFACTOR loop |
| `deep-research` | Researches from primary sources, cites them, saves durable findings |

## The flow

```
idea → design-interview → tracer-plan → seam-design → seam-driven-tdd
     → dual-axis-review → completion-gate → finish-handoff → shipped
```

On-ramps: stuck mid-build → `hypothesis-debugging` · epic too big and foggy → `waymap` · deadline fact-check → `deep-research`

## Pressure-tested, not vibes

Every skill ships with its own `evals/evals.json` and has been validated with **paired baseline-vs-with-skill temptation runs** — same prompt, same pressure, one arm with the skill and one without. A skill only ships if the pair *discriminates*: the with-skill arm must visibly beat the baseline under time pressure, sunk cost, and authority pressure.

**12 of 13 skills discriminate cleanly today.** Full, unedited run logs live in [`docs/evals/`](docs/evals/).

## What it looks like

> **You:** "Add a notifications feature — email users when their report is ready."
>
> **Agent (without waypower):** immediately scaffolds a mailer, a queue, and three wrong assumptions.
>
> **Agent (with waypower):** *"Using `design-interview` to refine this before we build anything"* — and asks the two questions that save you a rewrite.

## Built in the open

waypower was itself designed with the wayfinder method — mapped as decision tickets, built batch by batch, and eval-gated before release. The complete eval evidence is preserved in [`docs/evals/`](docs/evals/).

## Credits

waypower fuses and carries work from two excellent MIT-licensed projects — see [NOTICE](NOTICE):

- [mattpocock/skills](https://github.com/mattpocock/skills) — © Matt Pocock
- [obra/superpowers](https://github.com/obra/superpowers) — © Jesse Vincent

## License

MIT — see [LICENSE](LICENSE).
