import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [solid(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: "./src/main.tsx",
      name: "SolidWebComponents",
      fileName: (format) => `solid-web-components.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          "solid-js": "Solid",
        },
      },
    },
  },
});
