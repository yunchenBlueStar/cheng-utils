export type NumOrStr = number | string | undefined;

export const numberOrStringToComma = (val: NumOrStr) => {
  if (val === undefined) return "0";
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const intNumberOrStringToComma = (val: NumOrStr) => {
  if (val === undefined) return "0";
  if (typeof val === "number") {
    val = val.toString();
  }
  return parseInt(val)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const floatNumberOrStringToComma = (val: NumOrStr) => {
  if (val === undefined) return "0";
  if (typeof val === "number") {
    val = val.toString();
  }
  return parseFloat(val)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
