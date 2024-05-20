import { Types } from 'mongoose';
import { ICurrency } from 'src/interfaces';

interface ISeedCurrency extends ICurrency {
  id: Types.ObjectId;
}

export const currencies: ISeedCurrency[] = [
  {
    id: new Types.ObjectId(),
    name: 'Dólar estadounidense',
    code: 'USD',
  },
  {
    id: new Types.ObjectId(),
    name: 'Euro',
    code: 'EUR',
  },
  {
    id: new Types.ObjectId(),
    name: 'Peso colombiano',
    code: 'COP',
  },
  {
    id: new Types.ObjectId(),
    name: 'Peso mexicano',
    code: 'MXN',
  },
  {
    id: new Types.ObjectId(),
    name: 'Peso chileno',
    code: 'CLP',
  },
  {
    id: new Types.ObjectId(),
    name: 'Sol peruano',
    code: 'PEN',
  },
  {
    id: new Types.ObjectId(),
    name: 'Real brasileño',
    code: 'BRL',
  },
  {
    id: new Types.ObjectId(),
    name: 'Peso uruguayo',
    code: 'UYU',
  },
  {
    id: new Types.ObjectId(),
    name: 'Peso dominicano',
    code: 'DOP',
  },
];

export const currenciesMapped: Record<string, Types.ObjectId> =
  currencies.reduce(
    (record, currency) => ({
      ...record,
      [currency.code]: currency.id,
    }),
    {} as Record<string, Types.ObjectId>
  );
