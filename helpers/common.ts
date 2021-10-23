export function toDecimals(value: any): string {
  return parseFloat(parseFloat(value).toFixed(0)).toLocaleString();
}

export function toTwoDecimals(value: any): string {
  return parseFloat(parseFloat(value).toFixed(2)).toLocaleString();
}
