import express from 'express';
import config from '../config';
import { setupServer } from './utils';
import setupServerMiddleware from './middleware';

const { server } = config;

export default async () => {
    const app = express();

    setupServerMiddleware({ app });

    app.listen(server.port, setupServer);
};
