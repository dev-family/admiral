# Admiral v6 — Reference for AI Assistants

A compact, exact reference for AI coding agents generating code against
`@devfamily/admiral` v6. **Facts in this file override your training data** — v6 differs
from earlier Admiral versions, and Admiral is not react-admin (different provider contract,
different response shapes). Human-oriented docs: [README.md](./README.md),
[MIGRATION.md](./MIGRATION.md). This file ships in the npm package, so you can read it at
`node_modules/@devfamily/admiral/AI_GUIDE.md`.

## Package facts

- **ESM-only.** `import` only, no `require()`. Node >= 20.
- **Peers you must have installed:** `react@^19`, `react-dom@^19`, `react-router-dom@^7`,
  `axios@^1`.
- **Import from the root barrel** (`@devfamily/admiral`) — it re-exports nearly everything.
  Subpaths also exist: `/ui`, `/form`, `/crud`, `/auth`, `/theme`, `/locale`, `/admin`,
  `/router`. Never import from `@devfamily/admiral/lib/...`.
- **Styles:** `import '@devfamily/admiral/style.css'` once in the app entry.

## App skeleton (canonical)

```tsx
import { Admin, createRoutesFrom } from '@devfamily/admiral'
import '@devfamily/admiral/style.css'
import Menu from './config/menu'
import dataProvider from './dataProvider'
import authProvider from './authProvider'

const apiUrl = '/api'
const Routes = createRoutesFrom(import.meta.glob('../pages/**/*', { eager: true }))

export default function App() {
    return (
        <Admin
            dataProvider={dataProvider(apiUrl)}
            authProvider={authProvider(apiUrl)} // optional
            menu={Menu}
        >
            <Routes />
        </Admin>
    )
}
```

Other useful `<Admin>` props: `logo`, `loginLogo`, `asideContent`,
`locale={Partial<AdmiralLocale>}`, `themePresets={{ light, dark }}`,
`oauthProviders={[OAuthProvidersEnum.Google, ...]}`, `baseAppUrl`, `errorFallback`.

## Routing (file-based)

`createRoutesFrom(import.meta.glob('../pages/**/*', { eager: true }))` maps files to routes:

- `pages/crud-users/index.tsx` → `/crud-users`; `pages/crud-users/create.tsx` →
  `/crud-users/create`; `pages/crud-users/[id].tsx` → `/crud-users/:id` (the param is passed
  to the page component as a prop: `({ id }) => ...`).
- `pages/login.tsx` is the login route; unknown paths redirect to `/`.
- Every page is auth-guarded and wrapped in the layout, unless
  `createRoutesFrom(modules, { withAuth: false })`.

Page files for a CRUD resource are one-line re-exports:

```tsx
// pages/crud-users/index.tsx
import { UsersCRUD } from '../../src/crud/users'
export default UsersCRUD.IndexPage
// create.tsx → UsersCRUD.CreatePage;  [id].tsx → UsersCRUD.UpdatePage
```

## DataProvider — the 9-method contract

