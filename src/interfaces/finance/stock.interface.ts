import { Document } from 'mongoose';

/**
 * Represents the stock interface.
 */
export interface IStock {
  /** Stock label. */
  label: string;

  /** Stock symbol. */
  symbol: string;

  /** Stock current price in USD. */
  price: number;
}

export interface IStockDocument extends IStock, Document {}
