# Ticket: Docs — real session transcripts on skill pages

**Status:** closed · **Blocked by:** — (pairs naturally with t02's session capture) · **Frontier order:** 8

## Decision / deliverable

Each process-skill page gains a short REAL transcript excerpt (captured from an actual waypower session, lightly formatted, in the homepage transcript's visual language via a shared MDX component). Honesty rule: excerpts from real runs only, labeled as such.

## Done when

At least the 6 pipeline-stage skills carry a transcript block; component shared; evidence (source sessions) noted in the ticket.

## Answer

Shipped in waypower-docs `419911e` (2026-09-23), deployed to gh-pages.

- Shared `Transcript` MDX component (`src/components/Transcript`) extracted from the homepage hero; all transcript blocks on skill pages now use it, with a `REAL` label and a source caption per block.
- Transcript blocks live on the 6 pipeline-stage skill pages plus hypothesis-debugging. Excerpt lines on hypothesis-debugging and finish-handoff were tightened during review.
- Honesty rule held: the dual-axis-review excerpt is sourced from the actual dual-axis review of the t08+t09 diff itself (2026-09-23, two review sub-agents, FIX-THEN-SHIP on both axes, P1s landed); the other excerpts come from real waypower sessions captured earlier. Live evidence: transcript block + REAL tag served on `/docs/skills/dual-axis-review`; homepage stat corrected 12/13 → 13/13 (dual-axis-review.mdx was the missing 13th page).
