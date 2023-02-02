import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export default {
    async index(filter: { page: number; perPage: number }) {
        return await prisma.$transaction([
            prisma.user.count(),
            prisma.user.findMany({
                skip: (filter.page - 1) * filter.perPage,
                take: filter.perPage,
            }),
        ]);
    },

    async show(params: { id: number }) {
        return await prisma.user.findUnique({
            where: {
                id: params.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
    },

    async create(data: { email: string; name: string; password: string; role: string }) {
        return await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: crypto.createHash('sha256').update(data.password).digest('hex'),
                role: data.role,
            },
        });
    },

    async update(data: { id: number; email: string; name: string; role: string; password?: string }) {
        if (data.password) {
            data.password = crypto.createHash('sha256').update(data.password).digest('hex');
        }

        return await prisma.user.update({
            where: {
                id: data.id,
            },
            data: data,
        });
    },

    async delete(params: { id: number }) {
        return await prisma.user.delete({
            where: {
                id: params.id,
            },
        });
    },

    async filters() {
        return {
            role: [
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
            ],
        };
    },
};
