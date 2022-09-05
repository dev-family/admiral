## 🪄 Installation

_(example for tag version 1.0.0)_

```bash
$ npm install git+ssh://git@github.com:dev-family/admiral.git#v1.0.0
```

---

## 📖 Usage

```jsx
// in app.ts
import React from 'react'
import ReactDOM from 'react-dom'
import { Admin, createRoutesFrom } from 'admiral'
import dataProvider from './config/dataProvider'
import authProvider from './config/authProvider'
import Menu from './config/menu'
import 'admiral/style.css'

const apiUrl = '/api'
const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

function App() {
    return (
        <Admin
            dataProvider={dataProvider(apiUrl)}
            authProvider={authProvider(apiUrl)}
            menu={Menu}
        >
            <Routes />
        </Admin>
    )
}


ReactDOM.render(>
    <App />,
    document.getElementById('root'),
)
```

### Communication with API

Admiral communicates with your APIs through an object called the dataProvider.

A Data Provider must have the following methods:

```js
const dataProvider = {
    // get a list of records based on sort, filter, and pagination
    getList: (resource, params) => Promise,
    // reorder list items
    reorderList: (resource, params) => Promise,
    // get a single record by id
    getOne: (resource, params) => Promise,
    // get initial data for Create form
    getCreateFormData: (resource) => Promise,
    // get initial data for Update form by id
    getUpdateFormData: (resource, params) => Promise,
    // get initial data for Filters form
    getFiltersFormData: (resource, params) => Promise,
    // create a record
    create: (resource, params) => Promise,
    // update a record based on a patch
    update: (resource, params) => Promise,
    // delete a record by id
    deleteOne: (resource, params) => Promise,
}
```

