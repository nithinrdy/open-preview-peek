import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [viteTsconfigPaths()],
  build: {
    // minify: false,
    copyPublicDir: false,
    emptyOutDir: false,
    rollupOptions: {
      input: {
        background: "src/scripts/background.ts",
      },
      output: {
        dir: "dist/scripts",
        entryFileNames: "background.js",
      },
    },
  },
});
