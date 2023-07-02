import httpStatusCodes from "./http-status-code";
import BaseError from "./base-error";

class ForbiddenError extends BaseError {
    constructor(
        description = "You are forbidden to access this resource",
        name = "ForbiddenError",
        statusCode = httpStatusCodes.FORBIDDEN,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

export default ForbiddenError;
