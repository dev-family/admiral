import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
    // извлечение всех данных
    async index(filter: { page: number; perPage: number }) {
        return await prisma.$transaction([
            prisma.brand.count(),
            prisma.brand.findMany({
                skip: (filter.page - 1) * filter.perPage,
                take: filter.perPage,
            }),
        ]);
    },

    // просмотр конкретной записи
    async show(params: { id: number }) {
        return await prisma.brand.findUnique({
            where: {
                id: params.id,
            },
        });
    },

    // запрос на создание записи
    async create(data: { name: string; slug: string; description: string }) {
        return await prisma.brand.create({
            data,
        });
    },

    // запрос на обновление записи
    async update(data: { id: number; name: string; slug: string }) {
        return await prisma.brand.update({
            where: {
                id: data.id,
            },
            data,
        });
    },

    // запрос на удаление записи
    async delete(params: { id: number }) {
        return await prisma.brand.delete({
            where: {
                id: params.id,
            },
        });
    },
};
