# Ticket: Repo welcome surface — issue templates + Discussions

**Status:** done (closed 2026-09-23) · **Blocked by:** — · **Frontier order:** 3

## Decision / deliverable

CONTRIBUTING.md already exists. Add `.github/ISSUE_TEMPLATE/` (bug report + skill idea, with evals-aware fields), a `config.yml` pointing to docs, and enable GitHub Discussions via `gh`.

## Done when

New-issue page on mohmaedeslam00116/waypower shows the templates; Discussions tab is enabled; links verified live.

## Answer

`.github/ISSUE_TEMPLATE/` shipped on the default branch (commit `5aba3ce`, waypower `master`):

- **bug-report.yml** — skill-affected field, expected-vs-actual, transcript excerpt, harness dropdown (Claude Code / Cursor / Copilot / Windsurf), version, and an **evals check**: reporter flags whether the failing case is uncovered by evals (propose one) or a discrimination gap (eval exists but skill passed anyway).
- **skill-idea.yml** — enforces the CONTRIBUTING bar in form shape: kebab-case name, "Use when…" one-liner, the **temptation scenario** (shortcut stays the agent's own choice), optional 4-eval sketch, evidence from real sessions.
- **config.yml** — blank issues disabled; contact links to the docs site and to Discussions.
- **Discussions enabled** via `gh repo edit --enable-discussions`.

**Completion-gate evidence:** `gh api repos/.../contents/.github/ISSUE_TEMPLATE` lists all 3 files on the remote default branch; all 3 YAML files parse cleanly (PyYAML safe_load); `hasDiscussionsEnabled: true` via API; `/discussions` returns 200. (New-issue chooser pages redirect anonymous fetches to login — template presence verified through the contents API instead, which is what GitHub renders the chooser from.)
