import path from 'path';
import { fileURLToPath } from 'url';
import tseslint from 'typescript-eslint';
import svelteParser from 'svelte-eslint-parser';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslint.configs.recommended,
  stylistic.configs['recommended-flat'],
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.*'],
    ignores: [
      'node_modules',
      'test-app',
      '*.config.js',
      'public/*.js',
      'public/index.d.ts',
      'coverage',
      'cypress',
      '*.md',
      '*.mjs',
      '*.map',
      '*.json',
      '.*.*'
    ],
    plugins: {
      '@stylistic': stylistic,
      '@tsPlugin': tsPlugin
    },
    languageOptions: {
      globals: {
        globalThis: false
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.svelte']
      }
    },
    rules: {
      'camelcase': 'off',
      'no-undef': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/semi': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  {
    files: ['src/**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser
      }
    }
  }
];
