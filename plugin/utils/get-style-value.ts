import { JSXAttribute } from "@babel/types";
import * as types from "@babel/types";
import { isColor } from "./isColor";

const parseStringLiteral = (value: string, t: typeof types) => {
  if (isColor(value)) {
    return t.stringLiteral(value);
  }

  throw new Error("parseStringLiteral unparsed type: " + value);
};

export const getStyleValue = (attribute: JSXAttribute, t: typeof types) => {
  if (attribute.value.type === "StringLiteral") {
    return parseStringLiteral(attribute.value.value, t);
  }

  if (attribute.value.type === "JSXExpressionContainer") {
    if (attribute.value.expression.type === "StringLiteral") {
      return parseStringLiteral(attribute.value.expression.value, t);
    }
    // console.log(attribute.value.expression);
  }

  throw new Error("getStyleValue unparsed type: " + attribute.value.type);
};
