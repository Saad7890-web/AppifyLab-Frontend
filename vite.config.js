import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

   server: {
    port: 3000,       // <-- run frontend on 3000
    strictPort: true, // if 3000 is taken, fail instead of picking another port
  },
});