import { StatusCodes } from 'http-status-codes';
import { Operation } from 'src/database/models';
import {
  IStandardResponse,
  IOperation,
  IOperationDocument,
  OperationType,
} from 'src/interfaces';
import { HttpError } from 'src/utils';
import * as userService from 'src/services/user.service';
import * as acquiredStockService from 'src/services/acquired-stock.service';

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
  }).populate('broker stock');

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
  const operation = await Operation.findById({ id, user: userId }).populate(
    'broker stock'
  );
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

  if (operation.type === OperationType.Purchase) {
    if (user.balance < operation.quantity) {
      throw new HttpError(
        'El usuario no tiene suficiente saldo para realizar la compra',
        StatusCodes.BAD_REQUEST
      );
    }

    await acquiredStockService.buyStock(
      operation.user.toString(),
      operation.stock.toString(),
      operation.quantity
    );

    user.balance -= operation.quantity;
    await user.save();
  }

  if (operation.type === OperationType.Sale) {
    await acquiredStockService.sellStock(
      operation.user.toString(),
      operation.stock.toString(),
      operation.quantity
    );

    user.balance += operation.quantity;
    await user.save();
  }

  const createdOperation = await Operation.create(operation);

  const response: IStandardResponse<IOperationDocument> = {
    message: 'La operacion fue creada correctamente',
    data: createdOperation,
  };

  return response;
};

/**
 * Update a operation by id.
 *
 * @param id The operation id.
 * @param operation Operation data.
 * @returns The operation updated.
 */
export const updateById = async (
  id: string,
  operation: IOperation
): Promise<IStandardResponse<IOperationDocument>> => {
  const updatedOperation = await Operation.findByIdAndUpdate(id, operation, {
    new: true,
  });

  if (!updatedOperation) {
    throw new HttpError('La operacion no existe', StatusCodes.NOT_FOUND);
  }

  const response: IStandardResponse<IOperationDocument> = {
    message: 'La operacion fue actualizada correctamente',
    data: updatedOperation,
  };

  return response;
};
