module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    env: {
        es6: true,
        node: true,
    },
    ignorePatterns: ['.eslintrc.js', 'craco.config.js', 'lint-staged.config.js'],
    rules: {
        'import/no-unresolved': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-unused-vars': ['off'], // Delegate to @typescript-eslint

        'no-empty-function': ['off'],
        'global-require': ['off'],
        'no-plusplus': ['off'],
        'no-param-reassign': ['off'],

        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'return' }, // Blank line before return
        ],

        'prefer-destructuring': ['error', { object: true, array: false }],
        'import/prefer-default-export': ['off'],
        'arrow-body-style': ['error', 'as-needed'],
        'no-underscore-dangle': ['off'],

        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-var-requires': ['off'],
        '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
        '@typescript-eslint/no-empty-function': ['error'],
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    },
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: ['./projects/*/tsconfig.json', './tsconfig.json'],
            },
        },
    },
};
