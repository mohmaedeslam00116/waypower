# Review Dispatch

The Standards axis payload for [SKILL.md](SKILL.md): the Fowler smell baseline. Read it when dispatching a review and paste it **in full** into the Standards sub-agent's prompt — a sub-agent never sees this file, only what you hand it. Bound by the two rules in SKILL.md: the repo standard always overrides, and every smell is a judgement call, never a hard violation.

## The smell baseline

What it is → how to fix (Fowler, _Refactoring_, ch.3):

- **Mysterious Name** — a name that doesn't reveal what it does or holds → rename it; if no honest name comes, the design's murky.
- **Duplicated Code** — the same logic shape in more than one hunk or file → extract the shared shape, call it from both.
- **Feature Envy** — a method reaching into another object's data more than its own → move the method onto the data it envies.
- **Data Clumps** — the same few fields or params travelling together → bundle them into one type, pass that.
- **Primitive Obsession** — a primitive standing in for a domain concept → give the concept its own small type.
- **Repeated Switches** — the same switch/if-cascade on the same type recurring → polymorphism, or one map both sites share.
- **Shotgun Surgery** — one logical change forcing scattered edits across many files → gather what changes together into one module.
- **Divergent Change** — one file edited for several unrelated reasons → split so each module changes for one reason.
- **Speculative Generality** — abstraction, parameters, or hooks the spec doesn't need → delete it; inline back until a real need shows.
- **Message Chains** — long `a.b().c().d()` navigation → hide the walk behind one method on the first object.
- **Middle Man** — a class or function that mostly delegates onward → cut it, call the real target direct.
- **Refused Bequest** — a subclass ignoring most of what it inherits → drop the inheritance, use composition.

