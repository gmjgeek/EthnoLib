import availableLocales from "./available-locales.json" with { type: "json" };
import { jstsExtractor, svelteExtractor } from "svelte-i18n-lingui/extractor";

module.exports = {
  locales: availableLocales,
  catalogs: [
    {
      path: "<rootDir>/locales/{locale}/messages",
      include: ["components"],
      exclude: [
        "**/node_modules/**",
        "**/*.stories.tsx",
        "**/*.stories.ts",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/*.spec.ts",
        "**/*.spec.tsx",
        "**/storybook/**",
        "**/test/**",
        "**/tests/**",
        "**/playwright/**",
        "**/e2e/**",
      ],
    },
  ],
  extractors: [jstsExtractor, svelteExtractor],
  format: "po",
  sourceLocale: "en",
  orderBy: "messageId",
  compileNamespace: "ts",
};
