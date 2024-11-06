import neostandard from 'neostandard';
import pluginCypress from 'eslint-plugin-cypress/flat';
import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...neostandard(),
  pluginCypress.configs.recommended,
  stylistic.configs['recommended-flat'],
  {
    files: ['**/*.js', '**/*.ts'],
    plugins: {
      cypress: pluginCypress,
      '@stylistic': stylistic
    },
    rules: {
      'no-ex-assign': 'warn',
      '@stylistic/indent': 'off',
      '@stylistic/no-tabs': 'off',
      '@stylistic/semi': 'error'
    }
  }
];
