import { Response } from 'express';
import { HttpError, errorLogger } from '.';

/**
 * Handle HTTP errors.
 *
 * @param res The response object.
 * @param error The error object.
 */
export const handleHttpError = (res: Response, error: unknown): void => {
  errorLogger.error(error);

  const httpError =
    error instanceof HttpError
      ? error
      : new HttpError('Ha ocurrido un error', 500);

  res.status(httpError.statusCode).json(<Record<string, string>>{
    message: httpError.message,
  });
};
