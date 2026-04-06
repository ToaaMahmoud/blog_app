import { Request, Response, NextFunction } from 'express';
import { env } from './../../config/env';
import { ApiError } from './../utils/api-error';

/**
 * Optional: Mongo error type (cleaner than using `any`)
 */
interface MongoError extends Error {
    code?: number;
    keyValue?: Record<string, any>;
}

/**
 * Central Error Handler
 */
export const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let isOperational = false;

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        isOperational = err.isOperational;
    }

     else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message || 'Validation Error';
    } 

    else if ((err as MongoError).code === 11000) {
        statusCode = 409;

        const mongoErr = err as MongoError;
        const field = mongoErr.keyValue
            ? Object.keys(mongoErr.keyValue)[0]
            : null;

        message = field
            ? `${field} already exists`
            : 'Duplicate field value';
    }

    else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    if (env.NODE_ENV === 'production' && !isOperational) {
        message = 'Something went wrong';
    }

    const logPayload = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        statusCode,
        errorName: err.name,
        message: err.message,
        isOperational,
        ...(err instanceof ApiError ? {} : { originalMessage: err.message }),
        ...((err as any).code && { code: (err as any).code }),
        stack: err.stack,
    };

    if (statusCode >= 500) {
        console.error('[ERROR]', JSON.stringify(logPayload, null, 2));
    } else {
        console.warn('[WARN]', JSON.stringify(logPayload, null, 2));
    }

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    });
};


export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(404).json({
        success: false,
        error: {
            message: 'Not Found',
        },
    });
};