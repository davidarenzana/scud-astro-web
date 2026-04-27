import js from '@eslint/js'
import astro from 'eslint-plugin-astro'

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
    rules: {
      'no-undef': 'off',
    },
    linterOptions: {
      noInlineConfig: false,
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
