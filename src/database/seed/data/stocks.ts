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
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717299310/stocks/o1z9lmkiziejdbcbeppl.svg',
  },
  {
    _id: new Types.ObjectId(),
    label: 'Microsoft Corporation',
    symbol: 'MSFT',
    price: 421.01,
    currency: currenciesMapped['USD'],
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717300094/stocks/ncnumybyu993xcvfoujq.svg',
  },
  {
    _id: new Types.ObjectId(),
    label: 'Amazon.com Inc.',
    symbol: 'AMZN',
    price: 184.01,
    currency: currenciesMapped['USD'],
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717300429/stocks/kcv7kfshes0kkqqikro2.svg',
  },
  {
    _id: new Types.ObjectId(),
    label: 'Meta Platforms Inc.',
    symbol: 'META',
    price: 332.88,
    currency: currenciesMapped['USD'],
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717300429/stocks/q361axqstg1hwpflqohf.svg',
  },
  {
    _id: new Types.ObjectId(),
    label: 'Alphabet Inc.',
    symbol: 'GOOGL',
    price: 172.81,
    currency: currenciesMapped['USD'],
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717300432/stocks/t90djvaiwaf6vjw8klnc.svg',
  },
  {
    _id: new Types.ObjectId(),
    label: 'Tesla Inc.',
    symbol: 'TSLA',
    price: 175.67,
    currency: currenciesMapped['USD'],
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717300431/stocks/poi5rk2bjdmpmie9ne8z.svg',
  },
  {
    _id: new Types.ObjectId(),
    label: 'NVIDIA Corporation',
    symbol: 'NVDA',
    price: 945.5,
    currency: currenciesMapped['USD'],
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717300430/stocks/itmiacpnfcq7akn7iwks.svg',
  },
  {
    _id: new Types.ObjectId(),
    label: 'PayPal Holdings Inc.',
    symbol: 'PYPL',
    price: 283.0,
    currency: currenciesMapped['USD'],
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717300430/stocks/mxivjycjdmtgbmofiaps.svg',
  },
  {
    _id: new Types.ObjectId(),
    label: 'Adobe Inc.',
    symbol: 'ADBE',
    price: 486.0,
    currency: currenciesMapped['USD'],
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717300432/stocks/fthguqb6wdbmnzj4jddl.svg',
  },
  {
    _id: new Types.ObjectId(),
    label: 'Netflix Inc.',
    symbol: 'NFLX',
    price: 513.99,
    currency: currenciesMapped['USD'],
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717300429/stocks/bg2vrll7nnengetw3vkm.svg',
  },
  {
    _id: new Types.ObjectId(),
    label: 'Salesforce.com Inc.',
    symbol: 'CRM',
    price: 285.0,
    currency: currenciesMapped['USD'],
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717300430/stocks/tz7qe3mybem33c6gqlb4.svg',
  },
  {
    _id: new Types.ObjectId(),
    label: 'Shopify Inc.',
    symbol: 'SHOP',
    price: 58.0,
    currency: currenciesMapped['USD'],
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717300431/stocks/qsh9um5samggzdbvij71.svg',
  },
  {
    _id: new Types.ObjectId(),
    label: 'Zoom Video Communications Inc.',
    symbol: 'ZM',
    price: 63.0,
    currency: currenciesMapped['USD'],
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717300431/stocks/eoz6izil96igy5l5ee2g.svg',
  },
  {
    _id: new Types.ObjectId(),
    label: 'Spotify Technology S.A.',
    symbol: 'SPOT',
    price: 299.0,
    currency: currenciesMapped['USD'],
    icon: 'https://res.cloudinary.com/dt8pvb5jh/image/upload/v1717300431/stocks/kpdortlzlqwqebb6kcuy.svg',
  },
];

export const stocksMapped: Record<string, Types.ObjectId> = stocks.reduce(
  (record, stock) => ({ ...record, [stock.symbol]: stock._id }),
  {} as Record<string, Types.ObjectId>
);
