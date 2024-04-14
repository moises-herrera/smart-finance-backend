import { Types } from 'mongoose';
import { IStock } from 'src/interfaces';

interface ISeedStock extends IStock {
  _id: Types.ObjectId;
}

export const stocks: ISeedStock[] = [
  {
    _id: new Types.ObjectId(),
    label: 'Apple Inc.',
    symbol: 'AAPL',
    price: 146.92,
  },
  {
    _id: new Types.ObjectId(),
    label: 'Microsoft Corporation',
    symbol: 'MSFT',
    price: 277.01,
  },
  {
    _id: new Types.ObjectId(),
    label: 'Amazon.com Inc.',
    symbol: 'AMZN',
    price: 3372.01,
  },
  {
    _id: new Types.ObjectId(),
    label: 'Meta Platforms Inc.',
    symbol: 'META',
    price: 332.88,
  },
  {
    _id: new Types.ObjectId(),
    label: 'Alphabet Inc.',
    symbol: 'GOOGL',
    price: 2728.81,
  },
  {
    _id: new Types.ObjectId(),
    label: 'Tesla Inc.',
    symbol: 'TSLA',
    price: 709.67,
  },
  {
    _id: new Types.ObjectId(),
    label: 'NVIDIA Corporation',
    symbol: 'NVDA',
    price: 207.5,
  },
  {
    _id: new Types.ObjectId(),
    label: 'PayPal Holdings Inc.',
    symbol: 'PYPL',
    price: 283.0,
  },
  {
    _id: new Types.ObjectId(),
    label: 'Adobe Inc.',
    symbol: 'ADBE',
    price: 630.0,
  },
  {
    _id: new Types.ObjectId(),
    label: 'Netflix Inc.',
    symbol: 'NFLX',
    price: 513.99,
  },
  {
    _id: new Types.ObjectId(),
    label: 'Salesforce.com Inc.',
    symbol: 'CRM',
    price: 254.0,
  },
  {
    _id: new Types.ObjectId(),
    label: 'Shopify Inc.',
    symbol: 'SHOP',
    price: 1545.0,
  },
  {
    _id: new Types.ObjectId(),
    label: 'Zoom Video Communications Inc.',
    symbol: 'ZM',
    price: 292.0,
  },
  {
    _id: new Types.ObjectId(),
    label: 'Spotify Technology S.A.',
    symbol: 'SPOT',
    price: 232.0,
  },
];

export const stocksMapped: Record<string, Types.ObjectId> = stocks.reduce(
  (record, stock) => ({ ...record, [stock.symbol]: stock._id }),
  {} as Record<string, Types.ObjectId>
);
