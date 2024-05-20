import { Types, Document } from 'mongoose';
import { OperationType } from 'src/interfaces';

/**
 * Operation data stored in the database.
 */
export interface IOperation {
  /** Currency used to make the operation. */
  currency: Types.ObjectId;

  /** Operation quantity. */
  quantity: number;

  /** Amount of money used in the operation. */
  moneyAmount: number;

  /** Operation type. */
  type: OperationType;

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
