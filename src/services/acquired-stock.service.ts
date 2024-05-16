import { StatusCodes } from 'http-status-codes';
import { AcquiredStock } from 'src/database/models';
import {
  IAcquiredStock,
  IAcquiredStockDocument,
  IStandardResponse,
} from 'src/interfaces';
import { HttpError } from 'src/utils';

/**
 * Find all the acquired stocks of a user.
 *
 * @returns All the acquired stocks of a user.
 */
export const findAll = async (
  userId: string
): Promise<IAcquiredStockDocument[]> => {
  const acquiredStocks = await AcquiredStock.find({
    user: userId,
  }).populate('stock');

  return acquiredStocks;
};

/**
 * Create a new acquired stock.
 *
 * @param stock acquired stock data.
 * @returns The acquired stock created.
 */
export const createOne = async (
  stock: IAcquiredStock
): Promise<IStandardResponse<IAcquiredStockDocument>> => {
  const createdAcquiredStock = await AcquiredStock.create(stock);

  const response: IStandardResponse<IAcquiredStockDocument> = {
    message: 'La accion fue adquirida correctamente',
    data: createdAcquiredStock,
  };

  return response;
};

/**
 * Buy a stock.
 *
 * @param userId The user id.
 * @param stockId The stock id.
 * @param quantity The quantity of the stock.
 * @param currencyId The currency id.
 * @returns The acquired stock created or updated.
 */
export const buyStock = async (
  userId: string,
  stockId: string,
  quantity: number,
  currencyId: string
): Promise<IStandardResponse<IAcquiredStockDocument>> => {
  const acquiredStock = await AcquiredStock.findOne({
    user: userId,
    stock: stockId,
    currency: currencyId,
  });

  if (acquiredStock) {
    acquiredStock.totalQuantity += quantity;
    await acquiredStock.save();
  } else {
    const newAcquiredStock = await AcquiredStock.create({
      user: userId,
      stock: stockId,
      totalQuantity: quantity,
      currency: currencyId,
    });

    return {
      message: 'La accion fue adquirida correctamente',
      data: newAcquiredStock,
    };
  }

  return {
    message: 'La accion fue actualizada correctamente',
    data: acquiredStock,
  };
};

/**
 * Sell a stock.
 *
 * @param userId The user id.
 * @param stockId The stock id.
 * @param quantity The quantity of the stock.
 * @param currencyId The currency id.
 * @returns
 */
export const sellStock = async (
  userId: string,
  stockId: string,
  quantity: number,
  currencyId: string
) => {
  const acquiredStock = await AcquiredStock.findOne({
    user: userId,
    stock: stockId,
    currency: currencyId,
  });

  if (!acquiredStock) {
    throw new HttpError(
      'El usuario no tiene acciones de esta empresa',
      StatusCodes.BAD_REQUEST
    );
  }

  if (acquiredStock.totalQuantity < quantity) {
    throw new HttpError(
      'El usuario no tiene suficientes acciones de esta empresa',
      StatusCodes.BAD_REQUEST
    );
  }

  acquiredStock.totalQuantity -= quantity;

  if (acquiredStock.totalQuantity === 0) {
    await acquiredStock.deleteOne();

    return {
      message: 'La accion fue vendida correctamente',
    };
  }

  await acquiredStock.save();

  return {
    message: 'La accion fue vendida correctamente',
  };
};
