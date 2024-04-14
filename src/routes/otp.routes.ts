import { Router } from 'express';
import { verifyUserOTP } from 'src/controllers/otp.controller';
import { validateData } from 'src/middleware';
import { OTPVerifySchema } from 'src/schemas';

const router = Router();

router.post('/verify', validateData(OTPVerifySchema), verifyUserOTP);

export { router };
