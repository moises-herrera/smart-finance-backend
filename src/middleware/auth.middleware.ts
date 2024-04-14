import { NextFunction, Response } from 'express';
import { RequestExtended } from 'src/interfaces';
import { HttpError, handleHttpError, verifyToken } from 'src/utils';

/**
 * Validate a JWT token.
 *
 * @param req The request object.
 * @param res The response object.
 * @param next The next function.
 */
export const validateJwt = (
  req: RequestExtended,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(' ').pop() || '';

    if (!token) {
      throw new HttpError('Sin autorización', 401);
    }

    const { id } = verifyToken(token) as { id: string };
    req.id = id;

    next();
  } catch (error) {
    const httpError =
      error instanceof HttpError ? error : new HttpError('Token invalido', 401);
    return handleHttpError(res, httpError);
  }
};
