import { Request, Response } from 'express';
import { RequestExtended } from 'src/interfaces';
import {
  changeUserPassword,
  findById,
  getBalanceByUserId,
  updateOne,
} from 'src/services/user.service';
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

/**
 * Reset user password.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const resetPassword = async (
  req: RequestExtended,
  res: Response
): Promise<void> => {
  try {
    const { id: email } = req;
    const { password } = req.body;

    const responseUser = await changeUserPassword(email as string, password);

    res.send(responseUser);
  } catch (error) {
    handleHttpError(res, error);
  }
};

/**
 * Get user balance.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const getUserBalance = async (
  req: RequestExtended,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await getBalanceByUserId(id as string);
    res.json(response);
  } catch (error) {
    handleHttpError(res, error);
  }
};