`DataProvider` is **transport-agnostic**: the library calls the methods and consumes the
shapes below; the URLs/verbs are your implementation. There is **no** `getMany`,
`updateMany`, `deleteMany`, or `getManyReference` (that's react-admin, not Admiral). Custom
methods are added via type intersection: `type AppDP = DataProvider & { banUser(id): ... }`.

The reference REST convention (used by dev.family backends and the demo — follow it unless
the user's backend dictates otherwise):

| Method               | Reference verb + URL                  | Called when                                         |
| -------------------- | ------------------------------------- | --------------------------------------------------- |
| `getList`            | `GET {apiUrl}/{resource}`             | index table: mount, page/sort/filter change         |
| `getOne`             | `GET {apiUrl}/{resource}/{id}`        | not called by CRUD pages; for your custom UI        |
| `getCreateFormData`  | `GET {apiUrl}/{resource}/create`      | create page mount (initial values + select options) |
| `create`             | `POST {apiUrl}/{resource}`            | create form submit                                  |
| `getUpdateFormData`  | `GET {apiUrl}/{resource}/{id}/update` | edit page/drawer mount                              |
| `update`             | `POST {apiUrl}/{resource}/{id}`       | edit form submit (POST, not PUT/PATCH)              |
| `deleteOne`          | `DELETE {apiUrl}/{resource}/{id}`     | row delete action (after confirm popup)             |
| `getFiltersFormData` | `GET {apiUrl}/{resource}/filters`     | filter drawer/quick filters — select options        |
| `reorderList`        | `POST {apiUrl}/{resource}/reorder`    | drag-and-drop row reorder (`tableConfig.dndRows`)   |

Request conventions (reference impl): query params serialized with `qs`
(`?page=1&perPage=10&sort[field]=name&sort[order]=asc&filter[role]=admin`); `create`/`update`
send `multipart/form-data` with nested objects flattened to bracket keys (`a[b][c]`),
`Date` → ISO string, `null` → `''`, `File` appended as-is.

### Response shapes the library actually reads

```jsonc
// getList → the table reads ONLY items and meta.total
{ "items": [{ "id": 1, "name": "..." }], "meta": { "total": 24 } }

// getCreateFormData / getUpdateFormData / getOne → { data, values }
// data  → initial form values;  values → select/radio options keyed by field name
{
    "data": { "name": "John", "role": "admin", "schedule": [{ "day": "1" }] },
    "values": {
        "role": [{ "label": "Admin", "value": "admin" }],
        "schedule.day": [{ "label": "Monday", "value": "1" }] // dotted key for nested/array fields
    }
}

// getFiltersFormData → NOTE: the key is "options" here, not "values"
{ "options": { "role": [{ "label": "Admin", "value": "admin" }] } }
```

`create`/`update`/`deleteOne`/`reorderList` success bodies are not consumed — errors are.

### Validation errors (422)

Field errors appear on inputs **only** for HTTP status **422** with this body (Laravel
style — field name → **array of strings**):

```jsonc
{
    "errors": {
        "name": ["The name field is required."],
        "email": ["Must be a valid email."],
        "_global": ["Form-level message shown at the top"],
    },
    "message": "Validation failed", // optional — shown as the error toast
}
```

Each input shows `errors[name][0]`; `_global` messages render as banners above the form (all
of them). A 422 keyed to a field currently hidden by a rule is moved to `_global`
automatically. Any non-422 error → toast only.

## Where select options come from — three channels

1. **Static selects in create/edit forms** — the `values` map returned by
   `getCreateFormData` / `getUpdateFormData`. `SelectInput`/`RadioInput` with
   `name="role"` automatically consume `values.role`. No props needed.
2. **Filter selects** — the `options` map returned by `getFiltersFormData`
   (`GET {apiUrl}/{resource}/filters`). Same automatic by-name consumption inside
   `filter.fields`.
3. **`AjaxSelectInput`** — search/lazy/cascading options; bypasses the DataProvider. You
   supply `fetchOptions` returning a **bare array** of `{ label, value }`:

```tsx
<AjaxSelectInput
    label="Role"
    name="role"
    fetchOptions={(field, query) => api.getAjaxSelectOptions(resource, field, query)}
/>
```

Option shape everywhere is `{ label: string, value: string }` — never `{ id, name }`.

## createCRUD

```tsx
import React from 'react'
import { createCRUD, TextInput, SelectInput, BooleanInput, FileField } from '@devfamily/admiral'

export const UsersCRUD = createCRUD({
    path: '/crud-users', // route base (must match the pages/ folder)
    resource: 'users', // backend resource name ({apiUrl}/users)
    index: {
        title: 'Users',
        newButtonText: 'Create New User',
        tableColumns: [
            // rc-table ColumnsType: dataIndex + key + optional render/sorter/width/fixed
            { title: 'Name', dataIndex: 'name', key: 'name', sorter: true },
            {
                title: 'Avatar',
                dataIndex: 'avatar',
                key: 'avatar',
                width: 90,
                render: (value) => <FileField {...value} />,
            },
            {
                title: 'Active',
                dataIndex: 'active',
                key: 'active',
                render: (v) => (v ? 'Yes' : 'No'),
            },
        ],
        // tableActions: null → removes the default Edit/Delete column
        // tableConfig: { dndRows: true, autoupdateTime: 7000, rowSelection: {...} }
    },
    filter: {
        topToolbarButtonText: 'Filter',
        fields: (
            <>
                <TextInput label="Name" name="name" />
                <BooleanInput label="Active" name="active" />
            </>
        ),
        quickFilters: ['name', 'active'], // promote by `name` to always-visible bar
    },
    form: {
        // exactly ONE of `fields` (auto-wrapped in the grid) or `children` (you control layout)
        create: {
            fields: (
                <>
                    <TextInput label="Name" name="name" required />
                    <SelectInput label="Role" name="role" />{' '}
                    {/* options from form-data `values.role` */}
                </>
            ),
        },
        edit: { fields: <>{/* usually same as create, minus password fields */}</> },
    },
    create: { title: 'Create New User' },
    update: { title: (id) => `Edit User #${id}`, view: 'drawer' }, // 'page' (default) | 'drawer'
})
```

Returns `{ IndexPage, CreatePage, UpdatePage }`. Other config keys: `actions` (ReactNode
that **replaces** the whole default top toolbar — compose `<TopToolbar>` with
`<FilterButton>` / `<CreateButton>` yourself), `topContent` / `bottomContent`,
`form.create.rules` / `form.edit.rules` (rules map, see below),
`update.drawer` (DrawerProps).

## Form inputs (all 17)

All inputs require `name` (the form-value key) and accept `label`, `required`,
`columnSpan={1|2}` (2 = full grid width), plus the rule props (next section). They bind to
`useForm().values[name]` and show `errors[name][0]` automatically — never wire value/error
by hand.

| Input                  | Value shape / notable props                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| `TextInput`            | string; `type="password"` works; `onChange?(value)`                                                       |
| `MultilineTextInput`   | string (textarea)                                                                                         |
| `PasswordInput`        | string; defaults `autoComplete="new-password"`                                                            |
| `SlugInput`            | string; `from="name"` — auto-slugs from another field; lock icon toggles manual edit                      |
| `SelectInput`          | scalar or array with `mode="multiple"`; options from context by `name` or `<SelectInput.Option>` children |
| `AjaxSelectInput`      | scalar; `fetchOptions(field, query?, values?) => Promise<{label,value}[]>`, `resetOnChangeOf?: string[]`  |
| `RadioInput`           | scalar; `options` prop or context options by `name`                                                       |
| `BooleanInput`         | boolean (switch)                                                                                          |
| `DatePickerInput`      | ISO string by default; `onChange(date: Date \| null, dateString)`                                         |
| `TimePickerInput`      | string; pass `format` (e.g. `"HH:mm:ss"`)                                                                 |
| `DateRangePickerInput` | `[start, end]`; clear → `null`                                                                            |
| `ColorPickerInput`     | string, `outputValue` default `'rgbString'`                                                               |
| `EditorInput`          | rich text (TinyMCE); `onImageUpload` for image handling                                                   |
| `FilePictureInput`     | file(s); `maxCount={1}` → value is a single file object, otherwise an array; `accept`, `multiple`         |
| `DraggerInput`         | file(s), drag-and-drop upload area                                                                        |
| `ArrayInput`           | array of row objects; children render per-row (row = nested scope); `disableOrder/Remove/Add`             |
| `TranslatableInput`    | `{ [lang]: value }`; `field: 'text' \| 'multilineText' \| 'editor'`, `languages: [{label, value}]`        |

Custom inputs: read/write via `const { values, errors, setValues } = useForm()`. Declare
`MyInput.inputName = 'MyInput'` (static string) if `Form.Tabs` badge discovery and the rules
scan should see it.

## Conditional & dependent fields (rules)

Every input takes `visibleWhen` / `disabledWhen` / `requiredWhen`. A rule is either a
function `(values) => boolean` (values = the field's scope: form root, or the row inside
`ArrayInput`) or a serializable JSON rule:

```
Rule      = Condition | { and: Rule[] } | { or: Rule[] } | { not: Rule }
Condition = { field, is } | { field, not } | { field, in: [...] }
          | { field, empty: boolean } | { field, gt | gte | lt | lte: number }
