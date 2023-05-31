export default {
    build: process.env.NODE_ENV,
    server: {
        port: parseInt(process.env.PORT as string) || 8080,
        host: process.env.HOST || 'localhost',
    },
    jwt: {
        secret: 'secret',
    },
    admin: {
        url: '/admin/',
    },
};
