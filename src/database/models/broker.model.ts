import { Schema, model } from 'mongoose';
import { IBrokerDocument } from 'src/interfaces';

/**
 * Represents the broker schema.
 */
export const BrokerSchema = new Schema<IBrokerDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    countries: [
      {
        type: Schema.Types.ObjectId,
        ref: 'countries',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Broker = model<IBrokerDocument>('brokers', BrokerSchema);

export default Broker;
