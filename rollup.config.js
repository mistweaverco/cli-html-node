import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
const config = [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: false,
    },
    external: [],
    plugins: [
      json(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        module: "ESNext",
        noForceEmit: true,
      }),
      resolve(),
    ],
  },
];
export default config;
