<p align="center">
  <a href="https://admiral.dev.family" target="_blank">
    <img src="https://admiral.dev.family/images/admiral-logo-npm.svg" width="318px" alt="Admiral logo" />
  </a>
</p>

<p align="center">
  A React framework for building admin panels and back-office applications.<br/>
  Provides CRUD generation, authentication, theming, routing, and 30+ UI components out of the box.
</p>

<p align="center">
  <a href="https://admiral.dev.family" target="_blank">Live Demo</a> &nbsp;&bull;&nbsp;
  <a href="https://dev.family/blog/categories/admiral-open-source-solution-in-react" target="_blank">Blog & Use Cases</a> &nbsp;&bull;&nbsp;
  <a href="./MIGRATION.md">Migrating from v5</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@devfamily/admiral">
    <img src="https://img.shields.io/npm/v/@devfamily/admiral.svg?color=643add&labelColor=86ce2c" alt="Version" />
  </a>
  <a href="https://www.npmjs.com/package/@devfamily/admiral">
    <img src="https://img.shields.io/npm/dt/@devfamily/admiral.svg?color=643add&labelColor=86ce2c" alt="Downloads" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/npm/l/@devfamily/admiral.svg?color=643add&labelColor=86ce2c" alt="License" />
  </a>
</p>

---

## Features

- **CRUD generation** &mdash; define a resource config, get index/create/update pages with tables, forms, filters, and pagination
- **30+ UI components** &mdash; Table, Form inputs, Select, DatePicker, Drawer, Tabs, Upload, Notification, and more
- **Conditional & dependent fields** &mdash; `visibleWhen` / `disabledWhen` / `requiredWhen` rules on any input, `Form.When` groups, cascading selects
- **Validation-aware form tabs** &mdash; `Form.Tabs` shows per-tab error badges and switches to the first invalid tab on submit
- **File-based routing** &mdash; pages directory maps to routes automatically (like Next.js)
- **Authentication** &mdash; login, logout, OAuth (Google, GitHub, Jira), session checks
- **Theming** &mdash; light/dark modes, fully customizable CSS presets
- **Localization** &mdash; built-in i18n with swappable locale packs
- **TypeScript** &mdash; full type coverage across all components and hooks

## Tech Stack

React 19 &bull; React Router 7 &bull; Vite 6 &bull; TypeScript 5.7 &bull; @dnd-kit &bull; @floating-ui &bull; rc-\* components &bull; date-fns 4

## Quick Start

### Option 1 — scaffold a new project (recommended)

```bash
npx create-admiral-app@latest
```

You'll be prompted to choose:

- **With Express.js backend** &mdash; fully configured template with an API server
- **Frontend only** &mdash; just the admin panel, bring your own API

Then `cd` into the project, `npm install`, `npm run dev` &mdash; and you have a working admin panel.

### Option 2 — add to an existing app

Requires **Node.js >= 20** and a bundler (the examples below use Vite).

**1. Install the package and its peer dependencies:**

```bash
npm install @devfamily/admiral react@^19 react-dom@^19 react-router-dom@^7 axios@^1
```

**2. Create the app entry.** Import the styles once, wrap everything in `<Admin>`:

```tsx
// src/App.tsx
import { Admin, createRoutesFrom } from '@devfamily/admiral'
import '@devfamily/admiral/style.css'
import Menu from './menu'
import dataProvider from './dataProvider'

// createRoutesFrom takes a map of page modules; with Vite use import.meta.glob
const Routes = createRoutesFrom(import.meta.glob('../pages/**/*', { eager: true }))

export default function App() {
    return (
        <Admin dataProvider={dataProvider('/api')} menu={Menu}>
            <Routes />
        </Admin>
    )
}
```

**3. Add a menu:**

```tsx
// src/menu.tsx
import { Menu, MenuItemLink } from '@devfamily/admiral'

export default function AppMenu() {
    return (
        <Menu>
            <MenuItemLink icon="FiUsers" name="Users" to="/users" />
        </Menu>
    )
}
```

