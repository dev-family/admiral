# Admiral Express Server Example App

This is a simple example of how to use Admiral with an Express server.

## 🚀 Running the example

1. **Install dependencies for the Express Server.**
    ```shell
    yarn install
    ```
2. **Setup Database.**
    ```shell
    yarn prisma:generate
    yarn prisma:migrate dev
    ```
3. **Start Express Server.**

    ```shell
    yarn dev
    ```

4. **Install dependencies & start Admiral.**

    Navigate into the example’s directory and install its dependencies.

    ```shell
    cd admiral
    yarn install
    yarn build
    cp .env.example .env
    yarn dev
    ```

5. **Enjoy Admiral.**

    Visit http://localhost:3000

    Credentials:

    ```
    Login: admin@dev.family
    Password: password
    ```

## 📝 Notes

-   The example uses [Express](https://expressjs.com/) to serve API.
-   The example uses [Prisma](https://www.prisma.io/) to manage the database. You can find the schema in `src/prisma/schema.prisma`. You can also find the seed data in `src/prisma/seed.ts`.

## 🧐 What’s inside?

-   `admiral/` - Admiral Admin
-   `src/` - Express Server
-   `src/prisma/` - Prisma Database
-   `package.json` - dependencies and scripts
-   `tsconfig.json` - TypeScript configuration
