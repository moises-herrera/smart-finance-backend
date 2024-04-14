import { z } from 'zod';

/**
 * Currency validation schema.
 */
export const CurrencySchema = z.object({
  code: z.string().min(1, 'El código es requerido'),
  name: z.string().min(1, 'El nombre es requerido'),
});
