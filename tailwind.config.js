module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')({ strategy: 'base' })],
};
