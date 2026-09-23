---
name: finish-handoff
description: "Use when implementation is complete and verified, to integrate the work (merge / pull request / keep the branch), clean up the workspace, and compact the session into a handoff the next agent can pick up. Manual tool skill — invoked by name."
---

# Finish + Handoff

Two sequential phases: **Finish** integrates the completed work (merge / PR / keep), then **Handoff** compacts the session into a summary the next agent can start from.

**Core principle:** the integration decision belongs to your human partner; the handoff belongs to the next agent. Verify → detect → present options → execute choice → clean up → compact.

## Prerequisite

`completion-gate` has passed for this work: tests green on the current tree, verification evidence produced. This skill never re-runs that gate and never replaces it. If it hasn't run, stop and invoke it first.

## Phase 1 — Finish the Branch

### Step 1: Detect Environment

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
WORKTREE_PATH=$(git rev-parse --show-toplevel)   # capture now; cleanup runs after cd
```

| State | Menu | Cleanup |
|-------|------|---------|
| `GIT_DIR == GIT_COMMON` (normal repo) | Standard 3 options | No worktree |
| `GIT_DIR != GIT_COMMON`, named branch | Standard 3 options | Provenance-based (Step 5) |
| `GIT_DIR != GIT_COMMON`, detached HEAD | Reduced 2 options | Externally managed — leave in place |

### Step 2: Determine Base Branch

The base is whatever this work forked from — usually named in the plan, the conversation, or the branch's upstream. If unknown, ask: "This branch split from `<best guess>` — is that correct?" Confirm before merging; merging into the wrong base is expensive to undo.

### Step 3: Present Options — exactly these, then wait

Normal repo / named-branch worktree:

```
Implementation complete. What would you like to do?

1. Merge back to <base-branch> locally
2. Push and create a Pull Request
3. Keep the branch as-is (I'll handle it later)

Which option?
```

Detached HEAD: replace option 1 with "Push as new branch and create a Pull Request" and drop the merge option. Present the menu as written and **wait** — the decision is your partner's. Discarding the work is not on the menu; it happens only if they ask for it in so many words (see Step 4).

### Step 4: Execute Choice

**Merge locally:** from the main repo root — `git checkout <base> && git pull && git merge <branch>` — then re-run the test suite on the merged result. If the merged result fails: stop, leave branch and worktree in place, investigate; nothing is pushed, the merge is local and recoverable. Only when merged-green: clean up (Step 5), then delete the branch.

**Pull request:** push, create the PR, report the URL. Branch and worktree stay — PR feedback gets fixed there.

**Keep as-is:** report state; Phase 1 is done.

**Discard (explicit request only):** require the typed word `discard` — "yeah, get rid of it" does not count. On that exact confirmation: clean up the worktree (Step 5), then `git branch -D <branch>`.

### Step 5: Cleanup Workspace

Runs for local-merge and confirmed discards; PR/keep always preserve the worktree. Run from the main repo root using the values captured in Step 1.

- Normal repo: nothing to do.
- Worktree this project created (under `.worktrees/` / `worktrees/` or equivalent): `git worktree remove "$WORKTREE_PATH"`, then `git worktree prune`.
- **Removal refused** (modified or untracked files): those files exist nowhere else. Never `--force` on your own initiative. Show `git -C "$WORKTREE_PATH" status --porcelain -uall` and offer: commit them to the branch / move them into the main repo / delete them (unrecoverable). Carry out the choice, then remove.
- Otherwise the host environment owns the workspace — leave it in place.

## Phase 2 — Compact the Handoff

Summarize the session so a fresh agent can continue. Destination: if the work ran under an issue-tracker ticket, the summary is the ticket's **closing comment**; otherwise write a Markdown handoff doc to the OS temp directory — not the workspace.

**Include:** the goal; current state (what works, what was verified); decisions made and *why*; open loops and exact next steps; a **suggested skills** section naming the waypower skills the next agent should invoke.

**Exclude:** anything already captured in durable artifacts — specs, plans, ADRs, tickets, commits, diffs. Reference them by path or URL instead. The handoff is a map, not a copy.

**Redact** API keys, passwords, and personally identifiable information. If the user passed an argument describing the next session's focus, tailor the handoff to it.

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Tests passed earlier this session" | A green run only proves the tree it ran on. completion-gate covers the current tree; a local merge re-verifies the merged result. |
| "They obviously want it merged" | Integration is your partner's decision. Present the menu and wait. |
| "They seem done — I'll offer to discard" | The menu is complete as written. Discard happens only when asked for in so many words. |
| "'Get rid of it' counts as confirmation" | Only the typed word `discard` authorizes deletion. |
| "The PR is up, so the worktree is clutter" | PR feedback gets fixed in that worktree. It stays until the work lands. |
| "Removal refused — `--force` just finishes the cleanup" | Refusal means files exist only there. Show them and ask. |
| "The merged-result failure is probably flaky" | A failing merged result stops everything; branch and worktree stay put while you investigate. |
| "The base branch is obviously main" | Confirm the fork point or ask — merging into the wrong base is expensive to undo. |
| "The push was rejected — force-push will fix it" | A rejected push means the remote moved. Investigate; force-push only on your partner's explicit request. |
| "The handoff should recap everything, diff included" | Duplicating durable artifacts makes two sources of truth; reference by path. |
| "No ticket, so no summary needed" | No ticket → the temp-dir handoff doc carries the same content. |

## Red Flags — STOP

- Integration started before `completion-gate` passed
- About to merge or push without presenting the menu and waiting
- About to delete anything without the typed word `discard`
- `--force` on a worktree removal that was refused
- Handoff duplicating spec/plan/ADR content instead of referencing it
- Handoff containing secrets or PII

## Completion Checklist

Feeds `completion-gate`; never replaces it:

- [ ] `completion-gate` evidence exists for the current tree
- [ ] Environment detected; base branch confirmed
- [ ] Menu presented as written; partner's choice awaited and executed
- [ ] Merged result re-verified green before branch deletion
- [ ] Worktree cleanup followed provenance; refusal handled without `--force`
- [ ] Handoff written to the ticket's closing comment (or temp doc): suggested skills included, references not copies, secrets redacted

## In Waypower

Manual tool skill — the orchestrator may *suggest* it after `completion-gate` passes, but never auto-triggers it. Runs after `dual-axis-review` (review before merge) and feeds nothing downstream: it is the lifecycle's exit. The handoff's references-not-copies rule is the hybrid state split: durable artifacts in `docs/` and git, process state in the tracker, the handoff as the map between them. Worktree *creation* belongs to the compatible companion `using-git-worktrees`; this skill only handles cleanup.