Example of [DataProvider](https://github.com/dev-family/admiral/blob/master/src/dataProvider.ts).

See also [DataProvider methods types](https://github.com/dev-family/admiral/blob/master/admiral/dataProvider/interfaces.ts).

### Authentication

Admiral authentication logic is controlled by an authProvider.

A Auth Provider must have the following methods:

```js
const authProvider = {
    // send username and password to the auth server and get back credentials
    login: (params) => Promise.resolve(),
    // when the user navigates, make sure that their credentials are still valid
    checkAuth: (params) => Promise.resolve(),
    // remove local credentials and notify the auth server that the user logged out
    logout: () => Promise.resolve(),
    // get the user's profile
    getIdentity: () => Promise.resolve(),
}
```

Example of [AuthProvider](https://github.com/dev-family/admiral/blob/master/src/authProvider.ts).

See also [AuthProvider methods types](https://github.com/dev-family/admiral/blob/master/admiral/auth/interfaces.ts#L1-L7).

### Routing

Admiral has a **file-system based** router.

A page is a React Component exported from a .js, .jsx, .ts, or .tsx file in the pages directory. When a file is added to the pages directory, it's automatically available as a route.
[react-router-dom](https://v5.reactrouter.com/web/guides/quick-start) is used under the hood.

#### Index routes

The router will automatically route files named index to the root of the directory.

`pages/index.ts → /`  
`pages/users/index.ts → /users`

#### Nested routes

The router supports nested files. If you create a nested folder structure, files will automatically be routed in the same way still.

`pages/users/create.ts → /users/create`

#### Dynamic route segments

To match a dynamic segment, you can use the bracket syntax. This allows you to match named parameters.

`pages/users/[id].ts → /users/:id (/users/42)`

### CRUD creation

```jsx
// in src/crud/users.tsx
import React from 'react'
import { createCRUD } from 'admiral'

export const UsersCRUD = createCRUD({
    path: '/users', // page name
    resource: 'users', // used in dataProvider as resource
    index: {
        title: 'Users',
        newButtonText: 'Create New User',
        filterButtonText: 'Filter',
        tableOptions: [
            // table columns
        ],
    },
    filter: {
        fields: <>// form inputs</>,
    },
    form: {
        create: {
            fields: <>// form inputs</>,
        },
        edit: {
            fields: <>// form inputs</>,
        },
    },
    create: {
        title: 'Create New User',
    },
    update: {
        title: (id: string) => `Edit User #${id}`,
    },
})

// in pages/users/index.tsx
import { UsersCRUD } from '../../src/crud/users'

export default UsersCRUD.IndexPage

// in pages/users/create.tsx
import { UsersCRUD } from '../../src/crud/users'

export default UsersCRUD.CreatePage

// in pages/users/[id].tsx
import { UsersCRUD } from '../../src/crud/users'

export default UsersCRUD.UpdatePage
```

#### DataTable

An internal DataTable is responsible for presenting the data on the index CRUD page.

To specify table columns pass array to `index -> tableOptions` property of `createCRUD` function. Each column accepts the following properties:

| Property          | Type                                                                      | Default               | Description                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title             | React Node                                                                | -                     | Title of this column                                                                                                                                             |
| dataIndex         | string                                                                    | -                     | Display field of the data record                                                                                                                                 |
| key               | string                                                                    | -                     | Key of this column                                                                                                                                               |
| width             | string \| number                                                          | -                     | Column width. ❗**Note**: at least one column should be without width in order to achieve good table adaptivity                                                  |
| className         | string                                                                    | -                     | className of this column                                                                                                                                         |
| ellipsis          | boolean                                                                   | -                     | Specify whether cell content be ellipsized                                                                                                                       |
| render            | (value: any, record: any, index: number) => React.ReactNode               | (value: any) => value | The render function of cell. Use available admiral table [Fields](https://github.com/dev-family/admiral/tree/master/admiral/dataTable/fields) or create your own |
| onCell            | (record: RecordType, index?: number) => React.HTMLAttributes<HTMLElement> | -                     | Set props on per cell                                                                                                                                            |
| onHeaderCell      | (record: RecordType, index?: number) => React.HTMLAttributes<HTMLElement> | -                     | Set props on per header cell                                                                                                                                     |
| sorter            | boolean                                                                   | false                 | Define if column is sortable                                                                                                                                     |
| showSorterTooltip | boolean \| Tooltip props                                                  | true                  | Show next sorter direction tooltip in header                                                                                                                     |

Example:

```jsx
// in src/crud/users.tsx
import React from 'react'
import { createCRUD, FileField } from 'admiral'

export const UsersCRUD = createCRUD({
    // ... /
    index: {
        tableOptions: [
            {
                title: 'Avatar',
                dataIndex: 'avatar',
                key: 'avatar',
                width: 90,
                render: (value) => <FileField {...value} />,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: 200,
                sorter: true,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Group',
                dataIndex: 'group',
                key: 'group',
                render: (value) => (Array.isArray(value) ? value.join(', ') : value),
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
                width: 150,
                ellipsis: true,
            },
            {
                title: 'Active',
                dataIndex: 'active',
                key: 'active',
                width: 150,
                render: (value) => (value ? 'Yes' : 'No'),
            },
        ],
    },
    // ... /
})
```

#### Create/Update/Filter form fields

An `Input` components used to display an input, or a dropdown list, a list of radio buttons, etc. Such components allow to update a record field and are common in the `Edit` / `Create` / `Filter` form fields setup.

[List](https://github.com/dev-family/admiral/tree/master/admiral/form/fields) of available inputs.

All input components accept the following props:

| Property   | Type    | Default | Description                                              |
| ---------- | ------- | ------- | -------------------------------------------------------- |
| name       | string  | -       | Name of the entity property to use for the input valuey  |
| label      | string  | -       | Form field label                                         |
| required   | boolean | false   | Show an asterisk in front of the label                   |
| columnSpan | 1 \| 2  | 1       | How many columns in a two-column grid the field occupies |

```jsx
// in src/crud/users.tsx
import React from 'react'
import { createCRUD } from 'admiral'

export const UsersCRUD = createCRUD({
    // ... /
    filter: {
        fields: (
            <>
                <TextInput label="Name" name="name" placeholder="Name" />
                <SelectInput label="Role" name="role" placeholder="Choose Role" allowClear />
                <BooleanInput label="Active?" name="active" />
            </>
        ),
    },
    form: {
        create: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" />
                    <SelectInput
                        label="Group"
                        name="group"
                        placeholder="Choose Group"
                        required
                        mode="multiple"
                    >
                        <SelectInput.Option value="admin">Admins</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Project Managers
                        </SelectInput.Option>
                    </SelectInput>
                    <FilePictureInput
                        columnSpan={2}
                        label="Avatar"
                        name="avatar"
                        accept="image/*"
                        maxCount={1}
                    />
                </>
            ),
        },
        edit: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" />
                    <SelectInput
                        label="Group"
                        name="group"
                        placeholder="Choose Group"
                        required
                        mode="multiple"
                    >
                        <SelectInput.Option value="admin">Admins</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Project Managers
                        </SelectInput.Option>
                    </SelectInput>
                    <FilePictureInput
                        columnSpan={2}
                        label="Avatar"
                        name="avatar"
                        accept="image/*"
                        maxCount={1}
                    />
                </>
            ),
        },
    },
    // ... /
})
```

### Menu creation

Menu can be created using the `Menu` component with `MenuItemLink` components inside.

To specify children of the menu item, use the `SubMenu` component - this will turn the menu item into a collapsible block. Only one level of children is supported.

[Feather icon](https://react-icons.github.io/react-icons/icons?name=fi) name can be used as an icon property of the `SubMenu` / `MenuItemLink` components.

```jsx
import React from 'react'
import { Menu, SubMenu, MenuItemLink } from 'admiral'

