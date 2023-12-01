import validateColor from "validate-color";

export const isColor = (value: string) => {
  return validateColor(value);
};
