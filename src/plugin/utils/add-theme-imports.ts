import { NodePath, types } from "@babel/core";

export const addThemeImports = ({
  path,
  t,
  themeUid,
  useThemeUid,
  packageName,
  shouldAddImportStatement,
  shouldAddThemeDeclareStatement,
}: {
  path: NodePath<types.JSXOpeningElement>;
  themeUid: types.Identifier;
  useThemeUid: types.Identifier;
  packageName: string;
  t: typeof types;
  shouldAddImportStatement: boolean;
  shouldAddThemeDeclareStatement: boolean;
}) => {
  const parentFunction = path.getFunctionParent();
  if (parentFunction.node.body.type !== "BlockStatement") return;

  const program = path.scope.getProgramParent();
  if (program.path.node.type !== "Program") return;

  if (shouldAddThemeDeclareStatement) {
    const themeDeclaration = t.variableDeclaration("const", [
      t.variableDeclarator(themeUid, t.callExpression(useThemeUid, [])),
    ]);
    parentFunction.node.body.body.unshift(themeDeclaration);
  }

  if (shouldAddImportStatement) {
    const themeImport = t.importDeclaration(
      [t.importSpecifier(useThemeUid, t.identifier("useTheme"))],
      t.stringLiteral(packageName)
    );

    program.path.node.body.unshift(themeImport);
  }
};
