import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [viteTsconfigPaths()],
  build: {
    // minify: false,
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
