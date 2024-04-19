import { Schema, model } from 'mongoose';
import { IOperationDocument, OperationType } from 'src/interfaces';

/**
 * Operation schema.
 */
export const OperationSchema = new Schema<IOperationDocument>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: [OperationType.Purchase, OperationType.Sale],
      required: true,
    },
    broker: {
      type: Schema.Types.ObjectId,
      ref: 'brokers',
      required: true,
    },
    stock: {
      type: Schema.Types.ObjectId,
      ref: 'stocks',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Operation = model<IOperationDocument>('operations', OperationSchema);

export default Operation;