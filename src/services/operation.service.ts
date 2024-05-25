import { StatusCodes } from 'http-status-codes';
import { Operation } from 'src/database/models';
import {
  IStandardResponse,
  IOperation,
  IOperationDocument,
  OperationType,
  ICurrencyDocument,
} from 'src/interfaces';
import { HttpError } from 'src/utils';
import * as userService from 'src/services/user.service';
import * as acquiredStockService from 'src/services/acquired-stock.service';
import * as stockService from 'src/services/stock.service';

/**
 * Find all operations of a user.
 *
 * @param userId The user id.
 * @returns All the operations of the user.
 */
export const findAll = async (
  userId: string
): Promise<IOperationDocument[]> => {
  const operations = await Operation.find({
    user: userId,
  }).populate('broker stock currency');

  return operations;
};

/**
 * Find an operation by id.
 *
 * @param id The operation id.
 * @returns The operation found.
 */
export const findById = async (
  id: string,
  userId: string
): Promise<IOperationDocument | null> => {
  const operation = await Operation.findOne({
    _id: id,
    user: userId,
  }).populate('broker stock currency');
  if (!operation) {
    throw new HttpError('La operacion no existe', StatusCodes.NOT_FOUND);
  }
  return operation;
};

/**
 * Create a new operation
 *
 * @param operation The operation to create.
 * @returns The created operation.
 */
export const createOne = async (
  operation: IOperation
): Promise<IStandardResponse<IOperationDocument>> => {
  const user = await userService.findById(operation.user.toString());

  if (!user) {
    throw new HttpError('El usuario no existe', StatusCodes.NOT_FOUND);
  }

  const stock = await stockService.findById(
    operation.user.toString(),
    operation.stock.toString()
  );

  if (!stock) {
    throw new HttpError('La accion no esta disponible', StatusCodes.NOT_FOUND);
  }

  const currency = user.currency as unknown as ICurrencyDocument;
  const moneyAmount = Math.round(operation.quantity * stock.price * 100) / 100;

  if (operation.type === OperationType.Purchase) {
    if (user.balance < moneyAmount) {
      throw new HttpError(
        'El usuario no tiene suficiente saldo para realizar la compra',
        StatusCodes.BAD_REQUEST
      );
    }

    await acquiredStockService.buyStock(
      operation.user.toString(),
      operation.stock.toString(),
      operation.quantity,
      currency.id
    );

    user.balance -= moneyAmount;
    await user.save();
  }

  if (operation.type === OperationType.Sale) {
    await acquiredStockService.sellStock(
      operation.user.toString(),
      operation.stock.toString(),
      operation.quantity,
      currency.id
    );

    user.balance += moneyAmount;
    await user.save();
  }

  const createdOperation = await Operation.create({
    ...operation,
    moneyAmount,
    currency: currency.id,
  });

  const response: IStandardResponse<IOperationDocument> = {
    message: 'La operacion fue creada correctamente',
    data: createdOperation,
  };

  return response;
};
