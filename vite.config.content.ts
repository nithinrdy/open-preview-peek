import { defineConfig } from "vite";

export default defineConfig({
  build: {
    copyPublicDir: false,
    rollupOptions: {
      input: {
        content: "src/scripts/content.ts",
      },
      output: {
        dir: "dist/scripts",
        entryFileNames: "content.js",
      },
    },
  },
});
