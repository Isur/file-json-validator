module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "import"],
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
  },
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
  overrides: [
    {
      files: ["*.js"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
    },
    {
      files: ["*test.ts"],
      rules: {
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
  rules: {
    "lines-between-class-members": [
      "warn",
      "always",
      {
        exceptAfterSingleLine: true,
      },
    ],
    "no-duplicate-imports": "warn",
    "no-console": "warn",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
    "import/newline-after-import": [
      "warn",
      {
        count: 1,
      },
    ],
  },
};
