import { Document } from 'mongoose';

/**
 * Represents the OTP data to store in the database.
 */
export interface IOTP {
  /** OTP code. */
  otp: string;

  /** The expiration time of the OTP. */
  expirationTime: Date;

  /** If the OTP has been verified. */
  isVerified: boolean;

  /** The email of the user. */
  email: string;
}

export interface IOTPDocument extends IOTP, Document {}
