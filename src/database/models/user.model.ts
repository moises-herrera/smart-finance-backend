import { Schema, model } from 'mongoose';
import { IUserDocument } from 'src/interfaces';

/**
 * The schema definition for the User entity.
 */
export const UserSchema = new Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUserDocument>('User', UserSchema);

export default User;
