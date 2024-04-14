import { Router } from 'express';
import {
  createCurrency,
  deleteCurrency,
  getCurrencies,
  getCurrencyById,
  updateCurrency,
} from 'src/controllers/currency.controller';
import { validateAdminRole, validateData, validateJwt } from 'src/middleware';
import { CurrencySchema } from 'src/schemas';

const router = Router();

/**
 * Get all currencies.
 */
router.get('/', validateJwt, getCurrencies);

/**
 * Get a currency by id.
 */
router.get('/:id', validateJwt, getCurrencyById);

/**
 * Create a new currency.
 */
router.post(
  '/',
  [validateJwt, validateAdminRole, validateData(CurrencySchema)],
  createCurrency
);

/**
 * Update a currency by id.
 */
router.put(
  '/:id',
  [validateJwt, validateAdminRole, validateData(CurrencySchema)],
  updateCurrency
);

/**
 * Delete a currency by id.
 */
router.delete('/:id', [validateJwt, validateAdminRole], deleteCurrency);

export { router };
