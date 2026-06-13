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

If your tabs split **form fields** across panes, switch them to the new `Form.Tabs` while
you are touching this code — it makes validation errors on inactive tabs visible. See
section 4 below.

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

## 4. New in v6: `Form.Tabs` — validation-aware tabs

When a form is split across tabs, a 422 validation error on a field inside an inactive tab
used to be invisible: the submit failed with a notification, but nothing told you _which_
tab to open. `Form.Tabs` is a drop-in replacement for `Tabs` inside `<Form>` that fixes
this:

- every tab containing invalid fields gets a red badge with the number of such fields, and
  its label turns red (the count is announced to screen readers, localized via `formLocale`);
- after a failed submit the form switches to the first tab with errors — unless the active
  tab has errors of its own, in which case it stays put;
- when all errors are fixed and the form re-submits, badges disappear.

```tsx
<Form submitData={submitData} fetchInitialData={fetchInitialData}>
    <Form.Tabs
        defaultActiveKey="profile"
        items={[
            {
                key: 'profile',
                label: 'Profile',
                children: (
                    <Form.Fields>
                        <TextInput label="Name" name="name" required />
                        <SelectInput label="Role" name="role" required>
                            {/* ... */}
                        </SelectInput>
                    </Form.Fields>
                ),
            },
            {
                key: 'credentials',
                label: 'Credentials',
                children: (
                    <Form.Fields>
                        <TextInput label="Email" name="email" required />
                        <TextInput label="Password" type="password" name="password" required />
                    </Form.Fields>
                ),
            },
        ]}
    />
    <Form.Footer>
        <Form.Submit>Save</Form.Submit>
    </Form.Footer>
</Form>
```

How it knows which fields belong to which tab:

- **Automatic discovery.** The element tree of each item's `children` is scanned for
  admiral inputs and their `name` props are collected. This sees through fragments,
  wrappers like `Form.Fields`, and conditional rendering, and does **not** require
  inactive tabs to be mounted. Custom inputs join the discovery by declaring the same
  static admiral inputs carry: `MyInput.inputName = 'MyInput'`.
- **The `fields` escape hatch.** Discovery cannot see inputs rendered _inside the body_ of
  another component (e.g. a `<UserSection />` that returns inputs from its own JSX). List
  those in `fields`: `{ key: 'main', label: 'Main', fields: ['bio'], children: <UserSection /> }`.
  It _extends_ discovery, so name only what the scan cannot see — discovered fields don't
  have to be repeated. If a submit brings error keys that match no tab, `Form.Tabs` logs a
  console warning naming them — that is the signal to add `fields`.

An error key matches a field when it equals its `name` or is nested under it (`address`
matches both `address` and `address.city`), so nested inputs like `TranslatableInput` are
covered; the `_global` key is ignored. All regular `Tabs` props (`type`, `size`,
`centered`, ...) are accepted. In controlled mode (you pass `activeKey`) the auto-switch
only calls your `onChange` and leaves the decision to you.

## 5. New in v6: Conditional & dependent fields

Until now, every "show field X when Y is selected" needed a custom input written by hand
(the `SlugInput` pattern), and a "country → city" cascade was impossible — `fetchOptions`
never received the form's values. v6 adds a declarative **rules layer**: three rule props on
every input, a `<Form.When>` group wrapper, a form-level `rules` map, and a cascade hook on
`AjaxSelectInput`. The one-line win: `visibleWhen={(values) => values.type === 'legal'}` on
any field — no custom component.

