import { PluginObj } from "@babel/core";
import * as types from "@babel/types";

export default function (babel: { types: typeof types }): PluginObj {
  var t = babel.types;
  console.log("plugin start");

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
      JSXOpeningElement(path) {
        if (
          path.node.name.type === "JSXIdentifier" &&
          path.node.name.name === "Text"
        ) {
          const parentFunction = path.getFunctionParent();
          if (parentFunction.node.body.type !== "BlockStatement") return;

          parentFunction.node.body.body.unshift(themeDeclaration);

          const program = path.scope.getProgramParent();
          if (program.path.node.type !== "Program") return;
          program.path.node.body.unshift(themeImport);

          let styleAttribute;
          let newStyleObject;

          path.node.attributes.forEach(function (attr) {
            if (attr.type === "JSXSpreadAttribute") return;

            if (attr.name.name === "style") {
              // console.log('style', JSON.stringify(attr, null, 2));
            }
            if (attr.name.name === "backgroundColor") {
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
                  t.identifier("backgroundColor"),
                  t.isJSXExpressionContainer(attr.value)
                    ? attr.value.expression
                    : (attr.value as any).value
                        .split(".")
                        .reduce(
                          (prev, next) =>
                            t.memberExpression(prev, t.identifier(next)),
                          themeIdentifier
                        )
                )
              );
              path.node.attributes.splice(
                path.node.attributes.indexOf(attr),
                1
              );
            }
          });
        }
      },
    },
  };
}
