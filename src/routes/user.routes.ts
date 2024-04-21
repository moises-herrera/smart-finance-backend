import { Router } from 'express';
import {
  resetPassword,
  getUserById,
  updateUser,
} from 'src/controllers/user.controller';
import {
  validateData,
  validateJwt,
  validateUserSelfPermissions,
} from 'src/middleware';
import { UserSchema } from 'src/schemas';

const router = Router();

/**
 * Get a user by id.
 */
router.get('/:id', [validateJwt, validateUserSelfPermissions], getUserById);

/**
 * Update a user.
 */
router.put(
  '/:id',
  [validateJwt, validateUserSelfPermissions, validateData(UserSchema)],
  updateUser
);

/**
 * Reset user password.
 */
router.post('/reset-password', validateJwt, resetPassword);

export { router };
