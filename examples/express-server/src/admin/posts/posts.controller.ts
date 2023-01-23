import type { Response, Request } from 'express';
import { z } from 'zod';
import postsService from './posts.service';
import usersService from '../users/users.service';

export default {
    async index(req: Request, res: Response) {
        const querySchema = z.object({
            page: z.coerce.number(),
            perPage: z.coerce.number(),
        });

        const query = querySchema.parse(req.query);

        const [count, items] = await postsService.index(
            query,
        );

        const itemsData = items.map((item) => {
            return {
                ...item,
                user: item.user.name,
                category: item.category.name,
            };
        });

        res.json({
            items: itemsData,
            meta: {
                total: count,
            },
        });
    },

    async create(req: Request, res: Response) {
        const bodySchema = z.object({
            title: z.string(),
            slug: z.string(),
            content: z.string(),
            published: z.boolean(),
            categoryId: z.coerce.number(),
            userId: z.coerce.number(),
        });

        const body = bodySchema.parse(req.body);

        const data = await postsService.create(body);

        res.json({ item: data });
    },

    async createShow(req: Request, res: Response) {
        const data = await postsService.createShow();

        res.json({
            data: {}, values: {
                userId: data.users.map((user) => {
                    return {
                        label: user.name,
                        value: user.id,
                    };
                }),
                categoryId: data.categories.map((category) => {
                    return {
                        label: category.name,
                        value: category.id,
                    };
                }),
            },
        });
    },

    async updateShow(req: Request, res: Response) {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const params = paramsSchema.parse(req.params);

        const data = await postsService.show(params);

        res.json({
            data: data, values: {
                userId: [{
                    value: data.userId,
                    label: data.user.name,
                }],
                categoryId: [{
                    value: data.categoryId,
                    label: data.category.name,
                }],
            },
        });
    },

    async update(req: Request, res: Response) {
        const bodySchema = z.object({
            id: z.number(),
            title: z.string(),
            slug: z.string(),
            content: z.string(),
            published: z.boolean(),
            categoryId: z.coerce.number(),
            userId: z.coerce.number(),
        });

        const body = bodySchema.parse(req.body);

        const data = await postsService.update(body);

        res.json({ item: data });
    },

    async delete(req: Request, res: Response) {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const params = paramsSchema.parse(req.params);

        await postsService.delete(params);

        res.json({ message: 'Category deleted' });
    },

    async filters(req: Request, res: Response) {
        const data = await postsService.filters();

        res.json({ data: data });
    },

    async ajaxSelect(req: Request, res: Response) {
        const querySchema = z.object({
            query: z.string(),
        });

        const paramsSchema = z.object({
            field: z.string(),
        });

        const query = querySchema.parse(req.query);
        const params = paramsSchema.parse(req.params);

        const items = await postsService.ajaxSelect(query, params);

        res.json(items.map((item) => ({
            value: item.id,
            label: item.name,
        })));
    },

};
