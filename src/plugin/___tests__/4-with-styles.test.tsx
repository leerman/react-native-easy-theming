import { pluginTester } from "babel-plugin-tester";
import plugin from "../index";

pluginTester({
  title: "with styles",
  plugin,
  snapshot: true,
  babelOptions: {
    presets: ["@babel/preset-react"],
  },
  tests: [
    {
      title: "declaration before style prop",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const App=()=>{
          return <View s-background-color="red" style={{}}></View>
        }
      `,
    },
    {
      title: "declaration after style prop",
      code: `
          import React from 'react';
          import Text from 'react-native';
          const App=()=>{
            return <View style={{}} s-background-color="red"></View>
          }
        `,
    },
    {
      title: "declaration around style prop",
      code: `
            import React from 'react';
            import Text from 'react-native';
            const App=()=>{
              return <View s-background-color="white" style={{}} s-background-color="red"></View>
            }
          `,
    },
  ],
});