```tsx
import {
    Form,
    TextInput,
    SelectInput,
    AjaxSelectInput,
    BooleanInput,
    ArrayInput,
} from '@devfamily/admiral'
;<Form
    submitData={submitData}
    fetchInitialData={fetchInitialData}
    // Escape hatch / future server rules. Keyed by root field path; value is
    // { visible?, disabled?, required? }. See "The rules map" below.
    rules={{ legacy_code: { visible: { field: 'type', is: 'legal' } } }}
>
    <Form.Fields>
        <SelectInput name="type" label="Client type" required>
            <SelectInput.Option value="person">Person</SelectInput.Option>
            <SelectInput.Option value="legal">Legal entity</SelectInput.Option>
        </SelectInput>

        {/* A group revealed by a single rule (DSL form). */}
        <Form.When rule={{ field: 'type', is: 'legal' }}>
            <TextInput name="inn" label="INN" requiredWhen={{ field: 'type', is: 'legal' }} />
            <TextInput name="kpp" label="KPP" />
        </Form.When>

        {/* A function rule on one field. Hidden → unmounts; its value stays in
            form state and is cut from the submit payload. */}
        <TextInput
            name="passport"
            label="Passport"
            visibleWhen={(values) => values.type === 'person'}
        />

        {/* Hidden but kept in the payload anyway. */}
        <TextInput
            name="internal_ref"
            label="Internal ref"
            visibleWhen={() => false}
            keepInPayload
        />

        {/* Cascade: changing the country resets the city to null and refetches
            its options. The 3rd arg of fetchOptions is the scope's values. */}
        <AjaxSelectInput name="country" label="Country" fetchOptions={fetchCountries} />
        <AjaxSelectInput
            name="city"
            label="City"
            resetOnChangeOf={['country']}
            fetchOptions={(field, query, values) => api.cities(values?.country, query)}
        />

        {/* Row-local rule inside ArrayInput — the scope is the row. */}
        <ArrayInput name="schedule" label="Schedule">
            <BooleanInput name="day_off" label="Day off?" />
            <TimePickerInput
                name="start_time"
                label="Opening"
                visibleWhen={(row) => !row.day_off}
            />
        </ArrayInput>
    </Form.Fields>
    <Form.Footer>
        <Form.Submit>Save</Form.Submit>
    </Form.Footer>
</Form>
```

In `createCRUD`, the same rule props, `Form.When`, and `resetOnChangeOf` work as-is inside
`form.create.fields` / `form.edit.fields`. The only new config key is the escape-hatch map:
`form.create.rules` / `form.edit.rules`, forwarded to the `<Form rules>` prop.

### The DSL

A rule prop is either a function `(values) => boolean` or a serializable JSON rule. The JSON
DSL is **frozen as a contract** (it is the format a future server-driven `rules` block will
also use), so its grammar and semantics are documented exactly:

```
Rule      = Condition | { and: Rule[] } | { or: Rule[] } | { not: Rule }
Condition = { field, is }      // strict equality, primitives
          | { field, not }     // strict inequality, primitives
          | { field, in }      // membership in an array operand
          | { field, empty }   // boolean: is the value empty?
          | { field, gt | gte | lt | lte }   // strictly numeric comparison
field     = exact scope key first, otherwise a dot-path (name.en, items.0.x)
```

**Operator semantics**

| Operator              | True when                    | Notes                                                                                                              |
| --------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `is`                  | `value === operand`          | Strict equality, primitives only. On an **array value** it is always `false` — use `in` for multiselects.          |
| `not`                 | `value !== operand`          | The mirror of `is`. Distinguished from the `not` combinator by the presence of a `field` key.                      |
| `in`                  | `operand.includes(value)`    | Operand must be an array; a non-array operand → `false` + one warn.                                                |
| `empty`               | `isEmpty(value) === operand` | See the empty matrix below.                                                                                        |
| `gt`/`gte`/`lt`/`lte` | numeric comparison           | **Strictly numeric**: both value and operand must be finite numbers, else `false` + warn. No string/date coercion. |

