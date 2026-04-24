import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        fucsia: '#e175ea',
        cyan: '#8cf1ff',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(to right, #E175EA 12.77%, #8CF1FF 114.5%)',
        'gradient-border':
          'linear-gradient(#2a2735 0 0) padding-box, linear-gradient(to right, #E175EA 12.77%, #8CF1FF 114.5%) border-box',
      },
      screens: {
        lg: '876px',
      },
    },
  },
} satisfies Config
