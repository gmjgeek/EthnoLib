import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),
  compilerOptions: {
    runes: true,
  },
  onwarn: (warning, handler) => {
    // Ignore warnings from node_modules
    if (warning.filename?.includes("node_modules")) {
      return;
    }
    handler(warning);
  },
};
