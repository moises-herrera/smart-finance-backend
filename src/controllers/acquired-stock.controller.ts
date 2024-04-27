import { Response } from 'express';
import { RequestExtended } from 'src/interfaces';
import { findAll } from 'src/services/acquired-stock.service';
import { handleHttpError } from 'src/utils';

/**
 * Get all the acquired stocks of a user.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const getAcquiredStocks = async (
  req: RequestExtended,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req;
    const response = await findAll(userId as string);
    res.json(response);
  } catch (error) {
    handleHttpError(res, error);
  }
};
