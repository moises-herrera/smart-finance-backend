import { Document } from 'mongoose';

/**
 * Represents a stock broker entity.
 */
export interface IBroker {
  /** Broker name. */
  name: string;
}

/**
 * Represents a stock broker entity with a Mongoose document.
 */
export interface IBrokerDocument extends IBroker, Document {}
