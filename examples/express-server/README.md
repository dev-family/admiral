# Admiral Express Server Example App

This is a simple example of how to use Admiral with an Express server.

## 🚀 Running the example

1. **Run docker-compose.**

    ```shell
    docker-compose up
    ```

2. **Install dependencies for Admiral.**

    Navigate into the example’s directory and install it’s dependencies.

    ```shell
    cd admin
    yarn install
    yarn build
    ```

3. **Install dependencies for the Express Server.**
    ```shell
    yarn install
    ```
4. **Start Admiral.**
    ```shell
    cd admin
    yarn dev
    ```
5. **Setup Database.**
    ```shell
    yarn prisma:generate
    yarn prisma:seed
    ```
6. **Start Express Server.**
    ```shell
    yarn dev
    ```

## 📝 Notes

-   The example uses [Express](https://expressjs.com/) to serve API.
-   The example uses [Prisma](https://www.prisma.io/) to manage the database. You can find the schema in `prisma/schema.prisma`. You can also find the seed data in `prisma/seed.ts`.

## 🧐 What’s inside?

-   `admin/` - Admiral Admin
-   `src/` - Express Server
-   `prisma/` - Prisma Database
-   `package.json` - dependencies and scripts
-   `tsconfig.json` - TypeScript configuration
