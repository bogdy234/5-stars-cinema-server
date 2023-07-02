class BaseError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(name, statusCode, isOperational, description) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}

export default BaseError;
