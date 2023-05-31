import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { JsonWebTokenError } from 'jsonwebtoken';
import { CustomError } from '../errors/custom.error';

export default (error: Error, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof CustomError) {
        res.status(error.statusCode).json({
            message: error.message,
        });

        return;
    }

    if (error instanceof ZodError) {
        res.status(422).json({
            errors: Object.fromEntries(error.errors.map(error => [error.path.join('.'), [error.message]])),
            message: 'Validation error',
        });

        return;
    }

    if (error instanceof JsonWebTokenError) {
        res.status(401).json({
            message: 'Unauthorized',
        });

        return;
    }

    res.status(500).json({
        status: 500,
        message: error.message,
    });
};
