import { z } from 'zod';
import { passwordPattern } from 'src/utils';

/**
 * Register form validation schema.
 */
export const RegisterSchema = z.object({
  fullName: z.string().min(1, 'El nombre es requerido'),
  email: z
    .string()
    .min(1, 'El correo es requerido')
    .email('El correo no es valido'),
  country: z.string().min(1, 'El país es requerido'),
  currency: z.string().min(1, 'La moneda es requerida'),
  balance: z.number().default(0),
  password: z
    .string()
    .min(8, 'La contraseña debe tener mínimo 8 carácteres')
    .max(20, 'La contraseña debe tener máximo 20 carácteres')
    .regex(
      passwordPattern,
      'La contraseña debe tener al menos una mayúscula, una minúscula y un número'
    ),
});
