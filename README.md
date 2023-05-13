<h1 align="center">Admiral</h1>

## 🖥 Introduction

Ниже приведена демонстрация работы админки:

_Здесь видео и картинки, влюбляющие в пакет с первого взгляда_

## 📖 Table of Contents

-   [ℹ️ About](#ℹ️about)
-   [✨ Features](#✨-features)
-   [🚨 What problems do we solve](#🚨-what-problems-do-we-solve)
-   [🔨 Installation](#🔨-installation)
-   [📦 Usage](#📦-usage)
    -   [📦 Interaction with API](#interaction-with-api)
    -   [📦 Routing](#routing)
    -   [📦 Menu](#menu)
    -   [📦 Themes](#📦-themes)
    -   [📦 Icons](#📦-icons)
-   [🤝 Contributing](#contributing)
-   [© License](#license)
-   [📚 Contact](#contact)
-   [📚 Authors](#authors)

## ℹ️About

Admiral - это фронтенд фреймворк для создания административных интерфейсов на React. Он предоставляет готовые компоненты и инструменты, которые помогают упростить и ускорить процесс разработки административных интерфейсов.

## ✨ Features

Некоторые из возможностей, предоставляемых Admiral:

-   📀 Набор высококачественных компонентов React из коробки.
-   🛡 Написано на TypeScript с встроенными статическими типами.
-   👨‍💻 Адаптивный дизайн: интерфейс библиотеки адаптируется к любому размеру экрана, что обеспечивает удобство использования на мобильных устройствах.
-   🌍 Интернационализация: поддержка разных языков и локализация интерфейса.
-   👨‍🎨 Потрясающий дизайн: интерфейс библиотеки имеет современный дизайн, который обеспечивает удобство использования.
-   🎨 Темы оформления: библиотека поддерживает темы оформления, которые позволяют изменять цветовую схему интерфейса.

## 🚨What problems do we solve

Admiral решает ряд проблем, связанных с созданием административных интерфейсов на React. Вот некоторые из этих проблем:

-   **Сложность разработки.** Создание административного интерфейса может быть сложной задачей, особенно если вы только начинаете работать с React. Admiral предоставляет готовые компоненты и инструменты, которые помогают упростить этот процесс и ускорить разработку.
-   **Несогласованность дизайна.** Часто разные разработчики создают разные компоненты, что может привести к несогласованности дизайна. Admiral решает эту проблему, предоставляя единый дизайн и стиль для всех компонентов.
-   **Сложность поддержки.** Поддержка административного интерфейса может быть сложной задачей, особенно если вы используете различные библиотеки и компоненты. Admiral решает эту проблему, предоставляя все необходимые компоненты и инструменты в одной библиотеке.
-   **Низкая производительность.** Некоторые административные интерфейсы могут работать медленно и тормозить из-за большого количества запросов к серверу и сложных операций на клиенте. Admiral решает эту проблему, используя современные технологии, такие как React Hooks, Redux и GraphQL, что позволяет достичь высокой производительности и быстрой отзывчивости интерфейса.
-   **CRUD.** Admiral также предоставляет инструменты для быстрого создания CRUD (Create, Read, Update, Delete) интерфейсов. Благодаря готовым компонентам и функциональности, вы можете быстро создавать таблицы с данными, формы для создания и редактирования объектов, а также компоненты для удаления объектов. Мы также подготовили [DEMO](examples/express-server/README.md) для быстрого старта Вашего проекта.

В общем и целом, использование Admiral позволяет упростить и ускорить процесс разработки административных интерфейсов на React, а также повысить их качество и производительность.

## 🔨 Installation

Вы можете воспользоваться несколькими способами установки Admiral:

### 📦 NPX

```bash
npx create-admiral-app
```

Далее следуйте инструкциям в терминале.

Обратите внимание, что вам нужно будет ввести имя вашего проекта и выбрать, необходимо ли вам предустановить backend (Express Server). Подробная инструкция по установке и запуску находится в [Express Server](examples/express-server/README.md).

Все переменные окружения будут настроены автоматически. Если вы хотите настроить их вручную, то перейдите в папку проекта и откройте файл .env.

### 📦 Использовать один из наших examples

Подробная инструкция по установке и запуску находится в каждом из примеров.

-   [Express Server](examples/express-server/README.md)

Затем откройте ваш браузер и посетите страницу http://localhost:3000.

## 📦 Usage

Файл App.tsx является точкой входа в приложение. В нем происходит инициализация библиотеки и рендеринг компонента `Admin`.

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

### Взаимодействие с API

#### Auth - [AuthProvider](src/authProvider.ts)

Основной контракт для авторизации в системе представляет интерфейс `AuthProvider`.

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

Пример реализации можно посмотреть в [authProvider.ts](src/authProvider.ts).
Сам интерфейс можно реализовать по своему усмотрению, но важно соблюдать контракт, который он предоставляет.
Подробное описание контракта можно найти в [AuthProvider](admiral/auth/interfaces.ts).

Разберем основные методы реализации в таблице:

| Метод         | Название                          | Описание                                                                                                                                                | Параметры                                                                                            | Возвращаемое значение                                                          |
| ------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| login         | Авторизация пользователя          | Делает POST запрос на `/api/login` и сохраняет поле `token` в localStorage, которое используется в дальнейших запросах                                  | `params` - объект с полями `username` и `password`                                                   | Объект с полем `token` и объектом `user`, в котором есть поля `email` и `name` |
| logout        | Logout пользователя               | Делает POST запрос на `/api/logout` и удаляет поле `token` из localStorage                                                                              |                                                                                                      | `void`                                                                         |
| checkAuth     | Проверка авторизации пользователя | Делает GET запрос на `/api/checkAuth` и проверяет валидность токена, ожидает код статуса - 200. Используется при каждом использовании API               | Bearer `token`                                                                                       | Status code 200                                                                |
| getIdentity   | Получение данных пользователя     | Делает GET запрос на `/api/getIdentity` и возвращает объект с данными пользователя                                                                      | Bearer `token`                                                                                       | Объект `user` с полями `email` и `name`                                        |
| oauthLogin    | Авторизация через OAuth           | Делает GET запрос на `/api/auth/social-login/${provider}` и возвращает объект с полем `redirect`, который используется для редиректа                    | `provider` - OAuth провайдер                                                                         | Объект с полем `redirect`                                                      |
| oauthCallback | Callback авторизации через OAuth  | Делает POST запрос на `/api/auth/social-login/${provider}/callback` и сохраняет поле `token` в localStorage, который используется в дальнейших запросах | `provider` - OAuth провайдер, `data` - данные, полученные от OAuth провайдера, где есть поле `token` | Объект с полем `token`                                                         |

#### CRUD [DataProvider](src/dataProvider.ts)

Основной контракт для работы с данными представляет интерфейс `DataProvider`.

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

Пример реализации можно посмотреть в [dataProvider.ts](src/dataProvider.ts).
Подробное описание контракта можно найти в [DataProvider](admiral/dataProvider/interfaces.ts).

Разберем основные методы реализации в таблице:

| Метод              | Название                                                                | Описание                                                                                                                             | Параметры                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| getList            | Получение списка сущностей                                              | Делает GET запрос на `/api/${resource}` и возвращает объект с данными, которые будут использоваться в компоненте `List`              | `resource` - название ресурса, `params` - объект с параметрами запроса                                                       |
| reorderList        | Изменение порядка сущностей                                             | Делает POST запрос на `/api/${resource}/reorder` и возвращает объект с данными, которые будут использоваться в компоненте `List`     | `resource` - название ресурса, `params` - объект с параметрами запроса                                                       |
| getOne             | Получение сущности                                                      | Делает GET запрос на `/api/${resource}/${id}` и возвращает объект с данными, которые будут использоваться в компоненте `Show`        | `resource` - название ресурса, `id` - идентификатор сущности                                                                 |
| getCreateFormData  | Получение данных для формы создания сущности (Select, AjaxSelect)       | Делает GET запрос на `/api/${resource}/create` и возвращает объект с данными, которые будут использоваться в компоненте `Create`     | `resource` - название ресурса                                                                                                |
| getFiltersFormData | Получение данных для фильтров                                           | Делает GET запрос на `/api/${resource}/filters` и возвращает объект с данными, которые будут использоваться в компоненте `Filters`   | `resource` - название ресурса, `urlState` - объект с параметрами из url, которые будут использоваться в компоненте `Filters` |
| create             | Создание сущности                                                       | Делает POST запрос на `/api/${resource}` и возвращает объект с данными, которые будут использоваться в компоненте `Create`           | `resource` - название ресурса, `params` - объект с данными сущности                                                          |
| getUpdateFormData  | Получение данных для формы редактирования сущности (Select, AjaxSelect) | Делает GET запрос на `/api/${resource}/${id}/update` и возвращает объект с данными, которые будут использоваться в компоненте `Edit` | `resource` - название ресурса, `id` - идентификатор сущности                                                                 |
| update             | Обновление сущности                                                     | Делает POST запрос на `/api/${resource}/${id}` и возвращает объект с данными, которые будут использоваться в компоненте `Edit`       | `resource` - название ресурса, `id` - идентификатор сущности, `params` - объект с данными сущности                           |
| delete             | Удаление сущности                                                       | Делает DELETE запрос на `/api/${resource}/${id}` и возвращает объект с данными, которые будут использоваться в компоненте `Delete`   | `resource` - название ресурса, `id` - идентификатор сущности                                                                 |

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

### Menu

Меню представляет собой массив объектов, которые имеют следующую структуру:

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

## Roadmap

-   [x] Routing
-   [x] Menu
-   [x] Icons
-   [x] Custom theme
-   [x] OAuth
-   [ ] Custom login page
-   [ ] Laravel Example
-   [ ] Websockets

## 🤝 Contributing

Если вы хотите внести свой вклад в развитие Admiral, то просто сделайте Fork репозитория, внесите свои изменения и отправьте pull request. Мы будем рады рассмотреть ваши предложения!

## ©️ License

Эта библиотека распространяется под лицензией MIT.

## 📚 Contact

Если у вас есть какие-либо вопросы, пожалуйста, свяжитесь с нами по адресу: <a href="mailto:admiral@dev.family">admiral@dev.family</a>
