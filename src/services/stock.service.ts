import { StatusCodes } from 'http-status-codes';
import { Broker, Stock } from 'src/database/models';
import { IStock, IStockDocument, IStandardResponse } from 'src/interfaces';
import { HttpError } from 'src/utils';
import * as userService from 'src/services/user.service';

/**
 * Find all the stocks available in the user's country.
 *
 * @param userId The user id.
 * @returns The stocks found.
 */
export const findAll = async (userId: string): Promise<IStockDocument[]> => {
  const user = await userService.findById(userId);

  if (!user) {
    throw new HttpError('El usuario no existe', StatusCodes.NOT_FOUND);
  }

  const countryId = user.country;

  const stocks = await Broker.aggregate([
    {
      $match: {
        countries: countryId,
      },
    },
    {
      $lookup: {
        from: 'stocks',
        localField: 'stocks',
        foreignField: '_id',
        as: 'stocks',
      },
    },
    {
      $unwind: '$stocks',
    },
    {
      $replaceRoot: {
        newRoot: '$stocks',
      },
    },
    {
      $group: {
        _id: '$_id',
        label: { $first: '$label' },
        symbol: { $first: '$symbol' },
        price: { $first: '$price' },
        currency: { $first: '$currency' },
      },
    },
    {
      $lookup: {
        from: 'currencies',
        localField: 'currency',
        foreignField: '_id',
        as: 'currency',
      },
    },
    {
      $unwind: '$currency',
    },
    {
      $project: {
        _id: 1,
        label: 1,
        symbol: 1,
        price: 1,
        currency: 1,
      },
    },
    {
      $sort: {
        label: 1,
      },
    },
  ]);

  return stocks;
};

/**
 * Find a stock by id.
 *
 * @param userId The user id.
 * @param id The stock id.
 * @returns The stock found.
 */
export const findById = async (
  userId: string,
  id: string
): Promise<IStockDocument | null> => {
  const user = await userService.findById(userId);

  if (!user) {
    throw new HttpError('El usuario no existe', StatusCodes.NOT_FOUND);
  }

  const countryId = user.country;

  const stockResult = await Broker.aggregate<IStockDocument>([
    {
      $match: {
        countries: countryId,
      },
    },
    {
      $lookup: {
        from: 'stocks',
        localField: 'stocks',
        foreignField: '_id',
        as: 'stocks',
      },
    },
    {
      $unwind: '$stocks',
    },
    {
      $replaceRoot: {
        newRoot: '$stocks',
      },
    },
    {
      $match: {
        _id: id,
      },
    },
    {
      $lookup: {
        from: 'currencies',
        localField: 'currency',
        foreignField: '_id',
        as: 'currency',
      },
    },
    {
      $unwind: '$currency',
    },
    {
      $project: {
        _id: 1,
        label: 1,
        symbol: 1,
        price: 1,
        currency: 1,
      },
    },
  ]);

  if (!stockResult.length) {
    throw new HttpError('La accion no esta disponible', StatusCodes.NOT_FOUND);
  }

  const stock = stockResult[0];

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
