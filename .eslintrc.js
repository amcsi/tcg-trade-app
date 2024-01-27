module.exports = {
  root: true,
  extends: ['plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'prettier/prettier': ['error'],
    'no-console': [
      'warn',
      {
        allow: ['error'],
      },
    ],
    'no-debugger': 'warn',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
      },
    ],
  },
};
