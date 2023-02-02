export default {
    build: process.env.NODE_ENV,
    prisma: {
        port: parseInt(process.env.PRISMA_STUDIO_PORT as string, 10),
    },
    server: {
        port: 8080,
        host: 'localhost',
    },
    postgresql: {
        port: parseInt(process.env.POSTGRES_PORT as string, 10),
        user: process.env.POSTGRES_USER as string,
        password: process.env.DATABASE_PASSWORD as string,
        database: process.env.POSTGRES_DB as string,
    },
    jwt: {
        secret: 'secret',
    },
    admin: {
        url: '/admin/',
    },
};
