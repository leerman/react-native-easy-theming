import { pluginTester } from "babel-plugin-tester";
import plugin from "../index";

pluginTester({
  title: "connect theme",
  plugin,
  snapshot: true,
  babelOptions: {
    presets: ["@babel/preset-react"],
  },
  tests: [
    {
      title: "inline theme path",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const App=()=>{
          return <Text s-background-color="colors.background.primary">hello</Text>
        }
      `,
    },
  ],
});
