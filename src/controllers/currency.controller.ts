import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createOne,
  deleteById,
  findAll,
  findById,
  updateById,
} from 'src/services/currency.service';
import { handleHttpError } from 'src/utils';

/**
 * Get all currencies.
 *
 * @param _req The request object.
 * @param res The response object.
 */
export const getCurrencies = async (
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
 * Get a currency by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const getCurrencyById = async (
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
 * Create a new currency.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const createCurrency = async (
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
 * Update a currency by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const updateCurrency = async (
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
 * Delete a currency by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const deleteCurrency = async (
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
