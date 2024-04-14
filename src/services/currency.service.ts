import { StatusCodes } from 'http-status-codes';
import { Currency } from 'src/database/models';
import {
  ICurrency,
  ICurrencyDocument,
  IStandardResponse,
} from 'src/interfaces';
import { HttpError } from 'src/utils';

/**
 * Find all currencies.
 *
 * @returns The currencies found.
 */
export const findAll = async (): Promise<ICurrencyDocument[]> => {
  const currencies = await Currency.find();

  return currencies;
};

/**
 * Find a currency by id.
 *
 * @param id The currency id.
 * @returns The currency found.
 */
export const findById = async (
  id: string
): Promise<ICurrencyDocument | null> => {
  const currency = await Currency.findById(id);

  if (!currency) {
    throw new HttpError('La moneda no existe', StatusCodes.NOT_FOUND);
  }

  return currency;
};

/**
 * Create a new currency.
 *
 * @param currency Currency data.
 * @returns The currency created.
 */
export const createOne = async (
  currency: ICurrency
): Promise<IStandardResponse<ICurrencyDocument>> => {
  const createdCurrency = await Currency.create(currency);

  const response: IStandardResponse<ICurrencyDocument> = {
    message: 'La moneda fue creada correctamente',
    data: createdCurrency,
  };

  return response;
};

/**
 * Update a currency by id.
 *
 * @param id The currency id.
 * @param currency Currency data.
 * @returns The currency updated.
 */
export const updateById = async (
  id: string,
  currency: ICurrency
): Promise<IStandardResponse<ICurrencyDocument>> => {
  const updatedCurrency = await Currency.findByIdAndUpdate(id, currency, {
    new: true,
  });

  if (!updatedCurrency) {
    throw new HttpError('La moneda no existe', StatusCodes.NOT_FOUND);
  }

  const response: IStandardResponse<ICurrencyDocument> = {
    message: 'La moneda fue actualizada correctamente',
    data: updatedCurrency,
  };

  return response;
};

/**
 * Delete a currency by id.
 *
 * @param id The currency id.
 * @returns The currency deleted.
 */
export const deleteById = async (id: string): Promise<IStandardResponse> => {
  const deletedCurrency = await Currency.findByIdAndDelete(id);

  if (!deletedCurrency) {
    throw new HttpError('La moneda no existe', StatusCodes.NOT_FOUND);
  }

  const response: IStandardResponse = {
    message: 'La moneda fue eliminada correctamente',
  };

  return response;
};
