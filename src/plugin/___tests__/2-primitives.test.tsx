import { pluginTester } from "babel-plugin-tester";
import plugin from "../index";

pluginTester({
  title: "primitives",
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
    {
      title: "with local variable",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const App=()=>{
          const enabled=true;
          return <Text s-enabled={enabled}>hello</Text>
        }
      `,
    },
    {
      title: "with function value",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const getEnabled=()=>true
        const App=()=>{
          return <Text s-enabled={getEnabled()}>hello</Text>
        }
      `,
    },
    {
      title: "with unary operation",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const enabled=true
        const App=()=>{
          return <Text s-enabled={!enabled}>hello</Text>
        }
      `,
    },
    {
      title: "with binary operation",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const enabled=true
        const App=()=>{
          return <Text s-enabled={enabled!==true}>hello</Text>
        }
      `,
    },
    {
      title: "with number operation",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const getPadding=()=>10
        const App=()=>{
          return <Text s-padding={getPadding()+10}>hello</Text>
        }
      `,
    },
    {
      title: "with predefined values",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const getPadding=()=>10
        const App=()=>{
          return <Text s-position="absolute">hello</Text>
        }
      `,
    },
    {
      title: "with array values",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const App=()=>{
          return <Text s-transform={[]}>hello</Text>
        }
      `,
    },
    {
      title: "with null value",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const App=()=>{
          return <Text s-transform={null}>hello</Text>
        }
      `,
    },
    {
      title: "with undefined value",
      code: `
        import React from 'react';
        import Text from 'react-native';
        const App=()=>{
          return <Text s-transform={undefined}>hello</Text>
        }
      `,
    },
  ],
});
