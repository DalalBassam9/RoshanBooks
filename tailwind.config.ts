import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],

  purge: {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [/^tailwind/],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        'cursive': ['cursive'],
       },
      colors: {

        Lightblue: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          800: '#075985',
          900: '#0c4a6e',
          100: '#e0f2fe',

        },

        beige:"#D5A983",
      
      },


    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
  },
},
}
export default config
