# Map Schema

The chart-mode scaffolding for [SKILL.md](SKILL.md): the map-body and ticket-body templates and the label convention. Loaded only when charting — work-through sessions never need this file; the map on the tracker is already shaped like this.

## Map body

The whole map at low resolution, loaded once per session. Open tickets are **not** listed: they are open child issues, found by query.

```markdown
## Destination

<what reaching the end of this map looks like: the spec, decision, or change this effort is finding its way to. One or two lines; every session orients to it before choosing a ticket.>

## Notes

<domain; skills every session should consult; standing preferences for this effort>

## Decisions so far

<!-- the index: one line per closed ticket, enough to judge relevance, then zoom the link for the detail the ticket holds -->

- [<closed ticket title>](link): <one-line gist of the answer>

## Not yet specified

<!-- see "Fog of war": in-scope fog you can't ticket yet; graduates as the frontier advances -->

## Out of scope

<!-- see "Out of scope": work ruled beyond the destination; closed, never graduates -->
```

## Ticket body

```markdown
## Question

<the decision or investigation this ticket resolves>
```

Each ticket carries a `waymap:<type>` label, one of `research`, `prototype`, `grilling`, `task` (type selection: see "Ticket Types" in SKILL.md).
