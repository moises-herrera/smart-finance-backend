import { Document } from 'mongoose';

/**
 * Represents the stock interface.
 */
export interface IStock {
  /** Stock label. */
  label: string;

  /** Stock symbol. */
  symbol: string;

  /** Stock current price. */
  price: number;
}

export interface IStockDocument extends IStock, Document {}
