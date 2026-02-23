const formatter = new Intl.NumberFormat();

export function formatNumber(num: number) {
  return formatter.format(num);
}
