import { JSXAttribute } from "@babel/types";
import * as types from "@babel/types";
import { isColor } from "./isColor";
import { enumStyleNames } from "./constants";
import { NodePath } from "@babel/core";

const parseStringLiteral = ({
  t,
  value,
  themeIdentifier,
  key,
}: {
  key: string;
  value: string;
  t: typeof types;
  themeIdentifier: types.Identifier;
}) => {
  if (enumStyleNames.has(key)) {
    return { value: t.stringLiteral(value), addThemeImport: false };
  }

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
  key,
  attribute,
  t,
  themeIdentifier,
  path,
}: {
  key: string;
  attribute: JSXAttribute;
  t: typeof types;
  themeIdentifier: types.Identifier;
  path: NodePath<types.JSXOpeningElement>;
}) => {
  if (!attribute.value) {
    return { value: t.booleanLiteral(true), addThemeImport: false };
  }

  if (attribute.value.type === "StringLiteral") {
    return parseStringLiteral({
      t,
      themeIdentifier,
      value: attribute.value.value,
      key,
    });
  }

  if (attribute.value.type === "JSXExpressionContainer") {
    switch (attribute.value.expression.type) {
      case "StringLiteral":
        return parseStringLiteral({
          t,
          themeIdentifier,
          value: attribute.value.expression.value,
          key,
        });
      case "NumericLiteral":
      case "BooleanLiteral":
      case "Identifier":
      case "CallExpression":
      case "UnaryExpression":
      case "BinaryExpression":
      case "ArrayExpression":
      case "NullLiteral":
        return {
          value: attribute.value.expression,
          addThemeImport: false,
        };
      case "ArrowFunctionExpression":
      case "FunctionExpression":
        if (attribute.value.expression.params[0].type !== "Identifier") {
          throw new Error(
            "theme not passed to params" + attribute.value.expression.type
          );
        }

        const paramName = attribute.value.expression.params[0].name;
        attribute.value.expression.params = [];
        path.scope.traverse(attribute.value.expression.body, {
          Identifier: (identifierNode) => {
            if (identifierNode.node.name === paramName) {
              identifierNode.replaceWith(themeIdentifier);
            }
          },
        });

        const value = t.callExpression(attribute.value.expression, []);

        return {
          value,
          addThemeImport: true,
        };

      default:
        throw new Error(
          "getStyleValue unparsed expression: " +
            attribute.value.expression.type
        );
    }
  }

  throw new Error("getStyleValue unparsed type: " + attribute.value.type);
};
