import { Document, Types } from 'mongoose';

/**
 * Represents the country interface.
 */
export interface ICountry {
  /** Country code. */
  code: string;

  /** Country name. */
  name: string;

  /** Country currencies. */
  currencies: Types.ObjectId[];
}

/**
 * Represents the country document that is stored in the database.
 */
export interface ICountryDocument extends ICountry, Document {}
