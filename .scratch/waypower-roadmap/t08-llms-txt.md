# Ticket: Agent-consumable docs — llms.txt + copy-as-markdown

**Status:** closed · **Blocked by:** — · **Frontier order:** 7

## Decision / deliverable

Serve `llms.txt` (+ `llms-full.txt` if feasible) at the docs site root listing every page with one-line summaries, and add a per-doc-page "copy as Markdown" affordance. The docs become readable by the very agents waypower teaches.

## Done when

`https://mohmaedeslam00116.github.io/waypower-docs/llms.txt` returns text/plain with the full index; copy affordance verified on at least one skill page; build green, deployed.

## Answer

Shipped in waypower-docs `419911e` (2026-09-23), deployed to gh-pages.

- Local postBuild plugin `plugins/llms/index.js` writes `llms.txt`, `llms-full.txt`, and 16 raw Markdown twins under `/md/`. A swizzled `DocItem/Content` adds a **copy as markdown** affordance on every docs page (`src/components/CopyMarkdown`), with `aria-live="polite"` status and a "copy failed — retry" error label.
- Live evidence (all 200): `llms.txt` → text/plain, 4,347 bytes, 20 index lines in 4 sections; `llms-full.txt` → text/plain, 32,187 bytes; `/md/skills/hypothesis-debugging.md` → text/markdown; copy button present in served HTML of skill pages; footer links llms.txt.
- Build green, zero warnings. Hardening from dual-axis review: DOC_ORDER has a reverse guard (build throws if a doc on disk is missing from the list), the frontmatter parser skips YAML continuation lines, and the footer link stays an absolute URL because the Docusaurus broken-link checker rejects relative links to postBuild-generated static assets.
