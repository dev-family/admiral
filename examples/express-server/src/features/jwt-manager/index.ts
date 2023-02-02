import jsonwebtoken from 'jsonwebtoken';
import config from '../../config';

const { secret } = config.jwt;

export const generate = async (data: {
    userId: number;
    expiresIn: number | string;
}) => {
    const { userId, expiresIn } = data;

    return jsonwebtoken.sign({ userId }, secret, {
        expiresIn: expiresIn,
    });
};

export const validate = (token: string) => {
    return jsonwebtoken.verify(token, secret) as { userId: number };
};
