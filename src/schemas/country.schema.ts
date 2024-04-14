import { z } from 'zod';

/**
 * Country validation schema.
 */
export const CountrySchema = z.object({
  code: z.string().min(1, 'El código es requerido'),
  name: z.string().min(1, 'El nombre es requerido'),
  currencies: z.array(z.string()).optional(),
});
