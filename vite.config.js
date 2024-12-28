import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
    "process.env": {},
  },
  build: {
    rollupOptions: {
      // this is included because it breaks the build if not included
      // this is almost certainly a bug in wagmi (or these libraries transatively
      // and likely can be removed in the future
      external: [
        "@safe-globalThis/safe-ethers-adapters",
        "@safe-globalThis/safe-core-sdk",
        "@safe-globalThis/safe-ethers-lib"
      ],
    },
  }
});
