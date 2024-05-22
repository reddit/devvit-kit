/* eslint-env node */
const path = require("path");
const base = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:lit/recommended",
    "plugin:security/recommended-legacy",
    "prettier",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    require: true,
    module: true,
    process: true,
  },
  ignorePatterns: ["build/", "coverage/", "dist/", "node_modules"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "no-unsanitized",
    "no-wildcard-postmessage",
    "prototype-pollution-security-rules",
    "scanjs-rules",
    "security",
    "sonarjs",
    "@benasher44/implicit-dependencies",
  ],
  rules: {
    "no-lone-blocks": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        // Prefer ES private fields to TS privates (by forbidding TS privates
        // that don't start with `#`). If your code triggers this lint, replace
        // the TS class property with an ES private. Eg,
        // `private readonly foo: number` becomes `readonly #foo: number`.
        // https://github.com/eslint/eslint/issues/15417
        format: ["camelCase"],
        modifiers: ["private"],
        prefix: ["#"],
        selector: "memberLike",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "none",
        varsIgnorePattern: "(^_.*)|(^UI$)|(^Reddit$)|(^Devvit$)",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off", // enabled in overrides for ts files only

    // Security linting rules
    "security/detect-unsafe-regex": "error",
    "security/detect-buffer-noassert": "error",
    "security/detect-child-process": "error",
    "security/detect-disable-mustache-escape": "error",
    "security/detect-eval-with-expression": "error",
    "security/detect-no-csrf-before-method-override": "error",
    "security/detect-non-literal-fs-filename": "off",
    "security/detect-non-literal-regexp": "error",
    "security/detect-non-literal-require": "error",
    "security/detect-object-injection": "off",
    "security/detect-possible-timing-attacks": "error",
    "security/detect-pseudoRandomBytes": "error",
    "no-unsanitized/method": "error",
    "no-unsanitized/property": "error",

    // SonarJS - Code Smell Detection
    "sonarjs/no-collection-size-mischeck": "warn",
    "sonarjs/no-duplicated-branches": "warn",
    "sonarjs/no-gratuitous-expressions": "warn",
    "sonarjs/no-identical-functions": "warn",
    "sonarjs/no-nested-switch": "warn",
    "sonarjs/no-redundant-jump": "warn",
    "sonarjs/no-same-line-conditional": "warn",
    "sonarjs/no-small-switch": "warn",
    "sonarjs/no-unused-collection": "warn",
    "sonarjs/no-useless-catch": "warn",
    "sonarjs/prefer-immediate-return": "warn",
    "sonarjs/prefer-object-literal": "warn",
    "sonarjs/prefer-single-boolean-return": "warn",

    // SonarJS - Bug Detection
    "sonarjs/no-all-duplicated-branches": "warn",
    "sonarjs/no-empty-collection": "warn",
    "sonarjs/no-element-overwrite": "warn",
    "sonarjs/no-identical-conditions": "warn",
    "sonarjs/no-identical-expressions": "warn",
    "sonarjs/no-ignored-return": "warn",
    "sonarjs/no-one-iteration-loop": "warn",
    "sonarjs/no-use-of-empty-return-value": "warn",
    "sonarjs/non-existent-operator": "warn",

    // Disallow implicit dependencies
    "@benasher44/implicit-dependencies/no-implicit": [
      "error",
      { peer: true, dev: true },
    ],

    // Don't use 'any' (Note: implicit any is already disallowed in TS)
    "@typescript-eslint/no-explicit-any": [
      "warn",
      { fixToUnknown: true, ignoreRestArgs: true },
    ],

    eqeqeq: ["error", "always", { null: "ignore" }],
  },
  overrides: [
    {
      // TypeScript-only rules.
      files: ["*.ts", "*.tsx", "*.cts", "*.mts"],
      rules: {
        "@typescript-eslint/no-misused-promises": ["error", {}],
        "@typescript-eslint/no-floating-promises": ["error", {}],
        "@typescript-eslint/explicit-function-return-type": [
          "error",
          {
            allowExpressions: true,
            allowedNames: [
              "render", // Always returns a TemplateResult
              "styles", // Always returns a CSSResult or CSSResult[]
            ],
          },
        ],
        "@typescript-eslint/consistent-type-imports": "warn",
      },
    },
    {
      // Explicitly disable type-checking on these files. They're not covered by
      // most tsconfigs which causes typescript-eslint to fail.
      files: [
        ".eslintrc.cjs",
        "postcss.config.cjs",
        "tailwind.config.cjs",
        "vite*.config.js",
        "vitest.config.js",
      ],
      parserOptions: { project: null },
    },
  ],
};

module.exports = {
  ...base,
  parserOptions: {
    ...base.parserOptions,
    project: path.join(__dirname, "tsconfig.json"),
  },
};
