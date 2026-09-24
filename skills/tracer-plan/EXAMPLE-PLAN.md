# Example Plan — due dates for todos

One complete worked plan, written to the tracer-plan rules. The feature is deliberately small so the *shape* is what you read. Code is real TypeScript, trimmed to the decision-rich lines (test helpers like `makeTestDb` stay elided). Read it alongside the SKILL.md rules — the closing section maps each rule to where it shows up.

**Approved spec:** `docs/specs/2026-09-24-todo-due-dates.md` — users can set an optional due date on a todo; the list flags overdue items. Day granularity; no timezones.
**Plan file:** `docs/plans/2026-09-24-todo-due-dates.md`

## Requirements → tasks

| Spec requirement | Task |
|---|---|
| Set an optional due date; API accepts and returns it | 1 |
| Overdue rule: due before today and not done | 2 |
| List can be filtered to overdue only | 2 |
| List UI shows the due date and an overdue badge | 3 |

## File map

- `migrations/0007_todos_due_date.sql` — the new column
- `src/todos/todo.ts` — `Todo` type and the `isOverdue` rule
- `src/todos/repo.ts` — persistence
- `src/todos/routes.ts` — HTTP handlers
- `web/TodoList.tsx` — list UI

## Task 1 — Store and return an optional due date

**Blocked by:** — (starts immediately)
**Acceptance:** `POST /todos` accepts `dueDate`; `GET /todos` returns it; rows without one return `null`.

1. **Failing test — the repo round-trips a due date.** Commit: `test(todos): due date round-trip (red)`.

   ```ts
   // src/todos/repo.test.ts
   it("round-trips an optional due date", () => {
     const repo = makeTodoRepo(makeTestDb());
     const id = repo.create({ title: "renew passport", dueDate: "2026-10-01" });
     expect(repo.get(id)?.dueDate).toBe("2026-10-01");
     const bare = repo.create({ title: "no date" });
     expect(repo.get(bare)?.dueDate).toBeNull();
   });
   ```

2. **Migration + column plumbing — the test goes green.** Commit: `feat(todos): add due_date column`.

   ```sql
   -- migrations/0007_todos_due_date.sql
   ALTER TABLE todos ADD COLUMN due_date TEXT; -- ISO date, NULL = none
   ```

   ```ts
   // src/todos/todo.ts
   export interface Todo {
     id: string;
     title: string;
     done: boolean;
     dueDate: string | null; // ISO YYYY-MM-DD
   }
   ```

   The repo's create/get paths map `due_date` ↔ `dueDate`; typecheck green.

3. **Failing test — the API carries the field.** Commit: `test(todos): api carries dueDate (red)`.

   ```ts
   // src/todos/routes.test.ts
   it("POST /todos stores dueDate and GET returns it", async () => {
     const app = makeApp();
     await request(app).post("/todos").send({ title: "x", dueDate: "2026-10-01" }).expect(201);
     const res = await request(app).get("/todos");
     expect(res.body[0].dueDate).toBe("2026-10-01");
   });
   ```

4. **The handler parses the field — green.** Commit: `feat(todos): accept dueDate in POST /todos`.

   ```ts
   // src/todos/routes.ts
   app.post("/todos", (req, res) => {
     const { title, dueDate = null } = req.body;
     const id = repo.create({ title, dueDate });
     res.status(201).json({ id });
   });
   ```

**Review Focus:** due dates are stored as ISO strings, not timestamps — the spec says day granularity; rejecting that rejects the spec, not the code. The `dueDate = null` default keeps older clients working.

## Task 2 — The overdue rule, queryable

**Blocked by:** Task 1 (needs `due_date` persisted)
**Acceptance:** `isOverdue(todo, today)` is `dueDate < today && !done`; `GET /todos?overdue=true` filters by it.

1. **Failing test — the rule's truth table.** Commit: `test(todos): isOverdue truth table (red)`.

   ```ts
   // src/todos/todo.test.ts
   const today = "2026-09-24";
   it.each([
     [{ dueDate: "2026-09-23", done: false }, true],  // past due
     [{ dueDate: "2026-09-24", done: false }, false], // due today is not overdue
     [{ dueDate: "2026-09-25", done: false }, false], // future
     [{ dueDate: "2026-09-23", done: true }, false],  // done beats overdue
     [{ dueDate: null, done: false }, false],         // no date
   ])("isOverdue(%o) === %s", (patch, expected) => {
     expect(isOverdue({ ...baseTodo, ...patch }, today)).toBe(expected);
   });
   ```

