import js from '@eslint/js'
import astro from 'eslint-plugin-astro'

export default [
  js.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      // Astro specific
      'astro/no-unused-define-vars-in-style': 'error',
      'astro/no-set-html-directive': 'error',

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
  },
]
