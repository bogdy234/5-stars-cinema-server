import httpStatusCodes from "./http-status-code";
import BaseError from "./base-error";

class UnauthorizedError extends BaseError {
    constructor(
        description = "You are unauthorized to access this resource",
        name = "UnauthorizedError",
        statusCode = httpStatusCodes.UNAUTHORIZED,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

export default UnauthorizedError;
