# Admiral Express Server Example App

This is a simple example of how to use Admiral with an Express server.

## 🚀 Running the example
0. **Run docker-compose.**

    ```shell
    cd examples/express-server
    docker-compose up
    ```

1.  **Install dependencies for Admiral.**

    Navigate into the example’s directory and install it’s dependencies.

    ```shell
    cd examples/express-server/admin
    yarn install
    yarn build
    ```
    
2. **Install dependencies for the Express Server.**
    ```shell
    cd examples/express-server
    yarn install
    ```
   
3. **Start Admiral.**
    ```shell
    cd examples/express-server/admin
    yarn dev
    ```
   
4. **Setup Database.**
    ```shell
    cd examples/express-server
    yarn prisma:generate
    yarn prisma:seed
    ```
   
5. **Start Express Server.**
    ```shell
    cd examples/express-server
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
