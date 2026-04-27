import js from '@eslint/js'
import astro from 'eslint-plugin-astro'
import astroParser from 'astro-eslint-parser'
import typescriptParser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
  js.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      // Astro specific
      'astro/no-unused-define-vars-in-style': 'warn',
      'astro/no-set-html-directive': 'warn',

      // JavaScript
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.astro'],
      },
      globals: {
        Astro: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
      },
    },
  },
]
