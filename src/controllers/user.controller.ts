import { Request, Response } from 'express';
import { findById, updateOne } from 'src/services/user.service';
import { handleHttpError } from 'src/utils';

/**
 * Get a user by id.
 *
 * @param req The request.
 * @param res The response.
 */
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await findById(id);
    res.json(response);
  } catch (error) {
    handleHttpError(res, error);
  }
};

/**
 * Update a user.
 * 
 * @param req The request. 
 * @param res The response. 
 */
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = req.body;
    const response = await updateOne(id, user);
    res.json(response);
  } catch (error) {
    handleHttpError(res, error);
  }
};
