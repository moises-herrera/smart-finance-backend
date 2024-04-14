import { Document, Types } from 'mongoose';

/**
 * Represents a stock broker entity.
 */
export interface IBroker {
  /** Broker name. */
  name: string;

  /** Countries where the broker operates. */
  countries: Types.ObjectId[];

  /** Stocks available in the broker. */
  stocks: Types.ObjectId[];
}

/**
 * Represents a stock broker entity with a Mongoose document.
 */
export interface IBrokerDocument extends IBroker, Document {}
