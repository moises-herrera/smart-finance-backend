import { Router } from 'express';
import {
  createBroker,
  deleteBroker,
  getBrokers,
  getBrokerById,
  updateBroker,
} from 'src/controllers/broker.controller';
import { validateAdminRole, validateData, validateJwt } from 'src/middleware';
import { BrokerSchema } from 'src/schemas';

const router = Router();

/**
 * Get all broker.
 */
router.get('/', validateJwt, getBrokers);

/**
 * Get a broker by id.
 */
router.get('/:id', validateJwt, getBrokerById);

/**
 * Create a new broker.
 */
router.post(
  '/',
  [validateJwt, validateAdminRole, validateData(BrokerSchema)],
  createBroker
);

/**
 * Update a broker by id.
 */
router.put(
  '/:id',
  [validateJwt, validateAdminRole, validateData(BrokerSchema)],
  updateBroker
);

/**
 * Delete a broker by id.
 */
router.delete('/:id', [validateJwt, validateAdminRole], deleteBroker);

export { router };
