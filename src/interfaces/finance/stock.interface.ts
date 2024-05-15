import { Document, Types } from 'mongoose';

/**
 * Represents the stock interface.
 */
export interface IStock {
  /** Stock label. */
  label: string;

  /** Stock symbol. */
  symbol: string;

  /** Currency of the stock price. */
  currency: Types.ObjectId;

  /** Stock current price. */
  price: number;
}

export interface IStockDocument extends IStock, Document {}
