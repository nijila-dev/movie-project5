require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    defineProps: "readonly",
    withDefaults: "readonly"
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    "endOfLine": "auto"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
      },
    ]
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
