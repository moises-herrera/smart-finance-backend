import { IBroker } from 'src/interfaces';
import { countriesMapped } from 'src/database/seed/data';

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
  },
];
