/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss"; // Import tailwindcss directly
import autoprefixer from "autoprefixer";
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  },
});
