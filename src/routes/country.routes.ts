import { Router } from 'express';
import {
  createCountry,
  deleteCountry,
  getCountries,
  getCountryById,
  updateCountry,
} from 'src/controllers/country.controller';
import { validateAdminRole, validateData } from 'src/middleware';
import { CountrySchema } from 'src/schemas';

const router = Router();

/**
 * Get all countries.
 */
router.get('/', getCountries);

/**
 * Get a country by id.
 */
router.get('/:id', getCountryById);

/**
 * Create a new country.
 */
router.post(
  '/',
  [validateAdminRole, validateData(CountrySchema)],
  createCountry
);

/**
 * Update a country by id.
 */
router.put(
  '/:id',
  [validateAdminRole, validateData(CountrySchema)],
  updateCountry
);

/**
 * Delete a country by id.
 */
router.delete('/:id', validateAdminRole, deleteCountry);

export { router };
