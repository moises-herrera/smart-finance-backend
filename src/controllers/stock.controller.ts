import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestExtended } from 'src/interfaces';
import {
  createOne,
  deleteById,
  findAll,
  findById,
  updateById,
} from 'src/services/stock.service';
import { handleHttpError } from 'src/utils';

/**
 * Get all stocks.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const getStocks = async (
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
 * Get a stock by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const getStockById = async (
  req: RequestExtended,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req;
    const { id } = req.params;
    const response = await findById(userId as string, id);
    res.json(response);
  } catch (error) {
    handleHttpError(res, error);
  }
};

/**
 * Create a new stock.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const createStock = async (
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
 * Update a stock by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const updateStock = async (
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

/**
 * Delete a stock by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const deleteStock = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await deleteById(id);
    res.json(response);
  } catch (error) {
    handleHttpError(res, error);
  }
};
