module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': ['error'],
    'no-unused-vars': 'warn',
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
};
