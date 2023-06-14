<p align="center">
  <a target='_blank' href="https://admiral.dev.family">
    <img src="https://admiral.dev.family/images/admiral-logo-npm.svg" width="318px" alt="Admiral logo" />
  </a>
</p>
<h3 align="center">Revolutionize Your Workflow with Admiral: A Powerful Solution for Tailored Admin Panels and Business Applications</h3>

<p align="center"> <a target='_blank' href='https://admiral.dev.family'>Try live demo</a></p>

<br>

<p align="center">
  <a href="https://twitter.com/admiral_family">
    <img src="https://img.shields.io/twitter/url/https/twitter.com/bukotsunikki.svg?style=social&label=Follow%20%40admiral_family" alt="Twitter" />
  </a>
  <a href="https://www.npmjs.com/package/@devfamily/admiral">
    <img src="https://img.shields.io/npm/dt/@devfamily/admiral.svg?color=643add&labelColor=86ce2c" alt="Downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@devfamily/admiral">
    <img src="https://img.shields.io/npm/v/@devfamily/admiral.svg?color=643add&labelColor=86ce2c" alt="Version" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/npm/l/@devfamily/admiral.svg?color=643add&labelColor=86ce2c" alt="License" />
  </a>
</p>

<br>

<p align="center">
  <a target='_blank' href="https://admiral.dev.family">
    <img src="https://admiral.dev.family/images/github-original.png" alt="Admiral Administration panel" />
  </a>
</p>

Admiral is a frontend framework for creating back office in React. It provides out-of-the-box components and tools that make developing an admin interface easy and fast.

