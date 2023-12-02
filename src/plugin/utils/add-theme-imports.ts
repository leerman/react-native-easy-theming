import { NodePath, types } from "@babel/core";

export const addThemeImports = ({
  path,
  t,
  themeIdentifier,
}: {
  path: NodePath<types.JSXOpeningElement>;
  themeIdentifier: types.Identifier;
  t: typeof types;
}) => {
  const parentFunction = path.getFunctionParent();
  if (parentFunction.node.body.type !== "BlockStatement") return;

  const useThemeIdentifier = path.scope.generateUidIdentifier("use-theme");
  const themeDeclaration = t.variableDeclaration("const", [
    t.variableDeclarator(
      themeIdentifier,
      t.callExpression(useThemeIdentifier, [])
    ),
  ]);

  parentFunction.node.body.body.unshift(themeDeclaration);

  const program = path.scope.getProgramParent();
  if (program.path.node.type !== "Program") return;

  const themeImport = t.importDeclaration(
    [t.importSpecifier(useThemeIdentifier, t.identifier("useTheme"))],
    t.stringLiteral("react-native-theme")
  );

  program.path.node.body.unshift(themeImport);
};
