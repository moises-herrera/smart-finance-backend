import { z } from 'zod';

/**
 * Stock validation schema.
 */
export const StockSchema = z.object({
  label: z.string().min(1, 'El nombre es requerido'),
  symbol: z.string().min(1, 'El simbolo es requerido'),
  price: z.number().min(0, 'El precio debe ser mayor a 0'),
  currency: z.string().min(1, 'La moneda es requerida'),
});
