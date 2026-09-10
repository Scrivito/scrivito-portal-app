import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import tsEslint from 'typescript-eslint'
import arabastaReact from '@arabasta/eslint-plugin-react'
import jsxA11Y from 'eslint-plugin-jsx-a11y-x'
import importX from 'eslint-plugin-import-x'
import eslintReact from '@eslint-react/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  arabastaReact.configs.recommended,
  eslintReact.configs['recommended-typescript'],
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  jsxA11Y.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },

    settings: {
      'import-x/resolver-next': [
        importX.createNodeResolver({ extensions: ['.ts', '.tsx', '.js'] }),
      ],

      react: {
        version: 'detect',
      },

      'jsx-a11y-x': {
        components: {
          ImageTag: 'img',
        },
      },
    },

    rules: {
      curly: ['error', 'multi-line'],

      eqeqeq: ['warn'],

      quotes: [
        'warn',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: false,
        },
      ],

      '@stylistic/jsx-curly-brace-presence': ['warn'],

      // Disable opinionated React 19 rules
      '@eslint-react/no-use-context': 'off',

      // TODO: Enable these stricter @eslint-react rules and fix the issues for better code quality
      '@eslint-react/use-state': 'off',
      '@eslint-react/set-state-in-effect': 'off',
      '@eslint-react/purity': 'off',
      '@eslint-react/no-array-index-key': 'off',
      '@eslint-react/jsx-no-key-after-spread': 'off',

      '@typescript-eslint/no-unused-vars': [
        1,
        {
          args: 'all',
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: false,
          allowBoolean: false,
          allowNever: false,
          allowNullish: false,
          allowRegExp: false,
        },
      ],
    },
  },
  {
    files: ['src/config/windowScrivito.ts'],

    rules: {
      '@typescript-eslint/ban-ts-comment': 0,
    },
  },
])
