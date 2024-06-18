/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/admin/components/*.tsx',
    './src/admin/components/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        'black-900': '#111',
        'black-800': '#222',
      }
    }
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.click-effect': {
          '@apply active:brightness-[.6] transition-all': {},
        },
        '.err': {
          '@apply text-red-400 text-sm capitalize': {}
        },
        '.input, .textarea': {
          '@apply rounded-lg p-4 outline-none': {},
        },
        '.f-center': {
          '@apply flex items-center justify-center': {},
        },
        '.f-start-center': {
          '@apply flex items-start justify-center': {},
        },
        '.f-start': {
          '@apply flex items-start justify-start': {},
        },
        '.f-center-start': {
          '@apply flex items-center justify-start': {},
        },
        '.f-end-start': {
          '@apply flex items-end justify-start': {},
        },
        '.f-start-end': {
          '@apply flex items-start justify-end': {},
        },
        '.f-center-end': {
          '@apply flex items-center justify-end': {},
        },
        '.f-center-between': {
          '@apply flex items-center justify-between': {},
        },
        '.f-start-between': {
          '@apply flex items-start justify-between': {},
        },
        '.ltr': {
          direction: 'ltr',
        },
        '.link': {
          '@apply underline decoration-dotted text-blue-400 cursor-pointer opacity-70 relative hover:opacity-100 transition-opacity gap-x-2': {},
        },
        '.btn': {
          '@apply f-center text-white': {}
        },
        '.btn-tertiary': {
          '@apply bg-blue-500 hover:shadow-blue btn': {}
        },
        '.btn-secondary': {
          '@apply bg-blue-500 hover:bg-blue-400 btn': {}
        }
      })
    }
  ]
}
