import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
    async index(filter: { page: number, perPage: number }) {
        return await prisma.$transaction([
            prisma.category.count(),
            prisma.category.findMany(
                {
                    skip: (filter.page - 1) * filter.perPage,
                    take: filter.perPage,
                },
            )]);
    },

    async show(params: { id: number }) {
        return await prisma.category.findUnique({
            where: {
                id: params.id,
            },
        });
    },

    async create(
        data: { name: string; slug: string },
    ) {
        return await prisma.category.create({
            data,
        });
    },

    async update(
        data: { id: number, name: string; slug: string },
    ) {
        return await prisma.category.update({
            where: {
                id: data.id,
            }, data,
        });
    },

    async delete(params: { id: number }) {
        return await prisma.category.delete({
            where: {
                id: params.id,
            },
        });
    },
};
