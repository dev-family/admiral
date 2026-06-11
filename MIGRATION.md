# Migrating from v5 to v6

v6 modernizes the whole stack: React 19, React Router 7, an ESM-only package, and stricter
TypeScript types. Most apps migrate in under an hour &mdash; work through the sections in order.

## 1. Requirements

|                  | v5      | v6                      |
| ---------------- | ------- | ----------------------- |
| Node.js          | >= 14   | **>= 20**               |
| React / ReactDOM | ^17     | **^19**                 |
| react-router-dom | bundled | **^7, peer dependency** |
| axios            | bundled | **^1, peer dependency** |

`react-router-dom` and `axios` are now peer dependencies &mdash; install them next to the package:

```bash
npm install @devfamily/admiral@^6 react@^19 react-dom@^19 react-router-dom@^7 axios@^1
```

If your app uses React Router or axios directly, follow their own migration guides
([Router v5 → v6](https://reactrouter.com/upgrading/v5), [v6 → v7](https://reactrouter.com/upgrading/v6),
[axios 0.x → 1.x](https://github.com/axios/axios/blob/v1.x/MIGRATION_GUIDE.md)) &mdash;
the versions you use must match the peer ranges above.

## 2. The package is ESM-only

- `package.json` declares `"type": "module"`; the UMD build is gone. Use `import` &mdash;
  `require('@devfamily/admiral')` no longer works. Modern bundlers (Vite, webpack 5, Rspack)
  handle this out of the box; Jest needs its ESM mode.
- Subpath imports are now declared via the `exports` map:
  `@devfamily/admiral/ui`, `/form`, `/crud`, `/auth`, `/theme`, `/locale`, `/admin`, `/router`.
- Deep imports into build internals (`@devfamily/admiral/lib/...`) no longer resolve &mdash;
  switch to the subpaths above.
- Styles are unchanged: `import '@devfamily/admiral/style.css'`.

## 3. Breaking API changes

### DataProvider / AuthProvider are strictly typed

The `[key: string]: any` index signature is gone, so custom provider methods no longer
typecheck implicitly. Extend the type instead:

```ts
import { DataProvider } from '@devfamily/admiral'

type AppDataProvider = DataProvider & {
    banUser: (id: number) => Promise<void>
}
```

### `FormRef.handleSubmit` returns `Promise<boolean>`

It used to resolve with `void`; now it resolves with `true` when the submit succeeded and
`false` when it failed validation or the request errored. The CRUD update drawer relies on
this and only closes on success.

```ts
const succeeded = await formRef.current?.handleSubmit()
if (succeeded) {
    // ...
}
```

### Removed hooks

`useMergedState` and `useSafeSetState` are no longer exported. New utility hooks shipped in
v6: `useLocalStorageState`, `useSize`, `useLatest`, `useLatestRequest`, `useDebouncedCallback`,
`useThrottledCallback`.

### `Tabs`: `TabPane` removed — use `items`

rc-tabs 15 dropped children-based panes, and v6 removes the compatibility shim instead of
emulating it forever. Pass tabs through the `items` prop (the `TabPaneProps` type export is
gone as well):

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

### Notifications mount inside `<Admin>`

v5 rendered notifications into a separate React root, so custom theme presets never reached
them. In v6 `<Admin>` mounts the notification holder inside the app tree &mdash; notifications
now follow your presets and live theme switching. Nothing changes for `Notification()` callers.

If you use `Notification()` **without** `<Admin>`, mount the holder yourself under your
`ThemeProvider`:

```tsx
import { NotificationHost } from '@devfamily/admiral/ui'
```

### `Table` ref is a regular prop

`Table` no longer uses `forwardRef` (React 19 passes `ref` as a prop). `<Table ref={...} />`
behaves exactly as before; only update your types if you wrapped `Table` in `forwardRef`
yourself.

### Date/time picker types are honest now

- `onChange` is typed `(date: Date | null, dateString: string)` &mdash; `null` arrives when the
  field is cleared (it always did at runtime; v5 types claimed otherwise). Range variant:
  `(values: [Date | null, Date | null] | null, dateStrings: [string, string])`.
- `format` accepts `string | string[]`; function formats and the rc-picker `multiple` mode are
  not part of the public API anymore.
- Internally rc-picker was upgraded 2.x → 4.x &mdash; if you passed exotic rc-picker props
  through, re-check them against rc-picker 4.

## 4. Behavioral notes

- **Drag & drop** internals moved from `react-beautiful-dnd` to `@dnd-kit` (Upload lists,
  `dndRows` tables). The public API is unchanged; custom CSS targeting the old library's
  classes/attributes will need updating. Keyboard dragging works out of the box: focus the
  drag handle, lift with Space/Enter, move with the arrow keys.
- **Custom quick filters**: custom (non-admiral) inputs listed in `filter.fields` now render
  in the quick-filter bar when promoted via `quickFilters` (v5 silently skipped them).
- **Filled badges** now use white text on slightly deeper status fills (WCAG AA contrast;
  warning keeps dark text on orange). Override via `--badge-filled-typo-color` /
  `--badge-filled-bg-{alert,success,normal}` if you need the old palette.
- **Demo mocks**: the demo app migrated msw 0.x → 2.x. If you copied our mock setup,
  regenerate `mockServiceWorker.js` (`npx msw init public/`) and port handlers to the msw 2
  API (`rest.*` → `http.*`).

## 5. Checklist

- [ ] Node.js >= 20 locally and in CI
- [ ] `npm install @devfamily/admiral@^6 react@^19 react-dom@^19 react-router-dom@^7 axios@^1`
- [ ] No `require()` of the package, no `@devfamily/admiral/lib/...` deep imports
- [ ] Custom provider methods typed via type extension
- [ ] `handleSubmit()` callers updated to use the boolean result
- [ ] Replaced removed hooks (`useMergedState`, `useSafeSetState`) if you imported them
- [ ] `Tabs.TabPane` children migrated to the `items` prop
- [ ] Date picker `onChange` handlers accept `null`
- [ ] `yarn tsc` / `npm run typecheck` passes
