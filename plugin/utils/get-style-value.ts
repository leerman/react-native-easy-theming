import { JSXAttribute } from "@babel/types";
import * as types from "@babel/types";
import { isColor } from "./isColor";

export const getStyleValue = (attribute: JSXAttribute, t: typeof types) => {
  if (attribute.value.type === "StringLiteral") {
    if (isColor(attribute.value.value)) {
      return attribute.value;
    }
  }

  throw new Error("getStyleValue unparsed type: " + attribute.value.type);
};