**4. Add a data provider** &mdash; the object that tells Admiral how to talk to your API. Copy
[src/dataProvider.ts](src/dataProvider.ts) as a starting point; the contract it implements is
described in [Data Provider](#data-provider) below.

**5. Create your first page** &mdash; see the [CRUD example](#crud-pages). Done: `/users` now renders
a table with forms, filters, and pagination.

### Option 3 — run this repo

```bash
git clone https://github.com/dev-family/admiral.git
cd admiral
yarn
yarn dev
```

Open http://localhost:3000 &mdash; you'll see Admiral running on mock data, with the source for
every page in [pages/](pages) and [src/](src).

## Core Concepts

Admiral apps are built from a handful of pieces: an `<Admin>` root, file-based **routing**,
**CRUD pages** generated from a config, a **data provider** (and optionally an **auth provider**)
that connect Admiral to your API, plus **forms**, **filters**, **themes**, and **locales**.
Each piece is described below.

### `<Admin>`

The root component. It wires up routing, theming, data fetching, auth, localization, and
notifications &mdash; every other Admiral feature expects to live inside it.

```tsx
<Admin
    dataProvider={dataProvider(apiUrl)} // required: how to fetch data
    menu={Menu} // required: sidebar menu component
    authProvider={authProvider(apiUrl)} // optional: enables the login flow
    themePresets={{ light, dark }} // optional: custom theme
    locale={admiralLocales.ruRU} // optional: translations
    logo={Logo} // optional: sidebar logo
    oauthProviders={[OAuthProvidersEnum.Google]} // optional: OAuth buttons
>
    <Routes />
</Admin>
```

### Routing

Admiral uses **file-system based routing**. Files in the `pages/` directory map to routes:

| File                     | Route           |
| ------------------------ | --------------- |
| `pages/index.tsx`        | `/`             |
| `pages/users/index.tsx`  | `/users`        |
| `pages/users/create.tsx` | `/users/create` |
| `pages/users/[id].tsx`   | `/users/:id`    |

### CRUD Pages

Define a resource in one file &mdash; Admiral generates the index, create, and update pages:

```tsx
// pages/users/index.tsx
import { createCRUD, TextInput, SelectInput } from '@devfamily/admiral'

export const { IndexPage, CreatePage, UpdatePage } = createCRUD({
    resource: 'users',
    path: '/users',
    index: {
        title: 'Users',
        newButtonText: 'Create User',
        tableColumns: [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Email', dataIndex: 'email', key: 'email' },
        ],
    },
    form: {
        create: {
            fields: (
                <>
                    <TextInput label="Name" name="name" required />
                    <TextInput label="Email" name="email" required />
                    <SelectInput label="Role" name="role_id" />
                </>
            ),
        },
        edit: {
            fields: (
                <>
                    <TextInput label="Name" name="name" required />
                    <TextInput label="Email" name="email" required />
                    <SelectInput label="Role" name="role_id" />
                </>
            ),
        },
    },
})

export default IndexPage
```

The full demo configs live in [src/crud/](src/crud).

### Data Provider

The `DataProvider` interface defines how Admiral communicates with your API:

```ts
interface DataProvider {
    getList: (resource, params) => Promise<{ items: any[]; meta: PaginationMeta }>
    getOne: (resource, params) => Promise<{ data: any; values?: any }>
    create: (resource, params) => Promise<{ data: any }>
    update: (resource, params) => Promise<{ data: any }>
    deleteOne: (resource, params) => Promise<{ data: any }>
    getCreateFormData: (resource) => Promise<{ data?: any; values?: any }>
    getUpdateFormData: (resource, params) => Promise<{ data: any; values?: any }>
    getFiltersFormData: (resource, urlState?) => Promise<{ values?: any }>
    reorderList: (resource, params) => Promise<void>
}
```

See [src/dataProvider.ts](src/dataProvider.ts) for a full implementation example.

**API response format:**

```jsonc
// GET /api/users?page=1&page_size=10
{
    "items": [{ "id": 1, "name": "John", "email": "john@example.com" }],
    "meta": { "current_page": 1, "last_page": 5, "per_page": 10, "total": 50 }
}

// Validation errors (HTTP 422)
{
    "errors": { "email": ["Email is required"] },
    "message": "Validation failed"
}
```

### Auth Provider

Pass an `authProvider` to `<Admin>` and Admiral renders a login page, guards all routes, and
keeps the session checked:

```ts
interface AuthProvider {
    login: (params: { username: string; password: string }) => Promise<any>
    logout: (params?: any) => Promise<void | false | string>
    checkAuth: (params?: any) => Promise<void>
    getIdentity: () => Promise<{ email: string; name: string }>
    oauthLogin?: (provider: OAuthProvidersEnum) => Promise<{ redirect: string }>
    oauthCallback?: (provider: OAuthProvidersEnum, data: string) => Promise<any>
}
```

See [src/authProvider.ts](src/authProvider.ts) for a full implementation example.

### Forms & Inputs

CRUD forms are composed from ready-made inputs &mdash; each binds to a form value by `name`:

`TextInput`, `MultilineTextInput`, `PasswordInput`, `SlugInput`, `SelectInput`,
`AjaxSelectInput`, `RadioInput`, `BooleanInput`, `DatePickerInput`, `DateRangePickerInput`,
`TimePickerInput`, `ColorPickerInput`, `EditorInput`, `FilePictureInput`, `DraggerInput`,
`ArrayInput`, `TranslatableInput`

Inside any form (or a custom input) the `useForm()` hook gives access to values, errors, and
setters. Standalone forms outside CRUD are available via the `Form` component from
`@devfamily/admiral/form`.

**Conditional & dependent fields.** Every input takes `visibleWhen` / `disabledWhen` /
`requiredWhen` (a `(values) => boolean` or a JSON rule), `<Form.When>` reveals a group by one
rule, and `AjaxSelectInput` supports `resetOnChangeOf` cascades (e.g. country → city). See
[Conditional & dependent fields](./MIGRATION.md#5-new-in-v6-conditional--dependent-fields).

**`Form.Tabs` — validation-aware tabs.** Long forms split into tabs that stay honest about
errors: each tab shows a badge with its invalid-field count, and a failed submit switches to
the first tab that needs attention (fields hidden by rules are skipped). See
[`Form.Tabs`](./MIGRATION.md#4-new-in-v6-formtabs--validation-aware-tabs).

### Filters

Add a filter drawer to a CRUD index page with the `filter` key, and promote any of the fields
to always-visible quick filters with `quickFilters`:

```tsx
createCRUD({
    // ...
    filter: {
        topToolbarButtonText: 'Filter',
        fields: (
            <>
                <TextInput label="Name" name="name" />
                <BooleanInput label="Active" name="is_active" />
            </>
        ),
        quickFilters: ['name', 'is_active'],
    },
})
```

Applied filters are reflected in the URL, so filtered views are shareable and bookmarkable.
A complete example: [src/crud/quickFilters.tsx](src/crud/quickFilters.tsx).

### Theming

Light and dark modes work out of the box (with a switcher in the header). To customize colors,
pass your own presets to `<Admin>`:

```tsx
import themeLight from './theme/presets/themeLight'
import themeDark from './theme/presets/themeDark'
;<Admin themePresets={{ light: themeLight, dark: themeDark }}>
    <Routes />
</Admin>
```

Presets use [@consta/uikit Theme](https://github.com/consta-design-system/uikit) under the hood.
See [admiral/theme/presets](admiral/theme/presets) for the preset structure and CSS variables.

### Localization

English is the default; a Russian pack ships in the box. Pass a ready-made pack to `<Admin>`,
or a partial object &mdash; any top-level section you provide replaces the default one:

```tsx
import { Admin, admiralLocales } from '@devfamily/admiral'
;<Admin locale={admiralLocales.ruRU}>
    <Routes />
</Admin>
```

## Module Imports

Admiral supports granular imports to reduce bundle size:

```tsx
import { Admin, createCRUD, createRoutesFrom } from '@devfamily/admiral'
import { Table, Button, Select, Drawer } from '@devfamily/admiral/ui'
import { Form, TextInput, SelectInput } from '@devfamily/admiral/form'
import { useTheme } from '@devfamily/admiral/theme'
import '@devfamily/admiral/style.css'
```

## Hooks

| Hook                  | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| `useForm()`           | Access form values, errors, options, and setters inside CRUD forms |
| `useTheme()`          | Get and set the active theme (`light` / `dark`)                    |
| `useNav()`            | Control sidebar collapse state and mobile burger menu              |
| `useGetIdentity()`    | Get the authenticated user's identity                              |
| `useLocaleProvider()` | Access the current locale configuration                            |
| `useUrlState()`       | Read/write state synced to the URL query string                    |

## Icons

Admiral uses [React Icons](https://react-icons.github.io/react-icons/) (v5). Pass any icon name
as a string or use JSX components directly.

## Examples

- [examples/express-server](examples/express-server) &mdash; Admiral + Express + Prisma, end to end
- [Live demo](https://admiral.dev.family) &mdash; this repo's `pages/` + `src/` running on mock data

## Migrating from v5

v6 is a breaking release: React 19, React Router 7, ESM-only package, stricter types.
The full checklist lives in [MIGRATION.md](./MIGRATION.md).

## Contributing

Fork the repo, make your changes, and submit a pull request. We welcome contributions!

## License

MIT &copy; [dev.family](https://dev.family)

## Contact

Questions or feedback: [admiral@dev.family](mailto:admiral@dev.family)
