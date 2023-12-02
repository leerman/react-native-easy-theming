import { pluginTester } from "babel-plugin-tester";
import plugin from "../index";

pluginTester({
  title: "not apply",
  plugin,
  snapshot: true,
  tests: [
    {
      title: "empty file",
      snapshot: false,
      code: ``,
      output: ``,
    },
    {
      title: "declare component",
      code: `
        const App=()=>{
          return null
        }
      `,
    },
    {
      title: "export component",
      code: `
          export const App=()=>{
              return null
          }
        `,
    },
    {
      title: "export component wit some imports",
      code: `
          import React from 'react';
          export const App=()=>{
              return null
          }
        `,
    },
  ],
});
