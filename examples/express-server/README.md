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
4. **Setup Database.**
    ```shell
    yarn prisma:generate
    yarn prisma:migrate
    yarn prisma:seed
    ```
5. **Start Express Server.**

    ```shell
    yarn dev
    ```

6. **Start Admiral.**
    ```shell
    cd admin
    yarn dev
    ```
7. **Enjoy Admiral.**

    Visit http://localhost:3000

    Credentials:

    ```
    Login: admin@dev.family
    Password: password
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
