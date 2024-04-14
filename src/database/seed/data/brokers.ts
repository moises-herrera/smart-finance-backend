import { IBroker } from 'src/interfaces';
import { countriesMapped } from 'src/database/seed/data/countries';
import { stocksMapped } from 'src/database/seed/data/stocks';

export const brokers: IBroker[] = [
  {
    name: 'eToro',
    countries: [
      countriesMapped['CO'],
      countriesMapped['BR'],
      countriesMapped['CL'],
      countriesMapped['MX'],
      countriesMapped['PE'],
    ],
    stocks: [
      stocksMapped['AAPL'],
      stocksMapped['MSFT'],
      stocksMapped['AMZN'],
      stocksMapped['META'],
      stocksMapped['GOOGL'],
      stocksMapped['TSLA'],
      stocksMapped['NVDA'],
      stocksMapped['PYPL'],
    ],
  },
  {
    name: 'Libertex',
    countries: [
      countriesMapped['CO'],
      countriesMapped['BR'],
      countriesMapped['CL'],
      countriesMapped['MX'],
      countriesMapped['PE'],
      countriesMapped['RD'],
      countriesMapped['UY'],
    ],
    stocks: [
      stocksMapped['ADBE'],
      stocksMapped['NFLX'],
      stocksMapped['CRM'],
      stocksMapped['SHOP'],
      stocksMapped['ZM'],
      stocksMapped['SPOT'],
    ],
  },
];
