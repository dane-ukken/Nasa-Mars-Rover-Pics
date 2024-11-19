import { Request, Response, NextFunction } from 'express';
import { createError } from '../middlewares/errorHandler';
import { ErrorCodes } from '../types/error';

export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            if (error.status && error.code) {
                next(error);
                return;
            }
            const status = error?.status || 500;
            const code = error?.code || ErrorCodes.INTERNAL_ERROR;
            const message = error?.message || 'Internal Server Error';

            next(createError(message, status, code));
        }
    };
};