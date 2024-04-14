import { z } from 'zod';

/**
 * User validation schema.
 */
export const UserSchema = z.object({
  fullName: z.string().min(1, 'El nombre es requerido'),
  email: z
    .string()
    .min(1, 'El correo es requerido')
    .email('El correo no es valido'),
  country: z.string().min(1, 'El país es requerido'),
  currency: z.string().min(1, 'La moneda es requerida'),
});
