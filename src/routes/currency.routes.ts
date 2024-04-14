import { Router } from 'express';
import {
  createCurrency,
  deleteCurrency,
  getCurrencies,
  getCurrencyById,
  updateCurrency,
} from 'src/controllers/currency.controller';
import { validateAdminRole, validateData } from 'src/middleware';
import { CurrencySchema } from 'src/schemas';

const router = Router();

/**
 * Get all currencies.
 */
router.get('/', getCurrencies);

/**
 * Get a currency by id.
 */
router.get('/:id', getCurrencyById);

/**
 * Create a new currency.
 */
router.post(
  '/',
  [validateAdminRole, validateData(CurrencySchema)],
  createCurrency
);

/**
 * Update a currency by id.
 */
router.put(
  '/:id',
  [validateAdminRole, validateData(CurrencySchema)],
  updateCurrency
);

/**
 * Delete a currency by id.
 */
router.delete('/:id', validateAdminRole, deleteCurrency);

export { router };
