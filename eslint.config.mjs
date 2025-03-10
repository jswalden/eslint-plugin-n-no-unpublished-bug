import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import neslint from "eslint-plugin-n";

/**
 * @param {import('eslint').Linter.Config<import('eslint').Linter.RulesRecord>['files']} files
 * @param {readonly string[]} allowModules
 * @returns {import('eslint').Linter.Config<import('eslint').Linter.RulesRecord>}
 */
function permitLimitedUnpublishedImports(files, allowModules) {
  return {
    files,
    rules: {
      "n/no-unpublished-import": [
        "error",
        {
          allowModules,
        },
      ],
    },
  };
}

export default defineConfig([
  {
    ignores: ["**/dist/*"],
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
  },
  neslint.configs["flat/recommended-script"],
  {
    rules: {
      "n/no-missing-import": "off",
    },
  },
  tseslint.configs.recommendedTypeChecked,
  {
    files: ["*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  permitLimitedUnpublishedImports(
    ["eslint.config.*"],
    ["eslint", "typescript-eslint", "eslint-plugin-n"]
  ),
  permitLimitedUnpublishedImports(["jest.config.ts"], ["ts-jest"]),
  permitLimitedUnpublishedImports(["src/**/*.test.ts"], ["@jest/globals"]),
]);