**Empty matrix** (`empty` and the value's "presence"):

| Value  | `undefined` | `null` | `''` | `[]` | `0`    | `false` | `{}`   | `'a'` | `1` |
| ------ | ----------- | ------ | ---- | ---- | ------ | ------- | ------ | ----- | --- |
| Empty? | yes         | yes    | yes  | yes  | **no** | **no**  | **no** | no    | no  |

`0`, `false`, and `{}` are deliberately **not** empty — critical for `BooleanInput`
checkboxes and numeric fields (a `0` is a real answer, an unchecked box is `false` not
"absent"). `and` / `or` take an array of rules; `not` takes a single rule. A **malformed
rule** fails open (the field stays visible) and logs one `[Admiral]` warn — failing closed
would hide data entry behind a typo.

### The rules map

`<Form rules={...}>` (and `form.create.rules` / `form.edit.rules`) is keyed by **root-scope
field path only** in v1. Dot-paths and wildcards (`items.*.discount`) are **reserved** for the
future server-rules format and are not interpreted yet — an unknown key logs a warn on submit.
The entry value is `{ visible?, disabled?, required? }`, each a rule (function or DSL).

For a given field, a **JSX prop wins over a map entry** for the same field; setting both logs
a warn-once-per-field. An enclosing `<Form.When>` always ANDs on top of whatever a field
resolves to.

### How rules are evaluated (raw values, one pass)

Rules read the **raw `values`** of their scope in a single pass. Visibility is a pure function
of the current values; **a rule never sees another field's visibility**, and there is no
fixpoint iteration. An A → B → C visibility chain works through the stored values of the
hidden fields (a hidden field keeps its value in form state — see below), not through an
"effective values" recomputation. This is by design and load-bearing: it makes rule cycles
impossible by construction.

### Payload semantics

- A **hidden field unmounts** (its React subtree is removed), but its **value persists** in
  form state. Show it again and the previously entered value is still there.
- On submit, the value of a hidden field is **cut from a copy of the payload** — the backend
  never sees a value the operator could not see. (`id`, `created_at`, and anything the scan
  did not see pass through untouched — omission is a strict deny-list.)
- `keepInPayload` opts a hidden field back **into** the payload (e.g. a computed value you
  hide but still submit).
- `disabledWhen` is **not** hidden: a disabled field's value **stays in the payload**. This
  diverges from native HTML, where a `disabled` input is omitted from form submission — in
  Admiral, `disabled` only blocks editing, it does not strip the value.

### 422 on a hidden field

If the server returns a 422 keyed to a field that is currently hidden, the message is **moved
into `_global`** (it would be stale pinned to a field whose value was never submitted) and a
`console.warn` names the field. **All `_global` messages now render** (previously only the
first one did) — this is a **behavioral change** for any consumer whose backend already sends
`_global: [msg1, msg2]`: today only `msg1` shows, now all of them do.

### Cascades (`resetOnChangeOf` + the 3rd `fetchOptions` arg)

`fetchOptions` gains an optional third argument — the field's scope values — so a child can
query by its parent: `fetchOptions={(field, query, values) => api.cities(values?.country)}`.
Two-argument callbacks keep working unchanged. `resetOnChangeOf={['country']}` on an
`AjaxSelectInput` subscribes it to its parents; when a parent really changes, the child resets
and refetches.

**The reset event contract is event-driven, not effect-driven:**

- A reset fires **only on a real `onChange` of a parent** field. Initial load,
  `FormRef.setValues`, and a direct `setValues` from your own code do **not** dispatch — so an
  edit form loaded with `{ country, city }` does not wipe the city.
- For **custom fields**: a direct `setValues` won't dispatch a change event — forward an
  `onChange` from your input if it should drive a cascade.
- `SlugInput` autogenerates its value from an effect, and that path **does** dispatch — a slug
  field used as a cascade parent will reset its children when it autogenerates, even without
  operator action. Documented nuance.
- **File fields** (`FilePictureInput`, `DraggerInput`) do **not** dispatch a value change
  (their onChange channel carries an upload event, not a value) and are **not supported as
  cascade parents**.
- A reset writes **`null`** (not `undefined`) — `JSON.stringify` drops `undefined` keys, and
  the backend would silently keep the stale value. So a reset city submits as `city: null`.

### Rules in CRUD filters are visual-only

Filter fields render inside a real `<Form>`, so rule props and cascades are **live** there.
But the filter "apply" reads `formRef.current.values` directly and **bypasses the submit
pipeline** — so payload-omit does not run: a filter field hidden by a rule **still applies its
value** to the table query. Treat rules in filters as visual only in v1.

### v1 exceptions

A few combinations are intentionally unsupported (enforced by types and a runtime warn):

- `requiredWhen` is **not** on `ArrayInput` — its `required` is structural (a phantom row, a
  blocked last-row delete), not a label.
- `disabledWhen` is **not** on `DraggerInput`, `SlugInput`, `ArrayInput`, or
  `TranslatableInput` (these don't accept/forward a `disabled` that a rule could flip).
- Rule props are **not** on `TranslatableInput`'s inner fields — their scope is
  `{ [lang]: value }`, which makes per-language rules semantically empty. Rule props on the
  `TranslatableInput` itself (hiding the whole field) work.

### Nuances & limitations

- **Root → row cascades** need parent and child in the **same scope**. A `country` at the form
  root cannot reset a `city` inside an `ArrayInput` row; put both inside the row.
- **`visibleWhen` + `resetOnChangeOf` on the same select**: hiding then showing it remounts
  the component and reinitializes its options from the form's seeded options; they may not
  match the current parent until the next parent change (self-heals on the next change).
- **ArrayInput autofocus** may skip a newly added row's child if that child is hidden by a
  rule — the new-row autofocus is silently swallowed in that case.
- **Heavy inputs** (`EditorInput`, upload fields) reinitialize on remount — avoid putting
  `visibleWhen` on a TinyMCE editor or an in-progress upload behind a fast-flipping rule.

### Accessibility

Following GOV.UK's conditional-reveal research: keep reveal groups **small**, place revealed
fields **immediately after** the control that triggers them, and **avoid autofocus** and
`aria-live` churn on reveal — moving focus or announcing on every keystroke is more disorienting
than helpful.

### Reveal animation

Every form field eases in on mount (~160 ms, opacity + a slight slide), so a rule-revealed
field — and equally a freshly loaded form or a new `ArrayInput` row — appears smoothly instead
of popping. This is **library-wide**: it applies to all `Form.Item`-based fields, not only
conditional ones. It's opacity + transform only, so there is no layout reflow. Hiding stays
instant — a hidden field unmounts (so its value can be stripped from the payload), leaving no
element to animate out.

- It is **off automatically** under `prefers-reduced-motion: reduce`.
- Tune or disable it globally with the `--form-item-reveal-duration` CSS variable (e.g. set it
  to `0ms` to turn the motion off).

### Performance

Rules are cheap pure functions over the current values (microseconds for a normal form). The
structural scan of the form tree is **cached by children identity**, so it only re-runs when
the page re-renders the form's children — value changes only re-evaluate the (cheap)
predicates, not the scan.

### Checklist

- [ ] Replace custom show/hide inputs with `visibleWhen` / `disabledWhen` / `requiredWhen` or
      a `<Form.When>` group.
- [ ] Move escape-hatch rules (for fields the scan can't see) into the `rules` map — don't
      _also_ put them on the field (that triggers the conflict warn).
- [ ] For cascades, add the 3rd `fetchOptions` arg and `resetOnChangeOf`; remember a reset
      submits `null`.
- [ ] If your backend sends `_global` arrays, note that **all** messages now render (not just
      the first).
- [ ] `disabledWhen` keeps the value in the payload (unlike native HTML `disabled`); use
      `visibleWhen` if you want it stripped.
- [ ] Treat rules on **filter** fields as visual only.

## 6. Behavioral notes

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

## 7. Checklist

- [ ] Node.js >= 20 locally and in CI
- [ ] `npm install @devfamily/admiral@^6 react@^19 react-dom@^19 react-router-dom@^7 axios@^1`
- [ ] No `require()` of the package, no `@devfamily/admiral/lib/...` deep imports
- [ ] Custom provider methods typed via type extension
- [ ] `handleSubmit()` callers updated to use the boolean result
- [ ] Replaced removed hooks (`useMergedState`, `useSafeSetState`) if you imported them
- [ ] `Tabs.TabPane` children migrated to the `items` prop
- [ ] (Optional) form fields split across tabs moved to `Form.Tabs` for error badges and
      auto-switching
- [ ] Date picker `onChange` handlers accept `null`
- [ ] `yarn tsc` / `npm run typecheck` passes
