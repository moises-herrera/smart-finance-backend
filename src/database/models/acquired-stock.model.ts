import { Schema, model } from 'mongoose';
import { IAcquiredStockDocument } from 'src/interfaces';

/**
 * Represents the acquired stock schema.
 */
export const AcquiredStockSchema = new Schema<IAcquiredStockDocument>(
  {
    stock: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'stocks',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    totalQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    currency: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'currencies',
    },
  },
  {
    timestamps: true,
  }
);

const AcquiredStock = model<IAcquiredStockDocument>(
  'acquiredStocks',
  AcquiredStockSchema
);

export default AcquiredStock;
