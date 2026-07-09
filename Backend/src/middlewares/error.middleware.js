import { logger } from '../utils/logger.js';
import { ZodError } from 'zod';

export const errorHandler = (err, req, res, next) => {
    logger.error(`Error encountered: ${err.message}`);
    if (err.stack) {
        logger.debug(err.stack);
    }

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errors = [];

    // 1. Zod validation error
    if (err instanceof ZodError) {
        statusCode = 400;
        message = 'Validation Error';
        errors = err.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
        }));
    }

    // 2. Mongoose Duplicate Key Error
    else if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
        const field = Object.keys(err.keyValue)[0];
        errors = [{ field, message: `The ${field} already exists.` }];
    }

    // 3. Mongoose Cast/Validation Error
    else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        errors = Object.values(err.errors).map(e => ({
            field: e.path,
            message: e.message
        }));
    } else if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid format for field ${err.path}`;
    }

    // 4. JWT Errors
    else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token. Please authenticate again.';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token has expired. Please log in again.';
    }

    res.status(statusCode).json({
        success: false,
        message,
        errors: errors.length > 0 ? errors : undefined
    });
};
