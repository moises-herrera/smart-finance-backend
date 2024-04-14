import { ICountry } from 'src/interfaces';
import { currenciesMapped } from 'src/database/seed/currencies';

export const countries: Partial<ICountry>[] = [
  {
    name: 'Colombia',
    code: 'CO',
    currencies: [currenciesMapped['COP'], currenciesMapped['USD']],
  },
  {
    name: 'Brasil',
    code: 'BR',
    currencies: [currenciesMapped['BRL'], currenciesMapped['USD']],
  },
  {
    name: 'Chile',
    code: 'CL',
    currencies: [currenciesMapped['CLP'], currenciesMapped['USD']],
  },
  {
    name: 'México',
    code: 'MX',
    currencies: [currenciesMapped['MXN'], currenciesMapped['USD']],
  },
  {
    name: 'Perú',
    code: 'PE',
    currencies: [currenciesMapped['PEN'], currenciesMapped['USD']],
  },
  {
    name: 'República Dominicana',
    code: 'RD',
    currencies: [currenciesMapped['DOP'], currenciesMapped['USD']],
  },
  {
    name: 'Uruguay',
    code: 'UY',
    currencies: [currenciesMapped['UYU'], currenciesMapped['USD']],
  },
];
