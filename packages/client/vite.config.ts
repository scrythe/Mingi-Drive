import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import basicSsl from "@vitejs/plugin-basic-ssl";
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    basicSsl(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
