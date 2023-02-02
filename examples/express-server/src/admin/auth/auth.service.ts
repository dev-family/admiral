import { jwtManager } from '../../features';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

const expiresIn = '27d';

export default {
    async login(data: { email: string, password: string }) {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        if (crypto.createHash('sha256').update(data.password).digest('hex') !== user.password) {
            throw new Error('Password is incorrect');
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
