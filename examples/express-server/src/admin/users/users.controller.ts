import type { Response, Request } from 'express';
import usersService from './users.service';
import { z } from 'zod';

export default {
    async index(req: Request, res: Response) {
        const querySchema = z.object({
            page: z.coerce.number(),
            perPage: z.coerce.number(),
        });

        const query = querySchema.parse(req.query);

        const [count, items] = await usersService.index(query);

        res.json({
            items,
            meta: {
                total: count,
            },
        });
    },

    async create(req: Request, res: Response) {
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
            role: z.enum(['admin', 'user']),
        });

        const body = bodySchema.parse(req.body);

        const data = await usersService.create(body);

        res.json({ item: data });
    },

    async createShow(req: Request, res: Response) {
        res.json({ data: {}, values: {} });
    },

    async updateShow(req: Request, res: Response) {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const params = paramsSchema.parse(req.params);

        const data = await usersService.show(params);

        res.json({ data: data, values: {} });
    },

    async update(req: Request, res: Response) {
        const bodySchema = z.object({
            id: z.number(),
            name: z.string(),
            email: z.string().email(),
            password: z.string().optional(),
            role: z.enum(['admin', 'user']),
        });

        const body = bodySchema.parse(req.body);

        const data = await usersService.update(body);

        res.json({ item: data });
    },

    async delete(req: Request, res: Response) {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const params = paramsSchema.parse(req.params);

        await usersService.delete(params);

        res.json({ message: 'User deleted' });
    },

    async filters(req: Request, res: Response) {
        const options = await usersService.filters();

        res.json({ options: options });
    },
};