Made with :purple_heart: by [dev.family](https://dev.family/?utm_source=github&utm_medium=admiral&utm_campaign=readme)

## 📖 Table of Contents

-   [✨ Features](#-features)
-   [🚨 What problems do we solve](#what-problems-do-we-solve)
-   [🔨 Installation](#-installation)
    -   [NPX](#-npx)
    -   [Use one of our examples](#-use-one-of-our-examples)
    -   [git clone](#-git-clone)
-   [📦 Usage](#-usage)
    -   [📦 Interaction with API](#interaction-with-api)
    -   [📦 Menu](#menu)
    -   [📦 Icons](#icons)
    -   [📦 Custom Theme](#custom-theme)
-   [🗺️ Roadmap](#%EF%B8%8F-roadmap)
-   [🏆How can I support the developers?](#-how-can-i-support-the-developers)
-   [🤝 Contributing](#-contributing)
-   [© License](#%EF%B8%8F-license)
-   [📚 Contact](#-contact)

## ✨ Features

-   📀 Out-of-the-box React components used.
-   🛡 It is written in TypeScript and has built-in typing.
-   👨‍💻 Adaptive design: The library interface scales to any screen size. This is convenient when used on mobile devices.
-   🌍 Localization: we support different languages.
-   👨‍🎨 An interface that is intuitively easy to work with.
-   🎨 Different design themes: you can change the color scheme of the interface to suit your needs.

## 🚨What problems do we solve

-   **Development complexity.** Development complexity. We have collected ready-made components and tools to simplify and speed up development. Especially for those who are new to React.
-   **Inconsistent design.** We created a unified design and style for all components so that you don't have any trouble generating new ones.
-   **Support complexity.** We gathered all the necessary components and tools in one library, so that you don't waste your time looking for them.
-   **Low performance.** We use modern technologies such as React Hooks, Redux, and GraphQL to achieve high performance and fast responsiveness of the interface. Your admin area will no longer be slowed down by the large number of requests to the server and complex operations on the client.
-   **CRUD.** We have prepared tools to quickly create CRUD (Create, Read, Update, Delete) interfaces. Generate tables with data, forms for creating and editing objects, and components for deleting objects - in 5 minutes.

## 🔨 Installation

**Requirements:**

-   Node.js >=v14.21.3 <=20.3.0

There are several options for installing Admiral:

### 📦 NPX

_To use npx, make sure you have **Node.js**_

```bash
npx create-admiral-app@latest
```

When you enter this command into the console, you will see 2 installation options:

-   Install the template with backend on Express.js.
-   Install the template without backend.

If you choose "**Install the template with the backend setting on Express.js**", you will install the fully customized template with backend on Express.js.

[Detailed installation and startup instructions](examples/express-server/README.md)

All environment variables will be set automatically. If you want to configure them manually, go to the project folder and open the **.env.**
You will have 1 CRUDs from the start - **Users**. To find them pass the way - `admiral/src/crud/users/index.tsx`

If you choose "**Install the template without backend setting**", you get just the frontend shell of Admiral in the admiral folder with CRUD - **Users**. To find it pass the way - `admiral/src/crud/users/index.tsx`. To use your backend, read the [Documentation](#interaction-with-api)

Admiral is available at http://localhost:3000. If port 3000 is busy, any other free port will be selected.

In the console you will see something like this

```bash
Port 3000 is in use, trying another one...

vite v2.9.15 dev server running at:

> Local:    http://localhost:3001/
> Network:  http://192.168.100.82:3001/

ready in 459ms.
```

### 📦 Use one of our examples

Detailed installation and startup instructions are in each of the examples.

-   [Express Server](examples/express-server/README.md)

Open your browser and go to http://localhost:3000.

### 📦 Git Clone

Yes, that's right. You can just clone this repository and enter the following commands:

```bash
yarn
yarn dev
```

Then go to http://localhost:3000. The Admiral with mock data is now available to you.

## 📦 Usage

The App.tsx file is the entry point into the application. It is where the library is initialized and where the components are rendered `Admin`.

```tsx
import React from 'react'
import { Admin, createRoutesFrom, OAuthProvidersEnum } from '../admiral'
import Menu from './config/menu'
import dataProvider from './dataProvider'
import authProvider from './authProvider'

const apiUrl = '/api'
// import all pages from pages folder and create routes
const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

function App() {
    return (
        <Admin
            dataProvider={dataProvider(apiUrl)}
            authProvider={authProvider(apiUrl)}
            menu={Menu}
            oauthProviders={[
                OAuthProvidersEnum.Google,
                OAuthProvidersEnum.Github,
                OAuthProvidersEnum.Jira,
            ]}
        >
            <Routes />
        </Admin>
    )
}

export default App
```

<br>

### Interaction with API

#### Auth - [AuthProvider](src/authProvider.ts)

The main contract for authorization in the system is the interface `AuthProvider`.

```ts
export interface AuthProvider {
    login: (params: any) => Promise<any>
    logout: (params: any) => Promise<void | false | string>
    checkAuth: (params: any) => Promise<void>
    getIdentity: () => Promise<UserIdentity>
    oauthLogin?: (provider: OAuthProvidersEnum) => Promise<{ redirect: string }>
    oauthCallback?: (provider: OAuthProvidersEnum, data: string) => Promise<any>

    [key: string]: any
}
```

[Example of implementation](src/authProvider.ts)
The interface itself can be customized to your liking, but it is important to respect the contract it provides.
[Detailed contract description](admiral/auth/interfaces.ts)

Let's look at the basic methods of implementation:

| Method        | Name                             | Description                                                                                                                                           | Parameters                                                                                             | Return value                                                                      |
| ------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| login         | User Authentication              | Makes a POST request to `/api/login` and stores the `token` field in localStorage, which is used in further requests                                  | `params` - object with the fields `username` and `password`                                            | An object with a `token` field and a `user` object with `email` and `name` fields |
| logout        | User Logout                      | Makes a POST request to `/api/logout` and removes the `token` field from localStorage                                                                 |                                                                                                        | `void`                                                                            |
| checkAuth     | User authorization check         | Makes a GET request to `/api/checkAuth` and checks token validity, expects a status code - 200. Used every time the API is used                       | Bearer `token`                                                                                         | Status code 200                                                                   |
| getIdentity   | Receiving user data              | Makes a GET request to `/api/getIdentity` and returns an object with user data                                                                        | Bearer `token`                                                                                         | Object `user` with the fields `email` and `name`                                  |
| oauthLogin    | Authorization via OAuth          | Makes a GET request to `/api/auth/social-login/${provider}` and returns an object with the `redirect` field, which is used for the redirect           | `provider` - OAuth provider                                                                            | Object with the field `redirect`                                                  |
| oauthCallback | Callback authorization via OAuth | Makes a POST request to `/api/auth/social-login/${provider}/callback` and stores the `token` field in localStorage, which is used in further requests | `provider` - OAuth provider, `data` - data received from OAuth provider where the `token` field exists | Object with the field `token`                                                     |

#### CRUD [DataProvider](src/dataProvider.ts)

The main contract for working with data represents the interface `DataProvider`.

```ts
export interface DataProvider {
    getList: (
        resource: string,
        params: Partial<GetListParams>,
    ) => Promise<GetListResult<RecordType>>
    reorderList: (resource: string, params: ReorderParams) => Promise<void>
    getOne: (resource: string, params: GetOneParams) => Promise<GetOneResult<RecordType>>
    getCreateFormData: (resource: string) => Promise<GetFormDataResult<RecordType>>
    getFiltersFormData: (
        resource: string,
        urlState?: Record<string, any>,
    ) => Promise<GetFiltersFormDataResult>
    create: (resource: string, params: CreateParams) => Promise<CreateResult<RecordType>>
    getUpdateFormData: (
        resource: string,
        params: GetOneParams,
    ) => Promise<GetFormDataResult<RecordType>>
    update: (resource: string, params: UpdateParams) => Promise<UpdateResult<RecordType>>
    deleteOne: (resource: string, params: DeleteParams) => Promise<DeleteResult<RecordType>>

    [key: string]: any
}
```

[Example of implementation](src/dataProvider.ts)
[Detailed contract description](admiral/dataProvider/interfaces.ts)

Let's look at the basic methods of implementation:

| Method             | Name                                                          | Description                                                                                                                        | Parameters                                                                                                         |
| ------------------ | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| getList            | Getting a list of entities                                    | Makes a GET request to `/api/${resource}` and returns an object with data to be used in the `List` component                       | `resource` - resource name, `params` - object with query parameters                                                |
| reorderList        | Changing the order of entities                                | Makes a POST request to `/api/${resource}/reorder` and returns an object with data to be used in the `List` component              | `resource` - resource name, `params` - object with query parameters                                                |
| getOne             | Obtaining an entity                                           | Makes a GET request to `/api/${resource}/${id}` and returns an object with data to be used in the `Show` component                 | `resource` - resource name, `id` - entity identifier                                                               |
| getCreateFormData  | Getting data for an entity creation form (Select, AjaxSelect) | Makes a GET request to `/api/${resource}/create` and returns an object with data to be used in the `Create` component              | `resource` - resource name                                                                                         |
| getFiltersFormData | Receiving data for filters                                    | Makes a GET request to `/api/${resource}/filters` and returns an object with data to be used in the `Filters` component            | `resource` - resource name, `urlState` - object with parameters from the url to be used in the component `Filters` |
| create             | Creating an Entity                                            | Makes a POST request to `/api/${resource}` and returns an object with data to be used in the component `Create`                    | `resource` - resource name, `params` - entity data object                                                          |
| getUpdateFormData  | Getting data for an entity edit form (Select, AjaxSelect)     | Makes a GET request to `/api/${resource}/${id}/update` and returns an object with data to be used in the component `Edit`          | `resource` - resource name, `id` - entity identifier                                                               |
| update             | Updating an entity                                            | Makes a POST request to `/api/${resource}/${id}` and returns an object with the data to be used in the component `Edit`            | `resource` - resource name, `id` - entity identifier, `params` - entity data object                                |
| delete             | Deleting an Entity                                            | Делает DELETE запрос на `/api/${resource}/${id}` и возвращает объект с данными, которые будут использоваться в компоненте `Delete` | `resource` - resource name, `id` - entity identifier                                                               |

##### getList Query Example [Receive 10 Users per page with filter by id=1]

Query:

```http request
http://localhost/admin/users?page=1&perPage=10&filter%5Bid%5D=1
```

Result:

```json
{
    "items": [
        {
            "id": 1,
            "name": "Dev family",
            "email": "info@dev.family",
            "role": "Administrator",
            "created_at": "2023-05-05 14:17:51"
        }
    ],
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "per_page": 10,
        "to": 1,
        "total": 1
    }
}
```

##### getOne Query Example [Receive User where id=1]

Query:

```http request
http://localhost/admin/users/1/update?id=1
```

Result:

```json
{
    "data": {
        "id": 1,
        "name": "Dev family",
        "email": "info@dev.family",
        "role_id": 1
    },
    "values": {
        "role_id": [
            {
                "label": "Administrator",
                "value": 1
            }
        ]
    }
}
```

#### Pagination

Pagination work with `getList` method. You can pass `page` and `perPage` params to `getList` method, and it will return `PaginationResult` object with `items` and `meta` fields.

#### Filters

Filters work with `getList` method. You can pass `filter[$field]` param to `getList` method, and it will return `PaginationResult` object with `items` and `meta` fields.

#### Sorting

Sorting work with `getList` method. You can pass `sort[$field]` param to `getList` method, and it will return `PaginationResult` object with `items` and `meta` fields.

### Routing

Admiral has a **file-system based** router.

A page is a React Component exported from a .js, .jsx, .ts, or .tsx file in the pages' directory. When a file is added to the pages' directory, it's automatically available as a route.
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

<br>

### Menu

A menu is an array of objects that have the following structure:

```tsx
import { Menu, SubMenu, MenuItemLink } from '../../admiral'

const CustomMenu = () => {
    return (
        <Menu>
            <MenuItemLink icon="FiCircle" name="First Menu Item" to="/first" />
            <SubMenu icon="FiCircle" name="Second Menu Item">
                <MenuItemLink icon="FiCircle" name="Sub Menu Item" to="/second" />
            </SubMenu>
        </Menu>
    )
}

export default CustomMenu
```

<br>

### Hooks

Our application uses React hooks. You can use them from anywhere in the application inside the React components.
These are the hooks you can use:

#### useNav

This hook allows you to receive and manage the status of the navigation bar

```tsx
import { useNav } from '@devfamily/admiral'
const { collapsed, toggleCollapsed, visible, toggle, open, close } = useNav()
```

-   collapsed - a variable containing the state of the navigation panel (collapsed or not)
-   toggleCollapsed - a method that allows you to control the state of the navigation panel.
-   visible - a variable containing the state of the burger menu (open-closed).
-   toggle - a method that allows you to manage the state of the burger menu (opening-closing).
-   open - a method that allows you to open the burger menu.
-   close - a method that allows you to close the burger menu.

#### useForm

This hook allows you to get form values and manage the state of the form. The hook can be used in components used in "form" inside the configuration of the createCRUD function.

```tsx
import { useForm } from '@devfamily/admiral'
const {
    values,
    options,
    errors,
    setErrors,
    setValues,
    setOptions,
    isSubmitting,
    isFetching,
    locale,
} = useForm()
```

-   options - options, which are returned from the server for this form.
-   errors - errors, which are returned from the server when initializing the form, or when submitting the form.
-   setErrors - a method for recording the errors.
-   setValues - a method for recording the values.
-   setOptions - a method for recording the options.
-   isSubmitting - form submitting status.
-   isFetching - form initialization status.
-   locale - localization configuration for the form.

#### useTheme

This hook allows you to receive and manage the state of theme.

```tsx
import { useTheme } from '@devfamily/admiral'
const { themeName, setTheme } = useTheme()
```

-   themeName - name of the active theme.
-   setTheme - a method to change the theme, you need to pass argument name as 'dark' or 'light.

#### useGetIdentty

A hook that allows you to get the state obtained by calling AuthProvider.getIdentity()

```tsx
import { useGetIdentty } from '@devfamily/admiral'
const { identity, loading, loaded, error } = useGetIdentty()
```

-   identity - a variable containing the state.
-   loading - a state initialization status.
-   loaded - a variable that indicates that the state has been initialized.
-   error - a object of errors.

<br>

### Icons

Icons used in Admiral are from [React Icons](https://react-icons.github.io/react-icons/).

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

## 🗺️ Roadmap

-   [x] Routing
-   [x] Menu
-   [x] Icons
-   [x] Custom theme
-   [x] OAuth
-   [ ] Documentation
-   [ ] Custom login page
-   [ ] Laravel Example
-   [ ] Websockets

## 🏆 How can I support the developers?

-   Star our GitHub repo ⭐
-   Create pull requests, submit bugs, suggest new features or documentation updates 🔧
-   Read us on [Medium](https://medium.com/@dev.family)
-   Follow us on [Twitter](https://twitter.com/dev___family) 🐾
-   Like our page on [LinkedIn](https://www.linkedin.com/company/dev-family) 👍

## 🤝 Contributing

If you want to participate in the development of Admiral, make a Fork of the repository, make the desired changes and send a pull request. We will be glad to consider your suggestions!

## ©️ License

This library is distributed under the MIT license.

## 📚 Contact

If you have any questions, please contact us at: <a href="mailto:admiral@dev.family">admiral@dev.family</a>
We're always happy to receive your feedback!
