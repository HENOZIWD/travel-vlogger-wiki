import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      stylistic.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/object-curly-newline': ['error', { multiline: true }],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-console': 'error',
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiprop'],
      'object-shorthand': ['error', 'always'],
    },
  },
])