2. **Implement the rule — green.** Commit: `feat(todos): isOverdue`.

   ```ts
   // src/todos/todo.ts
   export function isOverdue(todo: Todo, today: string): boolean {
     return todo.dueDate !== null && !todo.done && todo.dueDate < today;
   }
   ```

3. **Failing test — the query param filters.** Commit: `test(todos): ?overdue=true filter (red)`.

   ```ts
   // src/todos/routes.test.ts
   it("GET /todos?overdue=true returns only overdue", async () => {
     const app = makeApp({ today: "2026-09-24" });
     await request(app).post("/todos").send({ title: "late", dueDate: "2026-09-01" });
     await request(app).post("/todos").send({ title: "fine", dueDate: "2026-10-01" });
     const res = await request(app).get("/todos?overdue=true");
     expect(res.body.map((t: Todo) => t.title)).toEqual(["late"]);
   });
   ```

4. **Wire the filter — green.** Commit: `feat(todos): filter overdue in GET /todos`.

   ```ts
   // src/todos/routes.ts
   app.get("/todos", (req, res) => {
     const all = repo.list();
     res.json(req.query.overdue === "true" ? all.filter((t) => isOverdue(t, today())) : all);
   });
   ```

**Review Focus:** string comparison on ISO dates is deliberate (day granularity, no timezones) — do not "upgrade" to `Date` parsing here. `today` is injected, never read from the clock inside the rule, so tests stay deterministic.

## Task 3 — Show the date and flag overdue in the list

**Blocked by:** Task 2 (the badge needs the shipped rule)
**Acceptance:** each row shows its due date if it has one; overdue rows show a red "Overdue" badge.

1. **Failing test — the badge appears exactly when overdue.** Commit: `test(web): overdue badge (red)`.

   ```tsx
   // web/TodoList.test.tsx
   it("badges overdue rows only", () => {
     render(
       <TodoList
         today="2026-09-24"
         todos={[
           { id: "1", title: "late", done: false, dueDate: "2026-09-01" },
           { id: "2", title: "fine", done: false, dueDate: "2026-10-01" },
           { id: "3", title: "plain", done: false, dueDate: null },
         ]}
       />
     );
     expect(screen.getByText("late").closest("li")).toHaveTextContent("Overdue");
     expect(screen.getByText("fine").closest("li")).not.toHaveTextContent("Overdue");
     expect(screen.getByText("plain").closest("li")).not.toHaveTextContent("Overdue");
   });
   ```

2. **Render the date and badge — green.** Commit: `feat(web): due date and overdue badge in TodoList`.

   ```tsx
   // web/TodoList.tsx
   export function TodoList({ todos, today }: { todos: Todo[]; today: string }) {
     return (
       <ul>
         {todos.map((t) => (
           <li key={t.id}>
             {t.title}
             {t.dueDate && <time>{t.dueDate}</time>}
             {isOverdue(t, today) && <span className="badge-danger">Overdue</span>}
           </li>
         ))}
       </ul>
     );
   }
   ```

3. **Pass `today` in at the page boundary — one place.** Commit: `feat(web): wire today into the todos page`.

   ```tsx
   // web/TodosPage.tsx (excerpt)
   <TodoList todos={todos} today={serverToday} />
   ```

**Review Focus:** the UI calls the same `isOverdue` from the domain module — no second copy of the rule in the frontend. `today` enters at the page boundary so the list component stays pure.

## Why this plan is shaped this way

- **Vertical slices:** every task leaves the system demoable — Task 1 at the API, Task 2 at the query, Task 3 in the UI. No horizontal layer-tasks.
- **Blocking edges:** Task 2 waits for Task 1's column; Task 3 waits for Task 2's rule. Task 1 can start immediately.
- **Bite-sized, test-first, one commit per step:** no step mixes a failing test with its fix.
- **Types compile at every step:** `dueDate` is `string | null` from its first appearance; no step leaves a broken reference behind.
- **Scaffolding absorbed:** Task 1 carries the migration and the type change, so Tasks 2–3 have no setup steps.
- **Review Focus** names the judgment calls a fresh reviewer cannot see in the diff: ISO strings, the injected clock, one rule living in one place.