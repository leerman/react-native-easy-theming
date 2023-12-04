## react-native-easy-theming

DX friendly theming library for React-Native

## Geting started

1. install package

```cmd
yarn add react-native-easy-theming
```

2. add babel plugin in babel config

```
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [['react-native-easy-theming/plugin']], //<- add this
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
// types/react-native-easy-theming.d.ts
import { TMyTheme } from "../themes";
export * from "react-native-easy-theming";
declare module "react-native-easy-theming" {
  interface TTheme extends TMyTheme {}
}
```

5. connect theme provider to your app

```ts
// App.tsx
import React from "react";
import {
  ThemeProvider,
  useTheme,
  useThemeChange,
} from "react-native-easy-theming";
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
