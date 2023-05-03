import { Router } from 'express';
import controller from './brands.controller';
import AuthMiddleware from '../auth/auth.middleware';

export const router = Router();

// подключаем middleware авторизации
router.use(AuthMiddleware);

// основные методы CRUD
router.get('/', controller.index);
router.get('/:id/update', controller.updateShow);
router.get('/create', controller.createShow);
router.post('/', controller.create);
router.post('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
