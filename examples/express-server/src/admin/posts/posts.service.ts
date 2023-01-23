import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
    async index(filter: { page: number, perPage: number }) {
        const data = await prisma.$transaction([
            prisma.post.count(),
            prisma.post.findMany(
                {
                    skip: (filter.page - 1) * filter.perPage,
                    take: filter.perPage,
                    include: {
                        category: true,
                        user: true,
                    },
                },
            ),
        ]);

        return data;
    },

    async show(params: { id: number }) {
        return await prisma.post.findUniqueOrThrow({
            where: {
                id: params.id,
            },
            include: {
                category: true,
                user: true,
            },
        });
    },

    async create(
        data: {
            title: string;
            slug: string;
            content: string;
            published: boolean;
            userId: number;
            categoryId: number;
        },
    ) {
        return await prisma.post.create({
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                published: data.published,
                user: {
                    connect: {
                        id: data.userId,
                    },
                },
                category: {
                    connect: {
                        id: data.categoryId,
                    },
                },
            },
        });
    },

    async createShow() {
        const users = await prisma.user.findMany({
            take: 10,
        });

        const categories = await prisma.category.findMany({
            take: 10,
        });

        return {
            users,
            categories,
        };
    },

    async update(
        data: {
            id: number;
            title: string;
            slug: string;
            content: string;
            published: boolean;
            userId: number;
            categoryId: number;
        },
    ) {
        return await prisma.post.update({
            where: {
                id: data.id,
            }, data,
        });
    },

    async delete(params: { id: number }) {
        return await prisma.post.delete({
            where: {
                id: params.id,
            },
        });
    },

    async filters() {
        return await prisma.$transaction([
            prisma.user.findMany(),
            prisma.category.findMany(),
        ]);
    },

    async ajaxSelect(query: { query: string }, params: { field: string }) {
        switch (params.field) {
            case 'userId':
                return await prisma.user.findMany({
                    where: {
                        OR: [
                            { name: { contains: query.query } },
                            { email: { contains: query.query } },
                        ],
                    },
                    select: {
                        id: true,
                        name: true,
                    },
                    take: 10,
                });
            case 'categoryId':
                return await prisma.category.findMany({
                    where: {
                        name: { contains: query.query },
                    },
                    select: {
                        id: true,
                        name: true,
                    },
                    take: 10,
                });
            default:
                return [];
        }
    },
};
