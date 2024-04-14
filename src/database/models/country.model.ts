import { Schema, model } from 'mongoose';
import { ICountryDocument } from 'src/interfaces';

/**
 * Represents the country schema.
 */
export const CountrySchema = new Schema<ICountryDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    currencies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'currencies',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Country = model<ICountryDocument>('countries', CountrySchema);

export default Country;
