# AI Migration Playbook: @devfamily/admiral v5 → v6

This file is written for an **AI coding agent** (Claude Code, Cursor, Copilot, ...) executing
the migration of an application that uses `@devfamily/admiral`. It is the machine-oriented
companion of [MIGRATION.md](./MIGRATION.md) — the same changes, expressed as deterministic
_find → change → verify_ steps. Humans: read MIGRATION.md, or paste the prompt below into
your agent.

**Prompt for the human operator:**

> Migrate this project from @devfamily/admiral v5 to v6. Follow
> `node_modules/@devfamily/admiral/MIGRATION_AI.md` step by step. Do not refactor unrelated
> code. Show me the final report when done.

## Rules of engagement (for the agent)

1. Work through the phases **in order**. Each phase ends with a verification gate — do not
   continue past a failing gate.
2. **Scope discipline.** Change only what a step names. No drive-by refactors, no dependency
   bumps beyond the listed ones, no formatting sweeps.
3. **Stop conditions.** If Phase 0 detects React < 19 or React Router < 7 in the app itself,
   stop and report: those framework migrations must be done first (they are app-wide and out
   of scope here). Official guides:
   [Router v5 → v6](https://reactrouter.com/upgrading/v5),
   [Router v6 → v7](https://reactrouter.com/upgrading/v6),
   [React 19](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).
4. Record every decision you make on ambiguous code — it goes into the final report.

## Phase 0 — Preflight

1. Detect the package manager from the lockfile (`yarn.lock` / `package-lock.json` /
   `pnpm-lock.yaml`).
2. Read `package.json`. Record current versions of: `@devfamily/admiral`, `react`,
   `react-dom`, `react-router-dom`, `axios`, `typescript`, `node` engines.
3. Apply stop condition 3 if needed (app code on React < 19 or Router < 7).
4. Baseline: run the project's typecheck (`tsc --noEmit` or the repo's script) and save the
   list of pre-existing errors. The Phase 5 gate is "no **new** errors", not "zero errors".
5. Inventory admiral usage (you will revisit these lists in Phases 2–3):

```bash
grep -rn "from '@devfamily/admiral" src/ --include='*.ts*'   # all imports
grep -rn "@devfamily/admiral/lib/" src/ --include='*.ts*'    # deep imports (must go)
grep -rn "require(['\"]@devfamily/admiral" src/              # CJS requires (must go)
grep -rn "TabPane" src/ --include='*.tsx'
grep -rn "useMergedState\|useSafeSetState" src/ --include='*.ts*'
grep -rn "handleSubmit" src/ --include='*.ts*'
```

## Phase 1 — Requirements & dependencies

v6 requires **Node >= 20**, and `react-router-dom` + `axios` moved from bundled dependencies
to **peer dependencies**.

1. Update Node floors wherever the repo pins them: `package.json#engines`, `.nvmrc`,
   `.node-version`, CI workflow files (`node-version:`), Dockerfiles (`FROM node:`). Set to
   20 or higher.
2. Install (adapt to the detected package manager):

```bash
npm install @devfamily/admiral@^6 react@^19 react-dom@^19 react-router-dom@^7 axios@^1
```

3. If `react-router-dom` or `axios` were **not** in the app's `package.json` before (they
   came bundled with admiral v5), they must be added now — the install command above does
   that.

**Gate:** install completes; `node_modules/@devfamily/admiral/package.json` says `"version": "6.x"`.

## Phase 2 — ESM-only package

The v6 package is ESM-only: no UMD build, no CommonJS entry, no deep `lib/` paths.

| Find (from Phase 0 inventory)                                         | Change                                                                                                                                                                                              |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `require('@devfamily/admiral')` / `require('@devfamily/admiral/...')` | Convert the module to `import` syntax. If the file must stay CJS, use dynamic `await import()`.                                                                                                     |
| `from '@devfamily/admiral/lib/<segment>/...'`                         | Replace with the public subpath for that segment: `ui`, `form`, `crud`, `auth`, `theme`, `locale`, `admin`, `router` — or the root barrel `@devfamily/admiral`, which re-exports nearly everything. |
| Jest tests importing admiral                                          | Jest needs its ESM mode (or `transformIgnorePatterns` that transpiles the package). Vitest needs nothing.                                                                                           |

Style import is unchanged — verify it exists exactly once in the app entry:
`import '@devfamily/admiral/style.css'`.

**Gate:** the Phase 0 greps for `require(` and `/lib/` return nothing.

## Phase 3 — Breaking API changes

Apply each step only where the Phase 0 inventory found matches.

### 3.1 DataProvider / AuthProvider are strictly typed

The `[key: string]: any` index signature is gone. Custom provider methods (e.g.
`dataProvider.banUser(...)`) now fail typechecking at the definition or call site.

**Change:** extend the type by intersection — do not remove the custom methods:

```ts
import { DataProvider } from '@devfamily/admiral'

type AppDataProvider = DataProvider & {
    banUser: (id: number) => Promise<void>
}
```

Type the provider object as `AppDataProvider` and cast `useDataProvider()` results where the
custom methods are called: `const dp = useDataProvider() as AppDataProvider`.

### 3.2 `FormRef.handleSubmit` returns `Promise<boolean>`

Previously `Promise<void>`; now resolves `true` on success, `false` on validation/request
failure. **Find** `handleSubmit` calls on form refs. Callers that ignore the result need no
change. Callers that run success logic unconditionally after `await` must branch:

```ts
const succeeded = await formRef.current?.handleSubmit()
if (succeeded) {
    /* close drawer / navigate / toast */
}
```

### 3.3 Removed hooks: `useMergedState`, `useSafeSetState`

