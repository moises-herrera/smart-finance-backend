import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError, appLogger } from '.';

/**
 * Handle HTTP errors.
 *
 * @param res The response object.
 * @param error The error object.
 */
export const handleHttpError = (res: Response, error: unknown): void => {
  appLogger.error(error);

  const httpError =
    error instanceof HttpError
      ? error
      : new HttpError(
          'Ha ocurrido un error',
          StatusCodes.INTERNAL_SERVER_ERROR
        );

  if ('status' in res) {
    res.status(httpError.statusCode).json(<Record<string, string>>{
      message: httpError.message,
    });
    return;
  }

  (res as NextFunction)();
};
