import { Request, Response } from 'express';
import { handleHttpError } from 'src/utils';

/**
 * Error middleware.
 *
 * @param err The error object.
 * @param _req The request object.
 * @param res The response object.
 */
export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response
): void => {
  handleHttpError(res, err);
};
