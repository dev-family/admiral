import express from 'express';
import config from '../config';
import { setupServer } from './utils';
import setupServerMiddleware from './middleware';
import routes from '../admin';

const { server } = config;

export default async () => {
    const app = express();

    setupServerMiddleware({ app });

    app.use(config.admin.url, routes());

    app.listen(server.port, setupServer);
};
