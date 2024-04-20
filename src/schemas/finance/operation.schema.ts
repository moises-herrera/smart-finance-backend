import { OperationType } from 'src/interfaces';
import { z } from 'zod';

/**
 * Operation validation schema.
 */
export const OperationSchema = z.object({
  quantity: z.number().min(1, 'La cantidad debe ser mayor a cero'),
  type: z.nativeEnum(OperationType, {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_enum_value) {
        return { message: 'El tipo de operación no es válido' };
      }

      return { message: issue.message ?? ctx.defaultError };
    },
  }),
  broker: z.string().min(1, 'El broker es requerido'),
  stock: z.string().min(1, 'La accion es requerida'),
});
