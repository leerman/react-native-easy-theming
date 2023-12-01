const maps = {
  bg: "background-color",
  p: "padding",
  pt: "padding-top",
  pb: "padding-bottom",
  pl: "padding-left",
  pr: "padding-right",
};

export const mapStyleName = (value: string) => {
  return maps[value] ?? value;
};
