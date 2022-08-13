module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import'],
  rules: {
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        selector: 'variable',
      },
      {
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        selector: 'parameter',
      },
      {
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        modifiers: ['private'],
        selector: 'memberLike',
      },
      {
        format: ['PascalCase'],
        selector: 'typeLike',
      },
      {
        format: ['camelCase', 'PascalCase'],
        selector: 'enumMember',
      },
    ],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-var-requires': ['off'],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'internal',
          ['index', 'sibling', 'parent', 'object'],
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: 'react+(|-native)',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'no-shadow': 'off',
  },
  settings: {
    'import/extensions': ['.ts', '.tsx', '.js', '.jsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['.'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './',
      },
    },
  },
};
