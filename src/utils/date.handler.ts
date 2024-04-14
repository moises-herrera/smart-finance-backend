/**
 * Compares two dates.
 * 
 * @param date1 The first date. 
 * @param date2 The second date. 
 * @returns The difference between the two dates. 
 */
export const compareDates = (
  date1: Date | string | number,
  date2: Date | string | number
): number => {
  return new Date(date1).getTime() - new Date(date2).getTime();
};
