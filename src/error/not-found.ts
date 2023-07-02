import httpStatusCodes from "./http-status-code";
import BaseError from "./base-error";

class NotFoundError extends BaseError {
    constructor(
        description = "Not found",
        name = "NotFoundError",
        statusCode = httpStatusCodes.NOT_FOUND,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

export default NotFoundError;
