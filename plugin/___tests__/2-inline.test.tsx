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
    {
      title: "with plane color value",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const App=()=>{
          return <Text s-background-color="red">hello</Text>
        }
      `,
    },
    {
      title: "with string value inside expression",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const App=()=>{
          return <Text s-background-color={"red"}>hello</Text>
        }
      `,
    },
    {
      title: "with number value inside expression",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const App=()=>{
          return <Text s-p={16}>hello</Text>
        }
      `,
    },
    {
      title: "with boolean value raw",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const App=()=>{
          return <Text s-enabled>hello</Text>
        }
      `,
    },
    {
      title: "with boolean value inside expression",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const App=()=>{
          return <Text s-enabled={false}>hello</Text>
        }
      `,
    },
  ],
});
