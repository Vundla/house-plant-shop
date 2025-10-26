import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: '/house-plant-shop/',
  server: {
    open: true
  },
  build: {
    sourcemap: false
  }
});
