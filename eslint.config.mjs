import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import tsEslint from 'typescript-eslint'
import arabastaReact from '@arabasta/eslint-plugin-react'
import jsxA11Y from 'eslint-plugin-jsx-a11y'
import importX from 'eslint-plugin-import-x'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default defineConfig([
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  arabastaReact.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  jsxA11Y.flatConfigs.recommended,
  reactHooks.configs.flat['recommended-latest'],
  {
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

      'jsx-a11y': {
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

      'react/jsx-curly-brace-presence': ['warn'],
      'react/prop-types': 'off',

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
