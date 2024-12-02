// @ts-check
import eslint from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import * as angular from 'angular-eslint';

export default tseslint.config(
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/consistent-type-definitions': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-empty-function': 'off',
            "@angular-eslint/no-output-on-prefix": "warn",
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
        },
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {
            '@angular-eslint/template/click-events-have-key-events': 'warn',
            '@angular-eslint/template/label-has-associated-control': 'warn',
            '@angular-eslint/template/interactive-supports-focus': 'warn',
        },
    },
);
