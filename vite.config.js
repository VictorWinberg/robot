import { defineConfig } from "vite";
import elm from "vite-plugin-elm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [elm()],
});
