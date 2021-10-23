export function toDecimals(value: any): string {
  return parseFloat(parseFloat(value).toFixed(0)).toLocaleString();
}

export function toTwoDecimals(value: any): string {
  return parseFloat(parseFloat(value).toFixed(2)).toLocaleString();
}

export function delay(milliseconds: number = 500) {
  return new Promise((resolve: any) =>
    setTimeout(function () {
      resolve();
    }, milliseconds)
  );
}

export function unique(arr: Array<any>) {
  return arr.filter((v, i, a) => a.indexOf(v) === i);
}

export function slugify(Text: string) {
  return Text.toLowerCase().replace(/[^\w]+/g, "-");
}

export function convertPhoneToE14(number: string) {
  if (!number) {
    return undefined;
  }

  number = number.replace(/[^0-9]+/g, "");
  if (number.substr(0, 1) === "0") {
    return `+62${number.substr(1)}`;
  } else if (number.substr(0, 3) === "620") {
    return `+62${number.substr(3)}`;
  } else if (number.substr(0, 2) === "62") {
    return `+62${number.substr(2)}`;
  } else if (number.substr(0, 1) === "8") {
    return `+62${number}`;
  }
  return undefined;
}
