/**
 * The data required to verify an OTP.
 */
export interface OTPVerify {
  /** The verification key. */
  verificationKey: string;

  /** The OTP to verify. */
  otp: string;

  /** The email to verify. */
  email: string;
}
