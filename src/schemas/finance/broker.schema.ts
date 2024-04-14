import { z } from 'zod';

/**
 * Broker validation schema.
 */
export const BrokerSchema = z.object({
  name: z.string().min(3).max(255),
  countries: z.array(z.string()),
  stocks: z.array(z.string()),
});