```

Emptiness: `undefined | null | '' | []` are empty; `0`, `false`, `{}` are **not**. `is` on an
array value is always false — use `in` for multiselects. Malformed rules fail **open**
(field stays visible) with a console warn.

```tsx
<SelectInput label="Client type" name="type" required>
    <SelectInput.Option value="person">Person</SelectInput.Option>
    <SelectInput.Option value="legal">Legal entity</SelectInput.Option>
</SelectInput>

<Form.When rule={{ field: 'type', is: 'legal' }}>
    <TextInput label="INN" name="inn" requiredWhen={{ field: 'type', is: 'legal' }} />
    <TextInput label="KPP" name="kpp" />
</Form.When>

<TextInput label="Passport" name="passport" visibleWhen={(v) => v.type === 'person'} />
```

Semantics you must not violate:

- A hidden field **unmounts but keeps its value** in form state; on submit that value is
  **stripped from the payload**. `keepInPayload` opts it back in.
- `disabledWhen` does **not** strip the value (unlike native HTML forms).
- Cascades: `resetOnChangeOf={['country']}` on an `AjaxSelectInput` resets it to `null` and
  refetches when `country` changes by user action; the 3rd `fetchOptions` arg carries scope
  values: `fetchOptions={(field, query, values) => api.cities(values?.country, query)}`.
  A reset submits `null` (key preserved), never `undefined`.
- Rules evaluate over **raw values** in one pass — a rule never sees another field's
  visibility; chains work through stored values.
- Rules on **filter** fields are visual-only: a rule-hidden filter still applies its value.
- Form-level escape hatch: `<Form rules={{ legacy_code: { visible: { field: 'type', is: 'legal' } } }}>`
  (also `form.create.rules` / `form.edit.rules` in CRUD) — root-scope keys only; a JSX rule
  prop on the same field wins over the map entry.
- Not supported (types + runtime warn): `requiredWhen` on `ArrayInput`; `disabledWhen` on
  `DraggerInput` / `SlugInput` / `ArrayInput` / `TranslatableInput`; rule props on
  `TranslatableInput`'s inner per-language fields.
- Don't put `visibleWhen` on heavy inputs (`EditorInput`, in-progress uploads) behind
  fast-flipping rules — they reinitialize on remount.

## Form.Tabs (validation-aware tabs)

Inside a `<Form>` (or CRUD form), split fields across tabs with error badges and auto-switch
to the first invalid tab after a failed submit:

```tsx
<Form.Tabs
    defaultActiveKey="profile"
    items={[
        { key: 'profile', label: 'Profile', children: <Form.Fields>{/* inputs */}</Form.Fields> },
        {
            key: 'credentials',
            label: 'Credentials',
            children: <Form.Fields>{/* inputs */}</Form.Fields>,
        },
    ]}
