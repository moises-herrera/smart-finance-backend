import { Router } from 'express';
import { sendOTP } from 'src/controllers/email.controller';

const router = Router();

/**
 * Route to send a reset password email.
 */
router.post('/forgot-password', sendOTP);

export { router };
