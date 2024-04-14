import { StatusCodes } from 'http-status-codes';
import { Stock } from 'src/database/models';
import {
  IStock,
  IStockDocument,
  IStandardResponse,
} from 'src/interfaces';
import { HttpError } from 'src/utils';

/**
 * Find all stocks.
 *
 * @returns The stocks found.
 */
export const findAll = async (): Promise<IStockDocument[]> => {
  const stocks = await Stock.find();

  return stocks;
};

/**
 * Find a stock by id.
 *
 * @param id The stock id.
 * @returns The stock found.
 */
export const findById = async (
  id: string
): Promise<IStockDocument | null> => {
  const stock = await Stock.findById(id);

  if (!stock) {
    throw new HttpError('La accion no existe', StatusCodes.NOT_FOUND);
  }

  return stock;
};

/**
 * Create a new stock.
 *
 * @param stock Stock data.
 * @returns The stock created.
 */
export const createOne = async (
  stock: IStock
): Promise<IStandardResponse<IStockDocument>> => {
  const createdStock = await Stock.create(stock);

  const response: IStandardResponse<IStockDocument> = {
    message: 'La accion fue creada correctamente',
    data: createdStock,
  };

  return response;
};

/**
 * Update a stock by id.
 *
 * @param id The stock id.
 * @param stock Stock data.
 * @returns The stock updated.
 */
export const updateById = async (
  id: string,
  stock: IStock
): Promise<IStandardResponse<IStockDocument>> => {
  const updatedStock = await Stock.findByIdAndUpdate(id, stock, {
    new: true,
  });

  if (!updatedStock) {
    throw new HttpError('La accion no existe', StatusCodes.NOT_FOUND);
  }

  const response: IStandardResponse<IStockDocument> = {
    message: 'La accion fue actualizada correctamente',
    data: updatedStock,
  };

  return response;
};

/**
 * Delete a stock by id.
 *
 * @param id The stock id.
 * @returns The stock deleted.
 */
export const deleteById = async (id: string): Promise<IStandardResponse> => {
  const deletedStock = await Stock.findByIdAndDelete(id);

  if (!deletedStock) {
    throw new HttpError('La accion no existe', StatusCodes.NOT_FOUND);
  }

  const response: IStandardResponse = {
    message: 'La accion fue eliminada correctamente',
  };

  return response;
};
