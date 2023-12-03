## react-native-theme

DX friendly theming library for React-Native

## Geting started

1. install package

```cmd
yarn add react-native-theme
```

2. add babel plugin in babel config

```
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [['react-native-theme/plugin']], //<- add this
};
```

3. create your theme type

```ts
// themes.ts
const light = { name: "light", color: { background: "white" } };
const dark = { name: "dark", color: { background: "black" } };
export const themes = {
  light,
  dark,
};

export type TMyTheme = typeof light;
```

4. connect your theme type to package

```ts
// types/react-native-theme.d.ts
import { TMyTheme } from "../themes";
export * from "react-native-theme";
declare module "react-native-theme" {
  interface TTheme extends TMyTheme {}
}

export * from "react-native";
import { RemappedViewStyles } from "react-native-theme";
declare module "react-native" {
  interface ViewProps extends RemappedViewStyles {}
}
```

5. connect theme provider to your app

```ts
// App.tsx
import React from "react";
import { ThemeProvider, useTheme, useThemeChange } from "react-native-theme";
import { themes } from "./themes";

export const App = () => {
  const [theme, setTheme] = React.useState("light");
  return (
    <ThemeProvider themes={themes} activeTheme={theme} onChange={setTheme}>
      {
        // Application
      }
    </ThemeProvider>
  );
};
```

6. use in your component

```ts
import React from "react";
import { View } from "react-native";

const Component = () => {
  return (
    <View s-background-color="color.background">
      {
        //
      }
    </View>
  );
};
```
