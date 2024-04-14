import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createOne,
  deleteById,
  findAll,
  findById,
  updateById,
} from 'src/services/country.service';
import { handleHttpError } from 'src/utils';

/**
 * Get all countries.
 *
 * @param _req The request object.
 * @param res The response object.
 */
export const getCountries = async (
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
 * Get a country by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const getCountryById = async (
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
 * Create a new country.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const createCountry = async (
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
 * Update a country by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const updateCountry = async (
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
 * Delete a country by id.
 *
 * @param req The request object.
 * @param res The response object.
 */
export const deleteCountry = async (
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
