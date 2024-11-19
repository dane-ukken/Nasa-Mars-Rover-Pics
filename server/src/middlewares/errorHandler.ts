import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../types/error';
import { logger } from './logger';

export function errorHandler(
    error: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const status = error.status || 500;
    const code = error.code || 'INTERNAL_ERROR';
    const message = error.message || 'Internal Server Error';

    logger.error('Error occurred:', {
        code,
        status,
        message,
        path: req.path,
        method: req.method,
        stack: error.stack
    });

    res.status(status).json({
        error: {
            code,
            message,
            status
        }
    });
}

export function createError(message: string, status: number, code: string): CustomError {
    const error = new Error(message) as CustomError;
    error.status = status;
    error.code = code;
    return error;
} 