import { USD_CONVERSION } from 'src/constants';

/**
 * Convert currency from USD.
 *
 * @param resultCurrency The currency to convert to.
 * @param amount The amount in USD to convert.
 * @returns The converted amount.
 */
export const convertCurrencyFromUSD = (
  resultCurrency: string,
  amount: number
): number => {
  if (resultCurrency === 'USD') return amount;

  return amount * USD_CONVERSION[resultCurrency];
};
