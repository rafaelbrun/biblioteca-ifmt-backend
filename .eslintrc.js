module.exports = {
  env: {
    'jest/globals': true,
  },
  extends: [
    './eslint-configs/eslintrc-base-rules.js',
    './eslint-configs/eslintrc-ts-rules.js',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    '@react-native-community',
    'plugin:jest/recommended',
  ],
  globals: {
    Detox: 'readonly',
  },
  overrides: [
    {
      files: ['*.json'],
      rules: {
        'comma-dangle': [1, 'never'],
        quotes: [1, 'double'],
        semi: [1, 'never'],
      },
    },
    {
      files: ['stories.tsx', '*.stories.tsx'],
      rules: {
        'react/jsx-no-literals': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'import',
    'prettier',
    'react-hooks',
    'sort-keys-fix',
    'typescript-sort-keys',
  ],
  root: true,
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true },
    ],
    indent: ['off'],
    'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
    'no-dupe-class-members': ['off'],
    'no-empty': [1, { allowEmptyCatch: true }],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['..*'],
            message: 'Use only absolute imports',
          },
        ],
      },
    ],
    'no-shadow': 'off',
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        bracketSameLine: false,
        bracketSpacing: true,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-curly-brace-presence': [
      'error',
      { children: 'ignore', props: 'always' },
    ],
    'react/jsx-no-literals': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: false,
        shorthandLast: true,
      },
    ],
    'sort-keys': [
      'error',
      'asc',
      { caseSensitive: true, minKeys: 5, natural: false },
    ],
    'sort-keys-fix/sort-keys-fix': 'error',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
  },
  settings: {
    'import/ignore': ['react-native'],
  },
};
