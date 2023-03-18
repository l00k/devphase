module.exports = {
    root: true,
    env: {
        es2021: true,
        mocha: true,
        node: true,
    },
    plugins: [
        '@typescript-eslint'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        indent: [ 'error', 4 ],
        quotes: [
            'error',
            'single',
            { 'avoidEscape': true }
        ],
        'array-bracket-spacing': [ 'error', 'always' ],
        'arrow-spacing': [ 'error' ],
        'keyword-spacing': [ 'error' ],
        'newline-per-chained-call': [ 'error' ],
        'no-async-promise-executor': [ 'warn' ],
        'prefer-rest-params': [ 'warn' ],
        'space-before-blocks': [ 'error' ],
        '@typescript-eslint/ban-ts-comment': [ 'off' ],
        '@typescript-eslint/ban-types': [ 'warn' ],
        '@typescript-eslint/no-empty-function': [ 'warn' ],
        '@typescript-eslint/no-empty-interface': [ 'off' ],
        '@typescript-eslint/no-explicit-any': [ 'off' ],
        '@typescript-eslint/no-inferrable-types': [ 'off' ],
        '@typescript-eslint/no-namespace': [ 'off' ],
        '@typescript-eslint/no-unused-vars': [ 'off' ],
        '@typescript-eslint/no-var-requires': [ 'warn' ],
    },
};
