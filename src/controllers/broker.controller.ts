import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createOne,
  deleteById,
  findAll,
  findById,
  updateById,
} from 'src/services/broker.service';
import { handleHttpError } from 'src/utils';

/**
 * Get all brokers.
 *
 * @param _req The request object.
 * @param res The response object.
 */
export const getBrokers = async (
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
 * Get a broker by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const getBrokerById = async (
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
 * Create a new broker.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const createBroker = async (
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
 * Update a broker by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const updateBroker = async (
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
 * Delete a broker by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const deleteBroker = async (
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
