import { Router } from 'express';
import { getAcquiredStocks } from 'src/controllers/acquired-stock.controller';
import { validateJwt } from 'src/middleware';

const router = Router();

/**
 * Get all the acquired stocks of a user.
 */
router.get('/', validateJwt, getAcquiredStocks);

export { router };
