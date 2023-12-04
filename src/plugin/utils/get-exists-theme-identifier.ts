import { NodePath, types } from "@babel/core";

export const getExistsThemeIdentifier = ({
  packageName,
  path,
}: {
  packageName: string;
  path: NodePath<types.JSXOpeningElement>;
}) => {
  const program = path.scope.getProgramParent();
  if (program.path.node.type !== "Program") return {};
  const packageImportStatements = program.path.node.body.filter(
    (node) =>
      node.type === "ImportDeclaration" && node.source.value === packageName
  ) as types.ImportDeclaration[];
  if (packageImportStatements.length === 0) return {};

  const specifiers = packageImportStatements.flatMap((item) => item.specifiers);

  const useThemSpecififier = specifiers.find(
    (item) =>
      item.type === "ImportSpecifier" &&
      ((typeof item.imported === "string" && item.imported === "useTheme") ||
        (item.imported.type === "Identifier" &&
          item.imported.name === "useTheme") ||
        (item.imported.type === "StringLiteral" &&
          item.imported.value === "useTheme"))
  ) as types.ImportSpecifier;
  if (!useThemSpecififier) return {};
  const useThemeIdentifier = useThemSpecififier.local;
  let themeIdentifier = null;
  program.traverse(program.path.node, {
    CallExpression: (callPath) => {
      if (
        !themeIdentifier &&
        callPath.node.callee.type === "Identifier" &&
        callPath.node.callee.name === useThemeIdentifier.name &&
        callPath.parent.type === "VariableDeclarator" &&
        callPath.parent.id.type === "Identifier"
      ) {
        themeIdentifier = callPath.parent.id;
      }
    },
  });

  return { themeIdentifier, useThemeIdentifier };
};