export default function CustomMenu() {
    return (
        <Menu>
            <MenuItemLink icon="FiUsers" name="Users" to="/users" />
            <SubMenu icon="FiSettings" name="Components" to="/components">
                <MenuItemLink icon="FiBox" name="Table" to="/components/table" />
                <MenuItemLink icon="FiBox" name="Checkbox" to="/components/checkbox" />
            </SubMenu>
        </Menu>
    )
}
```

### Custom theme

ThemeProvider uses [@consta/uikit](https://github.com/consta-design-system/uikit) [Theme component](https://github.com/consta-design-system/uikit/tree/master/src/components/Theme) under the hood.

You can pass your presets to `Admin` component with `themePresets` prop:

```jsx
import React from 'react'
import { Admin, createRoutesFrom } from '../admiral'
import Menu from './config/menu'
import dataProvider from './dataProvider'
import authProvider from './authProvider'
import themeLight from './theme/presets/themeLight'
import themeDark from './theme/presets/themeDark'

const apiUrl = '/api'
const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

function App() {
    return (
        <Admin
            dataProvider={dataProvider(apiUrl)}
            authProvider={authProvider(apiUrl)}
            menu={Menu}
            themePresets={{ light: themeLight, dark: themeDark }}
        >
            <Routes />
        </Admin>
    )
}
```

#### To create your own preset:

1. Create a directory for presets. Inside make folders for each modifier - the same as in the [Theme component](https://github.com/dev-family/admiral/tree/master/admiral/theme/presets).
2. Create CSS files. In the folders with the modifiers put the CSS files that will be responsible for those modifiers.  
   You will get something similar:

```
presets/
  _color/
    _Theme_color_themeDark.css
    _Theme_color_themeLight.css
  _control/
    _Theme_control_themeLight.css
  _font/
    _Theme_font_themeLight.css
  _size/
    _Theme_size_themeLight.css
  _space/
    _Theme_space_themeLight.css
  _shadow/
    _Theme_shadow_themeLight.css
  themeLight.ts
  themeDark.ts
