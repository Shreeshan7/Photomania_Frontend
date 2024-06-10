module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint/eslint-plugin", "react-refresh", "simple-import-sort"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "no-unused-vars": "error",
    "prettier/prettier": "error",
    "simple-import-sort/imports": "error",
  },
};
