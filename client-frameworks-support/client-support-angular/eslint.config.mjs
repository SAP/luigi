import globals from 'globals';
import angular from 'angular-eslint';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.ts']},
  {ignores: ['**/*.js', '**/*.d.ts', '**/*.spec.ts']},
  {languageOptions: { globals: globals.browser }},
  {plugins: { '@stylistic': stylistic }},
  ...angular.configs.tsRecommended,
  ...tseslint.configs.recommended,
  {
    processor: angular.processInlineTemplates,
    rules: {
      'curly': 'error',
      'no-console': ['error', {allow: ['debug']}],
      'no-undef': 'error',
      '@stylistic/indent': ['error', 2],
      '@stylistic/max-len': ['error', { 'code': 140 }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', {
        'anonymous': 'never',
        'asyncArrow': 'always',
        'named': 'never'
      }]
    }
  }
];
