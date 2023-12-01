import { PluginObj } from "@babel/core";
import * as types from "@babel/types";
import { getStyleValue } from "./utils/get-style-value";
import { mapStyleName } from "./utils/map-style-name";
import { transformStyleName } from "./utils/transform-style-name";

const STYLES_PREFIX = "s-";

export default function (babel: { types: typeof types }): PluginObj {
  var t = babel.types;

  const useThemeIdentifier = t.identifier("useTheme");
  const themeIdentifier = t.identifier("$$theme");
  const themeDeclaration = t.variableDeclaration("const", [
    t.variableDeclarator(
      themeIdentifier,
      t.callExpression(useThemeIdentifier, [])
    ),
  ]);

  const themeImport = t.importDeclaration(
    [t.importSpecifier(useThemeIdentifier, useThemeIdentifier)],
    t.stringLiteral("./useTheme")
  );

  return {
    visitor: {
      JSXOpeningElement(path, { opts }) {
        const prefix = (opts as any).prefix ?? STYLES_PREFIX;
        if (
          path.node.name.type === "JSXIdentifier" &&
          path.node.name.name === "Text"
        ) {
          let styleAttribute;
          let newStyleObject;
          let hasStyleChanges = false;

          path.node.attributes.forEach(function (attr) {
            if (attr.type === "JSXSpreadAttribute") return;

            if (attr.name.name === "style") {
              // console.log('style', JSON.stringify(attr, null, 2));
            }
            if (
              typeof attr.name.name === "string" &&
              attr.name.name.startsWith(prefix)
            ) {
              const rawStyleName = attr.name.name.slice(prefix.length);
              const styleName = transformStyleName(mapStyleName(rawStyleName));

              if (!styleAttribute) {
                styleAttribute = t.jSXAttribute(
                  t.jSXIdentifier("style"),
                  t.jSXExpressionContainer(t.objectExpression([]))
                );

                newStyleObject = styleAttribute.value.expression;
                path.node.attributes.push(styleAttribute);
              }

              newStyleObject.properties.push(
                t.objectProperty(
                  t.identifier(styleName),
                  getStyleValue(attr, t)
                )
              );

              // newStyleObject.properties.push(
              //   t.objectProperty(
              //     t.identifier(styleName),
              //     t.isJSXExpressionContainer(attr.value)
              //       ? attr.value.expression
              //       : isColor((attr.value as any).value)
              //       ? t.stringLiteral((attr.value as any).value)
              //       : (attr.value as any).value
              //           .split(".")
              //           .reduce(
              //             (prev, next) =>
              //               t.memberExpression(prev, t.identifier(next)),
              //             themeIdentifier
              //           )
              //   )
              // );
              path.node.attributes.splice(
                path.node.attributes.indexOf(attr),
                1
              );
              hasStyleChanges = true;
            }
          });

          // if (hasStyleChanges) {
          //   const parentFunction = path.getFunctionParent();
          //   if (parentFunction.node.body.type !== "BlockStatement") return;

          //   parentFunction.node.body.body.unshift(themeDeclaration);

          //   const program = path.scope.getProgramParent();
          //   if (program.path.node.type !== "Program") return;
          //   program.path.node.body.unshift(themeImport);
          // }
        }
      },
    },
  };
}
