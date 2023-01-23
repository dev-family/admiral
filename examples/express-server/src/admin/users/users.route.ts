import { Router } from 'express';
import controller from './users.controller';
import AuthMiddleware from '../auth/auth.middleware';

export const router = Router();

router.use(AuthMiddleware);

router.get('/', controller.index);
router.get('/:id/update', controller.updateShow);
router.get('/create', controller.createShow);
router.post('/', controller.create);
router.post('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/filters', controller.filters)

export default router;
