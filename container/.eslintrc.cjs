module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        "plugin:svelte/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.svelte']
    },
    env: {
        es6: true,
        browser: true
    },
    rules: {
        // override/add rules settings here, such as:
        // 'svelte/rule-name': 'error'
        'camelcase': 'off'
    },
    overrides: [
        {
            files: ["*.svelte"],
            parser: "svelte-eslint-parser",
            parserOptions: {
                parser: '@typescript-eslint/parser'
            }
        }
    ],
    plugins: ['@typescript-eslint'],
    ignorePatterns: [
        'node_modules',
        'test-app',
        '*.config.js',
        'public/*.js',
        'public/index.d.ts',
        'coverage',
        'cypress',
        '*.md',
        '*.map',
        '*.json',
        '.*.*'
    ]
}
