import { defineConfig } from "vitest/config";

const baseConfig = {
  // Enables import-less tests for drop-in jest compatibility
  globals: true,
  environment: "node",
  exclude: ["dist", "node_modules"],
  coverage: {
    exclude: ["dist", "node_modules"],
  },
};

const DOM_TEST_FILE_PATTERN =
  "**/*.ui.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}";

export const devvitVitestConfig =
  /** @type {import('vitest/config').UserConfig} */ (
    defineConfig({
      test: {
        ...baseConfig,
        exclude: [...baseConfig.exclude, DOM_TEST_FILE_PATTERN],
      },
    })
  );

export default devvitVitestConfig;
