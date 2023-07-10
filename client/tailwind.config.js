/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        marineBlue: 'hsl(213, 96%, 18%)',
        purplishBlue: 'hsl(243, 100%, 62%)',
        pastelBlue: 'hsl(228, 100%, 84%)',
        lightBlue: 'hsl(206, 94%, 87%)',
        strawberryRed: 'hsl(354, 84%, 57%)',
        'base-100': 'hsl(0, 0%, 100%)',
        'base-200': 'hsl(231, 100%, 99%)',
        'base-300': 'hsl(217, 100%, 97%)',
        'base-400': 'hsl(229, 24%, 87%)',
        'base-500': 'hsl(231, 11%, 63%)',
      },
    },
  },
  plugins: [],
};
