import { Router } from 'express';
import {
  createOperation,
  getOperations,
  getOperationById,
  updateOperation,
} from 'src/controllers/operation.controller';
import { validateAdminRole, validateData, validateJwt } from 'src/middleware';
import { OperationSchema } from 'src/schemas';

const router = Router();

/**
 * Get all operation.
 */
router.get('/', validateJwt, getOperations);

/**
 * Get a operation by id.
 */
router.get('/:id', validateJwt, getOperationById);

/**
 * Create a new operation.
 */
router.post('/', [validateJwt, validateData(OperationSchema)], createOperation);

/**
 * Update a operation by id.
 */
router.put(
  '/:id',
  [validateJwt, validateAdminRole, validateData(OperationSchema)],
  updateOperation
);

export { router };
