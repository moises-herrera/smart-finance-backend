import { Router } from 'express';
import {
  createStock,
  deleteStock,
  getStocks,
  getStockById,
  updateStock,
} from 'src/controllers/stock.controller';
import { validateAdminRole, validateData, validateJwt } from 'src/middleware';
import { StockSchema } from 'src/schemas';

const router = Router();

/**
 * Get all stocks.
 */
router.get('/', validateJwt, getStocks);

/**
 * Get a stock by id.
 */
router.get('/:id', validateJwt, getStockById);

/**
 * Create a new stock.
 */
router.post(
  '/',
  [validateJwt, validateAdminRole, validateData(StockSchema)],
  createStock
);

/**
 * Update a stock by id.
 */
router.put(
  '/:id',
  [validateJwt, validateAdminRole, validateData(StockSchema)],
  updateStock
);

/**
 * Delete a stock by id.
 */
router.delete('/:id', [validateJwt, validateAdminRole], deleteStock);

export { router };
