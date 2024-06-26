import { Router } from 'express';
import {
  createOperation,
  getOperations,
  getOperationById,
} from 'src/controllers/operation.controller';
import { validateData, validateJwt } from 'src/middleware';
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

export { router };
