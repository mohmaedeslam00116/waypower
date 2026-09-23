# Optional session-start hook

`using-waypower` is self-sufficient via description-triggering. This snippet is an **enforcement upgrade** for harnesses that support session-start hooks — never a dependency.

The hook injects one line of context at session start so the 1% rule is present even if the harness's skill-indexing is lazy:

```
If there is even a 1% chance that one of the nine waypower process skills applies
(design-interview, tracer-plan, seam-driven-tdd, hypothesis-debugging,
completion-gate, domain-glossary, seam-design, dual-axis-review,
authoring-skills), you MUST invoke it before any response.
```

## Wiring examples

- **Claude Code** (`.claude/settings.json`):

```json
{
  "hooks": {
    "SessionStart": [{
      "hooks": [{
        "type": "command",
        "command": "echo 'If there is even a 1% chance one of the nine waypower process skills applies, invoke it before any response. See skills/using-waypower/SKILL.md.'"
      }]
    }]
  }
}
```

- **Any other harness:** put the one-line rule wherever the harness accepts session-start context (system-prompt appendix, AGENTS.md header, etc.).

If the harness has no hook mechanism, do nothing — the description trigger is the baseline and is sufficient.
