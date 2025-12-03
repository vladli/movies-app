import perfectionist from 'eslint-plugin-perfectionist'
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**@type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ['**/.next/**', '**/dist/**', '**/build/**', '**/node_modules/**'],
    },
    // TypeScript linting
    ...nextVitals,
    ...nextTs,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: ['tsconfig.json'],
            },
        },
        plugins: {perfectionist},
        rules: {
            'padding-line-between-statements': [
                'error',
                // Пустая строка перед и после function
                {blankLine: 'always', prev: '*', next: 'function'},
                {blankLine: 'always', prev: 'function', next: '*'},

                // (опционально) Пустая строка перед экспортами
                {blankLine: 'always', prev: '*', next: 'export'},
            ],
            'react/jsx-sort-props': [
                'warn',
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    noSortAlphabetically: false, // включить алфавитную сортировку
                    reservedFirst: true,
                },
            ],
            '@typescript-eslint/array-type': ['off'],
            'perfectionist/sort-imports': [
                'error',
                {
                    type: 'alphabetical',
                    order: 'asc',
                    fallbackSort: {type: 'unsorted'},
                    ignoreCase: true,
                    groups: [
                        'react',
                        'type-import',
                        ['value-builtin', 'value-external'],
                        'type-internal',
                        'value-internal',
                        ['type-parent', 'type-sibling', 'type-index'],
                        ['value-parent', 'value-sibling', 'value-index'],
                        'ts-equals-import',
                        'unknown',
                    ],
                    // ВАЖНО: не вставлять пустые строки между группами импортов
                    newlinesBetween: 1,
                    partitionByNewLine: false,
                    partitionByComment: false,
                    customGroups: [
                        {
                            groupName: 'react',
                            elementNamePattern: ['^react$', '^react-.+'],
                        },
                    ],
                },
            ],
            'perfectionist/sort-modules': [
                'error',
                {
                    type: 'alphabetical',
                    order: 'asc',
                    fallbackSort: {type: 'unsorted'},
                    ignoreCase: true,
                    specialCharacters: 'keep',
                    partitionByComment: false,
                    partitionByNewLine: false,
                    newlinesBetween: 'ignore',
                    groups: [
                        'declare-enum',
                        'export-enum',
                        'enum',
                        ['declare-interface', 'declare-type'],
                        ['export-interface', 'export-type'],
                        ['interface', 'type'],
                        'declare-class',
                        'class',
                        'export-class',
                    ],
                    customGroups: [],
                },
            ],
        },
    },
]