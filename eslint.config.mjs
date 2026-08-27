import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),

  {
    rules: {
      // Unused vars are errors, but `_`-prefixed ones are an explicit opt-out.
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Keeps `import type` explicit so `verbatimModuleSyntax` never surprises us.
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "smart"],
    },
  },

  {
    // Tests, config and CLI scripts legitimately write to stdout.
    files: ["**/*.test.{ts,tsx}", "e2e/**/*.ts", "**/*.config.{ts,mts,mjs}", "scripts/**"],
    rules: {
      "no-console": "off",
    },
  },
]);

export default eslintConfig;
