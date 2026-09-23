# Ticket: CI — evals on PR + harness install matrix

**Status:** closed · **Blocked by:** — (release gate in t07 depends on it) · **Frontier order:** 5

## Decision / deliverable

GitHub Actions workflow for the pack repo: (a) run the eval suite on PRs touching `skills/**`; (b) install matrix smoke-test (the `npx skills add` path) against harness layouts we claim: Claude Code, Cursor, Cline, Codex CLI — verifying skills land where each harness reads them. Update docs claims to match verified reality.

## Done when

Workflow green on a test PR; docs compatibility statements match matrix results (honesty check); badge optional in README.

## Answer

`.github/workflows/ci.yml` (waypower `8baeb04` + follow-ups, test PR #1 merged `93931f1`):

- **eval-gate job** (PRs/pushes touching `skills/**`): runs `scripts/validate-evals.mjs` — structural gate over all 13 skills (frontmatter name/description ≤1024, evals.json ≥4 evals with prompt/expected_output/expectations, required mix: happy + temptation + positive/negative trigger checks). Behavioral paired runs stay manual per authoring-skills — CI cannot spawn sub-agents.
- **install-matrix job**: 4 cells (claude-code→`.claude/skills`, cursor/cline/codex→`.agents/skills`), installs the checked-out commit via `npx skills add "$GITHUB_WORKSPACE" ... --json` and `scripts/verify-install.mjs` asserts 13/13 installed, correct dir, SKILL.md present.
- **Evidence:** PR #1 all-green run https://github.com/mohmaedeslam00116/waypower/actions/runs/35918256029 (eval-gate 10s + 4 matrix cells pass). CI badge added to README; docs getting-started.mdx compatibility claim rewritten to state CI-verified set (Claude Code, Cursor, Cline, Codex CLI) vs CLI-supported-but-unverified (Copilot, Windsurf, Gemini CLI) — waypower-docs side committed separately.
- **Lessons:** (1) pin `skills@1.7.0` in CI — runner npm cache resolved a stale CLI that ignored `--json` and installed claude-code into `.agents/skills` instead of `.claude/skills`; (2) `--json` still emits ANSI-styled banners on stdout in CI — verifier strips `\u001b[...` escapes before parsing; (3) local-path source (`skills add <abs path>`) works and lets PRs test their own content.
