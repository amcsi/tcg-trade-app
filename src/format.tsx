export const numberFormatter = new Intl.NumberFormat();

export function parseNumber(numberString: string) {
  const strippedString = numberString.replace(',', '.').replace(/[^\d.]/g, '');

  return strippedString === '' ? null : Number(strippedString);
}
