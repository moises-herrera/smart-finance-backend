import { ICountry } from 'src/interfaces';
import { currenciesMapped } from 'src/database/seed/data/currencies';
import { Types } from 'mongoose';

interface ISeedCountry extends ICountry {
  _id: Types.ObjectId;
}

export const countries: ISeedCountry[] = [
  {
    _id: new Types.ObjectId(),
    name: 'Colombia',
    code: 'CO',
    currencies: [currenciesMapped['COP'], currenciesMapped['USD']],
  },
  {
    _id: new Types.ObjectId(),
    name: 'Brasil',
    code: 'BR',
    currencies: [currenciesMapped['BRL'], currenciesMapped['USD']],
  },
  {
    _id: new Types.ObjectId(),
    name: 'Chile',
    code: 'CL',
    currencies: [currenciesMapped['CLP'], currenciesMapped['USD']],
  },
  {
    _id: new Types.ObjectId(),
    name: 'México',
    code: 'MX',
    currencies: [currenciesMapped['MXN'], currenciesMapped['USD']],
  },
  {
    _id: new Types.ObjectId(),
    name: 'Perú',
    code: 'PE',
    currencies: [currenciesMapped['PEN'], currenciesMapped['USD']],
  },
  {
    _id: new Types.ObjectId(),
    name: 'República Dominicana',
    code: 'RD',
    currencies: [currenciesMapped['DOP'], currenciesMapped['USD']],
  },
  {
    _id: new Types.ObjectId(),
    name: 'Uruguay',
    code: 'UY',
    currencies: [currenciesMapped['UYU'], currenciesMapped['USD']],
  },
];

export const countriesMapped: Record<string, Types.ObjectId> = countries.reduce(
  (record, country) => ({
    ...record,
    [country.code]: country._id,
  }),
  {} as Record<string, Types.ObjectId>
);
