import { StatusCodes } from 'http-status-codes';
import { Broker } from 'src/database/models';
import { IBroker, IBrokerDocument, IStandardResponse } from 'src/interfaces';
import { HttpError } from 'src/utils';

/**
 * Find all brokers.
 *
 * @returns The brokers found.
 */
export const findAll = async (): Promise<IBrokerDocument[]> => {
  const brokers = await Broker.find().populate('countries stocks');

  return brokers;
};

/**
 * Find a stock by id.
 *
 * @param id The stock id.
 * @returns The stock found.
 */
export const findById = async (id: string): Promise<IBrokerDocument | null> => {
  const stock = await Broker.findById(id).populate('countries stocks');

  if (!stock) {
    throw new HttpError('El broker no existe', StatusCodes.NOT_FOUND);
  }

  return stock;
};

/**
 * Create a new stock.
 *
 * @param stock Broker data.
 * @returns The stock created.
 */
export const createOne = async (
  stock: IBroker
): Promise<IStandardResponse<IBrokerDocument>> => {
  const createdBroker = await Broker.create(stock);

  const response: IStandardResponse<IBrokerDocument> = {
    message: 'El broker fue creado correctamente',
    data: createdBroker,
  };

  return response;
};

/**
 * Update a stock by id.
 *
 * @param id The stock id.
 * @param stock Broker data.
 * @returns The stock updated.
 */
export const updateById = async (
  id: string,
  stock: IBroker
): Promise<IStandardResponse<IBrokerDocument>> => {
  const updatedBroker = await Broker.findByIdAndUpdate(id, stock, {
    new: true,
  });

  if (!updatedBroker) {
    throw new HttpError('El broker no existe', StatusCodes.NOT_FOUND);
  }

  const response: IStandardResponse<IBrokerDocument> = {
    message: 'El broker fue actualizado correctamente',
    data: updatedBroker,
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
  const deletedBroker = await Broker.findByIdAndDelete(id);

  if (!deletedBroker) {
    throw new HttpError('El broker no existe', StatusCodes.NOT_FOUND);
  }

  const response: IStandardResponse = {
    message: 'El broker fue eliminado correctamente',
  };

  return response;
};
