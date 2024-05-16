import { IStockDocument } from '.';
import { ICurrencyDocument } from '../currency';

/**
 * Represents a stock with its currency conversion.
 */
export interface IStockInfoDocument extends IStockDocument {
  /** The currency used to convert the base stock price. */
  conversionCurrency: ICurrencyDocument | null;
}
