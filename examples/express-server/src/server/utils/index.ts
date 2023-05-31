import config from '../../config';

const {
    server: { port, host },
} = config;

type BaseUriParts = {
    host: string;
    port: number;
};

export const buildHttpUri = ({ host, port }: BaseUriParts): string => {
    const protocol = 'http';
    return `${protocol}://${host}:${port}`;
};

export const setupServer = (): void => {
    console.log(`🔥Server is started: ${buildHttpUri({ port, host })}.`);
};
