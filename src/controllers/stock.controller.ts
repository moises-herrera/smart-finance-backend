import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
 * @param _req The request object.
 * @param res The response object.
 */
export const getStocks = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await findAll();
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
