import { StatusCodes } from 'http-status-codes';
import { Country } from 'src/database/models';
import {
  ICountry,
  ICountryDocument,
  IStandardResponse,
} from 'src/interfaces';
import { HttpError } from 'src/utils';

/**
 * Find all countries.
 *
 * @returns The countries found.
 */
export const findAll = async (): Promise<ICountryDocument[]> => {
  const countries = await Country.find();

  return countries;
};

/**
 * Find a country by id.
 *
 * @param id The country id.
 * @returns The country found.
 */
export const findById = async (
  id: string
): Promise<ICountryDocument | null> => {
  const country = await Country.findById(id);

  if (!country) {
    throw new HttpError('El pais no existe', StatusCodes.NOT_FOUND);
  }

  return country;
};

/**
 * Create a new country.
 *
 * @param country Country data.
 * @returns The country created.
 */
export const createOne = async (
  country: ICountry
): Promise<IStandardResponse<ICountryDocument>> => {
  const createdCurrency = await Country.create(country);

  const response: IStandardResponse<ICountryDocument> = {
    message: 'El pais fue creado correctamente',
    data: createdCurrency,
  };

  return response;
};

/**
 * Update a country by id.
 *
 * @param id The country id.
 * @param country Country data.
 * @returns The country updated.
 */
export const updateById = async (
  id: string,
  country: ICountry
): Promise<IStandardResponse<ICountryDocument>> => {
  const updatedCurrency = await Country.findByIdAndUpdate(id, country, {
    new: true,
  });

  if (!updatedCurrency) {
    throw new HttpError('El pais no existe', StatusCodes.NOT_FOUND);
  }

  const response: IStandardResponse<ICountryDocument> = {
    message: 'El pais fue actualizado correctamente',
    data: updatedCurrency,
  };

  return response;
};

/**
 * Delete a country by id.
 *
 * @param id The country id.
 * @returns The country deleted.
 */
export const deleteById = async (id: string): Promise<IStandardResponse> => {
  const deletedCurrency = await Country.findByIdAndDelete(id);

  if (!deletedCurrency) {
    throw new HttpError('El pais no existe', StatusCodes.NOT_FOUND);
  }

  const response: IStandardResponse = {
    message: 'El pais fue eliminado correctamente',
  };

  return response;
};