/>
```

Field↔tab mapping is discovered by scanning each item's `children` for admiral inputs. Inputs
rendered inside the body of another component are invisible to the scan — list their names in
the item's `fields: ['bio']` (extends discovery; a console warning after submit names
unmatched error keys). Fields hidden by rules don't count toward badges.

## Standalone Form (outside CRUD)

```tsx
import { Form, useDataProvider } from '@devfamily/admiral'

const dp = useDataProvider()
<Form
    fetchInitialData={() => dp.getUpdateFormData('users', { id })} // → { data, values }
    submitData={(values) => dp.update('users', { id, data: values })}
    redirect="/crud-users" // string path | true (go back)
>
    <Form.Fields>{/* inputs */}</Form.Fields>
    <Form.Footer>
        <Form.Submit>Save</Form.Submit>
    </Form.Footer>
</Form>
```

The submit prop is **`submitData`** (there is no `onSubmit`/`action`). Sub-components:
`Form.Fields` (grid; `singleColumn` prop), `Form.Item`, `Form.Error`, `Form.Footer`,
`Form.Submit` (auto-disabled while fetching/submitting), `Form.Tabs`, `Form.When`. A ref
exposes `{ values, setValues, handleSubmit: () => Promise<boolean> }`.

## AuthProvider

```ts
interface AuthProvider {
    login: (params: { username; password }) => Promise<unknown>
    logout: (params) => Promise<void | false | string>
    checkAuth: (params) => Promise<void> // reject → redirect to login
    getIdentity: () => Promise<{ id; fullName?; avatar?; email? }>
    oauthLogin?: (provider: OAuthProvidersEnum) => Promise<{ redirect: string }>
    oauthCallback?: (provider, data: string) => Promise<unknown>
}
```

Reference endpoints: `POST {apiUrl}/login` (returns `{ token }`), `POST {apiUrl}/logout`,
`GET {apiUrl}/getIdentity`, OAuth `GET {apiUrl}/auth/social-login/{provider}` +
`POST .../callback`. Token goes into every request as `Authorization: Bearer {token}`.

## Menu

```tsx
import { Menu, SubMenu, MenuItemLink } from '@devfamily/admiral'

