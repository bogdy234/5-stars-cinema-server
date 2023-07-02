// import type { Request, Response } from "express";

function logError(err): void {
  console.error(err);
}

function logErrorMiddleware(err, req, res, next): void {
  logError(err);
  next(err);
}

// function returnError(err: Error, req: Request, res: Response, next): void {
//   res.status(err.statusCode ?? 500).send(err.message);
// }

// function isOperationalError(error): boolean {
//   // if (error instanceof BaseError) {
//   //   return error.isOperational;
//   // }
//   return false;
// }

export default {
  logError,
  logErrorMiddleware,
  // returnError,
  // isOperationalError,
};
