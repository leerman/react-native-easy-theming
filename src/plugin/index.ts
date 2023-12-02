import { PluginObj, types } from "@babel/core";
import { getStyleValue } from "./utils/get-style-value";
import { mapStyleName } from "./utils/map-style-name";
import { transformStyleName } from "./utils/transform-style-name";
import { addThemeImports } from "./utils/add-theme-imports";

const STYLES_PREFIX = "s-";

export default function (babel: { types: typeof types }): PluginObj {
  var t = babel.types;

  return {
    visitor: {
      JSXOpeningElement(path, { opts }) {
        const prefix = (opts as any).prefix ?? STYLES_PREFIX;
        const themeIdentifier = path.scope.generateUidIdentifier("theme");

        if (path.node.name.type === "JSXIdentifier") {
          let shouldAddThemeImport = false;
          const styleProps = [];
          const deleteIndexes = [];

          path.node.attributes.forEach(function (attr, index) {
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

              const { addThemeImport, value } = getStyleValue({
                path,
                attribute: attr,
                themeIdentifier,
                key: rawStyleName,
                t,
              });

              styleProps.push(t.objectProperty(t.identifier(styleName), value));
              deleteIndexes.push(index);

              if (addThemeImport) {
                shouldAddThemeImport = true;
              }
            }
          });

          if (styleProps.length > 0) {
            path.node.attributes.push(
              t.jSXAttribute(
                t.jSXIdentifier("style"),
                t.jSXExpressionContainer(t.objectExpression(styleProps))
              )
            );
            deleteIndexes.reverse().forEach((index) => {
              path.node.attributes.splice(index, 1);
            });
          }

          if (shouldAddThemeImport) {
            addThemeImports({ path, t, themeIdentifier });
          }
        }
      },
    },
  };
}
