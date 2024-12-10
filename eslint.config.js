import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
  { ignores: ['dist'] },
  js.configs.recommended, 
  ...tseslint.configs.recommended, 
  ...tseslint.configs.strict, 
  reactRecommended, 
  reactJsxRuntime, 
  {
    files: ['**/*.{ts,tsx}'], 
    languageOptions: {
      parserOptions: {
        project: './tsconfig.app.json',
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020, 
        sourceType: 'module', 
      },
      globals: {
        browser: true,
        es2020: true, 
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      unicorn: unicorn,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      indent: ['error', 2],
      'no-trailing-spaces': 'error',
      ...jsxA11y.configs.recommended.rules,
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off', 
      '@typescript-eslint/no-explicit-any': 'warn', 
      'react/react-in-jsx-scope': 'off', 
      'react-hooks/exhaustive-deps': 'warn', 
    },
    settings: {
      react: {
        version: 'detect', 
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'], 
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, 
          project: './tsconfig.app.json',
        },
      },
    },
  },
);
