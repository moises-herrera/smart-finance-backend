import { Schema, model } from 'mongoose';
import { IStockDocument } from 'src/interfaces';

/**
 * Represents the stock schema.
 */
export const StockSchema = new Schema<IStockDocument>(
  {
    label: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    currency: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'currencies',
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Stock = model<IStockDocument>('stocks', StockSchema);

export default Stock;
