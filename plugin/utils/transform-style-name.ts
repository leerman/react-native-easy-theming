export const transformStyleName = (value: string) => {
  return value
    .split("-")
    .map((item, index) =>
      index === 0 ? item : item.charAt(0).toUpperCase() + item.slice(1)
    )
    .join("");
};
