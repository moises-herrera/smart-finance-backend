import { Schema, model } from 'mongoose';
import { IOTPDocument } from 'src/interfaces';

/**
 * Represents the OTP data to store in the database.
 */
const OTPSchema = new Schema<IOTPDocument>(
  {
    otp: {
      type: String,
      required: true,
    },
    expirationTime: {
      type: Date,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OTP = model<IOTPDocument>('OTP', OTPSchema);

export default OTP;
