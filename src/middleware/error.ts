import BaseError from "../error/base-error";

import type { Request, Response, NextFunction } from "express";

export function logError(err): void {
    console.error(err);
}

export function logErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
    logError(err);
    next(err);
}

export function returnError(err, req, res, next): void {
    res.status(err.statusCode || 500).json({
        name: err.name,
        message: err.message,
    });
}

export function isOperationalError(error): boolean {
    if (error instanceof BaseError) {
        return error.isOperational;
    }
    return false;
}

export function asyncErrorHandler(fn) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

export default {
    logError,
    logErrorMiddleware,
    returnError,
    isOperationalError,
};
