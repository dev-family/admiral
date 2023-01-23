import express from 'express';
import { ZodError } from 'zod';
import { JsonWebTokenError } from 'jsonwebtoken';

export default (error: unknown, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    console.log(`[#middleware error] error: ${JSON.stringify(error)}`);
    if (error instanceof ZodError) {
        res.status(422).json({
            errors: Object.fromEntries(error.errors.map((error) => [error.path.join('.'), [error.message]])),
            message: 'Validation error',
        });
    }

    if (error instanceof JsonWebTokenError) {
        res.status(401).json({
            message: 'Unauthorized',
        });
    }

    res.status(500).json({
        status: 500,
        message: 'Internal server error',
    });
}
