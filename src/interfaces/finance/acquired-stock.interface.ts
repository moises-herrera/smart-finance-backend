import { Document } from 'mongoose';
import { Types } from 'mongoose';

/**
 * Represents the acquired stock information.
 */
export interface IAcquiredStock {
  /** The stock. */
  stock: Types.ObjectId;

  /** The user. */
  user: Types.ObjectId;

  /** The quantity. */
  totalQuantity: number;
}

/**
 * Represents the acquired stock document that is stored in the database.
 */
export interface IAcquiredStockDocument extends IAcquiredStock, Document {}
