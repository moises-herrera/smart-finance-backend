import { StatusCodes } from 'http-status-codes';
import { AcquiredStock } from 'src/database/models';
import {
  IAcquiredStock,
  IAcquiredStockDocument,
  ICurrencyDocument,
  IStandardResponse,
} from 'src/interfaces';
import { HttpError } from 'src/utils';
import * as userService from 'src/services/user.service';
import { USD_CONVERSION } from 'src/constants';
import { Types } from 'mongoose';

/**
 * Find all the acquired stocks of a user.
 *
 * @returns All the acquired stocks of a user.
 */
export const findAll = async (
  userId: string
): Promise<IAcquiredStockDocument[]> => {
  const user = await userService.findById(userId);

  if (!user) {
    throw new HttpError('El usuario no existe', StatusCodes.NOT_FOUND);
  }

  const userCurrency = user.currency as unknown as ICurrencyDocument;

  const acquiredStocks = await AcquiredStock.aggregate([
    {
      $match: {
        user: new Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: 'stocks',
        localField: 'stock',
        foreignField: '_id',
        as: 'stock',
      },
    },
    {
      $unwind: '$stock',
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
      $set: {
        stock: {
          price:
            userCurrency.code === 'USD'
              ? '$stock.price'
              : {
                  $multiply: [
                    '$stock.price',
                    USD_CONVERSION[userCurrency.code] ?? 1,
                  ],
                },
          conversionCurrency: userCurrency.code !== 'USD' ? userCurrency : null,
        },
      },
    },
    {
      $project: {
        _id: 1,
        totalQuantity: 1,
        stock: {
          _id: 1,
          label: 1,
          symbol: 1,
          price: 1,
          icon: 1,
          currency: 1,
          conversionCurrency: 1,
        },
        currency: {
          _id: 1,
          name: 1,
          code: 1,
        },
        user: 1,
      },
    },
  ]);

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
