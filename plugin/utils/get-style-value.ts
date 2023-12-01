import { JSXAttribute } from "@babel/types";
import * as types from "@babel/types";
import { isColor } from "./isColor";

const parseStringLiteral = ({
  t,
  value,
  themeIdentifier,
}: {
  value: string;
  t: typeof types;
  themeIdentifier: types.Identifier;
}) => {
  if (isColor(value)) {
    return { value: t.stringLiteral(value), addThemeImport: false };
  }

  return {
    value: value
      .split(".")
      .reduce(
        (prev: types.Expression, next) =>
          t.memberExpression(prev, t.identifier(next)),
        themeIdentifier
      ),
    addThemeImport: true,
  };

  throw new Error("parseStringLiteral unparsed type: " + value);
};

export const getStyleValue = ({
  attribute,
  t,
  themeIdentifier,
}: {
  attribute: JSXAttribute;
  t: typeof types;
  themeIdentifier: types.Identifier;
}) => {
  if (!attribute.value) {
    return { value: t.booleanLiteral(true), addThemeImport: false };
  }

  if (attribute.value.type === "StringLiteral") {
    return parseStringLiteral({
      t,
      themeIdentifier,
      value: attribute.value.value,
    });
  }

  if (attribute.value.type === "JSXExpressionContainer") {
    if (attribute.value.expression.type === "StringLiteral") {
      return parseStringLiteral({
        t,
        themeIdentifier,
        value: attribute.value.expression.value,
      });
    }
    if (attribute.value.expression.type === "NumericLiteral") {
      return {
        value: t.numericLiteral(attribute.value.expression.value),
        addThemeImport: false,
      };
    }
    if (attribute.value.expression.type === "BooleanLiteral") {
      return {
        value: t.booleanLiteral(attribute.value.expression.value),
        addThemeImport: false,
      };
    }

    throw new Error(
      "getStyleValue unparsed expression: " + attribute.value.expression.type
    );

    // console.log(attribute.value.expression);
  }

  throw new Error("getStyleValue unparsed type: " + attribute.value.type);
};
