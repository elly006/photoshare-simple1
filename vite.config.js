import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative base so the built files work whether hosted at the domain root
  // or under a GitHub Pages subpath like username.github.io/repo-name/
  base: "./",
});