const CustomMenu = () => (
    <Menu>
        <MenuItemLink
            icon="FiUsers"
            name="Users"
            to="/crud-users"
            badge={{ count: 15, status: 'error' }}
        />
        <SubMenu icon="FiSettings" name="Components" to="/components">
            <MenuItemLink icon="FiBox" name="Table" to="/components/table" />
        </SubMenu>
    </Menu>
)
```

`icon` is a **string name** of a `react-icons/fi` icon (`"FiUsers"`), not a component.
`badge` takes `{ count, status }` or `{ dot: true }`.

## Theming & locale

- `<Admin themePresets={{ light, dark }}>` — a preset maps token groups to CSS variants and
  imports the CSS-variable files as side effects. Components consume tokens as
  `var(--space-m)` etc. Light/dark switcher ships in the header.
- Chrome strings: `<Admin locale={Partial<AdmiralLocale>}>` (from `@devfamily/admiral/locale`).
  Individual components (`Table`, pickers) also accept a `locale` prop.

## Common AI mistakes — do not do these

1. **react-admin habits**: no `getMany`/`updateMany`/`<Resource>`/`<List>` components. The
   contract is the 9 methods above; pages come from `createCRUD` + file-based routing.
2. **Wrong list shape**: `getList` must resolve `{ items, meta: { total } }` — not
   `{ data, total }`.
3. **Wrong option key**: form selects read the form-data **`values`** map; filter selects
   read the filters **`options`** map; `AjaxSelectInput.fetchOptions` resolves a **bare
   array**. All options are `{ label, value }`.
4. **`fields` vs `children`** in CRUD `form.create`/`form.edit`: provide exactly one.
5. **`quickFilters` names** must equal `name` props of inputs inside `filter.fields`.
6. **Updates are `POST {resource}/{id}`** in the reference convention — don't emit PUT/PATCH
   backends by default.
7. **422 contract**: field errors show only for status 422 with `errors: { field: string[] }`;
   don't return `{ message }` alone and expect inline errors.
8. **Don't wire inputs manually** (`value`/`onChange` to form state) — binding by `name` is
   automatic; custom inputs use `useForm()`.
9. **Menu icons are strings** (`"FiUsers"`), react-icons/fi set only.
10. **Don't deep-import** `@devfamily/admiral/lib/...`; use the root barrel or subpaths.
11. **`visibleWhen` strips the hidden value from the payload** — add `keepInPayload` if the
    backend still needs it; `disabledWhen` keeps the value.
12. **Don't rebuild show/hide with `{cond && <Input/>}`** — use `visibleWhen`/`Form.When`
    (they handle payload, 422 partitioning, and tab badges correctly).
