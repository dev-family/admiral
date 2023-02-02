import { Request, Response, NextFunction } from 'express';
import { jwtManager } from '../../features';
import authHttpContext from './auth.http.context';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const [_, token] = (req.headers.authorization ?? '').split(' ');

    const context = jwtManager.validate(token);

    authHttpContext.bind(req, context);

    next();
};

export default authMiddleware;
