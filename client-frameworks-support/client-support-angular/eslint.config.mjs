import globals from "globals";
import angular from "angular-eslint";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.ts"]},
  {ignores: ["**/*.js", "**/*.d.ts", "**/*.spec.ts"]},
  {languageOptions: { globals: globals.browser }},
  ...angular.configs.tsRecommended,
  ...tseslint.configs.recommended,
  {
    processor: angular.processInlineTemplates,
    rules: {
      "curly": "error",
      "no-console": "warn",
      "no-undef": "error"
    }
  }
];
