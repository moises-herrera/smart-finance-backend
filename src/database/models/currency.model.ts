import { Schema, model } from 'mongoose';
import { ICurrencyDocument } from 'src/interfaces';

/**
 * Represents the currency schema.
 */
export const CurrencySchema = new Schema<ICurrencyDocument>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Currency = model<ICurrencyDocument>('currencies', CurrencySchema);

export default Currency;
