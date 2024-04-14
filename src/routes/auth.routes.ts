import { Router } from 'express';
import { login, register, validateToken } from 'src/controllers';
import { validateData, validateJwt } from 'src/middleware';
import { LoginSchema, RegisterSchema } from 'src/schemas';

const router = Router();

/**
 * Register a new user.
 */
router.post('/register', validateData(RegisterSchema), register);

/**
 * Login a user.
 */
router.post('/login', validateData(LoginSchema), login);

/**
 * Validate a JWT token.
 */
router.get('/renew-token', validateJwt, validateToken);

export { router };
