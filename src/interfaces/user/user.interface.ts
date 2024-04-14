import { Document, Types } from 'mongoose';

/**
 * Represents the user information.
 */
export interface IUser {
  /** User's full name. */
  fullName: string;

  /** User's email address. */
  email: string;

  /** User's password. */
  password: string;

  /** User's country. */
  country: Types.ObjectId;

  /** User's currency. */
  currency: Types.ObjectId;
}

/**
 * Represents the user document that is stored in the database.
 */
export interface IUserDocument extends IUser, Document {}