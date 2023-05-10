module.exports = {
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:import/resolver",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/display-name": "off",
    "react/prop-types": "off",

    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",

    "react/react-in-jsx-scope": "off",

    "jsx-a11y/anchor-is-valid": "off",

    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/ban-types": "off",

    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],

    "prettier/prettier": [
      "error",
      { endOfLine: "auto" },
      { usePrettierrc: true },
    ],
  },
};
