import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestExtended } from 'src/interfaces';
import {
  findById,
  createOne,
  findAll,
  updateById,
} from 'src/services/operation.service';
import { handleHttpError } from 'src/utils';

/**
 * Get all operations.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const getOperations = async (
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

/**
 * Get a operation by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const getOperationById = async (
  req: RequestExtended,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req;
    const { id } = req.params;
    const response = await findById(id, userId as string);
    res.json(response);
  } catch (error) {
    handleHttpError(res, error);
  }
};

/**
 * Create a new operation.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const createOperation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await createOne(req.body);
    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    handleHttpError(res, error);
  }
};

/**
 * Update a operation by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const updateOperation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await updateById(id, req.body);
    res.json(response);
  } catch (error) {
    handleHttpError(res, error);
  }
};
