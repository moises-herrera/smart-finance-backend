import { Types } from 'mongoose';
import { ICurrency } from 'src/interfaces';

interface ISeedCurrency extends ICurrency {
  _id: Types.ObjectId;
}

export const currencies: ISeedCurrency[] = [
  {
    _id: new Types.ObjectId(),
    name: 'Dólar estadounidense',
    code: 'USD',
  },
  {
    _id: new Types.ObjectId(),
    name: 'Euro',
    code: 'EUR',
  },
  {
    _id: new Types.ObjectId(),
    name: 'Peso colombiano',
    code: 'COP',
  },
  {
    _id: new Types.ObjectId(),
    name: 'Peso mexicano',
    code: 'MXN',
  },
  {
    _id: new Types.ObjectId(),
    name: 'Peso chileno',
    code: 'CLP',
  },
  {
    _id: new Types.ObjectId(),
    name: 'Sol peruano',
    code: 'PEN',
  },
  {
    _id: new Types.ObjectId(),
    name: 'Real brasileño',
    code: 'BRL',
  },
  {
    _id: new Types.ObjectId(),
    name: 'Peso uruguayo',
    code: 'UYU',
  },
  {
    _id: new Types.ObjectId(),
    name: 'Peso dominicano',
    code: 'DOP',
  },
];

export const currenciesMapped: Record<string, Types.ObjectId> =
  currencies.reduce(
    (record, currency) => ({
      ...record,
      [currency.code]: currency._id,
    }),
    {} as Record<string, Types.ObjectId>
  );
