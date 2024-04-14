import { z } from 'zod';

/**
 * OTP verification schema.
 */
export const OTPVerifySchema = z.object({
  verificationKey: z.string().min(1, 'La clave de verificación es requerida'),
  otp: z.string().min(1, 'El OTP es requerido'),
  email: z.string().email('El email es requerido'),
});
