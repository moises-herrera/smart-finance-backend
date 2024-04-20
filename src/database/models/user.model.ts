import { Schema, model } from 'mongoose';
import { IUserDocument, Role } from 'src/interfaces';

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
    role: {
      type: String,
      required: true,
      enum: Role,
    },
    country: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'countries',
    },
    currency: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'currencies',
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUserDocument>('users', UserSchema);

export default User;
