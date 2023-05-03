import type { Response, Request } from 'express';
import brandsService from './brands.service';
import { z } from 'zod';

export default {
    // извлечение данных из сервиса и отправка их в ответ
    async index(req: Request, res: Response) {
        const querySchema = z.object({
            page: z.coerce.number(),
            perPage: z.coerce.number(),
        });

        const query = querySchema.parse(req.query);

        const [count, items] = await brandsService.index(query);

        res.json({
            items,
            meta: {
                total: count,
            },
        });
    },

    // отправка данных в сервис с последующим их извлечением и отправкой в ответ
    async create(req: Request, res: Response) {
        const bodySchema = z.object({
            name: z.string(),
            slug: z.string(),
            description: z.string(),
        });

        const body = bodySchema.parse(req.body);

        const data = await brandsService.create(body);

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

        const data = await brandsService.show(params);

        res.json({ data: data, values: {} });
    },

    // отправка данных в сервис для обновления сущности и последующим извлечением данных обновленной сущности
    async update(req: Request, res: Response) {
        const bodySchema = z.object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
            description: z.string(),
        });

        const body = bodySchema.parse(req.body);

        const data = await brandsService.update(body);

        res.json({ item: data });
    },

    // запрос на удаление в сервис
    async delete(req: Request, res: Response) {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const params = paramsSchema.parse(req.params);

        await brandsService.delete(params);

        res.json({ message: 'Category deleted' });
    },
};
