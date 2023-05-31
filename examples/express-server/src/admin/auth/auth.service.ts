import { jwtManager } from '../../features';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { CustomError } from '../../server/errors/custom.error';

const prisma = new PrismaClient();

const expiresIn = '27d';

export default {
    async login(data: { email: string; password: string }) {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (!user) {
            throw new CustomError('Not Found', 404);
        }

        if (crypto.createHash('sha256').update(data.password).digest('hex') !== user.password) {
            throw new CustomError('Password is incorrect', 400);
        }

        return await jwtManager.generate({ userId: user.id, expiresIn });
    },

    async getIdentity(userId: number) {
        return await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
        });
    },

    async checkAuth(userId: number) {
        return await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
        });
    },
};
