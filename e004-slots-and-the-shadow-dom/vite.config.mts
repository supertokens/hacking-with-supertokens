import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { resolve } from "path";

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
  server: {
    port: 3000,
  },
});
