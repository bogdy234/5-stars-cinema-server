import httpStatusCodes from "./http-status-code";
import BaseError from "./base-error";

class ConflictError extends BaseError {
    constructor(
        description = "The resource already exists.",
        name = "ConflictError",
        statusCode = httpStatusCodes.CONFLICT,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

export default ConflictError;
