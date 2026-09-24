# Spec Gate

The architectural path's spec stage for [SKILL.md](SKILL.md): file convention, self-review, and the user review gate. Only the architectural path needs this file — spike and bounded never write a spec.

- Write the validated design to `docs/specs/YYYY-MM-DD-<topic>-design.md` (user preferences override) and commit it.
- **Self-review first:** (1) placeholder scan — any "TBD"/"TODO"/vague requirement? fix it; (2) internal consistency — contradictions? architecture matching the feature descriptions?; (3) scope check — focused enough for a single `tracer-plan` plan, or does it need decomposition?; (4) ambiguity check — could any requirement be read two ways? pick one, make it explicit. Fix inline; no re-review loop.
- **Then the user review gate:** "Spec written and committed to `<path>`. Please review it and let me know if you want any changes before we plan implementation." Wait for the response. If they request changes, make them and re-run the self-review. Only proceed once the user approves.
- Write the design in domain language: terms follow the project's `CONTEXT.md` (see `domain-glossary`); module/interface/seam decisions use `seam-design` vocabulary. Include targeted improvements to code you're touching as part of the design — a good developer improves the code they work in — but no unrelated refactoring.

