import { Document } from "mongoose";

/**
 * Represents a currency.
 */
export interface ICurrency {
  /** Currency code. */
  code: string;

  /** Currency name. */
  name: string;
}

/**
 * Represents the currency document that is stored in the database.
 */
export interface ICurrencyDocument extends ICurrency, Document {}