import { Types } from 'mongoose';
import { IStock } from 'src/interfaces';
import { currenciesMapped } from '.';

interface ISeedStock extends IStock {
  _id: Types.ObjectId;
}

export const stocks: ISeedStock[] = [
  {
    _id: new Types.ObjectId(),
    label: 'Apple Inc.',
    symbol: 'AAPL',
    price: 190.92,
    currency: currenciesMapped['USD'],
  },
  {
    _id: new Types.ObjectId(),
    label: 'Microsoft Corporation',
    symbol: 'MSFT',
    price: 421.01,
    currency: currenciesMapped['USD'],
  },
  {
    _id: new Types.ObjectId(),
    label: 'Amazon.com Inc.',
    symbol: 'AMZN',
    price: 184.01,
    currency: currenciesMapped['USD'],
  },
  {
    _id: new Types.ObjectId(),
    label: 'Meta Platforms Inc.',
    symbol: 'META',
    price: 332.88,
    currency: currenciesMapped['USD'],
  },
  {
    _id: new Types.ObjectId(),
    label: 'Alphabet Inc.',
    symbol: 'GOOGL',
    price: 172.81,
    currency: currenciesMapped['USD'],
  },
  {
    _id: new Types.ObjectId(),
    label: 'Tesla Inc.',
    symbol: 'TSLA',
    price: 175.67,
    currency: currenciesMapped['USD'],
  },
  {
    _id: new Types.ObjectId(),
    label: 'NVIDIA Corporation',
    symbol: 'NVDA',
    price: 945.5,
    currency: currenciesMapped['USD'],
  },
  {
    _id: new Types.ObjectId(),
    label: 'PayPal Holdings Inc.',
    symbol: 'PYPL',
    price: 283.0,
    currency: currenciesMapped['USD'],
  },
  {
    _id: new Types.ObjectId(),
    label: 'Adobe Inc.',
    symbol: 'ADBE',
    price: 486.0,
    currency: currenciesMapped['USD'],
  },
  {
    _id: new Types.ObjectId(),
    label: 'Netflix Inc.',
    symbol: 'NFLX',
    price: 513.99,
    currency: currenciesMapped['USD'],
  },
  {
    _id: new Types.ObjectId(),
    label: 'Salesforce.com Inc.',
    symbol: 'CRM',
    price: 285.0,
    currency: currenciesMapped['USD'],
  },
  {
    _id: new Types.ObjectId(),
    label: 'Shopify Inc.',
    symbol: 'SHOP',
    price: 58.0,
    currency: currenciesMapped['USD'],
  },
  {
    _id: new Types.ObjectId(),
    label: 'Zoom Video Communications Inc.',
    symbol: 'ZM',
    price: 63.0,
    currency: currenciesMapped['USD'],
  },
  {
    _id: new Types.ObjectId(),
    label: 'Spotify Technology S.A.',
    symbol: 'SPOT',
    price: 299.0,
    currency: currenciesMapped['USD'],
  },
];

export const stocksMapped: Record<string, Types.ObjectId> = stocks.reduce(
  (record, stock) => ({ ...record, [stock.symbol]: stock.id }),
  {} as Record<string, Types.ObjectId>
);
