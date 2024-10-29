import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: `${path.resolve(__dirname, "./src/assets")}`,
      config: `${path.resolve(__dirname, "./src/config/")}`,
      context: `${path.resolve(__dirname, "./src/context/")}`,
      styles: `${path.resolve(__dirname, "./src/styles/")}`,
      layout: `${path.resolve(__dirname, "./src/views/_layout/")}`,
      atoms: `${path.resolve(__dirname, "./src/views/atoms/")}`,
      molecules: `${path.resolve(__dirname, "./src/views/molecules/")}`,
      pages: `${path.resolve(__dirname, "./src/views/pages/")}`,
    },
  },
});
