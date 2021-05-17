module.exports = {
  root: true,
  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import', 'react-hooks'],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Vérifie les règles des Hooks
    'react-hooks/exhaustive-deps': 'warn', // Vérifie les tableaux de dépendances
    'no-debugger': 'off',
    'no-underscore-dangle': ['error', { allow: ['_type'] }],
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/prop-types': 'off',
    'import/extensions': 'off',
    'no-console': 'warn',
    'no-warning-comments': 'warn',
    'import/no-extraneous-dependencies': [
      'warn',
      { devDependencies: false, optionalDependencies: false, peerDependencies: false },
    ],
    '@typescript-eslint/ban-ts-ignore': 'off',
    'import/prefer-default-export': 'off',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
}