- `useSafeSetState` → plain `useState`. React 18+ no longer warns on set-after-unmount; the
  safe wrapper is dead weight. Mechanical rename, drop the import.
- `useMergedState` → inline this local replacement (10 lines) or refactor the component to
  fully controlled:

```ts
function useMergedState<T>(defaultValue: T, opts?: { value?: T; onChange?: (v: T) => void }) {
    const [inner, setInner] = React.useState<T>(
        opts?.value !== undefined ? opts.value : defaultValue,
    )
    const value = opts?.value !== undefined ? opts.value : inner
    const set = (next: T) => {
        setInner(next)
        opts?.onChange?.(next)
    }
    return [value, set] as const
}
```

New v6 hooks you may use instead where they fit: `useLocalStorageState`, `useSize`,
`useLatest`, `useLatestRequest`, `useDebouncedCallback`, `useThrottledCallback`.

### 3.4 `Tabs`: `TabPane` removed — use `items`

The `TabPaneProps` type export is gone too. Transform each `<Tabs>` with `TabPane` children:

```tsx
// v5
<Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Profile" key="1">
        <ProfileForm />
    </Tabs.TabPane>
</Tabs>

// v6
<Tabs defaultActiveKey="1" items={[{ key: '1', label: 'Profile', children: <ProfileForm /> }]} />
```

Mapping: `tab` → `label`, `key` → `key`, children → `children`, `disabled` → `disabled`.
If the panes contain **admiral form fields**, flag the tab group as a Phase 6 candidate for
`Form.Tabs` (validation-aware) — do not convert silently.

### 3.5 Notifications mount inside `<Admin>`

No change for apps wrapped in `<Admin>`. **Only if** the app calls `Notification()` without
`<Admin>`: mount the holder once under the theme provider:

```tsx
import { NotificationHost } from '@devfamily/admiral/ui'
```

### 3.6 `Table` ref

`Table` no longer uses `forwardRef` (React 19 passes `ref` as a prop). Runtime behavior is
identical. Only fix types if the app wrapped admiral's `Table` in its own `forwardRef`.

### 3.7 Date/time pickers are honestly typed

- `onChange` is `(date: Date | null, dateString: string)` — `null` on clear (runtime always
  did this; v5 types lied). Range: `(values: [Date | null, Date | null] | null, ...)`.
  **Find** picker `onChange` handlers; make them null-safe.
- `format` accepts `string | string[]` only — function formats and rc-picker `multiple` mode
  are not public API anymore.
- Exotic rc-picker props passed through must be re-checked against rc-picker 4 (internal
  upgrade 2.x → 4.x).

### 3.8 Behavioral notes (check, usually no code change)

- Drag & drop moved `react-beautiful-dnd` → `@dnd-kit`: custom CSS targeting the old
  library's classes/attributes needs updating; keyboard drag now works out of the box.
- Custom (non-admiral) inputs promoted via `quickFilters` now render in the quick-filter bar
  (v5 silently skipped them) — visual check.
- Filled `Badge` colors changed for WCAG AA; old palette via `--badge-filled-typo-color` /
  `--badge-filled-bg-{alert,success,normal}`.
- If the app copied the demo's MSW setup: regenerate `mockServiceWorker.js`
  (`npx msw init public/`) and port handlers to msw 2 (`rest.*` → `http.*`).
- Backends that send multiple `_global` error messages: **all** of them render now
  (previously only the first).

**Gate:** all Phase 0 inventory lists are resolved (each match either changed or explicitly
recorded as "no change needed" with a reason).

## Phase 4 — Full verification

1. Typecheck: no **new** errors vs the Phase 0 baseline.
2. Production build passes.
3. Test suite (if any) passes.
4. Manual smoke checklist for the human (include in the report): login → list page renders →
   filters open and apply → create form submits → edit form loads values and submits →
   delete works → notifications appear themed.

## Phase 5 — Optional: adopt `Form.Tabs` (opt-in)

Only with explicit user approval. For each tab group flagged in 3.4 that hosts form fields
inside a `<Form>` (or CRUD form): replace `Tabs` with `Form.Tabs` (same `items` shape). Gain:
per-tab error badges + auto-switch to the first invalid tab after a failed submit. If a tab
renders fields from inside another component's body (the scan can't see them), list those
names in the item's `fields: ['bio', ...]` — a console warning after submit names unmatched
error keys.

## Phase 6 — Optional: adopt conditional fields (opt-in)

Only with explicit user approval. **Find** hand-rolled visibility in forms:

```bash
grep -rn "&& <.*Input" src/ --include='*.tsx'   # {cond && <TextInput .../>} patterns
```

Replace with rule props (`visibleWhen` / `disabledWhen` / `requiredWhen`), `<Form.When>`
groups, and `resetOnChangeOf` cascades — see
[MIGRATION.md §5](./MIGRATION.md#5-new-in-v6-conditional--dependent-fields) for the DSL and
[AI_GUIDE.md](./AI_GUIDE.md) for exact semantics.

**Behavioral difference you must surface to the user:** with `{cond && <Input/>}` the hidden
field's value still went to the backend on submit; with `visibleWhen` the hidden value is
**stripped from the payload** (that is the feature). Where the old behavior is required, add
`keepInPayload`. Note also: `disabledWhen` does **not** strip the value; rules on **filter**
fields are visual-only (a hidden filter still applies its value).

## Phase 7 — Final report

Output for the human:

1. Versions: before → after for every touched dependency.
2. Changed files grouped by phase, one line each ("what & why").
3. Decisions made on ambiguous code (3.1 casts, 3.2 branch points, skipped matches).
4. Anything flagged but **not** done (Phase 5/6 candidates, CSS targeting old dnd classes,
   Jest ESM configuration).
5. The manual smoke checklist from Phase 4.
