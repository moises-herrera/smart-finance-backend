import { StatusCodes } from 'http-status-codes';
import { Operation } from 'src/database/models';
import {
  IStandardResponse,
  IOperation,
  IOperationDocument,
} from 'src/interfaces';
import { HttpError } from 'src/utils';

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
  });

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
  const operation = await Operation.findById({ id, user: userId });
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
