import { pluginTester } from "babel-plugin-tester";
import plugin from "../index";

pluginTester({
  title: "not apply",
  plugin,
  snapshot: true,
  babelOptions: {
    presets: ["@babel/preset-react"],
  },
  tests: [
    {
      title: "without attributes",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const App=()=>{
          return <Text>hello</Text>
        }
      `,
    },
  ],
});
