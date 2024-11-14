import globals from 'globals'
import angular from 'angular-eslint'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

/** @type {import('eslint').Linter.Config[]} */
export default [
  stylistic.configs['recommended-flat'],
  ...angular.configs.tsRecommended,
  ...tseslint.configs.recommended,
  {
    files: ['projects/client-support-angular/src/**/*.ts'],
    plugins: {
      '@stylistic': stylistic,
    },
    processor: angular.processInlineTemplates,
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'curly': 'error',
      'no-console': ['error', { allow: ['debug'] }],
      'no-undef': 'error',
      '@stylistic/brace-style': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/indent': ['error', 2],
      '@stylistic/max-len': ['error', { code: 140 }],
      '@stylistic/member-delimiter-style': 'off',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'never',
        asyncArrow: 'always',
        named: 'never',
      }],
    },
  },
]
