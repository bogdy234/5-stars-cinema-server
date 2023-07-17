import httpStatusCodes from "./http-status-code";
import BaseError from "./base-error";

class BadRequestError extends BaseError {
    constructor(
        description = "Bad request, malformed request syntax.",
        name = "BadRequestError",
        statusCode = httpStatusCodes.BAD_REQUEST,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

export default BadRequestError;