```

3. Configure the variables in CSS files.
4. Create a preset files (themeLight, themeDark).  
   Import the CSS files you are going to use.  
   Create a preset object. Specify which values (i.e. CSS files) for which modifiers to use in the preset. You will get something similar:

```js
// in presets/themeLight.ts
import './_color/_Theme_color_themeLight.css'
import './_color/_Theme_color_themeDark.css'
import './_control/_Theme_control_themeLight.css'
import './_font/_Theme_font_themeLight.css'
import './_size/_Theme_size_themeLight.css'
import './_space/_Theme_space_themeLight.css'
import './_shadow/_Theme_shadow_themeLight.css'

export default {
    color: {
        primary: 'themeLight',
        accent: 'themeDark',
        invert: 'themeDark',
    },
    control: 'themeLight',
    font: 'themeLight',
    size: 'themeLight',
    space: 'themeLight',
    shadow: 'themeLight',
}
```

5. Pass your presets to `Admin` component as in the example above.

❗**Note**: postcss plugins are used for color transformation in admiral [presets example](https://github.com/dev-family/admiral/tree/master/admiral/theme/presets). If you want to reproduce, setup [postcss](https://github.com/postcss/postcss) and [postcss-color-mod-function plugin](https://github.com/csstools/postcss-color-mod-function).

### Roles

To get user info and depending on this to show/hide menu items or some interface elements, use `useGetIdentity` hook:

```jsx
import React from 'react'
import { Menu, MenuItemLink, useGetIdentity } from '../../admiral'

const CustomMenu = () => {
    const { identity } = useGetIdentity()

    const role = identity?.role ?? null

    return (
        <Menu>
            <MenuItemLink icon="FiCircle" name="Base CRUD" to="/base-crud" />
            <MenuItemLink icon="FiStar" name="Advanced Edit Page" to="/advanced-edit-page" />
            {role === 'admin' && (
                <MenuItemLink icon="FiCodepen" name="Custom Interface" to="/custom-interface" />
            )}
        </Menu>
    )
}

export default CustomMenu
```

### CRUD Locales

To setup crud locale provide `locale` property in `createCRUD` function.

```jsx
// in src/crud/users.tsx
import React from 'react'
import { createCRUD } from 'admiral'

export const UsersCRUD = createCRUD({
    // ... /
    locale: {
        actions: {
            submit: 'Сохранить',
            back: 'Назад',
            tableColumn: 'Действия',
            paginationTotal: (total) => `Всего ${total}`,
        },
        pagination: {
            items_per_page: '/ стр.',
            jump_to: 'Перейти',
            jump_to_confirm: 'подтвердить',
            page: 'Страница',
            prev_page: 'Назад',
            next_page: 'Вперед',
            prev_5: 'Предыдущие 5',
            next_5: 'Следующие 5',
            prev_3: 'Предыдущие 3',
            next_3: 'Следующие 3',
        },
        filters: { // FiltersLocale }
        form: { // FormLocale }
        table: { // TableLocale }
    },
    // ... /
})
```

See also [actions](https://github.com/dev-family/admiral/blob/master/admiral/crud/interfaces.ts#L17-L22), [pagination](https://github.com/dev-family/admiral/blob/master/admiral/ui/Pagination/interfaces.ts#L6), [filters](https://github.com/dev-family/admiral/blob/master/admiral/filters/interfaces.ts#L1-L5), [form](https://github.com/dev-family/admiral/blob/master/admiral/form/interfaces.ts#L3-L7), [table](https://github.com/dev-family/admiral/blob/master/admiral/ui/Table/interfaces.ts#L75-L93) types.

---

## ⌨️ Development

```bash
$ git clone git@github.com:dev-family/admiral.git
$ cd admiral
$ npm install
$ npm run dev
```

Open your browser and visit http://localhost:3000

---

## 🏗️ Build library

_(example for tag version 1.0.0)_

```bash
$ npm run build:lib
$ git commit -m "build: lib (v1.0.0)"
$ git push
$ git tag v1.0.0
$ git push origin --tags
```

After that you can add the library to your project with the command:

```bash
$ npm install git+ssh://git@github.com:dev-family/admiral.git#v1.0.0
```
