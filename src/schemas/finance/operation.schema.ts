import { OperationType } from 'src/interfaces';
import { z } from 'zod';

/**
 * Operation validation schema.
 */
export const OperationSchema = z.object({
  quantity: z.number().min(1, 'La cantidad debe ser mayor a cero'),
  type: z.enum([OperationType.Purchase, OperationType.Sale]),
  broker: z.string().min(1, 'El broker es requerido'),
  user: z.string().min(1, 'El usuario es requerido'),
  stock: z.string().min(1, 'La accion es requerida'),
});
