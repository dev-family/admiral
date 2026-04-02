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
  <a href="https://dev.family/blog/categories/admiral-open-source-solution-in-react" target="_blank">Blog & Use Cases</a>
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

- **CRUD generation** &mdash; define resource config, get index/create/update pages with tables, forms, filters, and pagination
- **30+ UI components** &mdash; Table, Form inputs, Select, DatePicker, Drawer, Tabs, Upload, Notification, and more
- **File-based routing** &mdash; pages directory maps to routes automatically (like Next.js)
- **Authentication** &mdash; login, logout, OAuth (Google, GitHub, Jira), session checks
- **Theming** &mdash; light/dark modes, fully customizable CSS presets
- **Localization** &mdash; built-in i18n with swappable locale packs
- **TypeScript** &mdash; full type coverage across all components and hooks

## Tech Stack

React 19 &bull; React Router 7 &bull; Vite 6 &bull; TypeScript 5.7 &bull; @dnd-kit &bull; @floating-ui &bull; rc-\* components &bull; date-fns 4

## Requirements

- Node.js >= 20.19.0
- React >= 19.0.0

## Quick Start

### With npx (recommended)

```bash
npx create-admiral-app@latest
```

You'll be prompted to choose:

- **With Express.js backend** &mdash; fully configured template with API server
- **Frontend only** &mdash; just the admin panel, bring your own API

### From this repo

```bash
git clone https://github.com/dev-family/admiral.git
cd admiral
npm install --legacy-peer-deps
npm run dev
```

Open http://localhost:3000 &mdash; you'll see Admiral with mock data.

## Usage

### Entry Point

```tsx
// src/App.tsx
import { Admin, createRoutesFrom } from '@devfamily/admiral'
import Menu from './config/menu'
import dataProvider from './dataProvider'
import authProvider from './authProvider'

const apiUrl = '/api'
const Routes = createRoutesFrom(import.meta.glob('../pages/**/*', { eager: true }))

function App() {
    return (
        <Admin dataProvider={dataProvider(apiUrl)} authProvider={authProvider(apiUrl)} menu={Menu}>
            <Routes />
        </Admin>
    )
}

export default App
```

### CRUD Example

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

### Module Imports

Admiral supports granular imports to reduce bundle size:

```tsx
import { Admin, createCRUD, createRoutesFrom } from '@devfamily/admiral'
import { Table, Button, Select, Drawer } from '@devfamily/admiral/ui'
import { Form, TextInput, SelectInput } from '@devfamily/admiral/form'
import { useTheme } from '@devfamily/admiral/theme'
import '@devfamily/admiral/style.css'
```

## Routing

Admiral uses **file-system based routing**. Files in the `pages/` directory map to routes:

| File                     | Route           |
| ------------------------ | --------------- |
| `pages/index.tsx`        | `/`             |
| `pages/users/index.tsx`  | `/users`        |
| `pages/users/create.tsx` | `/users/create` |
| `pages/users/[id].tsx`   | `/users/:id`    |

## Data Provider

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

## Auth Provider

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

## Menu

```tsx
import { Menu, SubMenu, MenuItemLink } from '@devfamily/admiral'

const AppMenu = () => (
    <Menu>
        <MenuItemLink icon="FiUsers" name="Users" to="/users" />
        <SubMenu icon="FiSettings" name="Settings">
            <MenuItemLink icon="FiSliders" name="General" to="/settings" />
        </SubMenu>
    </Menu>
)
```

## Hooks

| Hook                  | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| `useForm()`           | Access form values, errors, options, and setters inside CRUD forms |
| `useTheme()`          | Get and set the active theme (`light` / `dark`)                    |
| `useNav()`            | Control sidebar collapse state and mobile burger menu              |
| `useGetIdentity()`    | Get the authenticated user's identity                              |
| `useLocaleProvider()` | Access the current locale configuration                            |

## Custom Theme

Pass CSS presets to `Admin`:

```tsx
import themeLight from './theme/presets/themeLight'
import themeDark from './theme/presets/themeDark'

;<Admin themePresets={{ light: themeLight, dark: themeDark }}>
    <Routes />
</Admin>
```

Presets use [@consta/uikit Theme](https://github.com/consta-design-system/uikit) under the hood. See [admiral/theme/presets](admiral/theme/presets) for the preset structure and CSS variables.

## Icons

Admiral uses [React Icons](https://react-icons.github.io/react-icons/) (v5). Pass any icon name as a string or use JSX components directly.

## Contributing

Fork the repo, make your changes, and submit a pull request. We welcome contributions!

## License

MIT &copy; [dev.family](https://dev.family)

## Contact

Questions or feedback: [admiral@dev.family](mailto:admiral@dev.family)
