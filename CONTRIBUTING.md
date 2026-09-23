# Contributing to waypower

Contributions are welcome — especially new skills, sharper evals, and
bug reports from real-world use.

## The bar for a new skill

waypower's own `authoring-skills` discipline applies to every contribution:

1. **RED** — write the evals first (`evals/evals.json`, 4 evals:
   happy path, temptation, positive trigger, negative trigger).
   Run the temptation scenario *without* the skill and capture the
   baseline failing.
2. **GREEN** — write the skill; run the same scenario *with* it and
   capture the with-skill arm passing.
3. **REFACTOR** — tighten wording; re-run until the pair discriminates.

A skill ships only when the paired run **discriminates**: the with-skill
arm must visibly beat the baseline under pressure. See `docs/evals/` for
examples of what a good run log looks like.

## Rules of thumb

- Keep `SKILL.md` short and imperative; push detail into `references/`.
- Frontmatter needs exactly `name` and `description`; the description
  must start with "Use when…" so agents know when to fire it.
- Temptation scenarios must leave the shortcut as the agent's own
  choice — never an explicit user prohibition of the skill's practices.
- All content is English-only.

## Process

1. Open an issue describing the skill or change.
2. Fork, branch, and make your change (with evals + run logs).
3. Open a PR linking the issue; describe the paired eval results.

Thank you for helping make agents work better!
