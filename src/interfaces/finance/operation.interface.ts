import { Types, Document } from 'mongoose';

/**
 * Operation data stored in the database.
 */
export interface IOperation {
  /** Operation quantity. */
  quantity: number;

  /** Operation type. */
  type: string;

  /** Broker id. */
  broker: Types.ObjectId;

  /** Stock id. */
  stock: Types.ObjectId;

  /** User id. */
  user: Types.ObjectId;
}

/**
 * Operation document stored in the database.
 */
export interface IOperationDocument extends IOperation, Document {}
